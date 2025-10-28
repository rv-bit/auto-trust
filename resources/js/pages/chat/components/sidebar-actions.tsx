import { Link, usePage } from "@inertiajs/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { AxiosResponse } from "axios";

import { user as chat_user_route } from "@/routes/chat";

import type { NavItem, PartialExcept, SharedData } from "@/types";
import type { Conversation, Conversations } from "@/types/routes/chat";
import type { Message } from "@/types/routes/chat";

import { formatMessageDate } from "@/lib/helpers";
import { cn } from "@/lib/utils";

import { useInitials } from "@/hooks/use-initials";

import { useEventBus } from "@/providers/EventBusProvider";
import { useOnlineUsers } from "@/providers/OnlineUsersProvider";

import { NavFooter } from "@/components/navigation/nav-footer";
import { NavUser } from "@/components/navigation/nav-user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarGroup, SidebarGroupLabel, SidebarMenuButton } from "@/components/ui/sidebar";
import { QuickActions } from "@/components/ui/sidebar-trigger";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { SidebarHeaderActions } from "./sidebar-header-actions";
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, useSidebar } from "./ui/sidebar";

import { ChevronDown, EditIcon, InfoIcon, LayoutGrid, LucideIcon, ReplyIcon, TrashIcon } from "lucide-react";

const footerNavItems: NavItem[] = [
	{
		title: "Notifications",
		href: "/notifications",
	},
	{
		title: "Dashboard",
		href: "/dashboard",
		icon: LayoutGrid,
		// target: "_blank",
		// rel: "noopener noreferrer",
	},
];

type ChatConversation = NavItem & PartialExcept<Conversation, "id" | "avatar" | "name" | "last_message" | "last_message_date" | "unseen_messages">;

export const TriggerSidebar = React.forwardRef<HTMLDivElement>(() => {
	const { toggleSidebar, open, state, isMobile } = useSidebar();
	return <QuickActions open={open} onClick={toggleSidebar} state={state} isMobile={isMobile} />;
});

export function AppSidebar() {
	const page = usePage<SharedData & Conversations>();

	const { on } = useEventBus();
	const { state, isMobile } = useSidebar();

	const currentUser = page.props.auth.user;
	const conversations = page.props.conversations;
	const selectedConversation = page.props.selectedConversation;

	const [localConversations, setLocalConversations] = useState<Conversation[]>([]);

	const messageCreated = useCallback((message: Message) => {
		setLocalConversations((oldUsers: Conversation[]) => {
			// Create a new array to track if any changes were made
			let hasChanges = false;
			const updated = oldUsers.map((u) => {
				// Check if this conversation is involved in the message
				if (!!message.receiver_id && (u.id === parseInt(message.sender_id) || u.id === parseInt(message.receiver_id))) {
					hasChanges = true;
					
					// If current user is the receiver and they're not viewing this conversation,
					// add the message to unseen_messages
					const isReceiver = parseInt(message.receiver_id) === currentUser.id;
					const isViewingThisConversation = selectedConversation?.id === parseInt(message.sender_id);
					const shouldMarkAsUnseen = isReceiver && !isViewingThisConversation;

					// Get existing unseen messages or initialize empty array
					const existingUnseen = Array.isArray(u.unseen_messages) ? u.unseen_messages : [];
					// Only add the message to unseen if we should mark it as unseen and it's not already there
					const unseenMessages = shouldMarkAsUnseen && !existingUnseen.some(m => m.id === message.id) 
						? [...existingUnseen, message]
						: existingUnseen;

					return {
						...u,
						last_message: message.message,
						last_message_date: message.created_at,
						unseen_messages: unseenMessages
					};
				}

				return u;
			});

			return hasChanges ? updated : oldUsers;
		});
	}, []);

	const messageDeleted = useCallback(({ prevMessage }: { prevMessage: Message }) => {
		if (!prevMessage) return;

		messageCreated(prevMessage);
	}, []);

	const sortedConversations = useMemo<Conversation[]>(() => {
		return [...localConversations].sort((a: Conversation, b: Conversation) => {
			// Handle blocked conversations
			if (a.blocked_at && b.blocked_at) {
				return a.blocked_at > b.blocked_at ? 1 : -1;
			} else if (a.blocked_at) {
				return 1;
			} else if (b.blocked_at) {
				return -1;
			}

			// Sort by last message date
			if (a.last_message_date && b.last_message_date) {
				return b.last_message_date.localeCompare(a.last_message_date);
			} else if (a.last_message_date) {
				return -1;
			} else if (b.last_message_date) {
				return 1;
			} else {
				return 0;
			}
		});
	}, [localConversations]);

	const chatConversations: ChatConversation[] = useMemo(
		() =>
			sortedConversations.map((value) => ({
				id: value.id,
				avatar: value.avatar,
				name: value.name,
				last_message: value.last_message,
				last_message_date: value.last_message_date,
				unseen_messages: value.unseen_messages,

				title: value.name,
				href: chat_user_route({ id: value.id }),
			})),
		[sortedConversations],
	);

	useEffect(() => {
		const offCreated = on("message.created", messageCreated);
		const offDeleted = on("message.deleted", messageDeleted);

		const offSeen = on("messages.seen", ({ conversationId }: { conversationId: number }) => {
			setLocalConversations((prev) => {
				const updated = prev.map((conv) => {
					if (conv.id === conversationId) {
						return {
							...conv,
							unseen_messages: [],
						};
					}
					return conv;
				});
				return updated;
			});
		});

		return () => {
			offCreated();
			offDeleted();
			offSeen();
		};
	}, [on, messageCreated, messageDeleted, currentUser]);

	useEffect(() => {
		if (localConversations.length === 0) {
			setLocalConversations(conversations);
			return;
		}

		setLocalConversations((prevConversations) => {
			const prevMap = new Map(prevConversations.map((c) => [c.id, c]));

			return conversations.map((propConversation) => {
				const existingConversation = prevMap.get(propConversation.id);

				if (existingConversation && existingConversation.last_message_date && propConversation.last_message_date) {
					if (new Date(existingConversation.last_message_date) >= new Date(propConversation.last_message_date)) {
						return existingConversation;
					}
				}

				return propConversation;
			});
		});
	}, [conversations]);

	return (
		<Sidebar collapsible="offcanvas" variant="inset">
			<SidebarHeaderActions setLocalConversations={setLocalConversations} />

			<SidebarContent>
				<SidebarGroup className="px-2 py-0">
					<SidebarGroupLabel className="uppercase">Chats</SidebarGroupLabel>
					<SidebarMenu>
						{chatConversations.length === 0 ? (
							<p className="text-muted-foreground p-4 text-center text-sm">No conversations found.</p>
						) : (
							chatConversations.map((conversation) => {
								return <SidebarConversationItem key={conversation.id} conversation={conversation} />;
							})
						)}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<NavFooter sidebarState={state} isMobile={isMobile} items={footerNavItems} className="mt-auto" />
				<NavUser sidebarState={state} isMobile={isMobile} />
			</SidebarFooter>
		</Sidebar>
	);
}

interface ResponseMessages extends AxiosResponse {
	data: Message[];
}

const SidebarConversationItem = React.memo(({ conversation }: { conversation: ChatConversation }) => {
	const page = usePage<SharedData & Conversations>();

	const getInitials = useInitials();
	const { state, isMobile } = useSidebar();
	const { isUserOnline: handleIsUserOnline } = useOnlineUsers();

	const user = page.props.auth.user;
	const selectedConversation = page.props.selectedConversation;
	const messages = page.props.messages as ResponseMessages;

	const [actionIsLoading, setActionIsLoading] = useState<boolean>(false);
	const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);
	const [hoveringConversationId, setHoveringConversationId] = useState<number | null>(null);

	const isHovering = useMemo(() => hoveringConversationId === conversation.id, [hoveringConversationId, conversation.id]);
	const isCurrentUser = useMemo(() => user.id === selectedConversation?.id, [user.id, selectedConversation?.id]);

	const messagePreview = useMemo(() => {
		const unseenMessages = conversation.unseen_messages || [];
		
		// Show the most recent unseen message if there are any
		if (unseenMessages.length > 0) {
			return unseenMessages[unseenMessages.length - 1].message;
		}
		
		// Otherwise show the last message or default text
		return conversation.last_message || "No messages yet";
	}, [conversation.last_message, conversation.unseen_messages]);

	const hasUnseen = useMemo(() => {
		const unseenMessages = conversation.unseen_messages || [];
		if (unseenMessages.length > 0) return true;

		if (messages && Array.isArray((messages as any).data) && selectedConversation && conversation.id === selectedConversation.id) {
			return ((messages.data).some((msg) => !msg.seen_at && msg.receiver_id === String(user.id)));
		}

		return false;
	}, [messages, selectedConversation, conversation]);

	const actions: {
		label: string;
		disabled: boolean;
		className?: string;
		hidden?: boolean;
		icon?: LucideIcon;
		onClick: () => void;
	}[][] = useMemo(() => {
		return [
			[
				{
					label: "Message Info",
					disabled: actionIsLoading,
					onClick: () => {},
					icon: InfoIcon,
				},
				{
					label: "Edit",
					hidden: !isCurrentUser,
					disabled: actionIsLoading,
					onClick: () => {},
					icon: EditIcon,
				},
				{
					label: "Reply",
					hidden: isCurrentUser,
					disabled: actionIsLoading,
					icon: ReplyIcon,
					onClick: () => {},
				},
			],
			[
				{
					label: "Delete Chat",
					hidden: !isCurrentUser,
					disabled: actionIsLoading,
					onClick: () => {},
					icon: TrashIcon,
					className: "dark:focus:text-red-500 focus:text-red-400 focus:bg-red-500/5 focus:[&_svg]:stroke-red-400",
				},
			],
		];
	}, [actionIsLoading, isCurrentUser]);

	return (
		<SidebarMenuItem key={conversation.id} onMouseEnter={() => setHoveringConversationId(conversation.id)} onMouseLeave={() => setHoveringConversationId(null)}>
			<SidebarMenuButton
				asChild
				sidebarState={state}
				isMobile={isMobile}
				isActive={conversation.id === selectedConversation?.id}
				tooltip={{ children: conversation.title }}
				className="group/menu-button dark:hover:bg-sidebar-accent flex h-13 items-center gap-2 rounded-md pt-3 transition-colors delay-0 duration-300 ease-in-out hover:bg-zinc-200 data-[active=true]:bg-linear-to-b data-[active=true]:from-zinc-200 data-[active=true]:to-zinc-300 data-[active=true]:shadow-[0_1px_2px_0_rgb(0_0_0/.5),inset_0_1px_0_0_rgb(255_255_255/.10)] data-[active=true]:hover:bg-transparent dark:data-[active=true]:from-zinc-700/50 dark:data-[active=true]:to-zinc-700"
			>
				<Link href={conversation.href}>
					<div className="flex w-full items-start justify-between gap-2">
						<div className="flex min-w-0 flex-1 items-center justify-start gap-2">
							<div className="relative shrink-0">
								<div
									className={cn("absolute -top-1 left-5 z-20 size-3 rounded-full bg-gray-400 dark:bg-gray-300", {
										"bg-green-500 dark:bg-green-500": !!handleIsUserOnline(conversation.id) === true,
									})}
								/>
								<Avatar className="relative z-10 size-8 rounded-full">
									<AvatarImage src={conversation.avatar} alt={conversation.name} />
									<AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">{getInitials(conversation.name)}</AvatarFallback>
								</Avatar>
							</div>
							<div className="flex min-w-0 flex-1 flex-col items-start justify-start">
								<div className="flex w-full justify-between gap-0.5">
									<h1 className="font-sans-pro flex w-full items-center gap-1 truncate text-[0.9rem] font-medium">
										{conversation.name}
										{hasUnseen && (
											<span className="relative ml-1 flex size-3">
												<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
												<span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
											</span>
										)}
									</h1>
									{conversation.last_message && <p className="size-fit text-xs">{formatMessageDate(conversation.last_message_date)}</p>}
								</div>

								<div className="flex w-full justify-between gap-0.5">
									<p className="w-full truncate text-[0.7rem] transition-all duration-200">{messagePreview}</p>

									<DropdownMenu open={dropdownMenuOpen} onOpenChange={setDropdownMenuOpen}>
										<DropdownMenuTrigger asChild name="conversation-actions-button" className="bg-transparent p-0 dark:bg-transparent">
											<Button
												disabled={actionIsLoading}
												aria-label="conversation-actions-button"
												data-state={isHovering || dropdownMenuOpen ? "open" : "closed"}
												className="size-fit origin-right bg-transparent p-0 transition-all duration-200 ease-in-out hover:bg-transparent focus-visible:border-none focus-visible:ring-0 data-[state=closed]:w-0 data-[state=closed]:opacity-0 data-[state=open]:w-5 data-[state=open]:opacity-100 dark:bg-transparent dark:hover:bg-transparent [&_svg]:size-auto"
											>
												<ChevronDown size={20} className="size-auto text-black dark:text-white" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="dark:bg-sidebar border-sidebar-accent/50 min-w-36 rounded-lg p-2 shadow-lg">
											{actions
												.map((g) => g.filter((a) => !a.hidden))
												.filter((g) => g.length > 0)
												.map((actionGroup, groupIndex) => (
													<DropdownMenuGroup key={`action-group-${groupIndex}`}>
														{groupIndex > 0 && <DropdownMenuSeparator className="border-white" />}
														{actionGroup.map((action, actionIndex) => {
															if (action.hidden) return null;

															return (
																<DropdownMenuItem
																	key={`action-${actionIndex}`}
																	disabled={action.disabled}
																	onClick={action.onClick}
																	className={cn(
																		"dark:text-muted-foreground focus:bg-sidebar-accent py-2 text-sm text-black opacity-100 transition-all delay-75 duration-300 ease-in-out hover:cursor-pointer [&_svg]:transition-all [&_svg]:delay-75 [&_svg]:duration-300",
																		action.className,
																	)}
																>
																	{action.icon && <action.icon />}
																	{action.label}
																</DropdownMenuItem>
															);
														})}
													</DropdownMenuGroup>
												))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
						</div>
					</div>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
});
