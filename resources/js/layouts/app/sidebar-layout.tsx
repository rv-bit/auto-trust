import * as React from "react";

import type { BreadcrumbItem } from "@/types";

import { AppContent } from "@/components/application/app-content";
import { AppShell } from "@/components/application/app-shell";
import { AppSidebar } from "@/components/application/app-sidebar";
import { AppSidebarHeader } from "@/components/application/app-sidebar-header";

export default function AppSidebarLayout({ children, breadcrumbs = [] }: React.PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
	return (
		<AppShell variant="sidebar">
			<AppSidebar />
			<AppContent variant="sidebar" className="overflow-x-hidden">
				<AppSidebarHeader breadcrumbs={breadcrumbs} />
				{children}
			</AppContent>
		</AppShell>
	);
}
