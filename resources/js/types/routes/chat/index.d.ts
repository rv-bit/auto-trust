export type UserResource = {
	id: number;
	name: string;
	email: string;
	avatar: string;
	is_admin: boolean;
	last_message: string;
	last_message_Date: string;
	created_at: string | Date;
	updated_at: string | Date;
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
	created_at: string | Date;
	updated_at: string | Date;
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
	created_at: string | Date;
	updated_at: string | Date;
};

export type Message = {
	id: number;
	message: string;
	sender_id: number;
	receiver_id: number;
	sender: UserResource;
	attachments: MessageAttachment[] | [];
	created_at: string | Date;
	updated_at: string | Date;
};

export interface MessagesProps {
	data: Message[];
}