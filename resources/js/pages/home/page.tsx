import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

import { SharedData } from "@/types";

import AppLayout from "@/layouts/app/shell-layout";
import { login } from "@/routes";

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
		<AppLayout withFooter className="max-w-7xl items-center justify-center">
			<Head title="Welcome"></Head>

			<div className="flex flex-col items-center justify-center p-10">
				<div id="hero-header-info" className="relative inset-0 flex w-full items-center justify-center">
					<div
						id="hero-header-bg"
						className="from-header-gradient-primary to-header-gradient-secondary absolute -inset-x-5 inset-y-0 mx-auto max-w-7xl rounded-lg bg-linear-to-t from-40% px-12 content-['']"
					/>
					<div id="hero-header-content" className="relative z-20 flex min-h-80 flex-col items-center justify-center gap-4 px-4 text-center md:px-0">
						<span className="space-y-2">
							<h1 className="font-headlines text-3xl font-extrabold -tracking-[0.2rem] uppercase md:text-7xl md:-tracking-[0.4rem]">Page under construction</h1>
							<p className="text-base">
								Page is under construction please{" "}
								<Link href={login()} className="underline">
									Login
								</Link>
								{", "}
								in order to use this application
							</p>
						</span>
					</div>
					<div id="hero-frame-media" className="absolute inset-0 flex justify-center">
						<span className="relative w-full max-w-240">
							<img alt="kia sportage side view" className="absolute top-15 right-0 block h-78 translate-x-full transform" src="/storage/routes/kia-sportage-side-view.webp" />
							<img
								alt="kia sportage side view reverse"
								className="absolute top-15 right-auto left-0 block h-78 -translate-x-full transform"
								src="/storage/routes/kia-sportage-side-view.webp"
							/>
						</span>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
