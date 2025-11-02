import { Transition } from "@headlessui/react";
import { Form, Head, Link, usePage } from "@inertiajs/react";
import { useRef, useState } from "react";

import { edit } from "@/routes/profile";
import { send } from "@/routes/verification";

import ProfileController from "@/actions/App/Http/Controllers/Settings/ProfileController";

import type { BreadcrumbItem, SharedData } from "@/types";

import { useInitials } from "@/hooks/use-initials";

import HeadingSmall from "@/components/heading-small";
import InputError from "@/components/input-error";
import DeleteUser from "@/components/pages/settings/delete-user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AppLayout from "@/layouts/app-layout";
import Layout from "@/layouts/settings/layout";

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: "Profile settings",
		href: edit().url,
	},
];

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
	const { auth } = usePage<SharedData>().props;
	const getInitials = useInitials();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(auth.user.avatar || null);

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleAvatarClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Profile settings" />

			<Layout>
				<div className="space-y-6">
					<HeadingSmall title="Profile information" description="Update your name and email address" />

					<Form
						{...ProfileController.update.form()}
						options={{
							preserveScroll: true,
						}}
						className="space-y-6"
					>
						{({ processing, recentlySuccessful, errors }) => (
							<>
								<div className="grid gap-4">
									<Label>Profile Picture</Label>

									<div className="flex items-center gap-4">
										<Avatar className="h-20 w-20 cursor-pointer transition-opacity hover:opacity-80" onClick={handleAvatarClick}>
											<AvatarImage src={avatarPreview || undefined} alt={auth.user.name} />
											<AvatarFallback className="bg-neutral-200 text-lg text-black dark:bg-neutral-700 dark:text-white">{getInitials(auth.user.name)}</AvatarFallback>
										</Avatar>

										<div className="flex flex-col gap-2">
											<input
												ref={fileInputRef}
												type="file"
												name="avatar"
												id="avatar"
												accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
												className="hidden"
												onChange={handleAvatarChange}
											/>
											<Button type="button" variant="outline" size="sm" onClick={handleAvatarClick}>
												Change Avatar
											</Button>
											<p className="text-muted-foreground text-xs">JPG, PNG, GIF or WebP. Max 2MB.</p>
										</div>
									</div>

									<InputError className="mt-2" message={errors.avatar} />
								</div>

								<div className="grid gap-2">
									<Label htmlFor="name">Name</Label>

									<Input id="name" className="mt-1 block w-full" defaultValue={auth.user.name} name="name" required autoComplete="name" placeholder="Full name" />

									<InputError className="mt-2" message={errors.name} />
								</div>

								<div className="grid gap-2">
									<Label htmlFor="email">Email address</Label>

									<Input
										id="email"
										type="email"
										className="mt-1 block w-full"
										defaultValue={auth.user.email}
										name="email"
										required
										autoComplete="username"
										placeholder="Email address"
									/>

									<InputError className="mt-2" message={errors.email} />
								</div>

								{mustVerifyEmail && auth.user.email_verified_at === null && (
									<div>
										<p className="text-muted-foreground -mt-4 text-sm">
											Your email address is unverified.{" "}
											<Link
												href={send()}
												as="button"
												className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
											>
												Click here to resend the verification email.
											</Link>
										</p>

										{status === "verification-link-sent" && (
											<div className="mt-2 text-sm font-medium text-green-600">A new verification link has been sent to your email address.</div>
										)}
									</div>
								)}

								<div className="flex items-center gap-4">
									<Button disabled={processing} data-test="update-profile-button">
										Save
									</Button>

									<Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
										<p className="text-sm text-neutral-600">Saved</p>
									</Transition>
								</div>
							</>
						)}
					</Form>
				</div>

				<DeleteUser />
			</Layout>
		</AppLayout>
	);
}
