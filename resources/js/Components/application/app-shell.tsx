import React from 'react';
import { usePage } from '@inertiajs/react';

import { cn } from '@/lib/utils';

import { type SharedData } from '@/types';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppHeader } from './app-header';
import { AppFooter } from './app-footer';

interface AppShellProps {
	className?: string;
	classNameHeader?: string;
	children: React.ReactNode;
	variant?: "header" | "sidebar";
	withFooter?: boolean;
	withOuterMain?: boolean;
}

export function AppShell({ children, variant = "header", className, classNameHeader, withOuterMain = false, withFooter }: AppShellProps) {
	const page = usePage<SharedData>();
	const isOpen = page.props.sidebarOpen ?? true;

	if (variant === "header") {
		return (
			<div className={cn("flex min-h-screen w-full flex-col", className)}>
				<AppHeader className={classNameHeader} />

				{withOuterMain ? <main className="flex w-full shrink-0 flex-col">{children}</main> : children}
				{withFooter && <AppFooter className="mt-auto" />}
			</div>
		);
	}

	return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
