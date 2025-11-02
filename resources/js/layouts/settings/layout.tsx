import { Link } from "@inertiajs/react";
import { type PropsWithChildren } from "react";

import { edit as editAppearance } from "@/routes/appearance";
import { edit as editPassword } from "@/routes/password";
import { edit } from "@/routes/profile";
import { show } from "@/routes/two-factor";

import type { NavItem } from "@/types";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems: NavItem[] = [
	{
		title: "Profile",
		href: edit(),
	},
	{
		title: "Password",
		href: editPassword(),
	},
	{
		title: "Two-Factor Auth",
		href: show(),
	},
	{
		title: "Appearance",
		href: editAppearance(),
	},
];

export default function Layout({ children }: PropsWithChildren) {
	// When server-side rendering, we only render the layout on the client...
	if (typeof window === "undefined") {
		return null;
	}

	const currentPath = window.location.pathname;

	return (
		<div className="px-4 py-6">
			<Heading title="Settings" description="Manage your profile and account settings" />

			<div className="flex flex-col lg:flex-row lg:space-x-12">
				<aside className="w-full max-w-xl lg:w-48">
					<nav className="flex flex-col space-y-1 space-x-0">
						{sidebarNavItems.map((item, index) => (
							<Button
								asChild
								key={`${typeof item.href === "string" ? item.href : item.href?.url}-${index}`}
								data-active={currentPath === (typeof item.href === "string" ? item.href : item.href?.url) ? "true" : "false"}
								className="group/menu-button dark:hover:bg-sidebar/50 flex h-10 items-center justify-start gap-2 rounded-md bg-transparent p-2 text-black transition-colors delay-0 duration-300 ease-in-out hover:bg-zinc-200 data-[active=false]:shadow-none data-[active=true]:bg-linear-to-b data-[active=true]:from-zinc-300 data-[active=true]:to-zinc-300 data-[active=true]:shadow-[0_1px_2px_0_rgb(0_0_0/.5),inset_0_1px_0_0_rgb(255_255_255/.10)] data-[active=true]:hover:bg-transparent dark:text-white dark:data-[active=true]:from-zinc-700/50 dark:data-[active=true]:to-zinc-700 data-[active=true]:dark:hover:bg-transparent"
							>
								<Link href={item.href}>
									{item.icon && <item.icon className="size-4" />}
									{item.title}
								</Link>
							</Button>
						))}
					</nav>
				</aside>

				<Separator className="my-6 lg:hidden" />

				<div className="flex-1 md:max-w-2xl">
					<section className="max-w-xl space-y-12">{children}</section>
				</div>
			</div>
		</div>
	);
}
