import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface UserVehicleFilters {
	status?: "active" | "sold" | "inactive";
	page?: number;
	per_page?: number;
}

export interface UserVehicle {
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
	status: "active" | "sold" | "inactive";
	images?: string[];
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
}

export interface UserVehiclesResponse {
	data: UserVehicle[];
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

/**
 * Hook to fetch current user's posted vehicles
 */
export function useUserVehicles(filters: UserVehicleFilters = {}) {
	return useQuery<UserVehiclesResponse>({
		queryKey: ["user-vehicles", filters],
		queryFn: async () => {
			const params = new URLSearchParams();

			if (filters.status) params.append("status", filters.status);
			if (filters.page) params.append("page", filters.page.toString());
			if (filters.per_page) params.append("per_page", filters.per_page.toString());

			const response = await axios.get(`/api/vehicles/my-vehicles?${params.toString()}`);
			return response.data;
		},
	});
}

/**
 * Hook to update vehicle status
 */
export function useUpdateVehicleStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ vehicleId, status }: { vehicleId: number; status: "active" | "inactive" | "sold" }) => {
			const response = await axios.patch(`/api/vehicles/${vehicleId}/status`, { status });
			return response.data;
		},
		onSuccess: () => {
			// Invalidate and refetch user vehicles
			queryClient.invalidateQueries({ queryKey: ["user-vehicles"] });
		},
	});
}

/**
 * Hook to delete a vehicle
 */
export function useDeleteVehicle() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (vehicleId: number) => {
			const response = await axios.delete(`/api/vehicles/${vehicleId}`);
			return response.data;
		},
		onSuccess: () => {
			// Invalidate and refetch user vehicles
			queryClient.invalidateQueries({ queryKey: ["user-vehicles"] });
		},
	});
}
