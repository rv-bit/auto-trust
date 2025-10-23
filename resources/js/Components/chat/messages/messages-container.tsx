import { usePage } from "@inertiajs/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { axios } from "axios";

import type { SharedData } from "@/types";
import type { Conversations, Message, MessagesProps } from "@/types/routes/chat";

import message from "@/routes/chat/message";

import { useEventBus } from "@/providers/EventBus";

import { formatMessageDateLong } from "@/lib/helpers";
import { cn } from "@/lib/utils";

import MessageActions from "./message-actions";

export default function MessageContainer() {
	const page = usePage<SharedData & Conversations>();
	const { on } = useEventBus();

	const currentUser = page.props.auth.user;
	const selectedConversation = page.props.selectedConversation;
	const messages = page.props.messages as MessagesProps;

	const messageCtrRef = useRef<HTMLDivElement | null>(null);
	const loadChatsIntersectRef = useRef<HTMLDivElement | null>(null);

	const [localMessages, setLocalMessages] = useState<Message[]>([]);
	const [noMoreMessages, setNoMoreMessages] = useState<boolean>(false);
	const [scrollFromBottom, setScrollFromBottom] = useState<number | null>(null);

	const messageCreated = (message: Message) => {
		if (selectedConversation && selectedConversation.is_user && (selectedConversation === message.sender_id || selectedConversation.id === message.receiver_id)) {
			setLocalMessages((prevMessages) => [...prevMessages, message])
		}
	}

	const loadMoreMessages = useCallback(() => {
		if (noMoreMessages) return;

		const firstMessage = localMessages[0];
		axios.get(message.loadOlder({id: firstMessage.id}))
			.then((response: Response) => {
				if (response.data.length === 0) {
					setNoMoreMessages(true);
					return;
				}

				const scrollHeight = messageCtrRef.current.scrollHeight;
				const scrollTop = messageCtrRef.current.scrollTop;
				const clientHeight = messageCtrRef.current.clientHeight;
				const tempScrollFromBottom = scrollHeight - scrollTop - clientHeight;

				setScrollFromBottom(tempScrollFromBottom)
				setLocalMessages((prevMessages) => {
					return [...response.data.reverse(), ...prevMessages];
				})
			})
	}, [localMessages, noMoreMessages])

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!messageCtrRef.current) return;
			messageCtrRef.current.scrollTop = messageCtrRef.current.scrollHeight;
		}, 100);

		const offCreated = on("message.created", messageCreated);

		setScrollFromBottom(0);
		setNoMoreMessages(false);

		return () => {
			offCreated();
			clearTimeout(timeout);
		};
	}, [selectedConversation]);

	useEffect(() => {
		setLocalMessages(messages ? messages.data.reverse() : []);

		return () => {};
	}, [messages]);
	
	useEffect(() => {
		if (messageCtrRef.current && scrollFromBottom !== null) {
			messageCtrRef.current.scrollTop = messageCtrRef.current.scrollHeight - messageCtrRef.current.offsetHeight - scrollFromBottom;
		}

		if (noMoreMessages) return;

		const observer = new IntersectionObserver(
			(entries) => entries.forEach((entry) => entry.isIntersecting && loadMoreMessages()),
			{
				rootMargin: "0px 0px 250px 0px"
			}
		);

		if (loadChatsIntersectRef.current) {
			setTimeout(() => {
				observer.observe(loadChatsIntersectRef.current)
			}, 100)
		}

		return () => {
			observer.disconnect()
		};
	}, [localMessages]);

	if (!selectedConversation) {
		return (
			<div className="flex items-center justify-center">
				<p className="text-center text-xl font-medium">No conversation yet selected</p>
			</div>
		);
	}

	if (localMessages.length === 0) {
		return (
			<div className="flex items-center justify-center">
				<p className="text-center text-xl font-medium">No messages just yet</p>
			</div>
		);
	}

	return (
		<div className="flex h-full w-full flex-col">
			<div ref={messageCtrRef} className="flex-1 overflow-y-auto p-5">
				<div className="flex flex-1 flex-col">
					<div ref={loadChatsIntersectRef}></div>
					{localMessages.map((message) => {
						console.log(message.sender_id === currentUser.id, currentUser.id);
						return (
							<div
								key={message.id}
								className={cn("chat", {
									"chat-end": message.sender_id === currentUser.id,
									"chat-start": message.sender_id !== currentUser.id,
								})}
							>
								<div className="chat-header">
									{message.sender_id === currentUser.id ? "You" : message.sender.name}
									<time className="text-xs opacity-50">{formatMessageDateLong(message.created_at)}</time>
								</div>
								<div
									className={cn("chat-bubble relative rounded-xl rounded-bl-none bg-zinc-700 text-white", {
										"rounded-br-none bg-blue-700": message.sender_id === currentUser.id,
									})}
								>
									<div className="chat-message">
										<div className="chat-message-content">{message.message}</div>
									</div>
								</div>
								<div className="chat-footer opacity-50">Seen</div>
							</div>
						);
					})}
				</div>
			</div>
			<MessageActions />
		</div>
	);
}
