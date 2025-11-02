import { usePage } from "@inertiajs/react";
import type { AxiosResponse } from "axios";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { SharedData, User } from "@/types";
import type { Conversations, Message, MessagesResponseProps } from "@/types/routes/chat";

import { loadOlder as load_older_chats_route, markSeen as mark_conversation_seen_route, destroy as message_delete_route } from "@/routes/chat/message";

import { useEventBus } from "@/providers/EventBusProvider";

import { formatMessageDate } from "@/lib/helpers";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { type LucideIcon, ChevronDown, EditIcon, InfoIcon, ReplyIcon, TrashIcon } from "lucide-react";

import MessageActions from "./message-actions";

const groupMessagesByDate = (messages: Message[]) => {
	const groups: { [key: string]: Message[] } = {};

	messages.forEach((message) => {
		const date = new Date(message.created_at).toDateString();
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(message);
	});

	return groups;
};

export default function MessageContainer() {
	const page = usePage<SharedData & Conversations>();
	const { emit, on } = useEventBus();

	const currentUser = page.props.auth.user;
	const selectedConversation = page.props.selectedConversation;

	const messages = page.props.messages as MessagesResponseProps;

	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const messageCtrRef = useRef<HTMLDivElement | null>(null);
	const loadChatsIntersectRef = useRef<HTMLDivElement>(null);

	const [isAtBottom, setIsAtBottom] = useState(true);

	const [localMessages, setLocalMessages] = useState<Message[]>([]);
	const [noMoreMessages, setNoMoreMessages] = useState<boolean>(false);
	const [scrollFromBottom, setScrollFromBottom] = useState<number | null>(null);
	const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
	const [initialScrollDone, setInitialScrollDone] = useState<boolean>(false);

	const messageCreated = (message: Message) => {
		const receiverId = parseInt(message.receiver_id);
		const senderId = parseInt(message.sender_id);
		if (selectedConversation.id === senderId || selectedConversation.id === receiverId) {
			setLocalMessages((prevMessages) => [...prevMessages, message]);
		}
	};

	const messageDeleted = ({ message }: { message: Message }) => {
		const receiverId = parseInt(message.receiver_id);
		const senderId = parseInt(message.sender_id);

		if (selectedConversation.id === senderId || selectedConversation.id === receiverId) {
			setLocalMessages((prevMessages) => prevMessages.filter((m) => m.id !== message.id));
		}
	};

	const loadMoreMessages = useCallback(() => {
		if (noMoreMessages || isLoadingMore || localMessages.length === 0) return;

		const axios = window.axios;
		const firstMessage = localMessages[0];

		setIsLoadingMore(true);

		axios
			.get(load_older_chats_route.url({ id: firstMessage.id }))
			.then((response: AxiosResponse) => {
				const data = response.data.data as Message[];

				if (data.length === 0) {
					setNoMoreMessages(true);
					setIsLoadingMore(false);
					return;
				}

				if (!messageCtrRef.current) {
					setIsLoadingMore(false);
					return;
				}

				const scrollHeight = messageCtrRef.current.scrollHeight;
				const scrollTop = messageCtrRef.current.scrollTop;
				const clientHeight = messageCtrRef.current.clientHeight;
				const tempScrollFromBottom = scrollHeight - scrollTop - clientHeight;

				setScrollFromBottom(tempScrollFromBottom);
				setLocalMessages((prevMessages) => {
					return [...data.reverse(), ...prevMessages];
				});
				setIsLoadingMore(false);
			})
			.catch((error) => {
				console.error("Error loading more messages:", error);
				setIsLoadingMore(false);
			});
	}, [localMessages, noMoreMessages, isLoadingMore]);

	useEffect(() => {
		const handleScroll = () => {
			if (!messageCtrRef.current) return;
			const { scrollTop, scrollHeight, clientHeight } = messageCtrRef.current;
			setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
		};

		const ref = messageCtrRef.current;
		if (ref) {
			ref.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (ref) ref.removeEventListener("scroll", handleScroll);
		};
	}, [messageCtrRef]);

	useEffect(() => {
		setInitialScrollDone(false);

		const timeout = setTimeout(() => {
			if (!messageCtrRef.current) return;
			messageCtrRef.current.scrollTop = messageCtrRef.current.scrollHeight;
			setInitialScrollDone(true);
		}, 150);

		if (textareaRef.current) textareaRef.current.focus();

		const offCreated = on("message.created", messageCreated);
		const offDeleted = on("message.deleted", messageDeleted);

		setScrollFromBottom(null);
		setNoMoreMessages(false);
		setIsLoadingMore(false);

		return () => {
			offCreated();
			offDeleted();

			clearTimeout(timeout);
		};
	}, [selectedConversation]);

	useEffect(() => {
		setLocalMessages(messages ? messages.data.reverse() : []);
		setInitialScrollDone(false);
	}, [messages]);

	// When user opens a conversation, mark messages from that conversation as seen (if any are unseen)
	useEffect(() => {
		const axios = window.axios;

		if (!selectedConversation || !localMessages || localMessages.length === 0) return;

		const hasUnseen = localMessages.some((m) => parseInt(m.receiver_id) === currentUser.id && !m.seen_at);
		if (!hasUnseen) return;

		(async () => {
			try {
				await axios.post(mark_conversation_seen_route.post(selectedConversation.id).url);
				const now = new Date().toISOString();

				setLocalMessages((prev) => {
					const updated = prev.map((m) => {
						if (parseInt(m.sender_id) === selectedConversation.id && parseInt(m.receiver_id) === currentUser.id && !m.seen_at) {
							return { ...m, seen_at: now };
						}
						return m;
					});

					setTimeout(() => emit("messages.seen", { conversationId: selectedConversation.id }), 0);
					return updated;
				});
			} catch (error) {
				console.error("Failed to mark conversation messages as seen:", error);
			}
		})();
	}, [selectedConversation, localMessages]);

	useEffect(() => {
		if (messageCtrRef.current && scrollFromBottom !== null) {
			const newScrollTop = messageCtrRef.current.scrollHeight - messageCtrRef.current.clientHeight - scrollFromBottom;
			messageCtrRef.current.scrollTop = newScrollTop;

			setScrollFromBottom(null);
		}
	}, [messageCtrRef, localMessages, scrollFromBottom]);

	useEffect(() => {
		if (scrollFromBottom === null && messageCtrRef.current && initialScrollDone && localMessages.length > 0) {
			const isNearBottom = messageCtrRef.current.scrollHeight - messageCtrRef.current.scrollTop - messageCtrRef.current.clientHeight < 100;

			if (isNearBottom) {
				messageCtrRef.current.scrollTop = messageCtrRef.current.scrollHeight;
			}
		}
	}, [localMessages, initialScrollDone, scrollFromBottom]);

	useEffect(() => {
		if (noMoreMessages || localMessages.length === 0 || !initialScrollDone) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isLoadingMore) {
						loadMoreMessages();
					}
				});
			},
			{
				root: messageCtrRef.current,
				rootMargin: "10px 0px 0px 0px",
				threshold: 0.5,
			},
		);

		const currentRef = loadChatsIntersectRef.current;
		if (currentRef) {
			const timeout = setTimeout(() => {
				if (currentRef) {
					observer.observe(currentRef);
				}
			}, 200);

			return () => {
				clearTimeout(timeout);
				if (currentRef) {
					observer.unobserve(currentRef);
				}
			};
		}

		return () => {};
	}, [localMessages, noMoreMessages, isLoadingMore, loadMoreMessages, initialScrollDone]);

	if (!selectedConversation) {
		return (
			<div className="flex min-h-0 flex-1 items-center justify-center">
				<p className="text-center text-xl font-medium">No conversation yet selected</p>
			</div>
		);
	}

	if (localMessages.length === 0) {
		return (
			<>
				<div className="flex flex-1 items-center justify-center overflow-hidden">
					<p className="text-center text-xl font-medium">No messages just yet</p>
				</div>

				<div className="group/message-actions shrink">
					<MessageActions ref={textareaRef} conversation={selectedConversation} containerRef={messageCtrRef} />
				</div>
			</>
		);
	}

	const groupedMessages = useMemo(() => groupMessagesByDate(localMessages), [localMessages]);
	const dateKeys = useMemo(() => Object.keys(groupedMessages).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()), [groupedMessages]);

	return (
		<>
			<div ref={messageCtrRef} className="scrollbar-chat-container min-h-0 w-full flex-1 shrink overflow-x-hidden overflow-y-auto px-5 py-5">
				<div className="flex w-full max-w-full min-w-0 flex-col">
					<div ref={loadChatsIntersectRef} className="h-1 shrink-0"></div>
					{isLoadingMore && <div className="shrink-0 py-2 text-center text-sm text-gray-500">Loading more messages...</div>}

					{dateKeys.map((dateKey) => {
						const messagesForDate = groupedMessages[dateKey];
						const dateHeader = formatMessageDate(messagesForDate[0].created_at);

						return (
							<div key={dateKey} className="relative">
								<motion.div
									key={dateHeader}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
									className="sticky top-0 z-10 flex justify-center py-3"
								>
									<div className="rounded-md bg-zinc-800/40 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-md dark:text-gray-300">{dateHeader}</div>
								</motion.div>

								{messagesForDate.map((message, index) => (
									<MessageItem key={`${message.id}-${index}`} currentUser={currentUser} message={message} />
								))}
							</div>
						);
					})}
				</div>
			</div>

			{!isAtBottom && (
				<div className="absolute right-5 bottom-15 z-20">
					<Button
						className="size-10 rounded-full bg-neutral-700 p-2 text-white shadow-2xl shadow-black transition hover:scale-110 hover:bg-neutral-700"
						onClick={(e) => {
							e.preventDefault();

							if (messageCtrRef.current) {
								messageCtrRef.current.scrollTo({ top: messageCtrRef.current.scrollHeight, behavior: "smooth" });
							}
						}}
					>
						<ChevronDown size={30} className="text-white" />
					</Button>
				</div>
			)}

			<div className="group/message-actions w-full shrink">
				<MessageActions ref={textareaRef} conversation={selectedConversation} containerRef={messageCtrRef} />
			</div>
		</>
	);
}

interface ResponseDeletedMessage extends AxiosResponse {
	data: {
		message: Message;
	};
}

const MessageItem = ({ currentUser, message }: { currentUser: User; message: Message }) => {
	const { emit } = useEventBus();

	const [actionIsLoading, setActionIsLoading] = useState<boolean>(false);

	const [hoveringMessage, setHoveringMessage] = useState<boolean>(false);

	const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);
	const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false);

	const isCurrentUser = parseInt(message.sender_id) === currentUser.id;
	const dateCreatedAt = new Date(message.created_at);
	const dateString = dateCreatedAt.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	const handleMessageDelete = useCallback(() => {
		const axios = window.axios;

		setActionIsLoading(true);

		axios
			.delete(message_delete_route.url({ message: message.id }))
			.then((response: ResponseDeletedMessage) => {
				emit("message.deleted", { message: message, prevMessage: response.data.message });
			})
			.catch((error) => {
				console.error("Error loading more messages:", error);
			})
			.finally(() => {
				setActionIsLoading(false);
			});
	}, []);

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
					label: "Delete",
					hidden: !isCurrentUser,
					disabled: actionIsLoading,
					onClick: handleMessageDelete,
					icon: TrashIcon,
					className: "dark:focus:text-red-500 focus:text-red-400 focus:bg-red-500/5 focus:[&_svg]:stroke-red-400",
				},
			],
		];
	}, [actionIsLoading]);

	return (
		<div
			className={cn("flex w-full min-w-0 flex-col gap-1 py-1", {
				"items-end": isCurrentUser,
				"items-start": !isCurrentUser,
			})}
			onMouseEnter={() => setHoveringMessage(true)}
			onMouseLeave={() => setHoveringMessage(false)}
		>
			<ContextMenu
				onOpenChange={(state) => {
					setContextMenuOpen(state);
					setDropdownMenuOpen(false);
				}}
			>
				<ContextMenuTrigger asChild disabled={!isCurrentUser}>
					<div
						className={cn("chat max-w-200", {
							"chat-end": isCurrentUser,
							"chat-start": !isCurrentUser,
						})}
						onContextMenu={(e) => {
							setDropdownMenuOpen(false);
						}}
					>
						<div
							className={cn("chat-bubble relative inline-block max-w-full rounded-xl rounded-bl-none bg-zinc-700 p-2 pt-1 text-white", {
								"bg-primary-business rounded-br-none rounded-bl-xl": isCurrentUser,
							})}
						>
							<div className="chat-message">
								<span className="chat-message-content text-[0.89rem] leading-5 wrap-break-word">{message.message}</span>
								<span className="inline-block h-0 min-w-8"></span>
								<time className="absolute right-2 bottom-1 text-[0.65rem] whitespace-nowrap opacity-90">{dateString}</time>
								<DropdownMenu open={dropdownMenuOpen} onOpenChange={setDropdownMenuOpen}>
									<DropdownMenuTrigger asChild aria-label="message-actions-button" className="bg-transparent dark:bg-transparent">
										<Button
											disabled={actionIsLoading}
											className={cn(
												"absolute top-0 right-1 inline-block size-fit opacity-0 transition-opacity duration-200 ease-in-out hover:bg-transparent hover:opacity-100 focus-visible:border-none focus-visible:ring-0 dark:hover:bg-transparent [&_svg]:size-auto",
												"rounded-tr-xl rounded-bl-md py-1.5 pr-2 pl-6",
												"bg-radial-[at_70%_100%] from-zinc-700 to-transparent",
												"hover:from-zinc-700",
												{
													hidden: contextMenuOpen,
													"opacity-100": hoveringMessage,
													"from-primary-business/60 hover:from-primary-business/60 to-transparent": isCurrentUser,
												},
											)}
										>
											<ChevronDown className="text-muted ml-auto size-4 dark:text-white" />
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
				</ContextMenuTrigger>
				<ContextMenuContent className="dark:bg-sidebar border-sidebar-accent/50 min-w-36 gap-2 rounded-lg p-2 shadow-lg">
					{actions
						.map((g) => g.filter((a) => !a.hidden))
						.filter((g) => g.length > 0)
						.map((actionGroup, groupIndex) => (
							<ContextMenuGroup key={`action-group-${groupIndex}`}>
								{groupIndex > 0 && <ContextMenuSeparator className="border-white" />}
								{actionGroup.map((action, actionIndex) => {
									if (action.hidden) return null;
									return (
										<ContextMenuItem
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
										</ContextMenuItem>
									);
								})}
							</ContextMenuGroup>
						))}
				</ContextMenuContent>
			</ContextMenu>
		</div>
	);
};
