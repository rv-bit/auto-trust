import { usePage } from "@inertiajs/react";
import React from "react";

import type { User } from "@/types";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { default as UserSidebar } from "@/components/sidebar/footer-user";
import Header from "@/components/sidebar/header";

import SidebarActions from "./components/sidebar-actions";

import type { Data } from "./types";

function SidebarMenu({ ...props }: { user: User; chats: Data[] }) {
	return (
		<Sidebar collapsible="offcanvas" variant="inset">
			<SidebarHeader>
				<Header />
			</SidebarHeader>
			<SidebarContent>{/* <SidebarActions user={props.user} data={props.chats} /> */}</SidebarContent>
			<SidebarFooter>
				<UserSidebar user={props.user} />
			</SidebarFooter>
		</Sidebar>
	);
}

export default function Page({ ...props }) {
	const [chats, setChats] = React.useState<Data[]>([]);
	const user = usePage().props.auth.user;

	return (
		<SidebarProvider>
			<SidebarMenu user={user} chats={chats} />
			<SidebarInset>
				<h1 data-testid="title">Test</h1>
			</SidebarInset>
		</SidebarProvider>
	);
}
