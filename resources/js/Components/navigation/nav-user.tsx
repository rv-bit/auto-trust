import { usePage } from '@inertiajs/react';

import type { SharedData } from "@/types";
import type { State } from "@/types/ui/sidebar";

import { UserInfo } from '@/components/pages/settings/user-info';
import { UserMenuContent } from '@/components/pages/settings/user-menu-content';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { ChevronsUpDown } from 'lucide-react';

interface UserProps {
	sidebarState: State;
	isMobile: boolean;
}

export function NavUser({ sidebarState, isMobile }: UserProps) {
	const { auth } = usePage<SharedData>().props;

	return (
		<SidebarMenu className="p-0">
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							data-test="sidebar-menu-button"
							size="lg"
							sidebarState={sidebarState}
							isMobile={isMobile}
							className="group/menu-button dark:hover:bg-sidebar/50 flex h-10 items-center justify-start gap-2 rounded-md bg-transparent bg-linear-to-b p-2 text-black transition-colors delay-0 duration-200 ease-in-out hover:bg-zinc-100 hover:from-zinc-100 hover:to-zinc-100 hover:shadow-[0_1px_2px_0_rgb(0_0_0/.1),inset_0_1px_0_0_rgb(255_255_255/.05)] dark:text-white dark:hover:from-zinc-700/50 dark:hover:to-zinc-700"
						>
							<UserInfo user={auth.user} />
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="dark:bg-sidebar-accent w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="end"
						side={isMobile ? "bottom" : sidebarState === "collapsed" ? "left" : "bottom"}
					>
						<UserMenuContent user={auth.user} />
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}