import React from "@inertiajs/react";
import { useState, useCallback } from "react";
import { axios } from "axios"

import { Conversation } from "@/types/routes/chat";

import { Button } from "@/components/ui/button";

import MessageInput from "./message-input";
import message from "@/routes/chat/message";

export default function MessageActions({ conversation }: {conversation: Conversation}) {
	const [newMessage, setNewMessage] = useState<string>("");
	const [inputErrorMessage, setInputErrorMessage] = useState<string>("");
	const [messageSending, setMessageSending] = useState<boolean>(false);

	const onSendClick = useCallback((e: React.KeyboardEventHandler<HTMLTextAreaElement>) => {
		if (messageSending) return;

		if (newMessage.trim() === "") {
			setInputErrorMessage("Please provide a message")

			setTimeout(() => {
				setInputErrorMessage("")
			}, 3000)
		}

		const formData = new FormData();
		formData.append("message", newMessage)
		formData.append("receiver_id", conversation.id.toString())

		setMessageSending(true);

		axios.post(message.store(), formData, {
			onUploadProgress: (progressEvent: ProgressEvent) => {
				const progress = Math.round(
					progressEvent.loaded / progressEvent.total * 100
				)

				console.log(progress)
			},
			// validateStatus: function (status: number) {
			// 	// can validate things here
			// }
		}).then((response: Response) => {
			setNewMessage("");
		}).catch((error: unknown) => {
			console.error(error)
		}).finally(() => {
			setMessageSending(false);
		});
	}, [messageSending, newMessage])

	return (
		<div className="flex flex-wrap items-start border-t border-slate-700 py-3 dark:border-slate-300">
			<div className="order-1 flex-none p-2 md:order-2 md:flex-1">
				<Button 
					disabled={messageSending}
					className="group border-tequila-200 bg-rajah-200 hover:bg-rajah-200 hover:inset-ring-rajah-200 relative w-full overflow-hidden rounded-none border-2 px-3 py-6 inset-ring-2 inset-ring-black transition-shadow delay-75 duration-300"
				>
					<div className="absolute -left-16 h-[100px] w-10 -rotate-45 bg-linear-to-r from-white/10 via-white/50 to-white/10 blur-sm duration-700 group-hover:left-[150%] group-hover:delay-200 group-hover:duration-700" />
					<span className="font-bold text-black uppercase">Submit</span>
				</Button>

				<MessageInput
					disabled={messageSending}
					value={newMessage}
					onChange={(e: React.ChangeEventHandler<HTMLTextAreaElement> | undefined) => setNewMessage(e.target.value)}
					onSend={onSendClick}
				/>
			</div>
		</div>
	);
}
