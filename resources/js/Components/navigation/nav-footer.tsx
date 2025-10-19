import { type ComponentPropsWithoutRef } from 'react';

import type { NavItem } from "@/types";
import type { State } from "@/types/ui/sidebar";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Icon } from '@/icons/icons';

interface FooterProps {
	items: NavItem[];
	state: State;
	isMobile: boolean;
}

export function NavFooter({
    items,
	state,
	isMobile,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & FooterProps) {

    return (
		<SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ""}`}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild sidebarState={state} isMobile={isMobile} className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100">
								<a href={typeof item.href === "string" ? item.href : item.href.url} target="_blank" rel="noopener noreferrer">
									{item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
