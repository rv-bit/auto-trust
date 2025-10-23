import React, { useState, useCallback } from "react";
import type { AxiosProgressEvent, AxiosResponse } from "axios"

import { store } from "@/routes/chat/message";

import { Conversation } from "@/types/routes/chat";

import { Button } from "@/components/ui/button";

import MessageInput from "./message-input";

export default function MessageActions({ conversation }: {conversation: Conversation}) {
	const [newMessage, setNewMessage] = useState<string>("");
	const [inputErrorMessage, setInputErrorMessage] = useState<string>("");
	const [messageSending, setMessageSending] = useState<boolean>(false);

	const onSendClick = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement>) => {
			if (messageSending) return;

			if (newMessage.trim() === "") {
				setInputErrorMessage("Please provide a message");

				setTimeout(() => {
					setInputErrorMessage("");
				}, 3000);
			}

			const axios = window.axios;
			const formData = new FormData();
			formData.append("message", newMessage);
			formData.append("receiver_id", conversation.id.toString());

			setMessageSending(true);

			axios
				.post(store.url(), formData, {
					onUploadProgress: (progressEvent: AxiosProgressEvent) => {
						const progress = Math.round((progressEvent.loaded / (progressEvent.total || 0)) * 100);
					},
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
		<div className="sidebar flex w-full items-start px-3 py-3 dark:text-white">
			<MessageInput disabled={messageSending} value={newMessage} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)} onSend={onSendClick} />
			<Button
				disabled={messageSending}
				onClick={onSendClick}
				className="group border-tequila-200 bg-rajah-200 hover:bg-rajah-200 hover:inset-ring-rajah-200 relative w-full overflow-hidden rounded-none border-2 px-3 py-6 inset-ring-2 inset-ring-black transition-shadow delay-75 duration-300"
			>
				<div className="absolute -left-16 h-[100px] w-10 -rotate-45 bg-linear-to-r from-white/10 via-white/50 to-white/10 blur-sm duration-700 group-hover:left-[150%] group-hover:delay-200 group-hover:duration-700" />
				<span className="font-bold text-black uppercase">Submit</span>
			</Button>
		</div>
	);
}