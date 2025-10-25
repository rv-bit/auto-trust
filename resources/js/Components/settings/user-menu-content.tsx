import { HTMLAttributes } from "react";
import { Link, router } from '@inertiajs/react';

import { logout } from '@/routes';
import { edit } from '@/routes/profile';

import { cn } from "@/lib/utils";

import type { User } from '@/types';

import { Appearance, useAppearance } from "@/hooks/use-appearance";
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

import { UserInfo } from '@/components/settings/user-info';

import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { LogOut, Settings, LucideIcon, Monitor, Moon, Sun } from "lucide-react";

interface UserMenuContentProps {
    user: User;
}

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
		<div className={cn("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800", className)} {...props}>
			{tabs.map(({ value, icon: Icon, label }) => (
				<button
					key={value}
					onClick={() => updateAppearance(value)}
					className={cn(
						"flex min-w-10 items-center justify-center rounded-md py-1.5 transition-colors md:justify-start",
						appearance === value
							? "dark:bg-sidebar/60 bg-neutral-200 shadow-xs dark:text-neutral-100"
							: "text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60",
					)}
				>
					<Icon className="size-5 md:-ml-1 md:size-4" />
					<span className="ml-1.5 hidden text-sm md:inline-block">{label}</span>
				</button>
			))}
		</div>
	);
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <AppearanceToggleTab className='w-full items-center justify-center bg-transparent dark:bg-transparent' />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        prefetch
                        href={edit()}
                        as="a"
                        onClick={cleanup}
                        className="block w-full"
                    >
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    data-test="logout-button"
                    href={logout()}
                    as="a"
                    onClick={handleLogout}
                    className="block w-full"
                >
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
