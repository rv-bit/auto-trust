import { zodResolver } from "@hookform/resolvers/zod";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { store as api_vehicle_store_route, dashboard as vehicle_dashboard_route } from "@/routes/vehicles";

import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";

import { CreateVehicleSchema, type CreateVehicleInput } from "@/schemas/listings";
import { BodyStyle, FuelType, Gearbox, VehicleColor, type VehiclePageProps } from "@/types/routes/listings";

import {
	ACCEPTED_IMAGE_TYPES,
	MAX_FILE_SIZE_BYTES,
	VehicleBodyStyleField,
	VehicleBootSpaceField,
	VehicleColorField,
	VehicleDoorsField,
	VehicleEngineField,
	VehicleExtraFeaturesField,
	VehicleFuelTypeField,
	VehicleGearboxField,
	VehicleImagesField,
	VehicleMakeField,
	VehicleMileageField,
	VehicleModelField,
	VehiclePostcodeField,
	VehiclePriceField,
	VehicleSafetyRatingField,
	VehicleSeatsField,
	VehicleSpecificationField,
	VehicleYearField,
} from "./list-vehicle-form-fields";

interface ListVehicleFormProps {
	setNewVehicleListingModal: (isOpen: boolean) => void;
}

export default function ListVehicleForm({ setNewVehicleListingModal }: ListVehicleFormProps) {
	const page = usePage<VehiclePageProps>();

	const vehicle_makes = page.props.vehicle_makes;
	const vehicle_models = page.props.vehicle_models;

	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<CreateVehicleInput>({
		mode: "onChange",
		resolver: zodResolver(CreateVehicleSchema),
		defaultValues: {
			make_id: 0,
			model_id: 0,
			body_style: BodyStyle.HATCHBACK,
			fuel_type: FuelType.PETROL,
			gearbox: Gearbox.MANUAL,
			color: VehicleColor.GREY,
			year: new Date().getFullYear(),
			mileage: 0,
			price: 0,
			doors: 4,
			seats: undefined,
			boot_space: undefined,
			engine: undefined,
			postcode: "",
			latitude: undefined,
			longitude: undefined,
			extras: {
				climateControl: false,
				twoOrMoreKeys: false,
				satnav: false,
				sunroof: false,
				towBar: false,
				lockingWheelNut: false,
				spareWheel: false,
				wheelToolkit: false,
				androidAuto: false,
				appleCarPlay: false,
				cruiseControl: false,
			},
			specification: {
				cruiseControl: false,
				parkingSensors: false,
				touchscreenInfotainment: false,
				navigation: false,
				appleCarPlay: false,
				androidAuto: false,
				parkingCamera: false,
				climateControl: false,
			},
			safety_rating: undefined,
			images: [],
		},
	});

	function onSubmit(values: CreateVehicleInput) {
		if (values.images?.some((img: File) => !ACCEPTED_IMAGE_TYPES.includes(img.type))) {
			return form.setError("images", { type: "manual", message: "Invalid file type. Only JPEG, PNG, and WEBP are allowed." });
		}

		if (values.images?.some((img: File) => img.size > MAX_FILE_SIZE_BYTES)) {
			return form.setError("images", { type: "manual", message: `File size must be less than ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB.` });
		}

		if ((values.images?.length ?? 0) > 10) {
			return form.setError("images", { type: "manual", message: "Maximum of 10 images allowed." });
		}

		setIsSubmitting(true);

		const formData = new FormData();

		// Add all form fields except images
		Object.entries(values).forEach(([key, value]) => {
			if (key !== "images" && value !== undefined && value !== null) {
				if (typeof value === "object") {
					formData.append(key, JSON.stringify(value));
				} else {
					formData.append(key, String(value));
				}
			}
		});

		// Add images
		if (values.images && values.images.length > 0) {
			values.images.forEach((image, index) => {
				formData.append(`images[${index}]`, image);
			});
		}

		// Submit to backend
		axios
			.post(api_vehicle_store_route.url(), formData)
			.then((response) => response.data)
			.then((data) => {
				if (data.id) {
					router.visit(vehicle_dashboard_route.url());
				}
			})
			.catch((error) => {
				console.error("Error submitting vehicle:", error);

				form.setError("images", { type: "manual", message: "Failed to upload vehicle. Please try again." });
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					form.handleSubmit(onSubmit)(e);
				}}
				className="flex h-full w-full flex-col justify-end sm:gap-4"
			>
				<div className="max-h-full flex-1 overflow-auto pb-16 max-sm:pb-20">
					<span className="flex h-full w-full flex-col justify-start gap-4 overflow-x-hidden p-4">
						<VehicleMakeField form={form} makes={vehicle_makes} />
						<VehicleModelField form={form} models={vehicle_models} />

						<VehicleBodyStyleField form={form} />
						<VehicleFuelTypeField form={form} />
						<VehicleGearboxField form={form} />
						<VehicleColorField form={form} />
						<VehicleYearField form={form} />
						<VehicleMileageField form={form} />
						<VehiclePriceField form={form} />
						<VehicleDoorsField form={form} />
						<VehicleSeatsField form={form} />
						<VehicleBootSpaceField form={form} />
						<VehicleEngineField form={form} />
						<VehiclePostcodeField form={form} />
						<VehicleSafetyRatingField form={form} />
						<VehicleExtraFeaturesField form={form} />
						<VehicleSpecificationField form={form} />
						<VehicleImagesField form={form} />
					</span>
				</div>

				<span className="sticky bottom-0 left-0 flex h-fit gap-2 border-t border-gray-200 bg-white p-4 max-sm:flex-col sm:flex-row sm:justify-end">
					<Button
						type="button"
						variant={"link"}
						onClick={() => {
							setNewVehicleListingModal(false);
						}}
					>
						Close
					</Button>
					<Button type="submit" disabled={isSubmitting} className="group relative size-auto min-w-30 overflow-hidden rounded-sm bg-black/80 p-2 px-5 disabled:cursor-not-allowed">
						<div className="absolute -left-16 h-[100px] w-10 -rotate-45 bg-linear-to-r from-white/10 via-white/50 to-white/10 blur-sm duration-700 group-hover:left-[150%] group-hover:delay-200 group-hover:duration-700" />
						<div className="flex items-center justify-center">
							{isSubmitting ? (
								<>
									<svg className="mr-2 h-5 w-5 animate-spin ..." viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>

									<span className="after:content-['...']">Processing</span>
								</>
							) : (
								<span>Save</span>
							)}
						</div>
					</Button>
				</span>
			</form>
		</Form>
	);
}
