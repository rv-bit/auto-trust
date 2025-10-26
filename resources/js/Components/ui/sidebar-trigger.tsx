import { SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarTriggerIcon } from "@/icons/icons";

import { cn } from "@/lib/utils";
import { State } from "@/types/ui/sidebar";

export interface QuickActionsProps {
	state: State;
	open: boolean;
	isMobile: boolean;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const QuickActions = ({ isMobile, state, open, onClick }: QuickActionsProps) => {
	return (
		<>
			<SidebarMenuButton
				data-sidebar="trigger"
				data-slot="sidebar-trigger"
				sidebarState={state}
				tooltip={{ content: open ? "Hide Sidebar" : "Show Sidebar", side: "bottom" }}
				isTooltipHidden={false}
				isMobile={isMobile}
				onClick={onClick}
				className="group/sidebar-trigger hover:bg-zinc-300 dark:hover:bg-zinc-700 flex size-fit items-center justify-center overflow-hidden rounded-sm p-2 py-2.5 text-white opacity-100 transition-opacity duration-200 ease-in-out group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:rounded-md group-data-[collapsible=icon]:p-3 [&>svg]:size-auto"
			>
				<SidebarTriggerIcon
					width={15}
					height={15}
					stroke="white"
					className={cn("right-10 rotate-180 rounded-xs bg-black/50 fill-none px-px dark:bg-white/50", {
						"rotate-0": !open,
					})}
				/>
			</SidebarMenuButton>
		</>
	);
};
