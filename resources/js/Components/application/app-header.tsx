import { Link, usePage } from "@inertiajs/react";
import { useMemo } from "react";

import { chat, dashboard } from "@/routes";

import { cn } from "@/lib/utils";

import type { BreadcrumbItem, NavItem, SharedData } from "@/types";

import { useIsMobile } from "@/hooks/use-mobile";

import { APP_NAME } from "@/resources/app-config";

import { UserMenuContent } from "@/components/settings/user-menu-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { type LucideIcon, Hamburger, LayoutGrid, Menu, Search } from "lucide-react";
import AppLogoIcon from "./app-logo-icon";

interface AppHeaderProps {
	className?: string;
	breadcrumbs?: BreadcrumbItem[];
}

interface LocalNavItem extends Omit<NavItem, "icon"> {
	icon?: React.ReactNode;
	isHidden?: boolean;
}

export function AppHeader({ className, breadcrumbs = [] }: AppHeaderProps) {
	const page = usePage<SharedData>();
	const user = page.props.auth.user;
	const vehicleListings = (page.props.vehicleListings || {}) as Record<string, string>;

	const isMobile = useIsMobile();
	
	const currentPath = window.location.pathname;

	const mainNavItems: LocalNavItem[] = useMemo(() => {
		return [
			{
				title: "Buying",
				href: dashboard().url,
				icon: (
					<svg viewBox="0 0 24 24" className={cn("size-5 fill-white", { "fill-black": currentPath !== "/" || isMobile, "size-6 fill-black/60 max-sm:size-5": isMobile })}>
						<use xlinkHref="#sprite_icon/car_heart" />
					</svg>
				),
			},
			{
				title: "Selling",
				href: dashboard().url,
				icon: (
					<svg viewBox="0 0 24 24" className={cn("size-5 fill-white", { "fill-black": currentPath !== "/" || isMobile, "size-6 fill-black/60 max-sm:size-5": isMobile })}>
						<use xlinkHref="#sprite_icon/currency_gbp_in_circle" />
					</svg>
				),
			},
			{
				title: "Login",
				href: dashboard().url,
				icon: (
					<svg viewBox="0 0 24 24" className={cn("size-5 fill-white", { "fill-black": currentPath !== "/" || isMobile, "size-6 fill-black/60 max-sm:size-5": isMobile })}>
						<path d="M15.7338 13.3566C16.8716 13.8742 17.9141 14.3195 18.9304 14.816C21.9423 16.2878 23.0766 18.2224 22.996 22.0851C22.9683 23.4158 22.2609 23.9926 20.8754 23.9948C15.0202 24.0038 9.16507 23.9991 3.3098 23.9957C3.00862 23.9956 2.70269 23.9878 2.40694 23.9376C1.43144 23.7724 0.934903 23.2665 1.00685 22.3011C1.18073 19.9685 1.44859 17.6414 3.38106 15.9376C4.59876 14.864 6.11515 14.3224 7.60894 13.7496C7.88322 13.6445 8.15721 13.5387 8.51668 13.4006C8.30432 13.2515 8.18189 13.1545 8.04915 13.0741C5.46272 11.5091 4.09093 9.25311 4.46379 6.26997C4.85881 3.10878 6.88735 1.16602 9.9455 0.309415C14.1508 -0.86843 18.4792 1.42591 19.5873 5.33357C20.3717 8.09959 19.1739 11.117 16.6301 12.7812C16.3637 12.9555 16.0943 13.1254 15.7338 13.3566Z"></path>
					</svg>
				),
				isHidden: user !== null,
			},
			{
				title: "Messages",
				href: chat().url,
				icon: (
					<svg viewBox="0 0 24 24" className={cn("size-5 fill-white", { "fill-black": currentPath !== "/" || isMobile, "size-6 fill-black/60 max-sm:size-5": isMobile })}>
						<use xlinkHref="#sprite_icon/email" />
					</svg>
				),
				isHidden: user === null,
			},
			{
				title: "Notifications",
				href: chat().url,
				icon: (
					<svg viewBox="0 0 24 24" className={cn("size-5 fill-white", { "fill-black": currentPath !== "/" || isMobile, "size-6 fill-black/60 max-sm:size-5": isMobile })}>
						<use xlinkHref="#sprite_icon/bell" />
					</svg>
				),
				isHidden: user === null,
			},
			{
				title: "Menu",
				href: chat().url,
				icon: (
					<Menu strokeWidth={3} className={cn("size-5 fill-white", { "fill-black": currentPath !== "/" || isMobile, "size-6 fill-black/60 max-sm:size-5": isMobile })}/>
				),
			},
		];
	}, [user, isMobile]);

	if (isMobile) {
		return (
			<header className="fixed inset-x-0 bottom-0 z-9999 flex h-fit items-center justify-around border-t border-neutral-400/20 bg-white px-2 py-1">
				{mainNavItems.map((value, index) => {
					if (value.isHidden) return null;

					return (
						<Button
							asChild
							variant={"link"}
							key={`${value.title}-${index}`}
							className="text-base max-sm:text-xs size-auto min-w-fit shrink-0 items-center justify-center gap-1 rounded-none px-0 py-2 font-semibold text-black/60 hover:no-underline has-[>svg]:px-1.5 dark:text-black/60"
						>
							<Link href={value.href} className="flex flex-col items-center justify-center">
								{value.icon}
								{value.title}
							</Link>
						</Button>
					);
				})}
			</header>
		);
	}

	return (
		<header
			className={cn("h-auto w-full bg-white", {
				"flex-row bg-[#252525]": currentPath === "/",
			})}
		>
			<div
				className={cn("mx-auto flex flex-col items-center justify-between px-4 md:max-w-7xl", {
					"flex-row bg-[#252525]": currentPath === "/",
				})}
			>
				<div className={cn("flex h-fit w-full items-center", { "h-15": currentPath === "/" })}>
					{Object.entries(vehicleListings).map(([value, label]) => {
						const href = `/vehicles/${value}`;

						return (
							<Button
								asChild
								key={`${value}-${label}`}
								variant={"link"}
								className={cn("p-2 text-sm font-bold text-white/60 decoration-3 underline-offset-5 hover:text-white dark:text-white/60 dark:hover:text-white", {
									"text-white dark:text-white": currentPath === "/",
									"text-black/60 hover:text-black dark:text-black/60 dark:hover:text-black": currentPath !== "/",
								})}
							>
								<Link key={value} href={href}>
									{label}
								</Link>
							</Button>
						);
					})}
				</div>

				<div className={cn("flex w-full items-center justify-between", { "justify-end": currentPath === "/" })}>
					{currentPath !== "/" && (
						<Button
							asChild
							variant={"link"}
							className={cn(
								"size-auto min-w-fit shrink-0 items-center justify-center rounded-none p-0 font-semibold text-white hover:border-white hover:no-underline has-[>svg]:px-0 dark:text-white",
								{
									"text-black hover:border-black dark:text-black": currentPath !== "/",
								},
							)}
						>
							<Link href={"/"} className="flex items-center justify-center rounded-md text-xs font-medium">
								<AppLogoIcon
									className={cn("size-5 text-white dark:text-white", {
										"text-black dark:text-black": currentPath !== "/",
									})}
								/>
								<span className="truncate text-lg leading-tight font-semibold">{APP_NAME.toLowerCase()}</span>
							</Link>
						</Button>
					)}

					<div className="flex justify-end gap-1">
						{mainNavItems.map((value, index) => {
							if (value.isHidden) return null;

							return (
								<Button
									asChild
									variant={"link"}
									key={`${value.title}-${index}`}
									className={cn(
										"size-auto min-w-fit shrink-0 items-center justify-center gap-1 rounded-none border-b-4 border-transparent px-0 py-2 pt-3 font-semibold text-white hover:border-white hover:no-underline has-[>svg]:px-1.5 dark:text-white dark:hover:border-white/80",
										{
											"text-black hover:border-black dark:text-black": currentPath !== "/",
										},
									)}
								>
									<Link href={value.href} className="flex flex-col items-center justify-center rounded-md text-xs font-medium">
										{value.icon}
										{value.title}
									</Link>
								</Button>
							);
						})}
					</div>
				</div>
			</div>
		</header>
	);
}