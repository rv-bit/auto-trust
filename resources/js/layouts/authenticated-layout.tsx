import { usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";

import NavLink from "@/components/navigation-link";

import { AppSidebar } from "@/components/sidebar/main";
import { SidebarInset, SidebarProvider, useSidebar } from "@/components/ui/sidebar";

import { QuickActions } from "@/components/sidebar/header";

const tabs = [
	{ name: "Dashboard", href: "profile.dashboard" },
	{ name: "Profile Manage", href: "profile.edit" },
	{ name: "Admin Dashboard", href: "admin.dashboard", roles: ["admin"] },
];

const PrivateHeader = () => {
	const user = usePage().props.auth.user;
	const { toggleSidebar, open, isMobile } = useSidebar();

	return (
		<nav>
			<header className="mx-auto flex w-full justify-items-normal px-2">
				{!open && !isMobile && (
					<div className="flex items-center justify-start">
						<QuickActions />
					</div>
				)}

				<div className="w-full max-w-7xl">
					<div className="max-sm:no-scrollbar flex min-h-14 w-full items-center justify-start space-x-4 max-sm:max-w-full max-sm:overflow-x-auto max-sm:overflow-y-hidden md:m-2">
						{tabs.map((tab) => {
							if (tab.roles && !tab.roles.some((role) => user.roles.includes(role))) {
								return null;
							}

							return (
								<NavLink key={tab.href} href={route(tab.href)} active={route().current(tab.href)} className="size-fit">
									{tab.name}
								</NavLink>
							);
						})}
					</div>
				</div>
			</header>
		</nav>
	);
};

export default function AuthenticatedLayout({ children }: PropsWithChildren<{}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<PrivateHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
