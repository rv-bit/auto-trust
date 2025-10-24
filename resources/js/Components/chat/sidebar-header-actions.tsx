import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

import type { SharedData } from "@/types";
import type { Conversation, Conversations } from "@/types/routes/chat";

import { Input } from "@/components/ui/input";

import { SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "./ui/sidebar";

import AppLogo from "@/components/application/app-logo";

import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel, SidebarMenuButton } from "../ui/sidebar";
import { TriggerSidebar } from "./sidebar-actions";

export function SidebarHeaderActions({ setLocalConversations }: { setLocalConversations: React.Dispatch<React.SetStateAction<Conversation[]>> }) {
	const page = usePage<SharedData & Conversations>();

	const { state, isMobile } = useSidebar();

	const conversations = page.props.conversations;

	const [filter, setFilter] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const search = e.target.value.toLowerCase();
		setFilter(search);
		setLocalConversations(
			conversations.filter((conversation) => {
				return conversation.name.toLowerCase().includes(search);
			}),
		);
	};

	return (
		<SidebarHeader className="p-0">
			<SidebarGroup className="px-2 py-0">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild sidebarState={state} isMobile={isMobile} size="lg" className="active:bg-transparent">
							<div className="flex h-auto w-full justify-between">
								<Link prefetch href={"/"} className="active:bg-sidebar-accent flex h-full w-full items-center justify-start gap-2">
									<AppLogo />
								</Link>
								{isMobile && <TriggerSidebar />}
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarGroupLabel className="uppercase">Search</SidebarGroupLabel>
					<SidebarMenuItem>
						<div className="relative w-full">
							<Input id="filtering" className="peer w-full ps-9 pe-2 [&::-webkit-search-cancel-button]:hidden dark:bg-zinc-700" placeholder="Search" type="search" value={filter} onChange={onSearch} />

							<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
								{isLoading ? <LoaderCircleIcon className="animate-spin" size={16} role="status" aria-label="Loading..." /> : <SearchIcon size={16} aria-hidden="true" />}
							</div>
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
		</SidebarHeader>
	);
}
