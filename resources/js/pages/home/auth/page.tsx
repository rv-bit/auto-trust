import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

import { SharedData } from "@/types";

import { Button } from "@/components/ui/button";

import AppLayout from "@/layouts/app/shell-layout";

export default function Welcome() {
	const { auth } = usePage<SharedData>().props;

	// trick the theme to force white mode under all divs
	React.useEffect(() => {
		document.body.classList.add("overwrite-white-mode");
		return () => {
			document.body.classList.remove("overwrite-white-mode");
		};
	}, []);

	return (
		<AppLayout withFooter className="max-w-7xl">
			<Head title="Welcome"></Head>

			<div className="flex flex-col items-start justify-start px-2 pt-10 pb-5 md:px-8 md:pt-20 md:pb-10">
				<div className="flex flex-col items-start justify-start">
					<h1 className="font-headlines text-2xl font-extrabold -tracking-[0.1rem] uppercase md:text-5xl md:-tracking-[0.2rem]">Welcome back, {auth.user.name}</h1>
					<p className="mt-2 text-gray-700 md:text-lg">
						<Link href="/vehicles/dashboard" className="text-base font-bold underline">
							View your cars
						</Link>{" "}
						or start a new search
					</p>
				</div>

				<div className="mt-6 flex h-auto w-full items-start justify-start">
					<div className="flex w-[calc(33.3333333333%-24px)] flex-col items-start justify-start gap-4">
						<Button asChild variant="outline" className="h-15 w-full dark:bg-white dark:text-black">
							<Link href="/vehicles/stock-cars">Find a car</Link>
						</Button>
						<Button disabled variant="outline" className="h-15 w-full disabled:pointer-events-auto disabled:cursor-not-allowed dark:bg-white dark:text-black">
							Value my car
						</Button>
					</div>

					<div id="hero-frame-media" className="-mt-25 mr-10 -mb-25 ml-auto hidden justify-start md:flex">
						<img alt="" className="block max-w-115 object-contain" src="/storage/routes/home-page-vehicle.webp" />
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
