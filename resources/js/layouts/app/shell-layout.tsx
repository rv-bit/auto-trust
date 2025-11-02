import * as React from "react";

import { AppContent } from "@/components/application/app-content";
import { AppShell } from "@/components/application/app-shell";

interface AppLayoutProps extends React.ComponentProps<"div"> {
	classNameShell?: string;
	classNameHeader?: string;
	withFooter?: boolean;
}

export default function AppLayout({ children, className, classNameShell, classNameHeader, withFooter }: AppLayoutProps) {
	return (
		<AppShell withFooter={withFooter} className={classNameShell} classNameHeader={classNameHeader}>
			<AppContent className={className}>{children}</AppContent>
		</AppShell>
	);
}
