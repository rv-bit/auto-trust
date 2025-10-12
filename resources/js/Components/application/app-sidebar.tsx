import React from "react";
import { Link } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';

import { dashboard } from '@/routes';
import { type NavItem } from '@/types';

import { NavFooter } from '@/components/navigation/nav-footer';
import { NavMain } from '@/components/navigation/nav-main';
import { NavUser } from '@/components/navigation/nav-user';
import {
    useSidebar,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { SidebarTriggerIcon } from "@/icons/icons";

import AppLogo from './app-logo';
import { cn } from "@/lib/utils";

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="offcanvas" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={'/'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

export const QuickActions = React.forwardRef<HTMLDivElement>(() => {
	const { toggleSidebar, open } = useSidebar();

	return (
		<>
			<SidebarMenuButton
				onClick={() => {
					toggleSidebar();
				}}
				data-sidebar="trigger"
				data-slot="sidebar-trigger"
				tooltip={{ content: open ? "Hide Sidebar" : "Show Sidebar", side: "bottom" }}
				isTooltipHidden={false}
				className="group/sidebar-trigger hover:bg-sidebar-accent flex size-fit items-center justify-center overflow-hidden rounded-sm p-2 py-2.5 text-white opacity-100 transition-opacity duration-200 ease-in-out group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:rounded-md group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-3 [&>svg]:size-auto"
			>
				<SidebarTriggerIcon width={15} height={15} stroke="white" className={cn("right-10 rotate-180 rounded-xs bg-white/50 fill-none px-[1px]", {
                    "rotate-0": !open
                })} />
			</SidebarMenuButton>
		</>
	);
});