import { filterCounts as api_filter_counts_route } from "@/routes/vehicles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { VehicleFilters } from "./useVehicles";

export interface FilterCounts {
	bodyStyle: Record<string, number>;
	fuelType: Record<string, number>;
	gearbox: Record<string, number>;
	color: Record<string, number>;
	vehicleAge: Record<string, number>;
	makes: Record<string, number>;
	models: Record<string, number>;
}

export function useFilterCounts(filters: VehicleFilters) {
	return useQuery<FilterCounts>({
		queryKey: ["filter-counts", filters],
		queryFn: async () => {
			const queryParams: Record<string, string | string[] | number> = {};

			Object.entries(filters).forEach(([key, value]) => {
				if (value === undefined || value === null || value === "") return;

				if (Array.isArray(value)) {
					// For arrays, keep them as arrays - axios will handle encoding
					if (value.length > 0) {
						queryParams[key] = value;
					}
				} else if (typeof value === "object") {
					// For nested objects like specification/extras
					Object.entries(value).forEach(([k, v]) => {
						if (v) queryParams[`${key}[${k}]`] = String(v);
					});
				} else {
					queryParams[key] = value;
				}
			});

			const response = await axios.get<FilterCounts>(api_filter_counts_route.definition.url, {
				params: queryParams,
			});

			return response.data;
		},
		staleTime: 0, // Always fetch fresh data to ensure counts are accurate
		gcTime: 1000 * 60 * 5, // Keep in cache for 5 minutes
	});
}
