import { Link } from '@inertiajs/react';
import * as React from 'react';

import type { NavFooter } from "@/types";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Icon } from '@/icons/icons';

interface LocalNavFooterItem extends Omit<NavFooter, "Component"> {
	Component?: React.ComponentType<{ trigger?: React.ReactNode }>;
}

export function NavFooter({ items, sidebarState, isMobile, className, ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup> & LocalNavFooterItem) {
	return (
		<SidebarGroup {...props} className="p-0">
			<SidebarGroupContent>
				<SidebarMenu>
					{items?.map((item) => {
						if (item.Component) {
							const triggerButton = (
								<SidebarMenuButton
									sidebarState={sidebarState}
									isMobile={isMobile}
									className="group/menu-button dark:hover:bg-sidebar/50 flex h-10 items-center justify-start gap-2 rounded-md bg-transparent bg-linear-to-b p-2 text-black transition-colors delay-0 duration-200 ease-in-out hover:bg-zinc-100 hover:from-zinc-100 hover:to-zinc-100 hover:shadow-[0_1px_2px_0_rgb(0_0_0/.1),inset_0_1px_0_0_rgb(255_255_255/.05)] dark:text-white dark:hover:from-zinc-700/50 dark:hover:to-zinc-700"
								>
									{item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
									<span>{item.title}</span>
								</SidebarMenuButton>
							);

							const Component = item.Component as React.ComponentType<{ trigger?: React.ReactNode }>;
							return <Component trigger={triggerButton} key={item.title} />;
						}

						return (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									asChild
									sidebarState={sidebarState}
									isMobile={isMobile}
									className="group/menu-button dark:hover:bg-sidebar/50 flex h-10 items-center justify-start gap-2 rounded-md bg-transparent bg-linear-to-b p-2 text-black transition-colors delay-0 duration-200 ease-in-out hover:bg-zinc-100 hover:from-zinc-100 hover:to-zinc-100 hover:shadow-[0_1px_2px_0_rgb(0_0_0/.1),inset_0_1px_0_0_rgb(255_255_255/.05)] dark:text-white dark:hover:from-zinc-700/50 dark:hover:to-zinc-700"
								>
									<Link href={typeof item.href === "string" ? item.href : item.href?.url} target={item.target} rel={item.rel}>
										{item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
