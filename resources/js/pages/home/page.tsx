import { Head, usePage } from "@inertiajs/react";
import React from "react";

import { SharedData } from "@/types";

import AppLayout from "@/layouts/app/app-shell-layout";

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

			<div className="flex flex-col items-center justify-start px-6 lg:px-8">
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
			</div>
		</AppLayout>
	);
}
