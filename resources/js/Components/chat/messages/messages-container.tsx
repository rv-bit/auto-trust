import { usePage } from "@inertiajs/react";
import { useEffect, useState, useRef } from "react";

import type { SharedData } from "@/types";
import type { Conversations, Message, MessagesProps } from "@/types/routes/chat";

import { cn } from "@/lib/utils";
import { formatMessageDateLong } from "@/lib/helpers";

import MessageActions from "./message-actions";

export default function MessageContainer() {
	const page = usePage<SharedData & Conversations>();

	const currentUser = page.props.auth.user;
	const selectedConversation = page.props.selectedConversation;
    const messages = page.props.messages as MessagesProps;

	const messageCtrRef = useRef<HTMLDivElement | null>(null);
	const loadChatsIntersectRef = useRef<HTMLDivElement | null>(null);

	const [localMessages, setLocalMessages] = useState<Message[]>([]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!messageCtrRef.current) return;
			messageCtrRef.current.scrollTop = messageCtrRef.current.scrollHeight;
		}, 100);

		return () => {
			clearTimeout(timeout);
		};
	}, [selectedConversation]);

	useEffect(() => {
		setLocalMessages(messages ? messages.data.reverse() : []);

        return () => {}
	}, [messages]);

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
		<div className="flex flex-col w-full h-full">
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
									className={cn("chat-bubble relative rounded-xl rounded-bl-none text-white bg-zinc-700", {
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