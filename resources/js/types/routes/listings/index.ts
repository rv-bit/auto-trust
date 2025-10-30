import { SharedData } from "@/types";

export interface VehiclePageProps extends SharedData {
	vehicle_makes: Makes[];
	vehicle_models: Models[];
}

export interface Makes {
	id: string;
	name: string;
	slug: string;
	logo_url: string;
}

export interface Models {
	id: string;
	make_id: string;
	name: string;
	slug: string;
}

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

// Hardcoded filter options
export const BODY_STYLES = [
	{ value: BodyStyle.SUV, label: "SUV", count: 26121 },
	{ value: BodyStyle.HATCHBACK, label: "Hatchback", count: 14314 },
	{ value: BodyStyle.SALOON, label: "Saloon", count: 2186 },
	{ value: BodyStyle.ESTATE, label: "Estate", count: 2086 },
	{ value: BodyStyle.COUPE, label: "Coupe", count: 678 },
	{ value: BodyStyle.MPV, label: "MPV", count: 593 },
	{ value: BodyStyle.CONVERTIBLE, label: "Convertible", count: 587 },
];

export const FUEL_TYPES = [
	{ value: FuelType.PETROL, label: "Petrol", count: 28772 },
	{ value: FuelType.HYBRID, label: "Hybrid", count: 7326 },
	{ value: FuelType.DIESEL, label: "Diesel", count: 6791 },
	{ value: FuelType.ELECTRIC, label: "Electric", count: 3714 },
];

export const GEARBOX_OPTIONS = [
	{ value: Gearbox.AUTOMATIC, label: "Automatic", count: 29400 },
	{ value: Gearbox.MANUAL, label: "Manual", count: 17091 },
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
	{ value: DoorsCount.FRONT_AND_REAR, label: "Front & Rear", count: 44302 },
	{ value: DoorsCount.FRONT_ONLY, label: "Front Only", count: 2302 },
];

export const SAFETY_RATINGS = [
	{ value: SafetyRating.ANY, label: "Any" },
	{ value: SafetyRating.ONE_STAR_UP, label: "1 star & up", count: 32619 },
	{ value: SafetyRating.TWO_STARS_UP, label: "2 stars & up", count: 32535 },
	{ value: SafetyRating.THREE_STARS_UP, label: "3 stars & up", count: 32307 },
	{ value: SafetyRating.FOUR_STARS_UP, label: "4 stars & up", count: 31083 },
	{ value: SafetyRating.FIVE_STARS_UP, label: "5 stars & up", count: 24140 },
];

export const EQUIPMENT_OPTIONS = [
	{ value: "cruiseControl", label: "Cruise control", count: 44447 },
	{ value: "parkingSensors", label: "Parking Sensors", count: 39874 },
	{ value: "touchscreenInfotainment", label: "Touchscreen Infotainment", count: 38348 },
	{ value: "navigation", label: "Navigation", count: 35620 },
	{ value: "appleCarPlay", label: "Apple CarPlay", count: 35910 },
	{ value: "androidAuto", label: "Android Auto", count: 33247 },
	{ value: "parkingCamera", label: "Parking Camera", count: 29827 },
	{ value: "climateControl", label: "Climate control", count: 24665 },
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
