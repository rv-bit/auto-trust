import { Link, router } from '@inertiajs/react';

import { logout } from '@/routes';
import { edit } from '@/routes/profile';

import type { User } from '@/types';

import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

import { UserInfo } from '@/components/settings/user-info';
import AppearanceToggleTab from "@/components/settings/appearance-tabs";

import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { LogOut, Settings } from 'lucide-react';

interface UserMenuContentProps {
    user: User;
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
