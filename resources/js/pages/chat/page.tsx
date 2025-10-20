import { usePage } from "@inertiajs/react";

import type { SharedData } from "@/types";
import type { Conversations } from "@/types/routes/chat";

import ChatLayout from "@/layouts/chat/main-layout";

export default function Chat() {
	const page = usePage<SharedData & Conversations>();

	const conversations = page.props.conversations;
	const selectedConversation = page.props.selectedConversation;

	return (
		<ChatLayout>
			<div className="flex h-full w-full justify-center px-2">
				{!selectedConversation && (
					<div className="flex items-center justify-center">
						<p className="text-center text-xl font-medium">No conversation yet selected</p>
					</div>
				)}
			</div>
		</ChatLayout>
	);
}
