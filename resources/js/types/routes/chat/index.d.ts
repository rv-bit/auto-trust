export type UserResource = {
	id: number;
	name: string;
	email: string;
	avatar: string;
	is_admin: boolean;
	last_message: string;
	last_message_Date: string;
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
