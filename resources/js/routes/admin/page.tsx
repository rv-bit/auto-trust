import { Head, usePage } from "@inertiajs/react";
import React from "react";

import AuthenticatedLayout from "@/layouts/authenticated-layout";

type ComponentItem = {
	isHidden: boolean;
	element: React.JSX.Element;
};

export default function Dashboard() {
	const user = usePage().props.auth.user;

	const componentItems: ComponentItem[] = React.useMemo(() => [], []);
	const componentItemsWhichAreHidden = componentItems.filter((item) => item.isHidden);

	return (
		<AuthenticatedLayout user={user}>
			<Head title="Dashboard" />

			<div className="mx-auto flex max-w-7xl flex-col gap-2 px-2">
				{componentItemsWhichAreHidden.length === componentItems.length && (
					<div className="flex max-h-[50rem] flex-col gap-3 overflow-auto bg-white p-5 shadow-sm">
						<header>
							<h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">Not Available</h1>
						</header>
					</div>
				)}

				{componentItems.map((item, index) => {
					if (item.isHidden) return null;

					return <React.Fragment key={index}>{item.element}</React.Fragment>;
				})}
			</div>
		</AuthenticatedLayout>
	);
}
