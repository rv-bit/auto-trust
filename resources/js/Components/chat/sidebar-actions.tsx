// import { Link } from "@inertiajs/react";
import React from "react";

import { dashboard } from "@/routes";
import { type NavItem } from "@/types";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { QuickActions } from "@/components/ui/sidebar-trigger";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "./ui/sidebar";

import { LayoutGrid } from "lucide-react";
import { NavFooter } from "../navigation/nav-footer";
import { NavMain } from "../navigation/nav-main";
import { NavUser } from "../navigation/nav-user";

const mainNavItems: NavItem[] = [
	{
		title: "Dashboard",
		href: dashboard(),
		icon: LayoutGrid,
	},
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
	const { state, isMobile } = useSidebar();

	return (
		<Sidebar collapsible="offcanvas" variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton sidebarState={state} isMobile={isMobile} size="lg" asChild>
							{/* <Link href={"/"} prefetch>
								<AppLogo />
							</Link> */}
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavMain state={state} isMobile={isMobile} items={mainNavItems} />
			</SidebarContent>

			<SidebarFooter>
				<NavFooter state={state} isMobile={isMobile} items={footerNavItems} className="mt-auto" />
				<NavUser state={state} isMobile={isMobile} />
			</SidebarFooter>
		</Sidebar>
	);
}

export const TriggerSidebar = React.forwardRef<HTMLDivElement>(() => {
	const { toggleSidebar, open, state, isMobile } = useSidebar();
	return <QuickActions open={open} onClick={toggleSidebar} state={state} isMobile={isMobile} />;
});
