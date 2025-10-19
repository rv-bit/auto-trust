import { usePage } from "@inertiajs/react";

import { SharedData } from "@/types";

import { AppSidebar } from "@/components/chat/sidebar-actions";
import { SidebarHeader } from "@/components/chat/sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/chat/ui/sidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
	const page = usePage<SharedData>();
	const isOpen = page.props.chatSidebarOpen ?? true;

	return (
		<SidebarProvider defaultOpen={isOpen}>
			<AppSidebar />
			<SidebarInset className="overflow-x-hidden">
				<SidebarHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
