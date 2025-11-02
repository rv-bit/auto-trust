import { useEffect, useState } from "react";

import { Link } from "@inertiajs/react";

import type { VehicleFilters as ApiVehicleFilters } from "@/hooks/vehicles/useVehicles";
import { useVehicles } from "@/hooks/vehicles/useVehicles";

import { VehicleImageCarousel } from "@/components/pages/vehicles/vehicle-image-carousel";
import { VehicleSortDropdown, type SortOption } from "@/components/pages/vehicles/vehicle-sort-dropdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import Layout, { useLayoutListings } from "@/layouts/vehicles/listings/layout";

import { Calendar, ChevronLeft, ChevronRight, Fuel, Gauge, MapPin } from "lucide-react";

function Page() {
	const { filters, setFilters } = useLayoutListings();

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setCurrentPage(1);
	}, [
		filters.make,
		filters.model,
		filters.bodyStyle,
		filters.fuelType,
		filters.gearbox,
		filters.color,
		filters.vehicleAge,
		filters.price,
		filters.year,
		filters.mileage,
		filters.postcode,
		filters.radius,
		filters.sort,
	]);

	const handleSortChange = (sort: SortOption) => {
		setFilters({ sort });
	};

	const apiFilters: ApiVehicleFilters = {
		make: filters.make,
		model: filters.model,
		bodyStyle: filters.bodyStyle,
		fuelType: filters.fuelType,
		gearbox: filters.gearbox,
		color: filters.color,
		vehicleAge: filters.vehicleAge,
		priceMin: filters.price?.min ?? undefined,
		priceMax: filters.price?.max ?? undefined,
		yearFrom: filters.year?.from,
		yearTo: filters.year?.to,
		mileageMin: filters.mileage?.min ? Number(filters.mileage.min) : undefined,
		mileageMax: filters.mileage?.max ? Number(filters.mileage.max) : undefined,
		postcode: filters.postcode,
		radius: filters.radius,
		safetyRating: filters.safetyRating,
		specification: filters.specification,
		extras: filters.extras,
		sort: filters.sort,
		page: currentPage,
		per_page: 12,
	};

	const { data: vehiclesData, isLoading, error, refetch } = useVehicles(apiFilters);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="container mx-auto">
			<div className="mb-6 flex items-center justify-between">
				<div>{vehiclesData && <p className="text-muted-foreground mt-2">{vehiclesData.meta.total.toLocaleString()} vehicles found</p>}</div>
				<VehicleSortDropdown value={(filters.sort as SortOption) || "recommended"} onChange={handleSortChange} hasPostcode={!!filters.postcode} />
			</div>

			<main>
				{error && (
					<div className="border-destructive bg-destructive/10 text-destructive rounded-lg border p-4">
						<p className="font-semibold">Error loading vehicles</p>
						<p className="text-sm">{error.message}</p>
					</div>
				)}

				{isLoading && (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
						{Array.from({ length: 6 }).map((_, i) => (
							<Card key={i} className="overflow-hidden">
								<Skeleton className="h-48 w-full" />
								<CardHeader>
									<Skeleton className="h-6 w-3/4" />
									<Skeleton className="mt-2 h-4 w-1/2" />
								</CardHeader>
								<CardContent>
									<Skeleton className="h-4 w-full" />
									<Skeleton className="mt-2 h-4 w-full" />
									<Skeleton className="mt-2 h-4 w-2/3" />
								</CardContent>
							</Card>
						))}
					</div>
				)}

				{!isLoading && vehiclesData && vehiclesData.data.length === 0 && (
					<div className="rounded-lg border border-dashed p-12 text-center">
						<p className="text-muted-foreground text-lg font-semibold">No vehicles found</p>
						<p className="text-muted-foreground mt-2 text-sm">Try adjusting your filters to see more results</p>
					</div>
				)}

				{!isLoading && vehiclesData && vehiclesData.data.length > 0 && (
					<>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
							{vehiclesData.data.map((vehicle) => (
								<Link key={vehicle.id} href={`/vehicles/details/${vehicle.id}`}>
									<Card className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg">
										<VehicleImageCarousel images={vehicle.images || []} alt={`${vehicle.make?.name} ${vehicle.model?.name}`} className="h-48" />

										<CardHeader>
											<CardTitle className="line-clamp-1">
												{vehicle.make?.name} {vehicle.model?.name}
											</CardTitle>
											<CardDescription className="flex items-center gap-1">
												<Calendar className="h-3 w-3" />
												{vehicle.year}
											</CardDescription>
										</CardHeader>

										<CardContent>
											<div className="text-muted-foreground mb-4 grid grid-cols-2 gap-2 text-sm">
												<div className="flex items-center gap-1">
													<Gauge className="h-4 w-4" />
													{vehicle.mileage.toLocaleString()} miles
												</div>
												<div className="flex items-center gap-1">
													<Fuel className="h-4 w-4" />
													{vehicle.fuel_type}
												</div>
											</div>

											<div className="flex items-center justify-between">
												<div className="text-2xl font-bold">£{vehicle.price.toLocaleString()}</div>
												{vehicle.postcode && (
													<div className="text-muted-foreground flex items-center gap-1 text-xs">
														<MapPin className="h-3 w-3" />
														{vehicle.postcode.split(" ")[0]}
													</div>
												)}
											</div>
										</CardContent>

										<CardFooter>
											<Button className="w-full" variant="outline">
												View Details
											</Button>
										</CardFooter>
									</Card>
								</Link>
							))}
						</div>

						{/* Pagination */}
						{vehiclesData.meta.last_page > 1 && (
							<div className="mt-8 flex items-center justify-center gap-2">
								<Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
									<ChevronLeft className="h-4 w-4" />
								</Button>

								<div className="flex items-center gap-1">
									{Array.from({ length: vehiclesData.meta.last_page }, (_, i) => i + 1)
										.filter((page) => {
											// Show first, last, current, and adjacent pages
											return page === 1 || page === vehiclesData.meta.last_page || Math.abs(page - currentPage) <= 1;
										})
										.map((page, index, array) => {
											// Add ellipsis if there's a gap
											const prevPage = array[index - 1];
											const showEllipsis = prevPage && page - prevPage > 1;

											return (
												<div key={page} className="flex items-center gap-1">
													{showEllipsis && <span className="text-muted-foreground px-2">...</span>}
													<Button variant={page === currentPage ? "default" : "outline"} size="sm" onClick={() => handlePageChange(page)}>
														{page}
													</Button>
												</div>
											);
										})}
								</div>

								<Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === vehiclesData.meta.last_page}>
									<ChevronRight className="h-4 w-4" />
								</Button>
							</div>
						)}
					</>
				)}
			</main>
		</div>
	);
}

Page.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default Page;
