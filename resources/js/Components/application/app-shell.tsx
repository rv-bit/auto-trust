import React from 'react';
import { usePage } from '@inertiajs/react';

import { cn } from '@/lib/utils';

import { type SharedData } from '@/types';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppHeader } from './app-header';
import { AppFooter } from './app-footer';

interface AppShellProps {
	className?: string;
	children: React.ReactNode;
	variant?: "header" | "sidebar";
	withFooter?: boolean;
}

export function AppShell({
    children,
    className,
    variant = 'header',
    withFooter
}: AppShellProps) {
    const page = usePage<SharedData>();
    const isOpen = page.props.sidebarOpen ?? true;

	if (variant === 'header') {
		return (
			<div className={cn("flex min-h-screen w-full flex-col", className)}>
				<AppHeader />
				<main className="shrink-0 w-full flex flex-col">
					{children}
				</main>
				{withFooter && <AppFooter className="mt-auto" />}
			</div>
		);
    }

    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
