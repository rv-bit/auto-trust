import { useState } from "react";
import { toast } from "sonner";
import { Link } from "@inertiajs/react";

import { useDeleteVehicle, useUpdateVehicleStatus, useUserVehicles, type UserVehicle } from "@/hooks/vehicles/useUserVehicles";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { Calendar, Eye, Fuel, Gauge, MoreVertical, Pause, Play, Trash2 } from "lucide-react";

export function UserVehiclesList() {
	const [currentPage, setCurrentPage] = useState(1);
	const {
		data: vehiclesData,
		isLoading,
		error,
	} = useUserVehicles({
		page: currentPage,
		per_page: 6,
	});

	const updateStatus = useUpdateVehicleStatus();
	const deleteVehicle = useDeleteVehicle();

	const [vehicleToDelete, setVehicleToDelete] = useState<number | null>(null);

	const handleStatusToggle = async (vehicleId: number, currentStatus: string) => {
		const newStatus = currentStatus === "active" ? "inactive" : "active";

		try {
			await updateStatus.mutateAsync({ vehicleId, status: newStatus });
			toast.success(`Vehicle ${newStatus === "active" ? "activated" : "deactivated"} successfully`);
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Failed to update vehicle status");
		}
	};

	const handleDelete = async () => {
		if (!vehicleToDelete) return;

		try {
			await deleteVehicle.mutateAsync(vehicleToDelete);
			toast.success("Vehicle deleted successfully");
			setVehicleToDelete(null);
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Failed to delete vehicle");
		}
	};

	if (isLoading) {
		return (
			<div className="w-full px-4">
				<h2 className="mb-4 text-lg font-semibold text-gray-900">Your Posted Vehicles</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 3 }).map((_, i) => (
						<Card key={i} className="overflow-hidden">
							<Skeleton className="h-48 w-full" />
							<CardHeader>
								<Skeleton className="h-6 w-3/4" />
								<Skeleton className="mt-2 h-4 w-1/2" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-4 w-full" />
								<Skeleton className="mt-2 h-4 w-2/3" />
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="w-full px-4">
				<div className="border-destructive bg-destructive/10 text-destructive rounded-lg border p-4">
					<p className="font-semibold">Error loading your vehicles</p>
					<p className="text-sm">{error.message}</p>
				</div>
			</div>
		);
	}

	if (!vehiclesData || vehiclesData.data.length === 0) {
		return (
			<div className="w-full px-4">
				<h2 className="mb-4 text-lg font-semibold text-gray-900">Your Posted Vehicles</h2>
				<div className="rounded-lg border border-dashed p-12 text-center">
					<p className="text-muted-foreground text-lg font-semibold">No vehicles posted yet</p>
					<p className="text-muted-foreground mt-2 text-sm">Click "Sell your car" above to list your first vehicle</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="w-full px-4">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-semibold text-gray-900">Your Posted Vehicles</h2>
					<p className="text-muted-foreground text-sm">{vehiclesData.meta.total} total</p>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{vehiclesData.data.map((vehicle) => (
						<VehicleCard key={vehicle.id} vehicle={vehicle} onStatusToggle={handleStatusToggle} onDelete={(id) => setVehicleToDelete(id)} />
					))}
				</div>

				{/* Pagination */}
				{vehiclesData.meta.last_page > 1 && (
					<div className="mt-6 flex items-center justify-center gap-2">
						<Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
							Previous
						</Button>
						<span className="text-muted-foreground text-sm">
							Page {currentPage} of {vehiclesData.meta.last_page}
						</span>
						<Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === vehiclesData.meta.last_page}>
							Next
						</Button>
					</div>
				)}
			</div>

			{/* Delete Confirmation Dialog */}
			<Dialog open={vehicleToDelete !== null} onOpenChange={(open: boolean) => !open && setVehicleToDelete(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure?</DialogTitle>
						<DialogDescription>This action cannot be undone. This will permanently delete your vehicle listing and remove it from our servers.</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={() => setVehicleToDelete(null)}>
							Cancel
						</Button>
						<Button onClick={handleDelete} variant="destructive">
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

interface VehicleCardProps {
	vehicle: UserVehicle;
	onStatusToggle: (vehicleId: number, currentStatus: string) => void;
	onDelete: (vehicleId: number) => void;
}

function VehicleCard({ vehicle, onStatusToggle, onDelete }: VehicleCardProps) {
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

	const firstImage = vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : null;

	return (
		<Card className="overflow-hidden transition-shadow hover:shadow-lg">
			{/* Vehicle Image */}
			<div className="relative h-48 w-full overflow-hidden bg-gray-200">
				{firstImage ? (
					<img src={`/storage/${firstImage}`} alt={`${vehicle.make?.name} ${vehicle.model?.name}`} className="h-full w-full object-cover" />
				) : (
					<div className="text-muted-foreground flex h-full w-full items-center justify-center">
						<span>No image</span>
					</div>
				)}
				<div className="absolute top-2 right-2">
					<Badge variant={getStatusBadgeVariant(vehicle.status)}>{vehicle.status}</Badge>
				</div>
			</div>

			<CardHeader className="pb-3">
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1">
						<CardTitle className="line-clamp-1 text-base">
							{vehicle.make?.name} {vehicle.model?.name}
						</CardTitle>
						<CardDescription className="mt-1 flex items-center gap-1 text-xs">
							<Calendar className="h-3 w-3" />
							{vehicle.year}
						</CardDescription>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<MoreVertical className="h-4 w-4" />
								<span className="sr-only">Actions</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={`/vehicles/details/${vehicle.id}`} className="flex cursor-pointer items-center">
									<Eye className="mr-2 h-4 w-4" />
									View Details
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => onStatusToggle(vehicle.id, vehicle.status)} disabled={vehicle.status === "sold"}>
								{vehicle.status === "active" ? (
									<>
										<Pause className="mr-2 h-4 w-4" />
										Deactivate
									</>
								) : (
									<>
										<Play className="mr-2 h-4 w-4" />
										Activate
									</>
								)}
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => onDelete(vehicle.id)} className="text-destructive focus:text-destructive">
								<Trash2 className="mr-2 h-4 w-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>

			<CardContent className="pb-3">
				<div className="text-muted-foreground mb-3 grid grid-cols-2 gap-2 text-sm">
					<div className="flex items-center gap-1">
						<Gauge className="h-4 w-4" />
						{vehicle.mileage.toLocaleString()} miles
					</div>
					<div className="flex items-center gap-1">
						<Fuel className="h-4 w-4" />
						{vehicle.fuel_type}
					</div>
				</div>
				<div className="text-2xl font-bold">£{vehicle.price.toLocaleString()}</div>
			</CardContent>

			<CardFooter className="border-t pt-3">
				<p className="text-muted-foreground text-xs">Listed {new Date(vehicle.created_at).toLocaleDateString("en-GB")}</p>
			</CardFooter>
		</Card>
	);
}
