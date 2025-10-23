export type UserResource = {
	id: number;
	name: string;
	email: string;
	avatar: string;
	is_admin: boolean;
	last_message: string;
	last_message_date: string;
	created_at: string;
	updated_at: string;
};

export type Conversation = {
	id: number;
	name: string;
	avatar: string;
	is_admin: boolean;
	is_user: boolean;
	blocked_at: number;
	last_message: string;
	last_message_date: string;
	created_at: string;
	updated_at: string;
};

export interface Conversations {
	conversations: Conversation[];
	selectedConversation: Conversation;
}

export type MessageAttachment = {
	id: number;
	message_id: number;
	name: string;
	mime: string;
	size: string;
	url: string;
	created_at: string;
	updated_at: string;
};

export type Message = {
	id: number;
	message: string;
	sender_id: string;
	receiver_id: string;
	sender: UserResource;
	attachments: MessageAttachment[] | [];
	created_at: string;
	updated_at: string;
};

export interface MessagesProps {
	data: Message[];
}