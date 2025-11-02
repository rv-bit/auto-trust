import type { VehicleFilters } from "@/types/routes/listings";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface SavedVehicleSearch {
	id: string; // make-model combination as unique identifier
	make?: string;
	model?: string;
	filters: VehicleFilters;
	savedAt: string;
	label: string; // Display name for the search
}

const STORAGE_KEY = "saved-vehicle-searches";

export function useSavedVehicleSearches() {
	const [savedSearches, setSavedSearches] = useLocalStorage<SavedVehicleSearch[]>(STORAGE_KEY, []);

	const saveSearch = useCallback(
		(filters: VehicleFilters, label?: string) => {
			// Create unique ID based on make and model
			const searchId = `${filters.make || "all"}-${filters.model || "all"}`;

			// Generate a label if not provided
			const displayLabel = label || generateSearchLabel(filters);

			const newSearch: SavedVehicleSearch = {
				id: searchId,
				make: filters.make,
				model: filters.model,
				filters,
				savedAt: new Date().toISOString(),
				label: displayLabel,
			};

			setSavedSearches((prevSearches) => {
				// Check if a search with the same make/model already exists
				const existingIndex = prevSearches.findIndex((search) => search.id === searchId);

				if (existingIndex !== -1) {
					// Replace existing search with the same make/model
					const updatedSearches = [...prevSearches];
					updatedSearches[existingIndex] = newSearch;
					return updatedSearches;
				} else {
					// Add new search
					return [...prevSearches, newSearch];
				}
			});

			return newSearch;
		},
		[setSavedSearches],
	);

	const removeSearch = useCallback(
		(searchId: string) => {
			setSavedSearches((prevSearches) => prevSearches.filter((search) => search.id !== searchId));
		},
		[setSavedSearches],
	);

	const clearAllSearches = useCallback(() => {
		setSavedSearches([]);
	}, [setSavedSearches]);

	const getSearch = useCallback(
		(searchId: string) => {
			return savedSearches.find((search) => search.id === searchId);
		},
		[savedSearches],
	);

	return {
		savedSearches,
		saveSearch,
		removeSearch,
		clearAllSearches,
		getSearch,
	};
}

// Helper function to generate a display label for the search
function generateSearchLabel(filters: VehicleFilters): string {
	const parts: string[] = [];

	if (filters.make) {
		parts.push(filters.make.charAt(0).toUpperCase() + filters.make.slice(1));
	}

	if (filters.model) {
		parts.push(filters.model.charAt(0).toUpperCase() + filters.model.slice(1));
	}

	// Add some key filters to the label
	if (filters.price) {
		if (filters.price.min && filters.price.max) {
			parts.push(`£${filters.price.min.toLocaleString()}-£${filters.price.max.toLocaleString()}`);
		} else if (filters.price.min) {
			parts.push(`From £${filters.price.min.toLocaleString()}`);
		} else if (filters.price.max) {
			parts.push(`Up to £${filters.price.max.toLocaleString()}`);
		}
	}

	if (filters.year) {
		if (filters.year.from && filters.year.to && filters.year.from === filters.year.to) {
			parts.push(`${filters.year.from}`);
		} else if (filters.year.from && filters.year.to) {
			parts.push(`${filters.year.from}-${filters.year.to}`);
		}
	}

	if (filters.fuelType && filters.fuelType.length > 0) {
		parts.push(filters.fuelType.map((ft) => ft.charAt(0).toUpperCase() + ft.slice(1)).join("/"));
	}

	if (filters.gearbox && filters.gearbox.length > 0) {
		parts.push(filters.gearbox.map((gb) => gb.charAt(0).toUpperCase() + gb.slice(1)).join("/"));
	}

	return parts.length > 0 ? parts.join(" • ") : "Custom Search";
}
