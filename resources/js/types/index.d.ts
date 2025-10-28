import type { FC } from "react";

import type { InertiaLinkProps } from "@inertiajs/react";
import type { LucideIcon } from "lucide-react";

import type { State } from "./ui/sidebar";

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
	isActive?: boolean;
	hidden?: boolean;

	href?: NonNullable<InertiaLinkProps["href"]>;
	target?: InertiaLinkProps["target"];
	rel?: InertiaLinkProps["rel"];

	icon?: LucideIcon;
	Component?: FC;
}

interface NavFooter {
	items: NavItem[];
	sidebarState: State;
	isMobile: boolean;
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

export type Users = Record<number, UserResource>;
