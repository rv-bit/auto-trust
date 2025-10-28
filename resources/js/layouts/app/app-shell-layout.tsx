import type { PropsWithChildren } from "react";

import { AppContent } from "@/components/application/app-content";
import Footer from "@/components/application/app-footer";
import { AppShell } from "@/components/application/app-shell";

export default function AppLayout({ children, withFooter }: PropsWithChildren<{ withFooter?: boolean }>) {
	return (
		<AppShell>
			<AppContent>{children}</AppContent>
			{withFooter && <Footer />}
		</AppShell>
	);
}
