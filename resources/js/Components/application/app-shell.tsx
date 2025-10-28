import React from 'react';
import { usePage } from '@inertiajs/react';

import { cn } from '@/lib/utils';

import { type SharedData } from '@/types';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppHeader } from './app-header';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
    className?: string;
}

export function AppShell({
    children,
    className,
    variant = 'header',
}: AppShellProps) {
    const page = usePage<SharedData>();
    const isOpen = page.props.sidebarOpen ?? true;

    if (variant === 'header') {
        return (
            <>
                <AppHeader />
                
                <div className={cn('flex min-h-screen w-full flex-col', className)}>
                    {children}
                </div>
            </>
        );
    }

    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
