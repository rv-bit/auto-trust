import { Link } from '@inertiajs/react';
import type { ComponentPropsWithoutRef } from 'react';

import type { NavFooter } from "@/types";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Icon } from '@/icons/icons';

export function NavFooter({ items, sidebarState, isMobile, className, ...props }: ComponentPropsWithoutRef<typeof SidebarGroup> & NavFooter) {
	return (
		<SidebarGroup {...props} className="p-0">
			<SidebarGroupContent>
				<SidebarMenu>
					{items?.map((item) =>
						item.Component ? (
							<item.Component />
						) : (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									asChild
									sidebarState={sidebarState}
									isMobile={isMobile}
									className="group/menu-button dark:hover:bg-sidebar/50 flex h-10 items-center justify-start gap-2 rounded-md bg-transparent bg-linear-to-b p-2 text-black transition-colors delay-0 duration-200 ease-in-out hover:bg-zinc-100 hover:from-zinc-100 hover:to-zinc-100 hover:shadow-[0_1px_2px_0_rgb(0_0_0/.1),inset_0_1px_0_0_rgb(255_255_255/.05)] dark:text-white dark:hover:from-zinc-700/50 dark:hover:to-zinc-700"
								>
									<a href={typeof item.href === "string" ? item.href : item.href?.url} target={item.target} rel={item.rel}>
										{item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						),
					)}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
