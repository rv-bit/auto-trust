import { EventBusProvider } from "@/providers/EventBus";

import MessageContainer from "@/components/chat/messages/message-container";

import ChatLayout from "@/layouts/chat/main-layout";

export default function Chat() {
	return (
		<EventBusProvider>
			<ChatLayout>
				<MessageContainer />
			</ChatLayout>
		</EventBusProvider>
	);
}
