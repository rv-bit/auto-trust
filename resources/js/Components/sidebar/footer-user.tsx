import type { Methods, User } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

import { Link } from "@inertiajs/react";
import { ChevronsUpDown, Sparkles } from "lucide-react";

export interface FooterUserProps {
	user: User;
}

interface Action {
	name: string;
	href?: string;
	method?: Methods;
	icon?: React.FC<any>;

	onHandleClick?: () => void;
}

const defaultActions: Action[] = [{ name: "Log Out", method: "post", href: "logout", icon: Sparkles }];

export default function User({ ...props }: FooterUserProps) {
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={props.user.avatar} alt={props.user.name} />
								<AvatarFallback className="rounded-lg">{props.user.name.charAt(2)}</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{props.user.name}</span>
								<span className="truncate text-xs">{props.user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={props.user.avatar} alt={props.user.name} />
									<AvatarFallback className="rounded-lg">{props.user.name.charAt(2)}</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{props.user.name}</span>
									<span className="truncate text-xs">{props.user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />

						{defaultActions.map((action, index) => (
							<DropdownMenuGroup key={index} className="h-auto w-full">
								<DropdownMenuItem onClick={action.onHandleClick} asChild={!!action.href} className="h-auto w-full hover:cursor-pointer">
									{action.href ? (
										<Link href={action.href} method={action.method} className="flex items-center">
											{action.href && action.icon && <action.icon className="mr-2 size-4" />}
											{action.name}
										</Link>
									) : (
										<>
											{action.icon && <action.icon className="mr-2 size-4" />}
											{action.name}
										</>
									)}
								</DropdownMenuItem>

								{index === defaultActions.length - 1 ? null : <DropdownMenuSeparator />}
							</DropdownMenuGroup>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
