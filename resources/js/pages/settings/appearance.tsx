import { Head } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import AppearanceTabs from '@/components/settings/appearance-tabs';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import Layout from "@/layouts/settings/layout";
import { edit as editAppearance } from '@/routes/appearance';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Appearance settings" />

			<Layout>
				<div className="space-y-6">
					<HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
					<AppearanceTabs />
				</div>
			</Layout>
		</AppLayout>
	);
}
