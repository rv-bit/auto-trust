import { usePage } from '@inertiajs/react';

import type { SharedData } from "@/types";
import type { State } from "@/types/ui/sidebar";

import { UserInfo } from '@/components/settings/user-info';
import { UserMenuContent } from '@/components/settings/user-menu-content';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';

import { ChevronsUpDown } from 'lucide-react';

interface UserProps {
	state: State;
	isMobile: boolean;
}

export function NavUser({ state, isMobile }: UserProps) {
	const { auth } = usePage<SharedData>().props;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							data-test="sidebar-menu-button"
							size="lg"
							sidebarState={state}
							isMobile={isMobile}
							className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
						>
							<UserInfo user={auth.user} />
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" align="end" side={isMobile ? "bottom" : state === "collapsed" ? "left" : "bottom"}>
						<UserMenuContent user={auth.user} />
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
