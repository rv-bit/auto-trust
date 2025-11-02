import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type SortOption = "recommended" | "best_deal" | "closest" | "price_low_high" | "price_high_low" | "mileage_low" | "age_new_old" | "age_old_new";

interface SortDropdownProps {
	value: SortOption;
	onChange: (value: SortOption) => void;
	hasPostcode?: boolean; // Whether location/postcode filter is active
}

const sortOptions: { value: SortOption; label: string; requiresPostcode?: boolean }[] = [
	{ value: "recommended", label: "Recommended" },
	{ value: "best_deal", label: "Best deal score" },
	{ value: "closest", label: "Closest to you", requiresPostcode: true },
	{ value: "price_low_high", label: "Price: low to high" },
	{ value: "price_high_low", label: "Price: high to low" },
	{ value: "mileage_low", label: "Lowest mileage" },
	{ value: "age_new_old", label: "Age: new to old" },
	{ value: "age_old_new", label: "Age: old to new" },
];

export function VehicleSortDropdown({ value, onChange, hasPostcode = false }: SortDropdownProps) {
	const currentLabel = sortOptions.find((option) => option.value === value)?.label || "Sort by";

	const handleChange = (newValue: string) => {
		const option = sortOptions.find((opt) => opt.value === newValue);

		// Don't allow selecting "closest" if no postcode is set
		if (option?.requiresPostcode && !hasPostcode) {
			return;
		}

		onChange(newValue as SortOption);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="min-w-[200px] justify-between">
					{currentLabel}
					<ChevronDown className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[200px]">
				<div className="p-2">
					<h3 className="mb-2 text-sm font-semibold">Sort by</h3>
					<DropdownMenuRadioGroup value={value} onValueChange={handleChange}>
						{sortOptions.map((option) => {
							const isDisabled = option.requiresPostcode && !hasPostcode;

							return (
								<DropdownMenuRadioItem key={option.value} value={option.value} className="cursor-pointer" disabled={isDisabled}>
									<span className={isDisabled ? "text-muted-foreground" : ""}>
										{option.label}
										{isDisabled && <span className="ml-1 text-xs">(set location)</span>}
									</span>
								</DropdownMenuRadioItem>
							);
						})}
					</DropdownMenuRadioGroup>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
