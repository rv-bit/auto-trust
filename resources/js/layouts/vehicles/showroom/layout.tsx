import { Head, Link, usePage } from "@inertiajs/react";
import React, { useCallback } from "react";

import type { NavItem } from "@/types";
import type { VehiclePageProps } from "@/types/routes/listings";

import { cn } from "@/lib/utils";

import AppLayout from "@/layouts/app/app-shell-layout";

import { Button } from "@/components/ui/button";

interface LocalNavItem extends Omit<NavItem, "icon"> {
	icon?: React.ReactNode;
	isHidden?: boolean;
	activePaths?: string[];
}

export default function Layout({ navItems, children }: { navItems: LocalNavItem[]; children: React.ReactNode }) {
	const page = usePage<VehiclePageProps>();
	const currentPath = typeof window !== "undefined" ? window.location.pathname + window.location.search : "";

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

	// trick the theme to force white mode under all divs
	React.useEffect(() => {
		document.body.classList.add("overwrite-white-mode");
		return () => {
			document.body.classList.remove("overwrite-white-mode");
		};
	}, []);

	return (
		<AppLayout withFooter className="gap-0 px-0">
			<Head title="My Cars" />

			<div className="flex w-full flex-col gap-4 border-b border-neutral-300/70 bg-white">
				<div className="mx-auto w-full max-w-7xl">
					<h1 className="font-headlines px-4 py-5 text-3xl font-extrabold -tracking-[0.2rem] uppercase md:px-4 md:py-9 md:pb-9.5 md:text-5xl md:-tracking-[0.3rem]">My Cars</h1>

					<div className="flex items-center justify-start">
						{navItems.map((value, index) => {
							if (value.isHidden) return null;

							return (
								<Button
									asChild
									variant={"link"}
									key={`${value.title}-${index}`}
									className={cn(
										"h-auto w-full items-center justify-center gap-1 rounded-none border-b-4 border-transparent px-0 py-2 pt-3 font-semibold md:w-auto md:min-w-40",
										"text-white hover:border-white hover:no-underline has-[>svg]:px-1.5 dark:text-white dark:hover:border-white",
										"data-[active=true]:border-white data-[active=true]:hover:border-white data-[active=true]:dark:border-white data-[active=true]:dark:hover:border-white",
										{
											"text-black hover:border-black data-[active=true]:border-black data-[active=true]:hover:border-black dark:text-black dark:hover:border-black data-[active=true]:dark:border-black data-[active=true]:dark:hover:border-black":
												currentPath !== "/",
										},
									)}
								>
									<Link href={value.href} className="flex flex-col items-center justify-center rounded-md text-base font-medium" data-active={itemIsActive(value)}>
										{value.icon}
										{value.title}
									</Link>
								</Button>
							);
						})}
					</div>
				</div>
			</div>

			{children}
		</AppLayout>
	);
}
