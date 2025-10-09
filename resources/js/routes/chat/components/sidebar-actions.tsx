import { usePage } from "@inertiajs/react";

import { cn } from "@/lib/utils";

import { User } from "@/types";

import NavLink from "@/components/navigation-link";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { ChatData } from "../types";

export default function SidebarActions({ ...props }: { user: User; data: ChatData[] }) {
	const location = usePage().url;
	const pageProps = usePage().props;
	const pathname = location.endsWith("/") && location.lastIndexOf("/") !== 0 ? location.substring(0, location.lastIndexOf("/")) : location;

	return (
		<SidebarGroup className="px-0">
			<SidebarMenu>
				{props.data.map((item) => {
					const isActive = item.href === pathname;
					if (item.roles && !item.roles.some((role) => props.user.roles.includes(role))) {
						return null;
					}

					return (
						<SidebarMenuItem key={item.name}>
							<SidebarMenuButton
								asChild
								tooltip={{
									size: "xs",
									sideOffset: 10,
									content: item.name,
								}}
								className="group/menu-button data-[active=true]:from-sidebar-primary data-[active=true]:to-sidebar-primary/70 flex items-center gap-2 rounded-md font-medium data-[active=true]:bg-gradient-to-b data-[active=true]:shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)] data-[active=true]:hover:bg-transparent"
								isActive={isActive ? true : false}
							>
								<NavLink active={route().current(item.href)} href={route(item.href)} className="[&>svg]:size-4.5">
									{item.icon && (
										<item.icon
											className={cn("", { "fill-white": !isActive })}
											stops={[
												{ offset: 20, color: `${isActive ? "var(--moss-tint)" : "var(--background)"}` },
												{
													offset: 50,
													opacity: isActive ? 20 : 100,
													color: `${isActive ? "var(--secondary-rover-green)" : "var(--background)"}`,
												},
												{
													offset: 90,
													color: `${isActive ? "var(--primary-deep-forest)" : "var(--background)"}`,
												},
												{ offset: 0, color: `${isActive ? "var(--moss-tint)" : "var(--background)"}` },
											]}
											rotateGradient={110}
											pathProps={{
												fill: isActive ? "white" : "black",
												fillOpacity: isActive ? 0.8 : 1.0,
											}}
										/>
									)}
									<span className="group-data-[collapsible=icon]:hidden">{item.name}</span>
								</NavLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
