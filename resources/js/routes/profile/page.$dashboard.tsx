import { Head, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/layouts/authenticated-layout";

export default function Dashboard() {
	const user = usePage().props.auth.user;

	return (
		<AuthenticatedLayout user={user}>
			<Head title="Dashboard" />

			<div className="mx-auto flex max-w-7xl flex-col gap-2 px-2">
				<h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
			</div>
		</AuthenticatedLayout>
	);
}
