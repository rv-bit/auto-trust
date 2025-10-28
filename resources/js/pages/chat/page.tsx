import { EventBusProvider } from "@/providers/EventBusProvider";
import { OnlineUsersProvider } from "@/providers/OnlineUsersProvider";

import MessageContainer from "@/pages/chat/components/messages/message-container";

import ChatLayout from "@/layouts/chat/main-layout";

function Chat() {
	return <MessageContainer />;
}

Chat.layout = (page: React.ReactNode) => (
	<OnlineUsersProvider>
		<EventBusProvider>
			<ChatLayout>{page}</ChatLayout>
		</EventBusProvider>
	</OnlineUsersProvider>
);

export default Chat;
