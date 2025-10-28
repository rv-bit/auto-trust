import React from "react";
import { Link } from "@inertiajs/react";

import { dashboard } from "@/routes";
import { type NavItem } from "@/types";

import { NavFooter } from "@/components/navigation/nav-footer";
import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";

import { useSidebar, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { QuickActions } from "@/components/ui/sidebar-trigger";

import { LayoutGrid, MessageCircleMore } from "lucide-react";
import AppLogo from "./app-logo";

const mainNavItems: NavItem[] = [
	{
		title: "Dashboard",
		href: dashboard(),
		icon: LayoutGrid,
	},
];

const footerNavItems: NavItem[] = [
	{
		title: "Notifications",
		href: "/notifications",
	},
	{
		title: "Chat Support",
		href: "/chat",
		icon: MessageCircleMore,
		// target: "_blank",
		// rel: "noopener noreferrer",
	},
];

export function AppSidebar() {
    const { state, isMobile } = useSidebar();

	return (
		<Sidebar collapsible="offcanvas" variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton sidebarState={state} isMobile={isMobile} size="lg" asChild>
							<Link href={"/"} prefetch>
								<AppLogo />
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavMain sidebarState={state} isMobile={isMobile} items={mainNavItems} />
			</SidebarContent>

			<SidebarFooter>
				<NavFooter sidebarState={state} isMobile={isMobile} items={footerNavItems} className="mt-auto" />
				<NavUser sidebarState={state} isMobile={isMobile} />
			</SidebarFooter>
		</Sidebar>
	);
}

export const TriggerSidebar = React.forwardRef<HTMLDivElement>(() => {
	const { toggleSidebar, open, state, isMobile } = useSidebar();
	return <QuickActions open={open} onClick={toggleSidebar} state={state} isMobile={isMobile} />;
});