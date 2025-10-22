import { Head } from "@inertiajs/react";
import React from "react";

import { Footer } from "@/components/application/app-footer";
import { NavHeader } from "@/components/application/app-header";
import { AppShell } from "@/components/application/app-shell";

export default function Welcome() {
	// const { auth } = usePage<SharedData>().props;

	// trick the theme to force white mode under all divs
	React.useEffect(() => {
		document.body.classList.add("landing");
		return () => {
			document.body.classList.remove("landing");
		};
	}, []);

	return (
		<AppShell variant="header" className="relative flex justify-start text-black">
			<Head title="Welcome"></Head>

			<NavHeader />

			<main
				style={{
					minHeight: "100%",
					width: "100%",
					paddingTop: "var(--header-h)",
				}}
				className="z-0 flex flex-col items-center justify-start px-6 pt-4 lg:px-8 lg:pt-4"
			>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
				<h1>Hi</h1>
			</main>

			<Footer className="border-border flex h-fit w-full flex-col items-center justify-end border-t bg-transparent px-6 lg:px-8" />
		</AppShell>
	);
}
