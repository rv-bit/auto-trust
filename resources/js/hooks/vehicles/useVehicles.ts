import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { index as api_vehicle_route } from "@/routes/vehicles";

export interface VehicleFilters {
	make?: string;
	model?: string;
	bodyStyle?: string[];
	fuelType?: string[];
	gearbox?: string[];
	color?: string[];
	vehicleAge?: string;
	priceMin?: number;
	priceMax?: number;
	yearFrom?: number;
	yearTo?: number;
	mileageMin?: number;
	mileageMax?: number;
	postcode?: string;
	radius?: number;
	safetyRating?: string;
	specification?: Record<string, boolean>;
	extras?: Record<string, boolean>;
	page?: number;
	per_page?: number;
	sort?: string;
}

export interface Vehicle {
	id: number;
	make_id: number;
	model_id: number;
	seller_id: number;
	year: number;
	price: number;
	mileage: number;
	color: string;
	body_style: string;
	fuel_type: string;
	gearbox: string;
	condition: string;
	postcode?: string;
	latitude?: number;
	longitude?: number;
	safety_rating?: number;
	specification?: Record<string, boolean>;
	extras?: Record<string, boolean>;
	description?: string;
	image_url?: string; // deprecated
	images?: string[];
	status: "active" | "sold" | "inactive";
	created_at: string;
	updated_at: string;
	make?: {
		id: number;
		name: string;
		slug: string;
	};
	model?: {
		id: number;
		name: string;
		slug: string;
	};
	seller?: {
		id: number;
		name: string;
		email: string;
		avatar?: string;
		created_at: string;
	};
}

export interface VehiclesResponse {
	data: Vehicle[];
	links: {
		first: string;
		last: string;
		prev: string | null;
		next: string | null;
	};
	meta: {
		current_page: number;
		from: number;
		last_page: number;
		links: Array<{
			url: string | null;
			label: string;
			active: boolean;
		}>;
		path: string;
		per_page: number;
		to: number;
		total: number;
	};
}

export function useVehicles(filters: VehicleFilters) {
	return useQuery<VehiclesResponse>({
		queryKey: ["vehicles", filters],
		queryFn: async () => {
			// Build query params object for axios
			const queryParams: Record<string, string | string[] | number> = {};

			Object.entries(filters).forEach(([key, value]) => {
				if (value === undefined || value === null || value === "") return;

				if (Array.isArray(value)) {
					// For arrays, keep them as arrays - axios will handle encoding
					queryParams[key] = value;
				} else if (typeof value === "object") {
					// For nested objects like specification/extras
					Object.entries(value).forEach(([k, v]) => {
						if (v) queryParams[`${key}[${k}]`] = String(v);
					});
				} else {
					queryParams[key] = value;
				}
			});

			const response = await axios.get<VehiclesResponse>(api_vehicle_route.definition.url, {
				params: queryParams,
			});

			return response.data;
		},
		staleTime: 1000 * 60 * 5, // 5 minutes - increased from 2 minutes
		gcTime: 1000 * 60 * 10, // 10 minutes - cache garbage collection time
	});
}
