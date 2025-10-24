import React, { useState, useCallback, forwardRef, useRef, useEffect } from "react";
import type { AxiosResponse } from "axios"
import { toast } from "sonner"

import { store } from "@/routes/chat/message";

import { Conversation } from "@/types/routes/chat";

import MessageInput from "./message-input";

interface MessageActionsProps { conversation: Conversation }

const MessageActions = forwardRef<HTMLTextAreaElement, MessageActionsProps>(({ conversation, ...props }, ref) => {
	const [newMessage, setNewMessage] = useState<string>("");
	const [messageSending, setMessageSending] = useState<boolean>(false);

	const onSendClick = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement>) => {
			if (messageSending) return;

			if (newMessage.trim().length <= 0) {
				toast.warning("Please provide a message", {
					duration: 3000,
				});

				return;
			}

			const axios = window.axios;
			const formData = new FormData();
			formData.append("message", newMessage);
			formData.append("receiver_id", conversation.id.toString());

			setMessageSending(true);

			axios
				.post(store.url(), formData, {
					// onUploadProgress: (progressEvent: AxiosProgressEvent) => {
					// 	const progress = Math.round((progressEvent.loaded / (progressEvent.total || 0)) * 100);
					// },
				})
				.then((response: AxiosResponse) => {
					setNewMessage("");
				})
				.catch((error: unknown) => {
					console.error(error);
				})
				.finally(() => {
					setMessageSending(false);
				});
		},
		[messageSending, newMessage],
	);

	return (
		<div className="relative w-full px-3 py-3 text-white">
			<div className="from-sidebar via-sidebar/90 pointer-events-none absolute -top-2.5 right-[15px] bottom-0 left-0 z-1 bg-linear-to-t to-transparent backdrop-blur-[2px]" />

			<div className="relative z-2">
				<MessageInput
					ref={ref}
					disabled={messageSending}
					loading={messageSending}
					value={newMessage}
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)}
					onSend={onSendClick}
					onSubmit={onSendClick}
				/>
			</div>
		</div>
	);
});

export default MessageActions;