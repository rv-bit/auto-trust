import { Link, usePage } from '@inertiajs/react';

import type { NavItem } from "@/types";
import type { State } from "@/types/ui/sidebar";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

interface ContentProps {
	items: NavItem[];
	state: State;
	isMobile: boolean;
}

export function NavMain({ items = [], state, isMobile }: ContentProps) {
	const page = usePage();

	return (
		<SidebarGroup className="px-2 py-0">
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton
							asChild
							sidebarState={state}
							isMobile={isMobile}
							isActive={page.url.startsWith(typeof item.href === "string" ? item.href : item.href.url)}
							tooltip={{ children: item.title }}
						>
							<Link href={item.href} prefetch>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
