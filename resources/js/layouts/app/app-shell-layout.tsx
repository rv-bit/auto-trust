import type { PropsWithChildren } from "react";

import { AppContent } from "@/components/application/app-content";
import { AppShell } from "@/components/application/app-shell";

export default function AppLayout({ children, classNameShell, className, withFooter }: PropsWithChildren<{ classNameShell?: string; className?: string; withFooter?: boolean }>) {
	return (
		<AppShell withFooter={withFooter} className={classNameShell}>
			<AppContent className={className}>{children}</AppContent>
		</AppShell>
	);
}
