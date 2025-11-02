import { Link } from "@inertiajs/react";

import { stockCars } from "@/routes/vehicles";

import type { VehicleFilters } from "@/types/routes/listings";

import { useSavedVehicleSearches } from "@/hooks/vehicles/useSavedVehicleSearches";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Calendar, Fuel, Palette, Search, Settings, X } from "lucide-react";

export function SavedVehicleSearches() {
	const { savedSearches, removeSearch, clearAllSearches } = useSavedVehicleSearches();

	if (savedSearches.length === 0) {
		return null;
	}

	return (
		<div className="w-full px-4 pb-10">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-lg font-semibold text-gray-900">Recent Searches</h2>
				{savedSearches.length > 0 && (
					<Button variant="ghost" size="sm" onClick={clearAllSearches} className="text-sm text-gray-600 hover:text-gray-900">
						Clear all
					</Button>
				)}
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{savedSearches.map((search) => (
					<SavedSearchCard key={search.id} search={search} onRemove={removeSearch} />
				))}
			</div>
		</div>
	);
}

interface SavedSearchCardProps {
	search: {
		id: string;
		make?: string;
		model?: string;
		filters: VehicleFilters;
		savedAt: string;
		label: string;
	};
	onRemove: (id: string) => void;
}

function SavedSearchCard({ search, onRemove }: SavedSearchCardProps) {
	// Build the URL with filters
	const buildStockCarsUrl = () => {
		const params = new URLSearchParams();

		const { filters } = search;

		if (filters.make) params.append("make", filters.make);
		if (filters.model) params.append("model", filters.model);
		if (filters.bodyStyle && filters.bodyStyle.length > 0) {
			filters.bodyStyle.forEach((bs) => params.append("bodyStyle[]", bs));
		}
		if (filters.fuelType && filters.fuelType.length > 0) {
			filters.fuelType.forEach((ft) => params.append("fuelType[]", ft));
		}
		if (filters.gearbox && filters.gearbox.length > 0) {
			filters.gearbox.forEach((gb) => params.append("gearbox[]", gb));
		}
		if (filters.color && filters.color.length > 0) {
			filters.color.forEach((c) => params.append("color[]", c));
		}
		if (filters.vehicleAge) params.append("vehicleAge", filters.vehicleAge);
		if (filters.price?.min) params.append("price[min]", filters.price.min.toString());
		if (filters.price?.max) params.append("price[max]", filters.price.max.toString());
		if (filters.year?.from) params.append("year[from]", filters.year.from.toString());
		if (filters.year?.to) params.append("year[to]", filters.year.to.toString());
		if (filters.mileage?.min) params.append("mileage[min]", filters.mileage.min.toString());
		if (filters.mileage?.max) params.append("mileage[max]", filters.mileage.max.toString());
		if (filters.postcode) params.append("postcode", filters.postcode);
		if (filters.radius) params.append("radius", filters.radius.toString());
		if (filters.safetyRating) params.append("safetyRating", filters.safetyRating);
		if (filters.sort) params.append("sort", filters.sort);

		return `${stockCars().url}?${params.toString()}`;
	};

	const handleRemove = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onRemove(search.id);
	};

	// Get filter badges to display
	const getFilterBadges = () => {
		const badges: { icon: React.ReactNode; label: string }[] = [];
		const { filters } = search;

		if (filters.year?.from || filters.year?.to) {
			const yearLabel =
				filters.year?.from && filters.year?.to && filters.year.from === filters.year.to
					? `${filters.year.from}`
					: filters.year?.from && filters.year?.to
						? `${filters.year.from}-${filters.year.to}`
						: filters.year?.from
							? `From ${filters.year.from}`
							: `Up to ${filters.year.to}`;
			badges.push({ icon: <Calendar className="h-3 w-3" />, label: yearLabel });
		}

		if (filters.fuelType && filters.fuelType.length > 0) {
			const fuelLabel = filters.fuelType.map((ft) => ft.charAt(0).toUpperCase() + ft.slice(1)).join(", ");
			badges.push({ icon: <Fuel className="h-3 w-3" />, label: fuelLabel });
		}

		if (filters.gearbox && filters.gearbox.length > 0) {
			const gearboxLabel = filters.gearbox.map((gb) => gb.charAt(0).toUpperCase() + gb.slice(1)).join(", ");
			badges.push({ icon: <Settings className="h-3 w-3" />, label: gearboxLabel });
		}

		if (filters.color && filters.color.length > 0 && filters.color.length <= 2) {
			const colorLabel = filters.color.map((c) => c.charAt(0).toUpperCase() + c.slice(1).replace("_", " ")).join(", ");
			badges.push({ icon: <Palette className="h-3 w-3" />, label: colorLabel });
		}

		return badges;
	};

	const filterBadges = getFilterBadges();
	const savedDate = new Date(search.savedAt);
	const isToday = new Date().toDateString() === savedDate.toDateString();
	const timeAgo = isToday ? "Today" : savedDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

	return (
		<Card className="group relative h-96 overflow-hidden transition-all hover:shadow-md">
			<Link href={buildStockCarsUrl()}>
				<CardHeader className="pb-3">
					<div className="flex items-start justify-between gap-2">
						<div className="min-w-0 flex-1">
							<CardTitle className="line-clamp-1 text-base font-semibold">{search.label}</CardTitle>
							<CardDescription className="mt-1 text-xs">{timeAgo}</CardDescription>
						</div>
						<Button variant="ghost" size="icon" onClick={handleRemove} className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
							<X className="h-4 w-4" />
							<span className="sr-only">Remove search</span>
						</Button>
					</div>
				</CardHeader>

				<CardContent className="space-y-3">
					{filterBadges.length > 0 && (
						<div className="flex flex-wrap gap-1.5">
							{filterBadges.map((badge, index) => (
								<Badge key={index} variant="secondary" className="flex items-center gap-1 text-xs font-normal">
									{badge.icon}
									<span>{badge.label}</span>
								</Badge>
							))}
						</div>
					)}

					<div className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
						<Search className="h-4 w-4" />
						<span>View results</span>
					</div>
				</CardContent>
			</Link>
		</Card>
	);
}
