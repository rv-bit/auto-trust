import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import type { SharedData } from "@/types";
import type { Conversation, Conversations } from "@/types/routes/chat";

import { show as index_chat_route } from "@/actions/App/Http/Controllers/Chat/MessageController";

import { useDebounceValue } from "@/hooks/use-debounce-value";

import { Input } from "@/components/ui/input";
import { SidebarGroup, SidebarGroupLabel, SidebarMenuButton } from "@/components/ui/sidebar";

import { SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "./ui/sidebar";
import { TriggerSidebar } from "./sidebar-actions";

import { LoaderCircleIcon, SearchIcon } from "lucide-react";

import AppLogoIcon from "../application/app-logo-icon";

export function SidebarHeaderActions({ setLocalConversations }: { setLocalConversations: React.Dispatch<React.SetStateAction<Conversation[]>> }) {
	const page = usePage<SharedData & Conversations>();

	const { state, isMobile } = useSidebar();

	const conversations = page.props.conversations;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [debouncedFilterValue, setDebouncedFilterValue] = useDebounceValue("", 50);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);

		const search = e.target.value.toLowerCase();
		setDebouncedFilterValue(search);

		setTimeout(() => {
			setIsLoading(false);
		}, 300);
	};

	useEffect(() => {
		if (debouncedFilterValue) {
			setLocalConversations(
				conversations.filter((conversation) => {
					return conversation.name.toLowerCase().includes(debouncedFilterValue);
				}),
			);
		} else {
			setLocalConversations(conversations);
		}
	}, [debouncedFilterValue]);

	return (
		<SidebarHeader className="p-0">
			<SidebarGroup className="px-2 py-0">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild sidebarState={state} isMobile={isMobile} size="lg" className="active:bg-transparent">
							<div className="flex h-auto w-full justify-between">
								<Link prefetch href={index_chat_route.url()} className="active:bg-sidebar-accent flex h-full w-full items-center justify-start gap-2">
									<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
										<AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
									</div>
									<div className="ml-1 grid flex-1 text-left text-sm">
										<span className="truncate leading-tight font-semibold">My Conversations</span>
									</div>
								</Link>
								{isMobile && <TriggerSidebar />}
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarGroupLabel className="uppercase">Search</SidebarGroupLabel>
					<SidebarMenuItem>
						<div className="relative w-full">
							<Input
								id="filtering"
								className="peer w-full ps-9 pe-2 dark:bg-zinc-700 [&::-webkit-search-cancel-button]:hidden"
								placeholder="Search"
								type="search"
								value={debouncedFilterValue}
								onChange={onSearch}
							/>

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
