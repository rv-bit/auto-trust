import { Config } from "ziggy-js";

export interface User {
	id: number;
	name: string;
	email: string;
	avatar?: string;
	email_verified_at?: string;
	roles: string[];
	permissions: string[];
}

export type Methods = "get" | "post" | "put" | "patch" | "delete";

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
	flash: {};
	ziggy: Config & { location: string };
	auth: {
		user: User;
	};
	cookie: {
		theme_state: string;
		sidebar_state: boolean;
	};
};
