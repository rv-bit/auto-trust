import { usePage } from "@inertiajs/react";
import React, { useState } from "react";

import { dashboard as vehicles_dashboard } from "@/routes/vehicles";

import type { NavItem } from "@/types";
import type { VehiclePageProps } from "@/types/routes/listings";

import Layout from "@/layouts/vehicles/showroom/layout";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

import ListVehicleForm from "./forms/list-vehicle-form";

interface LocalNavItem extends Omit<NavItem, "icon"> {
	icon?: React.ReactNode;
	isHidden?: boolean;
	activePaths?: string[];
	Component?: React.FC;
}

const navItems: LocalNavItem[] = [
	{
		title: "Buying",
		href: vehicles_dashboard().url + "?tab=my-cars-tab-buying",
		activePaths: [vehicles_dashboard().url + "?tab=my-cars-tab-buying"],
		Component: VehiclePurchaseListing,
	},
	{
		title: "Selling",
		href: vehicles_dashboard().url + "?tab=my-cars-tab-selling",
		activePaths: [vehicles_dashboard().url + "?tab=my-cars-tab-selling"],
		Component: VehicleSellListing,
	},
];

function getActiveComponent(currentPath: string, navItems: LocalNavItem[]): React.FC | null {
	for (const item of navItems) {
		const candidates: string[] = [];

		if (typeof item.href === "string" && item.href && item.href !== "#") candidates.push(item.href);
		if (item.activePaths && Array.isArray(item.activePaths)) candidates.push(...item.activePaths.filter(Boolean));

		for (const candidate of candidates) {
			try {
				const url = new URL(candidate, window.location.origin);
				const candidateFull = url.pathname + (url.search || "");
				if (candidateFull === currentPath) return item.Component || null;
			} catch (e) {
				if (candidate === currentPath) return item.Component || null;
			}
		}
	}
	return null;
}

function Page() {
	const page = usePage<VehiclePageProps>();
	const currentPath = typeof window !== "undefined" ? window.location.pathname + window.location.search : "";

	const ActiveComponent = getActiveComponent(currentPath, navItems);

	return (
		<div className="bg-factory-white flex w-full justify-center py-10">
			<div className="mx-auto flex w-full max-w-7xl flex-col">{ActiveComponent ? <ActiveComponent /> : null}</div>
		</div>
	);
}

function VehicleSellListing() {
	const [newVehicleListing, setNewVehicleListing] = useState(false);

	return (
		<>
			<div className="flex flex-wrap items-center justify-start gap-2 px-4 pb-10">
				<Button onClick={() => setNewVehicleListing(true)} className="h-30 min-w-full shrink-0 p-0 has-[>svg]:px-0 md:min-w-[calc(50%-24px)]">
					<svg className="inline-icon inline-icon--medium inline-icon--white" viewBox="0 0 24 24">
						<path d="M9.48423 24V14.3828H0V9.53131H9.48423V0H14.5158V9.53131H24V14.3828H14.5158V24H9.48423Z"></path>
					</svg>
					<span>Sell your car</span>
				</Button>
			</div>

			<Drawer autoFocus={true} open={newVehicleListing} onOpenChange={setNewVehicleListing} handleOnly={true} direction="right">
				<DrawerContent className="w-full rounded-tl-sm rounded-bl-sm bg-white data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-5xl dark:bg-white">
					<DrawerHeader className="flex flex-col items-start justify-start gap-0 border-b border-gray-200">
						<DrawerTitle className="text-left text-lg font-medium text-gray-900 dark:text-gray-100">Add a product</DrawerTitle>
						<DrawerDescription className="text-left text-sm text-gray-600 dark:text-gray-400">Add a new product to your store.</DrawerDescription>
					</DrawerHeader>
					<ListVehicleForm />
				</DrawerContent>
			</Drawer>
		</>
	);
}

function VehiclePurchaseListing() {
	const [newVehicleListing, setNewVehicleListing] = useState(false);

	return (
		<>
			<div className="flex flex-wrap items-center justify-start gap-2 px-4 pb-10">
				<Button className="h-30 min-w-full shrink-0 p-0 has-[>svg]:px-0 md:min-w-[calc(50%-24px)]">
					<svg className="inline-icon inline-icon--medium inline-icon--white" viewBox="0 0 24 24">
						<path d="M9.48423 24V14.3828H0V9.53131H9.48423V0H14.5158V9.53131H24V14.3828H14.5158V24H9.48423Z"></path>
					</svg>
					<span>Buy a new car</span>
				</Button>
			</div>
		</>
	);
}

Page.layout = (page: React.ReactNode) => <Layout navItems={navItems}>{page}</Layout>;

export default Page;
