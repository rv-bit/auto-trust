import { Head, usePage } from "@inertiajs/react";

import type { PageProps } from "@/types";

import AuthenticatedLayout from "@/layouts/authenticated-layout";

import DeleteUserForm from "./components/delete-user-form";
import UpdatePasswordForm from "./components/update-password-form";
import UpdateProfileInformationForm from "./components/update-profile-information-form";

export default function Edit({ mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
	const user = usePage().props.auth.user;

	return (
		<AuthenticatedLayout user={user}>
			<Head title="Profile" />

			<div className="mx-auto flex max-w-7xl flex-col gap-2 px-2">
				<div className="bg-white p-4 shadow-sm">
					<UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
				</div>

				<div className="bg-white p-4 shadow-sm">
					<UpdatePasswordForm className="max-w-xl" />
				</div>

				<div className="bg-white p-4 shadow-sm">
					<DeleteUserForm className="max-w-xl" />
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
