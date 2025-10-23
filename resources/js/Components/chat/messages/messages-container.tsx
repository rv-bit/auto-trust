import { usePage } from "@inertiajs/react";
import type { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import type { SharedData, User } from "@/types";
import type { Conversations, Message, MessagesProps } from "@/types/routes/chat";

import { loadOlder } from "@/routes/chat/message";

import { useEventBus } from "@/providers/EventBus";

import { formatMessageDateLong } from "@/lib/helpers";
import { cn } from "@/lib/utils";

import MessageActions from "./message-actions";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

export default function MessageContainer() {
	const page = usePage<SharedData & Conversations>();
	const { on } = useEventBus();

	const currentUser = page.props.auth.user;
	const selectedConversation = page.props.selectedConversation;
	const messages = page.props.messages as MessagesProps;

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

	const loadMoreMessages = useCallback(() => {
		if (noMoreMessages || isLoadingMore || localMessages.length === 0) return;

		const axios = window.axios;
		const firstMessage = localMessages[0];

		setIsLoadingMore(true);

		axios
			.get(loadOlder.url({ id: firstMessage.id }))
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

	// Initial scroll to bottom when conversation changes
	useEffect(() => {
		setInitialScrollDone(false);
		const timeout = setTimeout(() => {
			if (!messageCtrRef.current) return;
			messageCtrRef.current.scrollTop = messageCtrRef.current.scrollHeight;
			setInitialScrollDone(true);
		}, 150);

		const offCreated = on("message.created", messageCreated);

		setScrollFromBottom(null);
		setNoMoreMessages(false);
		setIsLoadingMore(false);

		return () => {
			offCreated();
			clearTimeout(timeout);
		};
	}, [selectedConversation]);

	// Set messages when they come from props
	useEffect(() => {
		setLocalMessages(messages ? messages.data.reverse() : []);
		setInitialScrollDone(false);
	}, [messages]);

	// Restore scroll position after loading more messages
	useEffect(() => {
		if (messageCtrRef.current && scrollFromBottom !== null) {
			const newScrollTop = messageCtrRef.current.scrollHeight - messageCtrRef.current.clientHeight - scrollFromBottom;
			messageCtrRef.current.scrollTop = newScrollTop;
			setScrollFromBottom(null);
		}
	}, [localMessages, scrollFromBottom]);

	// Scroll to bottom when new message is added (not from loading older)
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
			<div className="flex min-h-0 w-full flex-1 flex-col">
				<div className="flex flex-1 items-center justify-center overflow-hidden">
					<p className="text-center text-xl font-medium">No messages just yet</p>
				</div>

				<MessageActions conversation={selectedConversation} />
			</div>
		);
	}

	return (
		<div className="flex min-h-0 w-full flex-1 flex-col">
			<div ref={messageCtrRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
				<div className="flex flex-col">
					<div ref={loadChatsIntersectRef} className="h-1 shrink-0"></div>
					{isLoadingMore && <div className="shrink-0 py-2 text-center text-sm text-gray-500">Loading more messages...</div>}

					{localMessages.map((message, index) => {
						return (
							<MessageItem 
								key={`${message.id}-${index}`}
								currentUser={currentUser}
								message={message}
							/>
						);
					})}
				</div>
			</div>

			<div className="shrink-0">
				<MessageActions conversation={selectedConversation} />
			</div>
		</div>
	);
}

const MessageItem = ({ currentUser, message }: { currentUser: User; message: Message }) => {
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div
					className={cn("chat", {
						"chat-end": parseInt(message.sender_id) === currentUser.id,
						"chat-start": parseInt(message.sender_id) !== currentUser.id,
					})}
				>
					<div className="chat-header items-center text-base">{parseInt(message.sender_id) === currentUser.id ? "You" : message.sender.name}</div>
					<div
						className={cn("chat-bubble relative rounded-xl rounded-bl-none bg-zinc-700 text-white", {
							"rounded-br-none rounded-bl-xl bg-blue-700": parseInt(message.sender_id) === currentUser.id,
						})}
					>
						<div className="chat-message flex flex-col space-y-2">
							<div className="chat-message-content">{message.message}</div>
							<time className="text-[0.65rem] opacity-90">{formatMessageDateLong(message.created_at)}</time>
						</div>
					</div>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>Delete</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};