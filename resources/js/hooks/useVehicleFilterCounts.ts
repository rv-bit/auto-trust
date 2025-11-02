import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { VehicleFilters } from "./useVehicles";
import { filterCounts as api_filter_counts_route } from "@/routes/vehicles";

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
			// Build query params object for the route helper
			const queryParams: Record<string, string | string[]> = {};

			Object.entries(filters).forEach(([key, value]) => {
				if (value === undefined || value === null || value === "") return;

				if (Array.isArray(value)) {
					queryParams[key] = value;
				} else if (typeof value === "object") {
					// For nested objects like specification/extras
					Object.entries(value).forEach(([k, v]) => {
						if (v) queryParams[`${key}[${k}]`] = String(v);
					});
				} else {
					queryParams[key] = String(value);
				}
			});

			const response = await axios.get<FilterCounts>(api_filter_counts_route.url(queryParams));
			return response.data;
		},
		staleTime: 1000 * 60 * 1, // 1 minute
	});
}
