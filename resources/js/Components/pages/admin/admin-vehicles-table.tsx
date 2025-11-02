import { Link } from "@inertiajs/react";
import { useState } from "react";

import { useAdminVehicles, type AdminVehicle } from "@/hooks/vehicles/useAdminVehicles";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ChevronLeft, ChevronRight, Eye, Search } from "lucide-react";

export function AdminVehiclesTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<"active" | "sold" | "inactive" | undefined>(undefined);
	const [perPage, setPerPage] = useState(20);

	const {
		data: vehiclesData,
		isLoading,
		error,
	} = useAdminVehicles({
		page: currentPage,
		per_page: perPage,
		status: statusFilter,
		search: searchTerm,
	});

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		setCurrentPage(1); // Reset to first page on search
	};

	const handleStatusFilter = (value: string) => {
		setStatusFilter(value === "all" ? undefined : (value as "active" | "sold" | "inactive"));
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const getStatusBadgeVariant = (status: string) => {
		switch (status) {
			case "active":
				return "default";
			case "sold":
				return "secondary";
			case "inactive":
				return "outline";
			default:
				return "default";
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-1 items-center gap-2">
					<div className="relative max-w-sm flex-1">
						<Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
						<Input type="search" placeholder="Search by ID, make, model, or seller..." className="pl-8" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} />
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Select value={statusFilter || "all"} onValueChange={handleStatusFilter}>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="All Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="active">Active</SelectItem>
							<SelectItem value="sold">Sold</SelectItem>
							<SelectItem value="inactive">Inactive</SelectItem>
						</SelectContent>
					</Select>
					<Select value={perPage.toString()} onValueChange={(v) => setPerPage(parseInt(v))}>
						<SelectTrigger className="w-auto">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10 / page</SelectItem>
							<SelectItem value="20">20 / page</SelectItem>
							<SelectItem value="50">50 / page</SelectItem>
							<SelectItem value="100">100 / page</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{error && (
				<div className="border-destructive bg-destructive/10 text-destructive rounded-lg border p-4">
					<p className="font-semibold">Error loading vehicles</p>
					<p className="text-sm">{error.message}</p>
				</div>
			)}

			{isLoading && (
				<div className="rounded-lg border">
					<div className="p-4">
						<Skeleton className="h-8 w-full" />
					</div>
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="border-t p-4">
							<Skeleton className="h-6 w-full" />
						</div>
					))}
				</div>
			)}

			{!isLoading && vehiclesData && (
				<>
					<div className="rounded-lg border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>Vehicle</TableHead>
									<TableHead>Year</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Mileage</TableHead>
									<TableHead>Seller</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Listed</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{vehiclesData.data.length === 0 ? (
									<TableRow>
										<TableCell colSpan={9} className="h-24 text-center">
											No vehicles found
										</TableCell>
									</TableRow>
								) : (
									vehiclesData.data.map((vehicle) => <VehicleRow key={vehicle.id} vehicle={vehicle} />)
								)}
							</TableBody>
						</Table>
					</div>

					{vehiclesData.meta.last_page > 1 && (
						<div className="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between">
							<div className="text-muted-foreground text-sm">
								Showing {vehiclesData.meta.from} to {vehiclesData.meta.to} of {vehiclesData.meta.total} vehicles
							</div>
							<div className="flex items-center gap-2">
								<Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
									<ChevronLeft className="h-4 w-4" />
									Previous
								</Button>
								<div className="hidden items-center gap-1 md:flex">
									{Array.from({ length: Math.min(5, vehiclesData.meta.last_page) }, (_, i) => {
										const pageNumber = i + 1;
										return (
											<Button
												key={pageNumber}
												variant={currentPage === pageNumber ? "default" : "outline"}
												size="sm"
												onClick={() => handlePageChange(pageNumber)}
												className="w-9"
											>
												{pageNumber}
											</Button>
										);
									})}
									{vehiclesData.meta.last_page > 5 && <span className="px-2">...</span>}
								</div>
								<Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === vehiclesData.meta.last_page}>
									Next
									<ChevronRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}

function VehicleRow({ vehicle }: { vehicle: AdminVehicle }) {
	const getStatusBadgeVariant = (status: string) => {
		switch (status) {
			case "active":
				return "default";
			case "sold":
				return "secondary";
			case "inactive":
				return "outline";
			default:
				return "default";
		}
	};

	return (
		<TableRow>
			<TableCell className="font-medium">#{vehicle.id}</TableCell>
			<TableCell>
				<div className="flex flex-col">
					<span className="font-medium">
						{vehicle.make?.name} {vehicle.model?.name}
					</span>
					<span className="text-muted-foreground text-xs">
						{vehicle.fuel_type} • {vehicle.gearbox}
					</span>
				</div>
			</TableCell>
			<TableCell>{vehicle.year}</TableCell>
			<TableCell className="font-semibold">£{vehicle.price.toLocaleString()}</TableCell>
			<TableCell>{vehicle.mileage.toLocaleString()} mi</TableCell>
			<TableCell>
				<div className="flex flex-col">
					<span className="text-sm">{vehicle.seller?.name}</span>
					<span className="text-muted-foreground text-xs">{vehicle.seller?.email}</span>
				</div>
			</TableCell>
			<TableCell>
				<Badge variant={getStatusBadgeVariant(vehicle.status)}>{vehicle.status}</Badge>
			</TableCell>
			<TableCell className="text-muted-foreground text-sm">{new Date(vehicle.created_at).toLocaleDateString("en-GB")}</TableCell>
			<TableCell className="text-right">
				<Link href={`/vehicles/details/${vehicle.id}`}>
					<Button variant="ghost" size="sm">
						<Eye className="h-4 w-4" />
						<span className="sr-only">View</span>
					</Button>
				</Link>
			</TableCell>
		</TableRow>
	);
}
