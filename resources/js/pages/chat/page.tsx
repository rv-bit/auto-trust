import { usePage } from "@inertiajs/react";

import type { SharedData } from "@/types";
import type { Conversations } from "@/types/routes/chat";

import { EventBusProvider } from "@/providers/EventBus";

import MessageContainer from "@/components/chat/messages/messages-container";

import ChatLayout from "@/layouts/chat/main-layout";

export default function Chat() {
	return (
		<EventBusProvider>
			<ChatLayout>
				<div className="flex h-full w-full justify-center px-2">
					<MessageContainer />
				</div>
			</ChatLayout>
		</EventBusProvider>
	);
}