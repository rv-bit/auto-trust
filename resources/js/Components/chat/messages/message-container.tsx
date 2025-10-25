import { usePage } from "@inertiajs/react";
import type { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import type { SharedData, User } from "@/types";
import type { Conversations, Message, MessagesProps } from "@/types/routes/chat";

import { loadOlder as load_older_chats_route, destroy as message_delete_route } from "@/routes/chat/message";

import { useEventBus } from "@/providers/EventBus";

import { formatMessageDateLong } from "@/lib/helpers";
import { cn } from "@/lib/utils";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

import MessageActions from "./message-actions";

export default function MessageContainer() {
	const page = usePage<SharedData & Conversations>();
	const { on } = useEventBus();

	const currentUser = page.props.auth.user;
	const selectedConversation = page.props.selectedConversation;
	const messages = page.props.messages as MessagesProps;

	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const messageCtrRef = useRef<HTMLDivElement | null>(null);
	const loadChatsIntersectRef = useRef<HTMLDivElement>(null);

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
			setLocalMessages((prevMessages) => {
				return prevMessages.filter((m) => m.id !== message.id);
			});
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

	useEffect(() => {
		if (messageCtrRef.current && scrollFromBottom !== null) {
			const newScrollTop = messageCtrRef.current.scrollHeight - messageCtrRef.current.clientHeight - scrollFromBottom;
			messageCtrRef.current.scrollTop = newScrollTop;
			setScrollFromBottom(null);
		}
	}, [localMessages, scrollFromBottom]);

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
				rootMargin: "100px 0px 0px 0px",
				threshold: 0.1,
			},
		);

		const currentRef = loadChatsIntersectRef.current;
		if (currentRef) {
			// Small delay to ensure initial scroll is complete
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
					<MessageActions ref={textareaRef} conversation={selectedConversation} />
				</div>
			</>
		);
	}

	return (
		<>
			<div ref={messageCtrRef} className="scrollbar-chat-container min-h-0 w-full flex-1 shrink overflow-x-hidden overflow-y-auto px-5 py-5">
				<div className="flex w-full min-w-0 flex-col">
					<div ref={loadChatsIntersectRef} className="h-1 shrink-0"></div>
					{isLoadingMore && <div className="shrink-0 py-2 text-center text-sm text-gray-500">Loading more messages...</div>}

					{localMessages.map((message, index) => {
						return <MessageItem key={`${message.id}-${index}`} currentUser={currentUser} message={message} />;
					})}
				</div>
			</div>

			<div className="group/message-actions w-full shrink">
				<MessageActions ref={textareaRef} conversation={selectedConversation} />
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

	const isCurrentUser = parseInt(message.sender_id) === currentUser.id;

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

	return (
		<div
			className={cn("flex w-full min-w-0 flex-col gap-1 py-1", {
				"items-end": isCurrentUser,
				"items-start": !isCurrentUser,
			})}
		>
			<div className="px-2 text-sm font-medium">{isCurrentUser ? "You" : message.sender.name}</div>

			<ContextMenu>
				<ContextMenuTrigger asChild disabled={!isCurrentUser}>
					<div
						className={cn("relative max-w-[75%] min-w-0 rounded-xl rounded-bl-none bg-zinc-700 px-4 py-2 text-white", {
							"rounded-br-none rounded-bl-xl bg-blue-700": isCurrentUser,
						})}
					>
						<div className="flex min-w-0 flex-col space-y-2">
							<div className="wrap-break-word whitespace-pre-wrap">{message.message}</div>
							<time className="text-[0.65rem] whitespace-nowrap opacity-90">{formatMessageDateLong(message.created_at)}</time>
						</div>
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						variant="destructive"
						disabled={actionIsLoading}
						onClick={handleMessageDelete}
						className="transition-colors delay-75 duration-300 ease-in-out hover:cursor-pointer"
					>
						Delete
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</div>
	);
};
