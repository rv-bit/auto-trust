import { z } from "zod";

import { BodyStyle, FuelType, Gearbox, SafetyRating, VehicleAge, VehicleColor } from "@/types/routes/listings";

export const PriceRangeSchema = z
	.object({
		min: z.number().min(0).optional().nullable(),
		max: z.number().min(0).optional().nullable(),
	})
	.refine((data) => !data.min || !data.max || data.min <= data.max, { message: "Min price must be less than max price", path: ["max"] });

export const YearRangeSchema = z
	.object({
		from: z.number().min(1900).max(new Date().getFullYear()),
		to: z.number().min(1900).max(new Date().getFullYear()),
	})
	.refine((data) => data.from <= data.to, { message: "From year must be less than or equal to to year", path: ["to"] });

export const VehicleFiltersSchema = z.object({
	postcode: z.string().max(10).optional(),
	location: z.string().optional(),
	make: z.string().optional(),
	model: z.string().optional(),
	bodyStyle: z.array(z.enum(BodyStyle)).optional(),
	fuelType: z.array(z.enum(FuelType)).optional(),
	gearbox: z.array(z.enum(Gearbox)).optional(),
	electricRange: z.string().optional(),
	price: PriceRangeSchema.optional(),
	vehicleAge: z.enum(VehicleAge).optional(),
	year: YearRangeSchema.optional(),
	color: z.array(z.enum(VehicleColor)).optional(),
	safetyRating: z.enum(SafetyRating).optional(),
});

export const VehicleExtraFeaturesSchema = z.object({
	climateControl: z.boolean(),
	twoOrMoreKeys: z.boolean(),
	satnav: z.boolean(),
	sunroof: z.boolean(),
	towBar: z.boolean(),
	lockingWheelNut: z.boolean(),
	spareWheel: z.boolean(),
	wheelToolkit: z.boolean(),
	androidAuto: z.boolean(),
	appleCarPlay: z.boolean(),
	cruiseControl: z.boolean(),
});

export const VehicleSpecificationSchema = z.object({
	cruiseControl: z.boolean(),
	parkingSensors: z.boolean(),
	touchscreenInfotainment: z.boolean(),
	navigation: z.boolean(),
	appleCarPlay: z.boolean(),
	androidAuto: z.boolean(),
	parkingCamera: z.boolean(),
	climateControl: z.boolean(),
});

export const CreateVehicleSchema = z.object({
	make_id: z.number().int().positive("Make is required"),
	model_id: z.number().int().positive("Model is required"),
	body_style: z.enum(BodyStyle),
	fuel_type: z.enum(FuelType),
	gearbox: z.enum(Gearbox),
	color: z.enum(VehicleColor),
	year: z.number().int().min(1900).max(new Date().getFullYear()),
	mileage: z.number().int().min(0),
	price: z.number().int().min(0),
	doors: z.number().int().min(2).max(6),
	seats: z.number().int().min(1).optional(),
	boot_space: z.string().optional(),
	engine: z.string().optional(),
	postcode: z.string().min(2).max(10),
	latitude: z.number().optional(),
	longitude: z.number().optional(),
	extras: VehicleExtraFeaturesSchema.optional(),
	specification: VehicleSpecificationSchema.optional(),
	safety_rating: z.number().int().min(1).max(5).optional(),
	images: z.array(z.instanceof(File)).optional(),
});

export const UpdateVehicleSchema = CreateVehicleSchema.partial();

export type CreateVehicleInput = z.infer<typeof CreateVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof UpdateVehicleSchema>;
export type VehicleFiltersInput = z.infer<typeof VehicleFiltersSchema>;
