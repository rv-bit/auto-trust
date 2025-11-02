import axios from "axios";
import { Check, CheckCircle2, ChevronsUpDown, Loader2, X as XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { CreateVehicleInput } from "@/schemas/listings";
import { BODY_STYLES, COLORS, EQUIPMENT_OPTIONS, EXTRA_FEATURES, FUEL_TYPES, GEARBOX_OPTIONS, Makes, Models } from "@/types/routes/listings";

import { geocode as api_vehicle_geocode_route } from "@/routes/vehicles";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VehicleFormComponentsProps {
	form: UseFormReturn<CreateVehicleInput>;
	makes: Array<Makes>;
	models: Array<Models>;
}

// Vehicle Make Field
export function VehicleMakeField({ form, makes }: Pick<VehicleFormComponentsProps, "form" | "makes">) {
	const [open, setOpen] = useState(false);

	return (
		<FormField
			control={form.control}
			name="make_id"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Make (required)</FormLabel>
						<FormDescription className="text-sm text-gray-500">Select vehicle manufacturer</FormDescription>
					</span>
					<FormControl className="w-full flex-1">
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild className="text-muted-foreground hover:text-foreground w-full rounded-sm shadow-none">
								<Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
									{field.value ? makes.find((m) => parseInt(m.id) === field.value)?.name : "Select make"}
									<ChevronsUpDown className="opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent align="start" className="w-full p-0">
								<Command>
									<CommandInput placeholder="Search make..." className="w-full rounded-none border-0 p-0 focus:ring-0" containerClassName="px-1" />
									<CommandList>
										<CommandEmpty>No make found.</CommandEmpty>
										<CommandGroup className="max-h-[200px] overflow-y-auto">
											{makes.map((make) => (
												<CommandItem
													key={make.id}
													value={make.name}
													onSelect={() => {
														form.setValue("make_id", parseInt(make.id), { shouldValidate: true });
														form.setValue("model_id", 0);
														setOpen(false);
													}}
													className="items-center justify-between gap-2"
												>
													{make.name}
													<Check className={cn("w-fit", { "opacity-0": field.value !== parseInt(make.id) })} />
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export function VehicleModelField({ form, models }: Pick<VehicleFormComponentsProps, "form" | "models">) {
	const [open, setOpen] = useState(false);
	const [hasMakeId, setHasMakeId] = useState(false);

	const makeId = form.watch("make_id");

	// Filter models based on selected make
	const filteredModels = useMemo(() => (makeId ? models.filter((m) => parseInt(m.make_id) === makeId) : []), [hasMakeId, makeId]);

	// Reset model when make changes
	useEffect(() => {
		const subscription = form.watch((value, { name }) => {
			if (name === "make_id") {
				setHasMakeId(!hasMakeId);
			}
		});
		return () => subscription.unsubscribe();
	}, [form]);

	return (
		<FormField
			control={form.control}
			name="model_id"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Model (required)</FormLabel>
						<FormDescription className="text-sm text-gray-500">Select vehicle model</FormDescription>
					</span>
					<FormControl className="w-full flex-1">
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild className="text-muted-foreground hover:text-foreground w-full rounded-sm shadow-none" disabled={!makeId || filteredModels.length === 0}>
								<Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
									{field.value ? filteredModels.find((m) => parseInt(m.id) === field.value)?.name : "Select model"}
									<ChevronsUpDown className="opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent align="start" className="w-full p-0">
								<Command>
									<CommandInput placeholder="Search model..." className="w-full rounded-none border-0 p-0 focus:ring-0" containerClassName="px-1" />
									<CommandList>
										<CommandEmpty>No model found.</CommandEmpty>
										<CommandGroup className="max-h-[200px] overflow-y-auto">
											{filteredModels.map((model) => (
												<CommandItem
													key={model.id}
													value={model.name}
													onSelect={() => {
														form.setValue("model_id", parseInt(model.id), { shouldValidate: true });
														setOpen(false);
													}}
													className="items-center justify-between gap-2"
												>
													{model.name}
													<Check className={cn("w-fit", { "opacity-0": field.value !== parseInt(model.id) })} />
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Body Style Field
export function VehicleBodyStyleField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormField
			control={form.control}
			name="body_style"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Body Style (required)</FormLabel>
						<FormDescription className="text-sm text-gray-500">Select vehicle body type</FormDescription>
					</span>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className="w-full rounded-sm">
								<SelectValue placeholder="Select body style" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{BODY_STYLES.map((style) => (
								<SelectItem key={style.value} value={style.value}>
									{style.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Fuel Type Field
export function VehicleFuelTypeField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormField
			control={form.control}
			name="fuel_type"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Fuel Type (required)</FormLabel>
						<FormDescription className="text-sm text-gray-500">Select fuel type</FormDescription>
					</span>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className="w-full rounded-sm">
								<SelectValue placeholder="Select fuel type" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{FUEL_TYPES.map((fuel) => (
								<SelectItem key={fuel.value} value={fuel.value}>
									{fuel.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Gearbox Field
export function VehicleGearboxField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormField
			control={form.control}
			name="gearbox"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Gearbox (required)</FormLabel>
						<FormDescription className="text-sm text-gray-500">Select transmission type</FormDescription>
					</span>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className="w-full rounded-sm">
								<SelectValue placeholder="Select gearbox" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{GEARBOX_OPTIONS.map((gearbox) => (
								<SelectItem key={gearbox.value} value={gearbox.value}>
									{gearbox.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Color Field
export function VehicleColorField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormField
			control={form.control}
			name="color"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Color (required)</FormLabel>
						<FormDescription className="text-sm text-gray-500">Select vehicle color</FormDescription>
					</span>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className="w-full rounded-sm">
								<SelectValue placeholder="Select color" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{COLORS.map((color) => (
								<SelectItem key={color.value} value={color.value}>
									{color.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Year Field
export function VehicleYearField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormField
			control={form.control}
			name="year"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Year (required)</FormLabel>
						<FormDescription className="text-sm text-gray-500">Manufacturing year</FormDescription>
					</span>
					<FormControl className="flex-1">
						<Input {...field} type="number" min={1900} max={new Date().getFullYear()} onChange={(e) => field.onChange(parseInt(e.target.value))} className="rounded-sm p-3" />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Mileage Field
export function VehicleMileageField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormField
			control={form.control}
			name="mileage"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Mileage (required)</FormLabel>
						<FormDescription className="text-sm text-gray-500">Total miles driven</FormDescription>
					</span>
					<FormControl className="flex-1">
						<Input {...field} type="number" min={0} onChange={(e) => field.onChange(parseInt(e.target.value))} className="rounded-sm p-3" />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Price Field
export function VehiclePriceField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormField
			control={form.control}
			name="price"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Price (required)</FormLabel>
						<FormDescription className="text-sm text-gray-500">Listing price in GBP</FormDescription>
					</span>
					<FormControl className="flex-1">
						<Input {...field} type="number" min={0} onChange={(e) => field.onChange(parseInt(e.target.value))} className="rounded-sm p-3" />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Doors Field
export function VehicleDoorsField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormField
			control={form.control}
			name="doors"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Doors (required)</FormLabel>
						<FormDescription className="text-sm text-gray-500">Number of doors (2-6)</FormDescription>
					</span>
					<FormControl className="flex-1">
						<Input {...field} type="number" min={2} max={6} onChange={(e) => field.onChange(parseInt(e.target.value))} className="rounded-sm p-3" />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Seats Field
export function VehicleSeatsField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormField
			control={form.control}
			name="seats"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Seats</FormLabel>
						<FormDescription className="text-sm text-gray-500">Number of seats (optional)</FormDescription>
					</span>
					<FormControl className="flex-1">
						<Input
							{...field}
							type="number"
							min={1}
							value={field.value || ""}
							onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
							className="rounded-sm p-3"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Boot Space Field
export function VehicleBootSpaceField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormField
			control={form.control}
			name="boot_space"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Boot Space</FormLabel>
						<FormDescription className="text-sm text-gray-500">Boot capacity (e.g., 500L)</FormDescription>
					</span>
					<FormControl className="flex-1">
						<Input {...field} value={field.value || ""} className="rounded-sm p-3" />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Engine Field
export function VehicleEngineField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormField
			control={form.control}
			name="engine"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Engine</FormLabel>
						<FormDescription className="text-sm text-gray-500">Engine size/type (e.g., 2.0L)</FormDescription>
					</span>
					<FormControl className="flex-1">
						<Input {...field} value={field.value || ""} className="rounded-sm p-3" />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Postcode Field
export function VehiclePostcodeField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	const [isValidating, setIsValidating] = useState(false);
	const [isValid, setIsValid] = useState<boolean | null>(null);
	const [validationMessage, setValidationMessage] = useState<string>("");

	const handlePostcodeBlur = async (postcode: string) => {
		if (!postcode || postcode.length < 5) {
			setIsValid(null);
			setValidationMessage("");
			return;
		}

		setIsValidating(true);
		setIsValid(null);
		setValidationMessage("");

		try {
			const response = await axios.get(api_vehicle_geocode_route.url({ postcode }));
			const data = response.data;

			if (response.status === 200 && data.latitude && data.longitude) {
				setIsValid(true);
				setValidationMessage(`Location verified: ${data.formatted_address || postcode}`);

				if (form.getValues("latitude") !== undefined) {
					form.setValue("latitude", data.latitude);
					form.setValue("longitude", data.longitude);
				}
			} else {
				setIsValid(false);
				setValidationMessage(data.message || "Could not verify postcode");
			}
		} catch (error) {
			setIsValid(false);
			setValidationMessage("Error validating postcode");
		} finally {
			setIsValidating(false);
		}
	};

	return (
		<FormField
			control={form.control}
			name="postcode"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Postcode (required)</FormLabel>
						<FormDescription className="text-sm text-gray-500">Vehicle location postcode</FormDescription>
					</span>
					<FormControl className="flex-1">
						<div className="relative w-full">
							<Input
								{...field}
								className="rounded-sm p-3 pr-10"
								onBlur={(e) => {
									field.onBlur();
									handlePostcodeBlur(e.target.value);
								}}
								placeholder="e.g., SW1A 1AA"
							/>
							{isValidating && <Loader2 className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 animate-spin text-gray-400" />}
							{!isValidating && isValid === true && <CheckCircle2 className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-green-600" />}
							{!isValidating && isValid === false && <XIcon className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-red-600" />}
						</div>
					</FormControl>
					{validationMessage && <p className={cn("text-sm", isValid === true ? "text-green-600" : "text-red-600")}>{validationMessage}</p>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Safety Rating Field
export function VehicleSafetyRatingField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormField
			control={form.control}
			name="safety_rating"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Safety Rating</FormLabel>
						<FormDescription className="text-sm text-gray-500">Star rating (1-5)</FormDescription>
					</span>
					<Select onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)} value={field.value?.toString()}>
						<FormControl>
							<SelectTrigger className="w-full rounded-sm">
								<SelectValue placeholder="Select rating" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectItem value="1">1 Star</SelectItem>
							<SelectItem value="2">2 Stars</SelectItem>
							<SelectItem value="3">3 Stars</SelectItem>
							<SelectItem value="4">4 Stars</SelectItem>
							<SelectItem value="5">5 Stars</SelectItem>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

// Extra Features Field
export function VehicleExtraFeaturesField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-3">
			<span className="flex flex-col items-start justify-start">
				<FormLabel className="text-base">Extra Features</FormLabel>
				<FormDescription className="text-sm text-gray-500">Select additional features</FormDescription>
			</span>
			<div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
				{EXTRA_FEATURES.map((feature) => (
					<FormField
						key={feature.value}
						control={form.control}
						name={`extras.${feature.value}` as `extras.${keyof NonNullable<CreateVehicleInput["extras"]>}`}
						render={({ field }) => (
							<FormItem className="flex items-center space-y-0 space-x-2">
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<FormLabel className="cursor-pointer text-sm font-normal">{feature.label}</FormLabel>
							</FormItem>
						)}
					/>
				))}
			</div>
			<FormMessage />
		</FormItem>
	);
}

// Specification Field
export function VehicleSpecificationField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	return (
		<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-3">
			<span className="flex flex-col items-start justify-start">
				<FormLabel className="text-base">Specification</FormLabel>
				<FormDescription className="text-sm text-gray-500">Select vehicle specifications</FormDescription>
			</span>
			<div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
				{EQUIPMENT_OPTIONS.map((spec) => (
					<FormField
						key={spec.value}
						control={form.control}
						name={`specification.${spec.value}` as `specification.${keyof NonNullable<CreateVehicleInput["specification"]>}`}
						render={({ field }) => (
							<FormItem className="flex items-center space-y-0 space-x-2">
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<FormLabel className="cursor-pointer text-sm font-normal">{spec.label}</FormLabel>
							</FormItem>
						)}
					/>
				))}
			</div>
			<FormMessage />
		</FormItem>
	);
}

// Constants for image validation
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/webp"];
export const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

// Images Field
export function VehicleImagesField({ form }: Pick<VehicleFormComponentsProps, "form">) {
	const handleAddImages = async () => {
		if (!window.showOpenFilePicker) return; // unsupported browsers

		try {
			const fileHandles = await window.showOpenFilePicker({
				multiple: true,
				types: [
					{
						description: "Image Files",
						accept: { "image/*": [".png", ".webp"] },
					},
				],
			});

			const files = await Promise.all(fileHandles.map((handle: any) => handle.getFile()));
			const currentImages = form.getValues("images") || [];

			if (files.some((file: File) => !ACCEPTED_IMAGE_TYPES.includes(file.type))) {
				return form.setError("images", { type: "manual", message: "Invalid file type. Only PNG, and WEBP are allowed." });
			}

			if (files.some((file: File) => file.size > MAX_FILE_SIZE_BYTES)) {
				return form.setError("images", { type: "manual", message: `File size must be less than ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB.` });
			}

			if (currentImages.length + files.length > 8) {
				return form.setError("images", { type: "manual", message: "Maximum of 8 images allowed." });
			}

			form.setValue("images", [...currentImages, ...files], { shouldValidate: true });
		} catch (err) {
			console.error("File selection cancelled or failed:", err);
		}
	};

	return (
		<FormField
			control={form.control}
			name="images"
			render={({ field }) => (
				<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
					<span className="flex flex-col items-start justify-start">
						<FormLabel className="text-base">Images</FormLabel>
						<FormDescription className="text-sm text-gray-500">Upload vehicle images. PNG or WEBP under 2MB (up to 8 images)</FormDescription>
					</span>

					<span className="flex w-full items-center justify-start gap-2 overflow-x-auto p-1">
						<Button
							type="button"
							onClick={handleAddImages}
							className="size-50 flex-col rounded-sm bg-transparent p-3 text-black ring ring-black/20 transition-colors duration-200 ease-linear hover:bg-gray-200"
						>
							<svg className="size-10 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
								<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
							</svg>
							Upload Image
						</Button>

						{form.getValues("images") && form.getValues("images")!.length > 0 && (
							<div className="flex gap-2">
								{form.getValues("images")?.map((file: File, index: number) => (
									<div key={index} className="relative flex size-50 items-center justify-center rounded-md bg-gray-200">
										<img src={URL.createObjectURL(file)} alt={`Vehicle ${index + 1}`} className="h-full w-full rounded-md object-cover" />
										<Button
											type="button"
											onClick={() => {
												const images = form.getValues("images") || [];
												const newImages = images.filter((_, i) => i !== index);
												form.setValue("images", newImages, { shouldValidate: true });
											}}
											variant="link"
											className="absolute top-0 left-0 size-fit w-full justify-end hover:no-underline"
										>
											<XIcon size={20} className="text-gray-700" />
										</Button>
									</div>
								))}
							</div>
						)}
					</span>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
