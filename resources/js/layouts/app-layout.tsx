import * as React from "react";

import type { BreadcrumbItem } from "@/types";

import AppLayoutTemplate from "@/layouts/app/sidebar-layout";

interface AppLayoutProps {
	children: React.ReactNode;
	breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
	<AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
		{children}
	</AppLayoutTemplate>
);
