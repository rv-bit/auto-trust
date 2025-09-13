import { Head } from "@inertiajs/react";

import RootLayout from "@/layouts/root-layout";

export default function Welcome() {
	return (
		<RootLayout footer={true}>
			<Head title="Welcome" />

			<section id="main-section" className="mx-auto flex max-w-7xl flex-col gap-2 px-2">
				<span className="flex flex-col items-center justify-center gap-2">
					<h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Welcome to the basic</h1>
				</span>
			</section>
		</RootLayout>
	);
}
