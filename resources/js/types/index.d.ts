import type { FC } from "react";

import type { InertiaLinkProps } from "@inertiajs/react";
import type { LucideIcon } from "lucide-react";

export type PartialExcept<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

export interface Auth {
	user: User;
}

export interface BreadcrumbItem {
	title: string;
	href: string;
}

export interface NavGroup {
	title: string;
	items: NavItem[];
}

export interface NavItem {
	title: string;
	href?: NonNullable<InertiaLinkProps["href"]>;
	icon?: LucideIcon | null;
	isActive?: boolean;
	Component?: FC;
}

export interface SharedData {
	name: string;
	auth: Auth;
	sidebarOpen: boolean;
	chatSidebarOpen: boolean;

	[key: string]: unknown;
}

export interface User {
	id: number;
	name: string;
	email: string;
	avatar?: string;
	email_verified_at: string | null;
	two_factor_enabled?: boolean;
	created_at: string;
	updated_at: string;
	[key: string]: unknown; // This allows for additional properties...
}
