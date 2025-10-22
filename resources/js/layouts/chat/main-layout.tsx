import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

import type { SharedData } from "@/types";
import type { Conversation, Conversations } from "@/types/routes/chat";

import { useEventBus } from "@/providers/EventBus";

import { AppSidebar } from "@/components/chat/sidebar-actions";
import { SidebarHeader } from "@/components/chat/sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/chat/ui/sidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
	const page = usePage<SharedData & Conversations>();
	const { emit } = useEventBus();

	const isOpen = page.props.chatSidebarOpen ?? true;
	
	const user = page.props.auth.user;
	const conversations = page.props.conversations;

	useEffect(() => {
		const Echo = window.Echo;

		conversations.forEach((conversation: Conversation) => {
			const channel = `message.user.${
				[
					parseInt(user.id),
					conversation.id
				]
				.sort((a, b) => a - b)
				.join("-")}`;

			Echo.private(channel)
				.error((error: unknown) => {
					if (error instanceof Error) {
						console.error("Echo error:", error.message);
					} else {
						console.error("Echo error:", error);
					}
				})
				.listen("SocketMessage", (e) => {
					const message = e.message;

					emit("message.created", message)
					if (message.sender_id === user.id) {
						return;
					}
					
					// If the conversation with the sender isn't selected then show a notification
					emit("newMessageNotification", {
						user: message.sender,
						message: message.message || `Shared ${message.attachments.length === 1 ? "an attachment" : message.attachments.length + " attachments"}`
					})
				})
		})

		return () => {
			conversations.forEach((conversation: Conversation) => {
				const channel = `message.user.${
					[
						parseInt(user.id),
						conversation.id
					]
					.sort((a, b) => a - b)
					.join("-")}`;

				Echo.leave(channel);
			})
		}
	}, [conversations])

	return (
		<SidebarProvider defaultOpen={isOpen}>
			<AppSidebar />
			<SidebarInset className="overflow-x-hidden">
				<SidebarHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
