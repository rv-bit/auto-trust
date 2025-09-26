import { usePage } from "@inertiajs/react";
import * as React from "react";

import { IIconPropsExtended } from "@/types/icons";
import { Methods } from "@/types";

import { Actions } from "@/components/sidebar/actions";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

import Header from "./header";
import User  from "./footer-user";

export interface Action {
	name: string;
	href: string;
	method?: Methods;
	roles?: string[];
	icon?: React.FC<any> | ((props: IIconPropsExtended) => React.ReactNode);
}

const data: Action[] = [
	// {
	// 	// icon: ({ className, stops, rotateGradient, pathProps }: IIconPropsExtended) => (
	// 	// 	<HouseGradientIcon
	// 	// 		hasGradient
	// 	// 		sourceSvgWidth={170}
	// 	// 		sourceSvgHeight={180}
	// 	// 		rotateGradient={rotateGradient ?? 130}
	// 	// 		stops={stops}
	// 	// 		pathProps={pathProps}
	// 	// 		className={className}
	// 	// 	/>
	// 	// ),
	// 	name: "Home",
	// 	method: "get",
	// 	href: "profile.dashboard",
	// },
	{ name: "Dashboard", href: "profile.dashboard", method: "get" },
	{ name: "Profile Manage", href: "profile.edit", method: "get" },
	{ name: "Admin Dashboard", href: "admin.dashboard", method: "get", roles: ["admin"] },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const user = usePage().props.auth.user;

	return (
		<Sidebar collapsible="offcanvas" variant="inset" {...props}>
			<SidebarHeader>
				<Header />
			</SidebarHeader>
			<SidebarContent>
				<Actions user={user} items={data} />
			</SidebarContent>
			<SidebarFooter>
				<User user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
