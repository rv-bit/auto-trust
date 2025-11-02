import { Link, usePage } from "@inertiajs/react";
import { useCallback, useMemo } from "react";

import { dashboard as home_route, chat as chat_route, login as login_route } from "@/routes";
import { dashboard as vehicles_dashboard } from "@/routes/vehicles"

import { cn } from "@/lib/utils";

import type { BreadcrumbItem, NavItem, SharedData } from "@/types";

import { useIsMobile } from "@/hooks/use-mobile";

import { APP_NAME } from "@/resources/app-config";

import { UserMenuContent } from "@/components/pages/settings/user-menu-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import {  Menu } from "lucide-react";
import AppLogoIcon from "./app-logo-icon";

interface AppHeaderProps {
	className?: string;
	breadcrumbs?: BreadcrumbItem[];
}

interface LocalNavItem extends Omit<NavItem, "icon"> {
	icon?: React.ReactNode;
	isHidden?: boolean;
	activePaths?: string[];
}

export function AppHeader({ className, breadcrumbs = [] }: AppHeaderProps) {
	const page = usePage<SharedData>();
	const user = page.props.auth.user;
	const vehicleListings = (page.props.vehicleListings || {}) as Record<string, string>;

	const isMobile = useIsMobile();
	
	const currentPath = typeof window !== "undefined" ? window.location.pathname + window.location.search : "";

	const vehicleListingsItems = useMemo(() => {
		return Object.entries(vehicleListings).map(([value, label]) => {
			const href = `/vehicles/${value}`;
			
			return {
				title: label,
				href,
				activePaths: [href],
			};
		});
	}, [vehicleListings]);

	const mainNavItems: LocalNavItem[] = useMemo(() => {
		return [
			{
				title: "Buying",
				href: vehicles_dashboard().url + "?tab=my-cars-tab-buying",
				icon: (
					<svg viewBox="0 0 24 24" className={cn("size-6 fill-white", { "fill-black": currentPath !== "/" || isMobile, "size-5 fill-black/60": isMobile })}>
						<use xlinkHref="#sprite_icon/car_heart" />
					</svg>
				),
				activePaths: [vehicles_dashboard().url + "?tab=my-cars-tab-buying"],
			},
			{
				title: "Selling",
				href: vehicles_dashboard().url + "?tab=my-cars-tab-selling",
				icon: (
					<svg viewBox="0 0 24 24" className={cn("size-6 fill-white", { "fill-black": currentPath !== "/" || isMobile, "size-5 fill-black/60": isMobile })}>
						<use xlinkHref="#sprite_icon/currency_gbp_in_circle" />
					</svg>
				),
				activePaths: [vehicles_dashboard().url + "?tab=my-cars-tab-selling"],
			},
			{
				title: "Login",
				href: login_route().url,
				icon: (
					<svg viewBox="0 0 24 24" className={cn("size-6 fill-white", { "fill-black": currentPath !== "/" || isMobile, "size-5 fill-black/60": isMobile })}>
						<path d="M15.7338 13.3566C16.8716 13.8742 17.9141 14.3195 18.9304 14.816C21.9423 16.2878 23.0766 18.2224 22.996 22.0851C22.9683 23.4158 22.2609 23.9926 20.8754 23.9948C15.0202 24.0038 9.16507 23.9991 3.3098 23.9957C3.00862 23.9956 2.70269 23.9878 2.40694 23.9376C1.43144 23.7724 0.934903 23.2665 1.00685 22.3011C1.18073 19.9685 1.44859 17.6414 3.38106 15.9376C4.59876 14.864 6.11515 14.3224 7.60894 13.7496C7.88322 13.6445 8.15721 13.5387 8.51668 13.4006C8.30432 13.2515 8.18189 13.1545 8.04915 13.0741C5.46272 11.5091 4.09093 9.25311 4.46379 6.26997C4.85881 3.10878 6.88735 1.16602 9.9455 0.309415C14.1508 -0.86843 18.4792 1.42591 19.5873 5.33357C20.3717 8.09959 19.1739 11.117 16.6301 12.7812C16.3637 12.9555 16.0943 13.1254 15.7338 13.3566Z"></path>
					</svg>
				),
				isHidden: user !== null,
			},
			{
				title: "Messages",
				href: chat_route().url,
				icon: (
					<svg viewBox="0 0 24 24" className={cn("size-6 fill-white", { "fill-black": currentPath !== "/" || isMobile, "size-5 fill-black/60": isMobile })}>
						<use xlinkHref="#sprite_icon/email" />
					</svg>
				),
				isHidden: user === null,
			},
			{
				title: "Notifications",
				icon: (
					<svg viewBox="0 0 24 24" className={cn("size-6 fill-white", { "fill-black": currentPath !== "/" || isMobile, "size-5 fill-black/60": isMobile })}>
						<use xlinkHref="#sprite_icon/bell" />
					</svg>
				),
				isHidden: user === null,
			},
			{
				title: "Menu",
				icon: <Menu strokeWidth={3} className={cn("size-6 fill-white mb-1", { "fill-black": currentPath !== "/" || isMobile, "size-5 fill-black/60 mb-0": isMobile })} />,
			},
		];
	}, [user, isMobile, currentPath]);

	const itemIsActive = useCallback((item: LocalNavItem) => {
		if (item.isActive) return true;

		const current = typeof window !== "undefined" ? window.location.pathname + window.location.search : "";
		const candidates: string[] = [];

		if (typeof item.href === "string" && item.href && item.href !== "#") candidates.push(item.href);
		if (item.activePaths && Array.isArray(item.activePaths)) candidates.push(...item.activePaths.filter(Boolean));

		for (const candidate of candidates) {
			try {
				const url = new URL(candidate, window.location.origin);
				const candidateFull = url.pathname + (url.search || "");
				if (candidateFull === current) return true;
			} catch (e) {
				if (candidate === current) return true;
			}
		}

		return false;
	}, []);

	if (isMobile) {
		return (
			<header className={cn("z-9999 flex h-10 items-center bg-transparent px-4", className)}>
				<HeaderLogo />

				<div className="fixed inset-x-0 bottom-0 z-9999 flex h-fit items-center justify-around border-t border-neutral-400/20 bg-white px-2 py-1">
					{mainNavItems.map((value, index) => {
						if (value.isHidden) return null;

						return (
							<Button
								asChild
								variant={"link"}
								key={`${value.title}-${index}`}
								className="size-auto min-w-fit shrink-0 items-center justify-between gap-1 rounded-none px-0 py-2 text-sm font-semibold text-black/60 hover:no-underline has-[>svg]:px-1.5 dark:text-black/60"
							>
								<Link href={value.href} className="flex flex-col items-center justify-center">
									{value.icon}
									{value.title}
								</Link>
							</Button>
						);
					})}
				</div>
			</header>
		);
	}

	return (
		<header
			className={cn(
				"z-9999 h-auto w-full",
				{
					"flex-row bg-[#252525]": currentPath === "/",
				},
				className,
			)}
		>
			<div
				className={cn("mx-auto flex flex-col items-center justify-between md:max-w-7xl", {
					"flex-row bg-[#252525]": currentPath === "/",
				})}
			>
			<div className={cn("flex h-fit w-full items-center px-2", { "h-15": currentPath === "/" })}>
				{vehicleListingsItems.map(({ href, title }, index) => {
					return (
						<Button
							asChild
							key={`${href}-${title}`}
							variant={"link"}
							data-active={currentPath === href}
							className={cn(
								"p-2 text-sm font-extrabold text-white/60 decoration-3 underline-offset-5 hover:text-white data-[active=true]:underline dark:text-white/60 dark:hover:text-white",
								{
									"text-white dark:text-white": currentPath === "/",
									"data-[active=true]:text-white data-[active=true]:dark:text-white": currentPath === href,
									"text-black/60 hover:text-black data-[active=true]:text-black dark:text-black/60 dark:hover:text-black data-[active=true]:dark:text-black": currentPath !== "/",
									"pl-0": index === 0,
								},
							)}
						>
							<Link key={title} href={href}>
								{title}
							</Link>
						</Button>
					);
				})}
			</div>				<div className={cn("flex w-full items-center justify-between px-4", { "justify-end": currentPath === "/" })}>
					{currentPath !== "/" && <HeaderLogo />}

					<div className="flex justify-end gap-1">
						{mainNavItems.map((value, index) => {
							if (value.isHidden) return null;

							return (
								<Button
									asChild
									key={`${value.title}-${index}`}
									variant={"link"}
									data-active={itemIsActive(value)}
									className={cn(
										"flex size-auto min-w-fit shrink-0 flex-col items-center justify-between gap-0 rounded-none border-b-4 border-transparent px-0 py-2 pt-3 text-xs font-semibold",
										"text-white hover:border-white hover:no-underline has-[>svg]:px-1.5 dark:text-white dark:hover:border-white",
										"data-[active=true]:border-white data-[active=true]:hover:border-white data-[active=true]:dark:border-white data-[active=true]:dark:hover:border-white",
										{
											"text-black hover:border-black data-[active=true]:border-black data-[active=true]:hover:border-black dark:text-black dark:hover:border-black data-[active=true]:dark:border-black data-[active=true]:dark:hover:border-black":
												currentPath !== "/",
										},
									)}
								>
									<Link href={value.href}>
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

const HeaderLogo = () => {
	const currentPath = typeof window !== "undefined" ? window.location.pathname + window.location.search : "";

	return (
		<Button
			asChild
			variant={"link"}
			className={cn(
				"size-auto min-w-fit shrink-0 items-center justify-center rounded-none p-0 font-medium text-white hover:border-white hover:no-underline has-[>svg]:px-0 dark:text-white",
				{
					"text-black hover:border-black dark:text-black dark:hover:border-black": currentPath !== "/",
				},
			)}
		>
			<Link href={"/"}>
				<AppLogoIcon
					className={cn("size-5 md:size-8 text-white dark:text-white", {
						"text-black dark:text-black": currentPath !== "/",
					})}
				/>
				<span className="truncate text-xl leading-tight font-semibold tracking-tighter md:text-3xl">{APP_NAME.toLowerCase()}</span>
			</Link>
		</Button>
	);
}