import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import axios, {type AxiosResponse } from "axios";

import { StoreMessageRequest } from "@/schemas/schema";
import type { Conversation } from "@/types/routes/chat";

import { store } from "@/routes/chat/message";

import { getMaxLength } from "@/lib/utils";

import MessageInput from "./message-input";

interface MessageActionsProps {
	containerRef?: React.RefObject<HTMLDivElement | null>;
	conversation: Conversation;
}

const MessageActions = forwardRef<HTMLTextAreaElement, MessageActionsProps>(({ conversation, containerRef, ...props }, ref) => {
	const [newMessage, setNewMessage] = useState<string>("");
	const [messageSending, setMessageSending] = useState<boolean>(false);

	const maxLength = useMemo(() => getMaxLength(StoreMessageRequest, "message") ?? 550, [conversation]);

	const onSendClick = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement>) => {
			if (messageSending) return;

			if (newMessage.trim().length <= 0) {
				toast.warning("Please provide a message", {
					duration: 3000,
				});

				return;
			}

			const data = {
				message: newMessage,
				receiver_id: conversation.id.toString(),
				attachments: [],
			};

			const validation = StoreMessageRequest.safeParse(data);

			if (!validation.success) {
				const issues = validation.error.issues;

				const errorMessages = issues.map((err) => `${err.path.join(".")}: ${err.message}`).join("\n");
				toast.error(errorMessages, { duration: 5000 });
				return;
			}

			const validatedData = validation.data;

			const formData = new FormData();

			formData.append("message", validatedData.message || "");
			formData.append("receiver_id", validatedData.receiver_id);

			setMessageSending(true);

			axios
				.post(store.url(), formData, {})
				.then((response: AxiosResponse) => {
					setNewMessage("");
				})
				.catch((error: unknown) => {
					console.error(error);
				})
				.finally(() => {
					setMessageSending(false);

					if (containerRef?.current) {
						containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
					}
				});
		},
		[messageSending, newMessage],
	);

	return (
		<div className="relative w-full p-2 text-white">
			<div className="from-sidebar dark:from-sidebar-accent dark:via-sidebar-accent/90 via-sidebar/90 pointer-events-none rounded-b-3xl absolute -top-1.5 right-[15px] bottom-0 left-0 z-1 bg-linear-to-t to-transparent backdrop-blur-[2px]" />

			<div className="relative z-2 flex flex-col">
				<MessageInput
					ref={ref}
					disabled={messageSending}
					loading={messageSending}
					maxLength={maxLength}
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
