import { Head, router, usePage } from "@inertiajs/react";
import React, { createContext, useContext, useMemo, useState } from "react";

import type { BodyStyle, FuelType, Gearbox, VehicleAge, VehicleColor, VehicleFilters } from "@/types/routes/listings";

import { VehicleFiltersSidebar } from "@/components/pages/vehicles/vehicle-filters-sidebar";
import { Button } from "@/components/ui/button";

import AppLayout from "@/layouts/app/shell-layout";

interface VehicleListingsPageProps {
	title: string;
	condition?: VehicleFilters["vehicleAge"];
}

interface LayoutListingsContextType {
	filters: VehicleFilters;
	// Accept partial updates to make callers ergonomic
	setFilters: (filters: Partial<VehicleFilters>) => void;
}

const LayoutListingsContext = createContext<LayoutListingsContextType | undefined>(undefined);

export function useLayoutListings() {
	const context = useContext(LayoutListingsContext);
	if (!context) {
		throw new Error("useLayoutListings must be used within LayoutListingsProvider");
	}
	return context;
}

export default function Layout({ children }: { children: React.ReactNode }) {
	const page = usePage<ShareData & VehicleListingsPageProps & Record<string, any>>();
	const title = page.props.title || "Vehicle Listings";

	const isListingsRoute = useMemo(() => {
		const path = page.url;
		return path.includes("/vehicles/used-cars") || path.includes("/vehicles/new-cars");
	}, [page.url]);

	const isListingsOrStockRoute = useMemo(() => {
		const path = page.url;
		return path.includes("/vehicles/used-cars") || path.includes("/vehicles/new-cars") || path.includes("/vehicles/stock-cars");
	}, [page.url]);

	const parseFiltersFromUrl = React.useCallback((): VehicleFilters => {
		// Use window.location.search for client-side to ensure we get the full query string
		// This is important for page refreshes where Inertia might not have the full URL
		const searchString = typeof window !== "undefined" ? window.location.search.substring(1) : page.url.split("?")[1] || "";
		const searchParams = new URLSearchParams(searchString);

		const parsed: VehicleFilters = {
			vehicleAge: page.props.condition,
		};

		if (searchParams.get("postcode")) parsed.postcode = searchParams.get("postcode") || undefined;
		if (searchParams.get("radius")) parsed.radius = parseInt(searchParams.get("radius")!) || 50;
		if (searchParams.get("make")) parsed.make = searchParams.get("make") || undefined;
		if (searchParams.get("model")) parsed.model = searchParams.get("model") || undefined;
		if (searchParams.get("vehicleAge")) parsed.vehicleAge = searchParams.get("vehicleAge") as VehicleAge;

		const bodyStyles = searchParams.getAll("bodyStyle");
		if (bodyStyles.length) parsed.bodyStyle = bodyStyles as BodyStyle[];

		const fuelTypes = searchParams.getAll("fuelType");
		if (fuelTypes.length) parsed.fuelType = fuelTypes as FuelType[];

		const gearboxes = searchParams.getAll("gearbox");
		if (gearboxes.length) parsed.gearbox = gearboxes as Gearbox[];

		const colors = searchParams.getAll("color");
		if (colors.length) parsed.color = colors as VehicleColor[];

		const priceMin = searchParams.get("priceMin");
		const priceMax = searchParams.get("priceMax");
		if (priceMin || priceMax) {
			parsed.price = {
				min: priceMin ? parseInt(priceMin) : undefined,
				max: priceMax ? parseInt(priceMax) : undefined,
			};
		}

		const yearFrom = searchParams.get("yearFrom");
		const yearTo = searchParams.get("yearTo");
		if (yearFrom && yearTo) {
			parsed.year = {
				from: parseInt(yearFrom),
				to: parseInt(yearTo),
			};
		}

		const mileageMin = searchParams.get("mileageMin");
		const mileageMax = searchParams.get("mileageMax");
		if (mileageMin || mileageMax) {
			parsed.mileage = {
				min: mileageMin || undefined,
				max: mileageMax || undefined,
			};
		}

		const sort = searchParams.get("sort");
		if (sort) parsed.sort = sort;

		return parsed;
	}, [page.url, page.props.condition]);

	const buildUrlFromFilters = React.useCallback(
		(f: VehicleFilters) => {
			const params: Record<string, any> = {};

			if (f.postcode) params.postcode = f.postcode;
			if (f.radius) params.radius = f.radius;
			if (f.make) params.make = f.make;
			if (f.model) params.model = f.model;
			if (f.vehicleAge && f.vehicleAge !== "all") params.vehicleAge = f.vehicleAge;

			if (f.bodyStyle?.length) params.bodyStyle = f.bodyStyle;
			if (f.fuelType?.length) params.fuelType = f.fuelType;
			if (f.gearbox?.length) params.gearbox = f.gearbox;
			if (f.color?.length) params.color = f.color;

			if (f.price?.min !== undefined && f.price?.min !== null) params.priceMin = f.price.min;
			if (f.price?.max !== undefined && f.price?.max !== null) params.priceMax = f.price.max;
			if (f.year?.from) params.yearFrom = f.year.from;
			if (f.year?.to) params.yearTo = f.year.to;
			if (f.mileage?.min) params.mileageMin = f.mileage.min;
			if (f.mileage?.max) params.mileageMax = f.mileage.max;
			if (f.sort) params.sort = f.sort;

			const queryString = new URLSearchParams(
				Object.entries(params).flatMap(([key, value]) => {
					if (Array.isArray(value)) {
						return value.map((v) => [key, String(v)]);
					}
					return [[key, String(value)]] as any;
				}),
			).toString();

			// Use window.location.pathname for consistency with parseFiltersFromUrl
			const basePath = typeof window !== "undefined" ? window.location.pathname : page.url.split("?")[0];
			return `${basePath}${queryString ? `?${queryString}` : ""}`;
		},
		[page.url],
	);

	const [filters, setFiltersState] = useState<VehicleFilters>(() => parseFiltersFromUrl());

	const setFilters = (next: Partial<VehicleFilters>) => {
		setFiltersState((prev) => {
			const merged: VehicleFilters = { ...prev, ...next } as VehicleFilters;
			if (next.make !== undefined && next.make !== prev.make) {
				merged.model = undefined;
			}
			const newUrl = buildUrlFromFilters(merged);
			window.history.pushState({}, "", newUrl);
			return merged;
		});
	};

	React.useEffect(() => {
		const handler = () => {
			setFiltersState(parseFiltersFromUrl());
		};
		window.addEventListener("popstate", handler);
		return () => window.removeEventListener("popstate", handler);
	}, [parseFiltersFromUrl]);

	React.useEffect(() => {
		// Only redirect to stock-cars if currently on used-cars or new-cars routes
		// Once on stock-cars, stay there even if vehicleAge filter changes
		const currentPath = page.url.split("?")[0];
		const isOnSpecificRoute = currentPath.includes("/vehicles/used-cars") || currentPath.includes("/vehicles/new-cars");

		if (isOnSpecificRoute) {
			const queryString = page.url.split("?")[1];
			const stockCarsUrl = `/vehicles/stock-cars${queryString ? `?${queryString}` : ""}`;
			router.visit(stockCarsUrl, { replace: true });
		}
	}, [page.url, filters.vehicleAge]);

	// trick the theme to force white mode under all divs
	React.useEffect(() => {
		document.body.classList.add("overwrite-white-mode");
		return () => {
			document.body.classList.remove("overwrite-white-mode");
		};
	}, []);

	return (
		<LayoutListingsContext.Provider value={{ filters, setFilters }}>
			<AppLayout withFooter classNameShell="md:bg-factory-white relative flex w-full flex-col overflow-hidden" classNameHeader="md:relative absolute" className="gap-0 px-0">
				<Head title={title} />

				{isListingsRoute && (
					<div id="hero-header-info" className="relative inset-0 flex w-full items-center justify-center">
						<div
							id="hero-header-bg"
							className="from-header-gradient-primary to-header-gradient-secondary absolute -inset-x-5 inset-y-0 mx-auto max-w-7xl rounded-lg bg-linear-to-t from-40% px-12 content-['']"
						/>
						<div id="hero-header-content" className="relative z-20 flex min-h-80 flex-col items-center justify-center gap-4 px-4 text-center md:px-0">
							<span className="space-y-2">
								<h1 className="font-headlines text-3xl font-extrabold -tracking-[0.2rem] uppercase md:text-7xl md:-tracking-[0.4rem]">Used cars</h1>
								<p className="text-base">Buy high quality cars from rated, reviewed and trusted dealers</p>
							</span>

							<div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
								<Button
									disabled
									className="h-12 w-full bg-black px-10 text-base font-extrabold text-cyan-400 transition-colors duration-200 ease-in-out hover:bg-black/80 md:w-auto dark:bg-black dark:text-cyan-400 hover:dark:bg-black/80"
								>
									Select a car
								</Button>
								<Button
									disabled
									className="bg-black-rgb/50 hover:bg-black-rgb/70 dark:bg-black-rgb/50 hover:dark:bg-black-rgb/70 h-12 w-full rounded-sm px-10 text-base font-extrabold text-black transition-colors duration-200 ease-in-out md:w-auto"
								>
									Browse used cars
								</Button>
							</div>
						</div>
						<div id="hero-frame-media" className="absolute inset-0 flex justify-center">
							<span className="relative w-full max-w-240">
								<img
									alt="kia sportage side view"
									className="absolute top-15 right-0 block h-78 translate-x-full transform"
									src="https://deals.carwow.co.uk/image?filter%5Bbrand_slug%5D=kia&filter%5Bmodel_review_slug%5D=sportage-2022&filter%5Bsize%5D=medium&filter%5Bzoom_type%5D=fullscreen"
								/>
								<img
									alt="kia sportage side view reverse"
									className="absolute top-15 right-auto left-0 block h-78 -translate-x-full transform"
									src="https://deals.carwow.co.uk/image?filter%5Bbrand_slug%5D=kia&filter%5Bmodel_review_slug%5D=sportage-2022&filter%5Bsize%5D=medium&filter%5Bzoom_type%5D=fullscreen"
								/>
							</span>
						</div>
					</div>
				)}

				<div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-0">
					{isListingsOrStockRoute ? (
						<div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
							<aside>
								<VehicleFiltersSidebar />
							</aside>

							<div className="min-h-screen">{children}</div>
						</div>
					) : (
						<div className="min-h-screen">{children}</div>
					)}
				</div>
			</AppLayout>
		</LayoutListingsContext.Provider>
	);
}
