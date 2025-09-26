import React from "react";

import { APP_NAME } from "@/resources/app-config";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { PencilSquare, SidebarTriggerIcon } from "@/components/icons/icons";
import { ChevronDown } from "lucide-react";

import NavLink from "../navigation-link";

export const QuickActions = React.forwardRef<HTMLDivElement>((props, ref) => {
	const { toggleSidebar } = useSidebar();

	return (
		<>
			<SidebarMenuButton
				onClick={(e) => {
					toggleSidebar();
				}}
				data-sidebar="trigger"
				data-slot="sidebar-trigger"
				tooltip={{ size: "sm", content: "Hide sidebar", side: "bottom" }}
				isTooltipHidden={false}
				className="group/sidebar-trigger hover:bg-sidebar-accent flex size-fit items-center justify-center overflow-hidden rounded-sm p-2 py-2.5 text-white opacity-100 transition-opacity duration-200 ease-in-out group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:rounded-md group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-3 [&>svg]:size-auto"
			>
				<SidebarTriggerIcon width={15} height={15} stroke="white" className="right-10 rotate-180 rounded-xs bg-black/50 fill-none px-[1px]" />
			</SidebarMenuButton>

			<div className="hover:bg-sidebar-accent/65 flex h-9 w-fit items-center justify-center overflow-hidden rounded-xl">
				<SidebarMenuButton
					data-sidebar="create-chat"
					data-slot="create-chat"
					aria-label="Start New Chat"
					tooltip={{ size: "sm", content: "Start New Chat", side: "bottom" }}
					isTooltipHidden={false}
					className="hover:bg-sidebar-accent flex size-full w-8 items-center justify-center py-2 text-white opacity-100 transition-opacity duration-200 ease-in-out [&>svg]:size-auto"
				>
					<PencilSquare width={25} height={25} className="fill-white stroke-black/50" />
				</SidebarMenuButton>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							data-sidebar="chat-dropdown"
							data-slot="chat-dropdown"
							aria-label="Actions Menu"
							title="Open Actions Menu"
							isTooltipHidden={true}
							className="hover:bg-sidebar-accent flex size-full w-[1.5rem] items-center justify-center border-none py-2 text-white opacity-100 transition-opacity duration-200 ease-in-out focus-visible:ring-0 [&>svg]:size-auto"
						>
							<ChevronDown width={20} height={20} className="stroke-black/50" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" side="bottom" className="border-none bg-white">
						<DropdownMenuItem asChild className="hover:bg-sidebar-accent/50 cursor-pointer bg-transparent select-auto hover:text-black focus:bg-transparent">
							<Button
								aria-label="Create new conversation"
								title="Create new conversation"
								isTooltipHidden={true}
								className="focus:bg-sidebar-accent/50 active:bg-sidebar-accent/50 relative flex items-center justify-start py-2 text-black opacity-100 shadow-none transition-opacity duration-200 ease-in-out focus:text-black focus-visible:ring-0 active:text-black data-[active=true]:bg-transparent data-[active=true]:text-black [&>svg]:size-auto"
							>
								Create new conversation
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</>
	);
});

export default function Header() {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex min-h-10 w-full items-center justify-between gap-2">
				<SidebarMenuButton asChild className="h-fit w-fit gap-1.5 py-1.5 pr-3 pl-1.5 active:bg-transparent">
					<NavLink active={route().current("/")} href={"/"} className="[&>svg]:size-5.5">
						<h2 className="font-bricolage text-lg font-[600] tracking-[-0.085rem] text-black/85">{APP_NAME}</h2>
					</NavLink>
				</SidebarMenuButton>

				<div className="flex items-center justify-end">
					<QuickActions />
				</div>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
