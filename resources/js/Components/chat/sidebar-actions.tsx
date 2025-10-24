import { Link, usePage } from "@inertiajs/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { user as chat_user_route } from "@/routes/chat";

import type { NavItem, PartialExcept, SharedData } from "@/types";
import type { Conversation, Conversations, Message, UserResource } from "@/types/routes/chat";

import { formatMessageDateShort } from "@/lib/helpers";
import { cn } from "@/lib/utils";

import { useInitials } from "@/hooks/use-initials";

import { useEventBus } from "@/providers/EventBus";

import { NavFooter } from "@/components/navigation/nav-footer";
import { NavUser } from "@/components/navigation/nav-user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarGroup, SidebarGroupLabel, SidebarMenuButton } from "@/components/ui/sidebar";
import { QuickActions } from "@/components/ui/sidebar-trigger";

import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, useSidebar } from "./ui/sidebar";

import { SidebarHeaderActions } from "./sidebar-header-actions";

const footerNavItems: NavItem[] = [];

type ChatConversation = NavItem & PartialExcept<Conversation, "id" | "avatar" | "name" | "last_message" | "last_message_date">;
type Users = Record<number, UserResource>;

export function AppSidebar() {
	const page = usePage<SharedData & Conversations>();

	const { on } = useEventBus();
	const { state, isMobile } = useSidebar();

	const getInitials = useInitials();

	const conversations = page.props.conversations;
	const selectedConversation = page.props.selectedConversation;

	const [localConversations, setLocalConversations] = useState<Conversation[]>([]);
	const [onlineUsers, setOnlineUsers] = useState<Users>({});

	const isUserOnline = useCallback(
		(userId: number) => {
			return onlineUsers[userId];
		},
		[onlineUsers],
	);

	const messageCreated = useCallback((message: Message) => {
		setLocalConversations((oldUsers: Conversation[]) => {
			// Create a new array to track if any changes were made
			let hasChanges = false;
			const updated = oldUsers.map((u) => {
				// Check if this conversation is involved in the message
				if (!!message.receiver_id && (u.id === parseInt(message.sender_id) || u.id === parseInt(message.receiver_id))) {
					hasChanges = true;
					return {
						...u,
						last_message: message.message,
						last_message_date: message.created_at,
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

				title: value.name,
				href: chat_user_route({ id: value.id }),
			})),
		[sortedConversations],
	);

	useEffect(() => {
		const offCreated = on("message.created", messageCreated);
		const offDeleted = on("message.deleted", messageDeleted);

		return () => {
			offCreated();
			offDeleted();
		};
	}, [on, messageCreated, messageDeleted]);

	useEffect(() => {
		const Echo = window.Echo;

		Echo.join("online")
			.here((users: UserResource[]) => {
				const onlineUsersObj = Object.fromEntries(users.map((user) => [user.id, user]));
				setOnlineUsers((prevOnlineUsers) => {
					return { ...prevOnlineUsers, ...onlineUsersObj };
				});
			})
			.joining((user: UserResource) => {
				setOnlineUsers((prevOnlineUsers) => {
					const updatedUsers = { ...prevOnlineUsers };
					updatedUsers[user.id] = user;
					return updatedUsers;
				});
			})
			.leaving((user: UserResource) => {
				setOnlineUsers((prevOnlineUsers) => {
					const updatedUsers = { ...prevOnlineUsers };
					delete updatedUsers[user.id];
					return updatedUsers;
				});
			})
			.error((error: unknown) => {
				if (error instanceof Error) {
					console.error("Echo error:", error.message);
				} else {
					console.error("Echo error:", error);
				}
			});

		return () => {
			Echo.leave("online");
		};
	}, []);

	useEffect(() => {
		if (localConversations.length === 0) {
			setLocalConversations(conversations);
			return;
		}

		setLocalConversations((prevConversations) => {
			const prevMap = new Map(prevConversations.map((c) => [c.id, c]));

			// Merge: prioritize real-time updates (prevConversations) but add new ones from props
			return conversations.map((propConversation) => {
				const existingConversation = prevMap.get(propConversation.id);

				// If conversation exists locally and has a newer last_message_date, keep the local version
				if (existingConversation && existingConversation.last_message_date && propConversation.last_message_date) {
					if (new Date(existingConversation.last_message_date) >= new Date(propConversation.last_message_date)) {
						return existingConversation;
					}
				}

				// Otherwise use the prop version (fresher data from server)
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
						{chatConversations.map((conversation) => {
							return (
								<SidebarMenuItem key={conversation.id}>
									<SidebarMenuButton
										asChild
										sidebarState={state}
										isMobile={isMobile}
										isActive={conversation.id === selectedConversation?.id}
										tooltip={{ children: conversation.title }}
										className="group/menu-button dark:data-[active=true]:from-zinc-800/50 flex h-12 items-center gap-2 rounded-md font-medium data-[active=true]:bg-linear-to-b data-[active=true]:from-zinc-200 data-[active=true]:to-zinc-300 data-[active=true]:shadow-[0_1px_2px_0_rgb(0_0_0/.15),inset_0_1px_0_0_rgb(255_255_255/.20)] data-[active=true]:hover:bg-transparent dark:data-[active=true]:to-zinc-700"
									>
										<Link href={conversation.href} prefetch>
											<div className="flex w-full items-start justify-between gap-2">
												<div className="flex min-w-0 flex-1 items-center justify-start gap-2">
													<div className="relative shrink-0">
														<div
															className={cn("absolute -top-1 left-5 z-20 size-3 rounded-full bg-gray-400 dark:bg-gray-300", {
																"bg-green-500": !!isUserOnline(conversation.id) === true,
															})}
														/>
														<Avatar className="relative z-10 size-8 rounded-full">
															<AvatarImage src={conversation.avatar} alt={conversation.name} />
															<AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
																{getInitials(conversation.name)}
															</AvatarFallback>
														</Avatar>
													</div>
													<div className="flex min-w-0 flex-1 flex-col items-start justify-start">
														<h1 className="font-sans-pro w-full truncate text-sm font-semibold">{conversation.name}</h1>
														<p className="w-full truncate text-xs">{conversation.last_message || "No messages yet"}</p>
													</div>
												</div>

												{conversation.last_message && (
													<div className="flex w-fit shrink-0 flex-col items-center justify-end">
														<p className="truncate text-xs">{formatMessageDateShort(conversation.last_message_date)}</p>
													</div>
												)}
											</div>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<NavFooter state={state} isMobile={isMobile} items={footerNavItems} className="mt-auto" />
				<NavUser state={state} isMobile={isMobile} />
			</SidebarFooter>
		</Sidebar>
	);
}

export const TriggerSidebar = React.forwardRef<HTMLDivElement>(() => {
	const { toggleSidebar, open, state, isMobile } = useSidebar();
	return <QuickActions open={open} onClick={toggleSidebar} state={state} isMobile={isMobile} />;
});
