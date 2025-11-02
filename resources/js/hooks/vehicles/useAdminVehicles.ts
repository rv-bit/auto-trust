import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface AdminVehicleFilters {
	status?: "active" | "sold" | "inactive";
	search?: string;
	page?: number;
	per_page?: number;
}

export interface AdminVehicle {
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
	};
}

export interface AdminVehiclesResponse {
	data: AdminVehicle[];
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

export function useAdminVehicles(filters: AdminVehicleFilters = {}) {
	return useQuery<AdminVehiclesResponse>({
		queryKey: ["admin-vehicles", filters],
		queryFn: async () => {
			const params = new URLSearchParams();

			if (filters.status) params.append("status", filters.status);
			if (filters.search) params.append("search", filters.search);
			if (filters.page) params.append("page", filters.page.toString());
			if (filters.per_page) params.append("per_page", filters.per_page.toString());

			const response = await axios.get(`/api/admin/vehicles?${params.toString()}`);
			return response.data;
		},
	});
}
