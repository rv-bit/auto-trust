import { usePage } from '@inertiajs/react';

import { cn } from '@/lib/utils';
import { SharedData } from '@/types';

import { SidebarProvider } from '@/components/ui/sidebar';

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
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <div className={cn('flex min-h-screen w-full flex-col', className)}>
                {children}
            </div>
        );
    }

    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
