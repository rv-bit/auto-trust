import { usePage } from "@inertiajs/react";

import type { SharedData } from "@/types";
import type { Conversations } from "@/types/routes/chat";

import { cn } from "@/lib/utils";

import { TriggerSidebar } from "@/components/chat/sidebar-actions";

export function SidebarHeader() {
	const page = usePage<SharedData & Conversations>();
	const selectedConversation = page.props.selectedConversation;

	return (
		<header className="border-sidebar-border/50 sidebar sticky top-0 z-20 flex h-16 w-full shrink-0 items-center gap-2 border-b px-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4 dark:text-white">
			<div className="flex items-center gap-2">
				<TriggerSidebar />

				<div
					className={cn("flex w-full items-center justify-start gap-2", {
						hidden: !selectedConversation,
					})}
				>
					<h1 className="font-sans-pro truncate text-sm font-semibold">{selectedConversation?.name || ""}</h1>
				</div>
			</div>
		</header>
	);
}
