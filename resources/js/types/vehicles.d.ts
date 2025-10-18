import { z } from "zod";

export enum BodyStyle {
	SUV = "suv",
	HATCHBACK = "hatchback",
	SALOON = "saloon",
	ESTATE = "estate",
	COUPE = "coupe",
	MPV = "mpv",
	CONVERTIBLE = "convertible",
}

export enum FuelType {
	PETROL = "petrol",
	HYBRID = "hybrid",
	DIESEL = "diesel",
	ELECTRIC = "electric",
}

export enum Gearbox {
	AUTOMATIC = "automatic",
	MANUAL = "manual",
}

export enum VehicleColor {
	BLACK = "black",
	BLUE = "blue",
	BROWN = "brown",
	GOLD = "gold",
	GREEN = "green",
	GREY = "grey",
	MULTI_COLOUR = "multi_colour",
	ORANGE = "orange",
	BEIGE = "beige",
}

export enum DoorsCount {
	FRONT_AND_REAR = "front_and_rear",
	FRONT_ONLY = "front_only",
}

export enum SafetyRating {
	ANY = "any",
	ONE_STAR_UP = "1_star_up",
	TWO_STARS_UP = "2_stars_up",
	THREE_STARS_UP = "3_stars_up",
	FOUR_STARS_UP = "4_stars_up",
	FIVE_STARS_UP = "5_stars_up",
}

export enum PaymentType {
	CASH = "cash",
	MONTHLY_LEASE = "monthly_lease",
}

export enum VehicleAge {
	ALL = "all",
	NEW = "new",
	USED = "used",
}

// Database Models
export interface VehicleMake {
	id: number;
	name: string;
	slug: string;
	logo_url?: string;
	created_at: string;
	updated_at: string;
}

export interface VehicleModel {
	id: number;
	make_id: number;
	name: string;
	slug: string;
	created_at: string;
	updated_at: string;
}

export interface VehicleExtraFeatures {
	climateControl: boolean;
	twoOrMoreKeys: boolean;
	satnav: boolean;
	sunroof: boolean;
	towBar: boolean;
	lockingWheelNut: boolean;
	spareWheel: boolean;
	wheelToolkit: boolean;
	androidAuto: boolean;
	appleCarPlay: boolean;
	cruiseControl: boolean;
}

export interface VehicleSpecification {
	cruiseControl: boolean;
	parkingSensors: boolean;
	touchscreenInfotainment: boolean;
	navigation: boolean;
	appleCarPlay: boolean;
	androidAuto: boolean;
	parkingCamera: boolean;
	climateControl: boolean;
}

export interface Vehicle {
	id: number;
	make_id: number;
	model_id: number;
	body_style: BodyStyle;
	fuel_type: FuelType;
	gearbox: Gearbox;
	color: VehicleColor;
	year: number;
	mileage: number;
	price: number;
	doors: number;
	seats?: number;
	boot_space?: string;
	engine?: string;
	latitude?: number;
	longitude?: number;
	postcode: string;
	extras?: VehicleExtraFeatures;
	specification?: VehicleSpecification;
	safety_rating?: number;
	image_url?: string;
	seller_id: number;
	status: "active" | "sold" | "inactive";
	created_at: string;
	updated_at: string;
	make?: VehicleMake;
	model?: VehicleModel;
}

export interface PriceRange {
	min?: number | null;
	max?: number | null;
}

export interface YearRange {
	from: number;
	to: number;
}

export interface MileageRange {
	min?: string | null;
	max?: string | null;
}

export interface EngineRange {
	min?: string | null;
	max?: string | null;
}

export interface SeatsRange {
	min?: number | null;
	max?: number | null;
}

export interface BootSpaceRange {
	min?: string | null;
	max?: string | null;
}

export interface VehicleFilters {
	postcode?: string;
	location?: string;
	make?: string;
	model?: string;
	bodyStyle?: BodyStyle[];
	fuelType?: FuelType[];
	gearbox?: Gearbox[];
	electricRange?: string;
	engine?: EngineRange;
	paymentType?: PaymentType;
	price?: PriceRange;
	vehicleAge?: VehicleAge;
	year?: YearRange;
	mileage?: MileageRange;
	color?: VehicleColor[];
	doors?: DoorsCount;
	seats?: SeatsRange;
	bootSpace?: BootSpaceRange;
	extras?: Partial<VehicleExtraFeatures>;
	specification?: Partial<VehicleSpecification>;
	safetyRating?: SafetyRating;
}

export interface PaginatedResponse<T> {
	data: T[];
	meta: {
		total: number;
		per_page: number;
		current_page: number;
		last_page: number;
		from: number;
		to: number;
	};
}

// Zod Validation Schemas

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
	bodyStyle: z.array(z.nativeEnum(BodyStyle)).optional(),
	fuelType: z.array(z.nativeEnum(FuelType)).optional(),
	gearbox: z.array(z.nativeEnum(Gearbox)).optional(),
	electricRange: z.string().optional(),
	price: PriceRangeSchema.optional(),
	vehicleAge: z.nativeEnum(VehicleAge).optional(),
	year: YearRangeSchema.optional(),
	color: z.array(z.nativeEnum(VehicleColor)).optional(),
	safetyRating: z.nativeEnum(SafetyRating).optional(),
});

export const VehicleExtraFeaturesSchema = z.object({
	climateControl: z.boolean().default(false),
	twoOrMoreKeys: z.boolean().default(false),
	satnav: z.boolean().default(false),
	sunroof: z.boolean().default(false),
	towBar: z.boolean().default(false),
	lockingWheelNut: z.boolean().default(false),
	spareWheel: z.boolean().default(false),
	wheelToolkit: z.boolean().default(false),
	androidAuto: z.boolean().default(false),
	appleCarPlay: z.boolean().default(false),
	cruiseControl: z.boolean().default(false),
});

export const VehicleSpecificationSchema = z.object({
	cruiseControl: z.boolean().default(false),
	parkingSensors: z.boolean().default(false),
	touchscreenInfotainment: z.boolean().default(false),
	navigation: z.boolean().default(false),
	appleCarPlay: z.boolean().default(false),
	androidAuto: z.boolean().default(false),
	parkingCamera: z.boolean().default(false),
	climateControl: z.boolean().default(false),
});

export const CreateVehicleSchema = z.object({
	make_id: z.number().int().positive("Make is required"),
	model_id: z.number().int().positive("Model is required"),
	body_style: z.nativeEnum(BodyStyle),
	fuel_type: z.nativeEnum(FuelType),
	gearbox: z.nativeEnum(Gearbox),
	color: z.nativeEnum(VehicleColor),
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
	image_url: z.string().url().optional(),
});

export const UpdateVehicleSchema = CreateVehicleSchema.partial();

export type CreateVehicleInput = z.infer<typeof CreateVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof UpdateVehicleSchema>;
export type VehicleFiltersInput = z.infer<typeof VehicleFiltersSchema>;

// Hardcoded filter options
export const BODY_STYLES = [
	{ value: BodyStyle.SUV, label: "SUV" },
	{ value: BodyStyle.HATCHBACK, label: "Hatchback" },
	{ value: BodyStyle.SALOON, label: "Saloon" },
	{ value: BodyStyle.ESTATE, label: "Estate" },
	{ value: BodyStyle.COUPE, label: "Coupe" },
	{ value: BodyStyle.MPV, label: "MPV" },
	{ value: BodyStyle.CONVERTIBLE, label: "Convertible" },
];

export const FUEL_TYPES = [
	{ value: FuelType.PETROL, label: "Petrol" },
	{ value: FuelType.HYBRID, label: "Hybrid" },
	{ value: FuelType.DIESEL, label: "Diesel" },
	{ value: FuelType.ELECTRIC, label: "Electric" },
];

export const GEARBOX_OPTIONS = [
	{ value: Gearbox.AUTOMATIC, label: "Automatic" },
	{ value: Gearbox.MANUAL, label: "Manual" },
];

export const COLORS = [
	{ value: VehicleColor.BLACK, label: "Black" },
	{ value: VehicleColor.BLUE, label: "Blue" },
	{ value: VehicleColor.BROWN, label: "Brown" },
	{ value: VehicleColor.GOLD, label: "Gold" },
	{ value: VehicleColor.GREEN, label: "Green" },
	{ value: VehicleColor.GREY, label: "Grey" },
	{ value: VehicleColor.MULTI_COLOUR, label: "Multi colour" },
	{ value: VehicleColor.ORANGE, label: "Orange" },
	{ value: VehicleColor.BEIGE, label: "Beige" },
];

export const DOORS_OPTIONS = [
	{ value: DoorsCount.FRONT_AND_REAR, label: "Front & Rear" },
	{ value: DoorsCount.FRONT_ONLY, label: "Front Only" },
];

export const SAFETY_RATINGS = [
	{ value: SafetyRating.ANY, label: "Any" },
	{ value: SafetyRating.ONE_STAR_UP, label: "1 star & up" },
	{ value: SafetyRating.TWO_STARS_UP, label: "2 stars & up" },
	{ value: SafetyRating.THREE_STARS_UP, label: "3 stars & up" },
	{ value: SafetyRating.FOUR_STARS_UP, label: "4 stars & up" },
	{ value: SafetyRating.FIVE_STARS_UP, label: "5 stars & up" },
];

export const EQUIPMENT_OPTIONS = [
	{ value: "cruiseControl", label: "Cruise control" },
	{ value: "parkingSensors", label: "Parking Sensors" },
	{ value: "touchscreenInfotainment", label: "Touchscreen Infotainment" },
	{ value: "navigation", label: "Navigation" },
	{ value: "appleCarPlay", label: "Apple CarPlay" },
	{ value: "androidAuto", label: "Android Auto" },
	{ value: "parkingCamera", label: "Parking Camera" },
	{ value: "climateControl", label: "Climate control" },
];

export const EXTRA_FEATURES = [
	{ value: "climateControl", label: "Climate control" },
	{ value: "twoOrMoreKeys", label: "2 or more keys" },
	{ value: "satnav", label: "Satnav" },
	{ value: "sunroof", label: "Sunroof" },
	{ value: "towBar", label: "Tow bar" },
	{ value: "lockingWheelNut", label: "Locking wheel nut" },
	{ value: "spareWheel", label: "Spare wheel" },
	{ value: "wheelToolkit", label: "Wheel toolkit" },
	{ value: "androidAuto", label: "Android Auto" },
	{ value: "appleCarPlay", label: "Apple CarPlay" },
	{ value: "cruiseControl", label: "Cruise control" },
];
