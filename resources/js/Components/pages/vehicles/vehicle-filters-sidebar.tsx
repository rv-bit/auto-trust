import { usePage } from "@inertiajs/react";
import { useState } from "react";

import type { VehicleFilters, VehiclePageProps } from "@/types/routes/listings";
import { BodyStyle, COLORS, EQUIPMENT_OPTIONS, EXTRA_FEATURES, FuelType, Gearbox, SAFETY_RATINGS, VehicleAge } from "@/types/routes/listings";

import { useSavedVehicleSearches } from "@/hooks/vehicles/useSavedVehicleSearches";
import { useFilterCounts } from "@/hooks/vehicles/useVehicleFilterCounts";
import type { VehicleFilters as ApiVehicleFilters } from "@/hooks/vehicles/useVehicles";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useLayoutListings } from "@/layouts/vehicles/listings/layout";

import { BookmarkCheck, BookmarkPlus } from "lucide-react";

interface VehicleFiltersSidebarProps {
	className?: string;
}

const VEHICLE_AGE_OPTIONS = [
	{ value: VehicleAge.ALL, label: "All" },
	{ value: VehicleAge.NEW, label: "New" },
	{ value: VehicleAge.NEARLY_NEW, label: "Nearly New" },
	{ value: VehicleAge.USED, label: "Used" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);

export function VehicleFiltersSidebar({ className }: VehicleFiltersSidebarProps) {
	const { props } = usePage<VehiclePageProps>();
	const { saveSearch, savedSearches } = useSavedVehicleSearches();
	const [justSaved, setJustSaved] = useState(false);

	const filter_options = props.filter_options || {
		bodyStyles: [],
		fuelTypes: [],
		gearboxes: [],
		colors: [],
		conditions: [],
		priceRange: { min: 0, max: 100000 },
		yearRange: { min: 1990, max: new Date().getFullYear() },
		mileageRange: { min: 0, max: 200000 },
	};

	const vehicleMakes = props.vehicle_makes || [];
	const vehicleModels = props.vehicle_models || [];

	const { filters, setFilters } = useLayoutListings();

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
	};

	const { data: filterCounts } = useFilterCounts(apiFilters);

	const availableMakeSlugs = filterCounts?.makes ? Object.keys(filterCounts.makes).filter((slug) => filterCounts.makes[slug] > 0) : vehicleMakes.map((m) => m.slug);
	const availableModelSlugs = filterCounts?.models ? Object.keys(filterCounts.models).filter((slug) => filterCounts.models[slug] > 0) : vehicleModels.map((m) => m.slug);

	const updateFilters = (newFilters: Partial<VehicleFilters>) => {
		const updated = { ...filters, ...newFilters } as VehicleFilters;
		setFilters(updated);
	};

	const toggleArrayFilter = <K extends keyof VehicleFilters>(key: K, value: string) => {
		const currentArray = (filters[key] as string[]) || [];
		const newArray = currentArray.includes(value) ? currentArray.filter((v) => v !== value) : [...currentArray, value];

		updateFilters({ [key]: newArray.length > 0 ? newArray : undefined });
	};

	const clearFilters = () => {
		const basePath = window.location.pathname;
		window.history.pushState({}, "", basePath);

		setFilters({
			make: undefined,
			model: undefined,
			bodyStyle: undefined,
			fuelType: undefined,
			gearbox: undefined,
			color: undefined,
			vehicleAge: undefined,
			price: undefined,
			year: undefined,
			mileage: undefined,
			postcode: undefined,
			radius: undefined,
			safetyRating: undefined,
			specification: undefined,
			extras: undefined,
		});
	};

	const handleSaveSearch = () => {
		// Only save if there are meaningful filters (at least make or model selected)
		if (filters.make || filters.model || filters.bodyStyle || filters.fuelType || filters.price || filters.year) {
			saveSearch(filters);
			setJustSaved(true);
			setTimeout(() => setJustSaved(false), 2000);
		}
	};

	// Check if current search is already saved
	const currentSearchId = `${filters.make || "all"}-${filters.model || "all"}`;
	const isCurrentSearchSaved = savedSearches.some((search) => search.id === currentSearchId);

	return (
		<div className={className}>
			<div className="sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto rounded-lg border bg-white p-4 shadow-sm dark:border-gray-200 border-gray-200">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-bold">Filters</h2>
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={handleSaveSearch}
							disabled={!filters.make && !filters.model && !filters.bodyStyle && !filters.fuelType && !filters.price && !filters.year}
							className="flex items-center gap-1 dark:bg-white dark:text-black dark:hover:bg-gray-100"
						>
							{justSaved ? (
								<>
									<BookmarkCheck className="h-4 w-4" />
									<span className="hidden sm:inline">Saved</span>
								</>
							) : (
								<>
									<BookmarkPlus className="h-4 w-4" />
									<span className="hidden sm:inline">{isCurrentSearchSaved ? "Update" : "Save"}</span>
								</>
							)}
						</Button>
						<Button variant="ghost" size="sm" className="dark:bg-white dark:text-black dark:hover:bg-gray-100" onClick={clearFilters}>
							Clear all
						</Button>
					</div>
				</div>

				<Accordion type="multiple" defaultValue={["make", "model", "condition", "bodyStyle", "price", "location"]} className="space-y-2">
					<AccordionItem value="make" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Make</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								<Select
									value={filters.make || "__all__"}
									onValueChange={(v) => {
										if (v === "__all__") {
											updateFilters({ make: undefined, model: undefined });
										} else {
											updateFilters({ make: v, model: undefined });
										}
									}}
								>
									<SelectTrigger id="make-select" className="dark:border-gray-300">
										<SelectValue placeholder="Select make" />
									</SelectTrigger>
									<SelectContent className="dark:border-gray-200 dark:bg-white dark:text-black">
										<SelectItem value="__all__" className="dark:bg-white dark:text-black dark:hover:bg-gray-100">
											All Makes
										</SelectItem>
										{vehicleMakes
											.filter((make) => availableMakeSlugs.includes(make.slug))
											.map((make) => (
												<SelectItem key={make.id} value={make.slug} className="dark:bg-white dark:text-black dark:hover:bg-gray-100">
													{make.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="model" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Model</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								<Select
									value={filters.model || "__all__"}
									onValueChange={(v) => {
										if (v === "__all__") {
											updateFilters({ model: undefined });
										} else {
											updateFilters({ model: v });
										}
									}}
									disabled={!filters.make}
								>
									<SelectTrigger id="model-select" className="dark:border-gray-300">
										<SelectValue placeholder={filters.make ? "Select model" : "Select make first"} />
									</SelectTrigger>
									<SelectContent className="dark:border-gray-200 dark:bg-white dark:text-black">
										<SelectItem value="__all__" className="dark:bg-white dark:text-black dark:hover:bg-gray-100">
											All Models
										</SelectItem>
										{vehicleModels
											.filter((model) => availableModelSlugs.includes(model.slug))
											.filter((model) => {
												if (!filters.make) return true;
												const selectedMake = vehicleMakes.find((make) => make.slug === filters.make);
												return selectedMake && model.make_id == selectedMake.id;
											})
											.map((model) => (
												<SelectItem key={model.id} value={model.slug} className="dark:bg-white dark:text-black dark:hover:bg-gray-100">
													{model.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="location" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Location</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-3">
								<div>
									<Label htmlFor="postcode" className="text-xs">
										Postcode
									</Label>
									<Input
										id="postcode"
										type="text"
										placeholder="e.g. SW1A 1AA"
										className="dark:border-gray-300"
										value={filters.postcode || ""}
										onChange={(e) => updateFilters({ postcode: e.target.value || undefined })}
									/>
								</div>
								<div>
									<Label htmlFor="radius" className="text-xs">
										Radius (miles)
									</Label>
									<Select value={filters.radius?.toString() || "50"} onValueChange={(v) => updateFilters({ radius: parseInt(v) })}>
										<SelectTrigger id="radius" className="dark:border-gray-300">
											<SelectValue placeholder="50 miles" />
										</SelectTrigger>
										<SelectContent className="dark:border-gray-200 dark:bg-white dark:text-black">
											<SelectItem value="10" className="dark:bg-white dark:text-black dark:hover:bg-gray-100">
												10 miles
											</SelectItem>
											<SelectItem value="25" className="dark:bg-white dark:text-black dark:hover:bg-gray-100">
												25 miles
											</SelectItem>
											<SelectItem value="50" className="dark:bg-white dark:text-black dark:hover:bg-gray-100">
												50 miles
											</SelectItem>
											<SelectItem value="100" className="dark:bg-white dark:text-black dark:hover:bg-gray-100">
												100 miles
											</SelectItem>
											<SelectItem value="250" className="dark:bg-white dark:text-black dark:hover:bg-gray-100">
												250 miles
											</SelectItem>
											<SelectItem value="500" className="dark:bg-white dark:text-black dark:hover:bg-gray-100">
												500 miles
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="condition" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Condition</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{VEHICLE_AGE_OPTIONS.map((option) => (
									<div key={option.value} className="flex items-center space-x-2">
										<Checkbox
											id={`condition-${option.value}`}
											checked={filters.vehicleAge === option.value}
											className="data-[state=checked]:dark:bg-black data-[state=checked]:dark:text-white"
											onCheckedChange={() => updateFilters({ vehicleAge: option.value })}
										/>
										<Label htmlFor={`condition-${option.value}`} className="cursor-pointer text-sm font-normal">
											{option.label}
										</Label>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="price" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Price</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-3">
								<div className="grid grid-cols-2 gap-2">
									<div>
										<Label htmlFor="price-min" className="text-xs">
											Min
										</Label>
										<Input
											id="price-min"
											type="number"
											placeholder="£0"
											value={filters.price?.min || ""}
											className="dark:border-gray-300"
											onChange={(e) =>
												updateFilters({
													price: { ...filters.price, min: e.target.value ? parseInt(e.target.value) : null },
												})
											}
										/>
									</div>
									<div>
										<Label htmlFor="price-max" className="text-xs">
											Max
										</Label>
										<Input
											id="price-max"
											type="number"
											placeholder="£100,000"
											value={filters.price?.max || ""}
											className="dark:border-gray-300"
											onChange={(e) =>
												updateFilters({
													price: { ...filters.price, max: e.target.value ? parseInt(e.target.value) : null },
												})
											}
										/>
									</div>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="bodyStyle" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Body Style</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{filter_options.bodyStyles.map((style) => {
									const count = filterCounts?.bodyStyle?.[style.value] || style.count;
									return (
										<div key={style.value} className="flex items-center justify-between space-x-2">
											<div className="flex items-center space-x-2">
												<Checkbox
													id={`body-${style.value}`}
													checked={filters.bodyStyle?.includes(style.value as BodyStyle) || false}
													className="data-[state=checked]:dark:bg-black data-[state=checked]:dark:text-white"
													onCheckedChange={() => toggleArrayFilter("bodyStyle", style.value)}
													disabled={count === 0}
												/>
												<Label htmlFor={`body-${style.value}`} className={`cursor-pointer text-sm font-normal ${count === 0 ? "text-muted-foreground" : ""}`}>
													{style.label}
												</Label>
											</div>
											<span className="text-muted-foreground text-xs">{count.toLocaleString()}</span>
										</div>
									);
								})}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="fuelType" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Fuel Type</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{filter_options.fuelTypes.map((fuel) => {
									const count = filterCounts?.fuelType?.[fuel.value] || fuel.count;
									return (
										<div key={fuel.value} className="flex items-center justify-between space-x-2">
											<div className="flex items-center space-x-2">
												<Checkbox
													id={`fuel-${fuel.value}`}
													checked={filters.fuelType?.includes(fuel.value as FuelType) || false}
													className="data-[state=checked]:dark:bg-black data-[state=checked]:dark:text-white"
													onCheckedChange={() => toggleArrayFilter("fuelType", fuel.value)}
													disabled={count === 0}
												/>
												<Label htmlFor={`fuel-${fuel.value}`} className={`cursor-pointer text-sm font-normal ${count === 0 ? "text-muted-foreground" : ""}`}>
													{fuel.label}
												</Label>
											</div>
											<span className="text-muted-foreground text-xs">{count.toLocaleString()}</span>
										</div>
									);
								})}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="gearbox" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Gearbox</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{filter_options.gearboxes.map((gear) => {
									const count = filterCounts?.gearbox?.[gear.value] || gear.count;
									return (
										<div key={gear.value} className="flex items-center justify-between space-x-2">
											<div className="flex items-center space-x-2">
												<Checkbox
													id={`gear-${gear.value}`}
													checked={filters.gearbox?.includes(gear.value as Gearbox) || false}
													className="data-[state=checked]:dark:bg-black data-[state=checked]:dark:text-white"
													onCheckedChange={() => toggleArrayFilter("gearbox", gear.value)}
													disabled={count === 0}
												/>
												<Label htmlFor={`gear-${gear.value}`} className={`cursor-pointer text-sm font-normal ${count === 0 ? "text-muted-foreground" : ""}`}>
													{gear.label}
												</Label>
											</div>
											<span className="text-muted-foreground text-xs">{count.toLocaleString()}</span>
										</div>
									);
								})}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="year" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Year</AccordionTrigger>
						<AccordionContent>
							<div className="grid grid-cols-2 gap-2">
								<div>
									<Label htmlFor="year-from" className="text-xs">
										From
									</Label>
									<Select
										value={filters.year?.from?.toString()}
										onValueChange={(v) =>
											updateFilters({
												year: { ...filters.year!, from: parseInt(v), to: filters.year?.to || CURRENT_YEAR },
											})
										}
									>
										<SelectTrigger id="year-from" className="dark:border-gray-300">
											<SelectValue placeholder="Year" />
										</SelectTrigger>
										<SelectContent className="dark:border-gray-200 dark:bg-white dark:text-black">
											{YEARS.map((year) => (
												<SelectItem key={year} value={year.toString()} className="dark:bg-white dark:text-black dark:hover:bg-gray-100">
													{year}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label htmlFor="year-to" className="text-xs">
										To
									</Label>
									<Select
										value={filters.year?.to?.toString()}
										onValueChange={(v) =>
											updateFilters({
												year: { from: filters.year?.from || CURRENT_YEAR - 10, to: parseInt(v) },
											})
										}
									>
										<SelectTrigger id="year-to" className="dark:border-gray-300">
											<SelectValue placeholder="Year" />
										</SelectTrigger>
										<SelectContent className="dark:border-gray-200 dark:bg-white dark:text-black dark:hover:bg-gray-100">
											{YEARS.map((year) => (
												<SelectItem key={year} value={year.toString()} className="dark:bg-white dark:text-black dark:hover:bg-gray-100">
													{year}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="mileage" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Mileage</AccordionTrigger>
						<AccordionContent>
							<div className="grid grid-cols-2 gap-2">
								<div>
									<Label htmlFor="mileage-min" className="text-xs">
										Min
									</Label>
									<Input
										id="mileage-min"
										type="number"
										placeholder="0"
										className="dark:border-gray-300"
										value={filters.mileage?.min || ""}
										onChange={(e) =>
											updateFilters({
												mileage: { ...filters.mileage, min: e.target.value || null },
											})
										}
									/>
								</div>
								<div>
									<Label htmlFor="mileage-max" className="text-xs">
										Max
									</Label>
									<Input
										id="mileage-max"
										type="number"
										placeholder="200,000"
										value={filters.mileage?.max || ""}
										onChange={(e) =>
											updateFilters({
												mileage: { ...filters.mileage, max: e.target.value || null },
											})
										}
									/>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="color" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Color</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{COLORS.map((color) => (
									<div key={color.value} className="flex items-center space-x-2">
										<Checkbox
											id={`color-${color.value}`}
											checked={filters.color?.includes(color.value) || false}
											className="data-[state=checked]:dark:bg-black data-[state=checked]:dark:text-white"
											onCheckedChange={() => toggleArrayFilter("color", color.value)}
										/>
										<Label htmlFor={`color-${color.value}`} className="cursor-pointer text-sm font-normal">
											{color.label}
										</Label>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="safetyRating" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Safety Rating</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{SAFETY_RATINGS.map((rating) => (
									<div key={rating.value} className="flex items-center justify-between space-x-2">
										<div className="flex items-center space-x-2">
											<Checkbox
												id={`safety-${rating.value}`}
												checked={filters.safetyRating === rating.value}
												className="data-[state=checked]:dark:bg-black data-[state=checked]:dark:text-white"
												onCheckedChange={() => updateFilters({ safetyRating: rating.value })}
											/>
											<Label htmlFor={`safety-${rating.value}`} className="cursor-pointer text-sm font-normal">
												{rating.label}
											</Label>
										</div>
										{/* {rating.count && <span className="text-muted-foreground text-xs">{rating.count.toLocaleString()}</span>} */}
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="equipment" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Equipment</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{EQUIPMENT_OPTIONS.map((equipment) => (
									<div key={equipment.value} className="flex items-center justify-between space-x-2">
										<div className="flex items-center space-x-2">
											<Checkbox
												id={`equipment-${equipment.value}`}
												checked={filters.specification?.[equipment.value as keyof typeof filters.specification] || false}
												className="data-[state=checked]:dark:bg-black data-[state=checked]:dark:text-white"
												onCheckedChange={(checked) =>
													updateFilters({
														specification: { ...filters.specification, [equipment.value]: checked as boolean },
													})
												}
											/>
											<Label htmlFor={`equipment-${equipment.value}`} className="cursor-pointer text-sm font-normal">
												{equipment.label}
											</Label>
										</div>
										{/* <span className="text-muted-foreground text-xs">{equipment.count.toLocaleString()}</span> */}
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="extras" className="dark:border-gray-200">
						<AccordionTrigger className="text-sm font-semibold">Extra Features</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-2">
								{EXTRA_FEATURES.map((extra) => (
									<div key={extra.value} className="flex items-center space-x-2">
										<Checkbox
											id={`extra-${extra.value}`}
											checked={filters.extras?.[extra.value as keyof typeof filters.extras] || false}
											className="data-[state=checked]:dark:bg-black data-[state=checked]:dark:text-white"
											onCheckedChange={(checked) =>
												updateFilters({
													extras: { ...filters.extras, [extra.value]: checked as boolean },
												})
											}
										/>
										<Label htmlFor={`extra-${extra.value}`} className="cursor-pointer text-sm font-normal">
											{extra.label}
										</Label>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
