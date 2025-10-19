import { Link } from "@inertiajs/react";
import React from "react";

import { dashboard } from "@/routes";
import { type NavItem } from "@/types";

import { NavFooter } from "@/components/navigation/nav-footer";
import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { QuickActions } from "@/components/ui/sidebar-trigger";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "./ui/sidebar";

import { LayoutGrid } from "lucide-react";
import AppLogo from "@/components/application/app-logo";

const mainNavItems: NavItem[] = [
	{
		title: "Dashboard",
		href: dashboard(),
		icon: LayoutGrid,
	},
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
	const {  state, isMobile } = useSidebar();

	return (
		<Sidebar collapsible="offcanvas" variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild sidebarState={state} isMobile={isMobile} size="lg" className="active:bg-transparent">
							<div className="flex h-auto w-full justify-between">
								<Link prefetch href={"/"} className="active:bg-sidebar-accent flex w-full items-center justify-start gap-2 h-full">
									<AppLogo />
								</Link>
								{isMobile && <TriggerSidebar />}
							</div>
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
