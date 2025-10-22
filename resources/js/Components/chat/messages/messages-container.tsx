import { usePage } from "@inertiajs/react";
import { useMemo, useEffect, useState, useRef } from "react";

import type { SharedData } from "@/types";
import type { Conversations } from "@/types/routes/chat";

import MessageActions from "./message-actions";
import { cn } from "@/lib/utils";

export default function MessageContainer({ messages }) {
	const page = usePage<SharedData & Conversations>();

    const currentUser = page.props.auth.user;
	const selectedConversation = page.props.selectedConversation;

    const messageCtrRef = useRef<HTMLDivElement | null>(null);
    const loadChatsIntersectRef = useRef<HTMLDivElement | null>(null);

    const [localMessages, setLocalMessages] = useState([]);
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            messageCtrRef.current.scrollTop = messageCtrRef.current.scrollHeight;
        }, 100);

        return () => {
            clearTimeout(timeout);
        }
    }, [selectedConversation])

    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : [])
    }, [messages])

    if (!selectedConversation) {
        return (
            <div className="flex items-center justify-center">
                <p className="text-center text-xl font-medium">No conversation yet selected</p>
            </div>
        )
    }

    if (localMessages.length === 0) {
        return (
            <div className="flex items-center justify-center">
                <p className="text-center text-xl font-medium">No messages just yet</p>
            </div>
        )
    }

    return (
        <>
            <MessageHeader />
            <div ref={messageCtrRef} className="flex-1 overflow-y-auto p-5">
                <div className="flex-1 flex flex-col">
                    <div ref={loadChatsIntersectRef}></div>
                    {localMessages.map(message) => {
                        return (
                            <div key={message.id} className={cn("chat chat-start", {
                                "chat-end": message.sender_id === currentUser.id
                            })}>
                                <div className="chat-header">
                                    {message.sender_id === currentUser.id ? "You" : message.sender.name}
                                    <time className="text-xs opacity-50">{formatMessageDateLong(message.created_at)}</time>
                                </div>
                                <div className={cn("chat-bubble relative chat-bubble-neutral", {
                                    "chat-bubble-info": message.sender_id === currentUser.id
                                })}>
                                    <div className="chat-message">
                                        <div className="chat-message-content">
                                            {message.message}
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>
                        )
                    }}
                </div>
            </div>
            <MessageActions />
        </>
    )
}