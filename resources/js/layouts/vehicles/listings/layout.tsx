import { Head, usePage } from "@inertiajs/react";
import React from "react";

import type { NavItem } from "@/types";
import type { VehiclePageProps } from "@/types/routes/listings";

import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app/app-shell-layout";

interface LocalNavItem extends Omit<NavItem, "icon"> {
	icon?: React.ReactNode;
	isHidden?: boolean;
	activePaths?: string[];
}

export default function Layout({ children }: { children: React.ReactNode }) {
	const page = usePage<VehiclePageProps>();

	// trick the theme to force white mode under all divs
	React.useEffect(() => {
		document.body.classList.add("overwrite-white-mode");
		return () => {
			document.body.classList.remove("overwrite-white-mode");
		};
	}, []);

	return (
		<AppLayout withFooter classNameShell="md:bg-factory-white relative flex w-full flex-col overflow-hidden" classNameHeader="md:relative absolute" className="gap-0 px-0">
			<Head title="My Cars" />

			<div id="hero-header-info" className="relative inset-0 flex w-full items-center justify-center">
				<div
					id="hero-header-bg"
					className="from-header-gradient-primary to-header-gradient-secondary absolute -inset-x-5 inset-y-0 mx-auto max-w-7xl rounded-lg bg-linear-to-t from-40% px-12 content-['']"
				/>
				<div id="hero-header-content" className="relative z-20 flex min-h-80 flex-col items-center justify-center gap-4 px-4 text-center md:px-0">
					<span className="space-y-2">
						<h1 className="font-headlines text-3xl font-extrabold -tracking-[0.2rem] uppercase md:text-7xl md:-tracking-[0.4rem]">Used cars</h1>
						<p className="text-base">Buy high quality cars from rated, reviewed and trusted dealers</p>
					</span>

					<div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
						<Button className="h-12 w-full bg-black px-10 text-base font-extrabold text-cyan-400 transition-colors duration-200 ease-in-out hover:bg-black/80 md:w-auto dark:bg-black dark:text-cyan-400 hover:dark:bg-black/80">
							Select a car
						</Button>
						<Button className="bg-black-rgb/50 hover:bg-black-rgb/70 dark:bg-black-rgb/50 hover:dark:bg-black-rgb/70 h-12 w-full rounded-sm px-10 text-base font-extrabold text-black transition-colors duration-200 ease-in-out md:w-auto">
							Browse used cars
						</Button>
					</div>
				</div>
				<div id="hero-frame-media" className="absolute inset-0 flex justify-center">
					<span className="relative w-full max-w-240">
						<img
							alt="kia sportage side view"
							className="absolute top-15 right-0 block h-78 translate-x-full transform"
							src="https://deals.carwow.co.uk/image?filter%5Bbrand_slug%5D=kia&filter%5Bmodel_review_slug%5D=sportage-2022&filter%5Bsize%5D=medium&filter%5Bzoom_type%5D=fullscreen"
						/>
						<img
							alt="kia sportage side view reverse"
							className="absolute top-15 right-auto left-0 block h-78 -translate-x-full transform"
							src="https://deals.carwow.co.uk/image?filter%5Bbrand_slug%5D=kia&filter%5Bmodel_review_slug%5D=sportage-2022&filter%5Bsize%5D=medium&filter%5Bzoom_type%5D=fullscreen"
						/>
					</span>
				</div>
			</div>

			{children}
		</AppLayout>
	);
}
