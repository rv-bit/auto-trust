import { Config } from "ziggy-js";

export interface User {
	id: number;
	name: string;
	email: string;
	email_verified_at?: string;
	roles: string[];
	permissions: string[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
	flash: {
		successPayment: boolean;
	};
	auth: {
		user: User;
	};
	ziggy: Config & { location: string };
	cookie: {
		theme_state: string;
		sidebar_state: boolean;
	};
};
