import { EventBusProvider } from "@/providers/EventBusProvider";
import { OnlineUsersProvider } from "@/providers/OnlineUsersProvider";

import MessageContainer from "@/components/pages/chat/messages/message-container";

import Layout from "@/layouts/chat/layout";

function Chat() {
	return <MessageContainer />;
}

Chat.layout = (page: React.ReactNode) => (
	<OnlineUsersProvider>
		<EventBusProvider>
			<Layout>{page}</Layout>
		</EventBusProvider>
	</OnlineUsersProvider>
);

export default Chat;
