import { Link, router, usePage } from "@inertiajs/react";

import type { SharedData } from "@/types";
import type { Vehicle } from "@/types/vehicles";

import { VehicleImageCarousel } from "@/components/pages/vehicles/vehicle-image-carousel";
import { VehicleLocationMap } from "@/components/pages/vehicles/vehicle-location-map";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import Layout from "@/layouts/vehicles/listings/layout";

import { dashboard } from "@/routes/vehicles";
import { Calendar, Fuel, Gauge, MapPin, MessageSquare, Package, Settings, Shield, User, Wrench } from "lucide-react";

interface PageProps {
	vehicle: Vehicle;
}

function Page({ vehicle }: PageProps) {
	const page = usePage<SharedData>();
	const user = page.props.auth.user;

	const handleMessageOwner = () => {
		router.visit(`/chat/${vehicle.seller_id}`);
	};

	return (
		<div className="container mx-auto py-8">
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<Card className="overflow-hidden">
						<VehicleImageCarousel images={vehicle.images || []} alt={`${vehicle.make?.name} ${vehicle.model?.name}`} className="h-96" />
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<div className="flex items-start justify-between">
								<div>
									<CardTitle className="text-3xl">
										{vehicle.make?.name} {vehicle.model?.name}
									</CardTitle>
									<CardDescription className="mt-2 flex items-center gap-4 text-base">
										<span className="flex items-center gap-1">
											<Calendar className="h-4 w-4" />
											{vehicle.year}
										</span>
										<span className="flex items-center gap-1">
											<Gauge className="h-4 w-4" />
											{vehicle.mileage.toLocaleString()} miles
										</span>
										<span className="flex items-center gap-1">
											<Fuel className="h-4 w-4" />
											{vehicle.fuel_type}
										</span>
									</CardDescription>
								</div>
								<Badge className="capitalize" variant="secondary">
									{vehicle.condition.replace("-", " ")}
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-primary text-4xl font-bold">£{vehicle.price.toLocaleString()}</div>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Settings className="h-5 w-5" />
								Vehicle Specifications
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
								<div>
									<p className="text-muted-foreground text-sm">Body Style</p>
									<p className="font-medium capitalize">{vehicle.body_style}</p>
								</div>
								<div>
									<p className="text-muted-foreground text-sm">Fuel Type</p>
									<p className="font-medium capitalize">{vehicle.fuel_type}</p>
								</div>
								<div>
									<p className="text-muted-foreground text-sm">Gearbox</p>
									<p className="font-medium capitalize">{vehicle.gearbox}</p>
								</div>
								<div>
									<p className="text-muted-foreground text-sm">Color</p>
									<p className="font-medium capitalize">{vehicle.color}</p>
								</div>
								<div>
									<p className="text-muted-foreground text-sm">Doors</p>
									<p className="font-medium">{vehicle.doors}</p>
								</div>
								{vehicle.seats && (
									<div>
										<p className="text-muted-foreground text-sm">Seats</p>
										<p className="font-medium">{vehicle.seats}</p>
									</div>
								)}
								{vehicle.engine && (
									<div>
										<p className="text-muted-foreground text-sm">Engine</p>
										<p className="font-medium">{vehicle.engine}</p>
									</div>
								)}
								{vehicle.boot_space && (
									<div>
										<p className="text-muted-foreground text-sm">Boot Space</p>
										<p className="font-medium">{vehicle.boot_space}</p>
									</div>
								)}
								{vehicle.safety_rating && (
									<div>
										<p className="text-muted-foreground text-sm">Safety Rating</p>
										<p className="font-medium">{vehicle.safety_rating} / 5 ⭐</p>
									</div>
								)}
							</div>
						</CardContent>
					</Card>

					{vehicle.specification && Object.entries(vehicle.specification).filter(([_, value]) => value === true).length > 0 && (
						<Card className="mt-6">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Wrench className="h-5 w-5" />
									Equipment & Features
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-3 md:grid-cols-3">
									{Object.entries(vehicle.specification)
										.filter(([_, value]) => value === true)
										.map(([key]) => (
											<div key={key} className="flex items-center gap-2">
												<Package className="text-muted-foreground h-4 w-4" />
												<span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
											</div>
										))}
								</div>
							</CardContent>
						</Card>
					)}

					{vehicle.extras && Object.entries(vehicle.extras).filter(([_, value]) => value === true).length > 0 && (
						<Card className="mt-6">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Shield className="h-5 w-5" />
									Additional Extras
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-3 md:grid-cols-3">
									{Object.entries(vehicle.extras)
										.filter(([_, value]) => value === true)
										.map(([key]) => (
											<div key={key} className="flex items-center gap-2">
												<Package className="text-muted-foreground h-4 w-4" />
												<span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
											</div>
										))}
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				<div className="lg:col-span-1">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<User className="h-5 w-5" />
								Seller Information
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-4">
								<Avatar className="h-16 w-16">
									<AvatarImage src={vehicle.seller?.avatar} alt={vehicle.seller?.name} />
									<AvatarFallback>
										{vehicle.seller?.name
											?.split(" ")
											.map((n) => n[0])
											.join("")
											.toUpperCase() || "U"}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-semibold">{vehicle.seller?.name || "Private Seller"}</p>
									<p className="text-muted-foreground text-sm">Member since {vehicle.seller?.created_at ? new Date(vehicle.seller.created_at).getFullYear() : "N/A"}</p>
								</div>
							</div>

							<Separator className="my-4" />

							{user?.id !== vehicle.seller_id && (
								<Button onClick={handleMessageOwner} className="w-full" size="lg">
									<MessageSquare className="mr-2 h-5 w-5" />
									Message Seller
								</Button>
							)}

							{user?.id === vehicle.seller_id && (
								<Button asChild className="w-full" size="lg">
									<Link href={dashboard()}>
										<Settings className="mr-2 h-5 w-5" />
										Manage Listing
									</Link>
								</Button>
							)}
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<MapPin className="h-5 w-5" />
								Location
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="mb-4 text-lg font-medium">{vehicle.postcode}</p>
							{vehicle.latitude && vehicle.longitude && (
								<div className="aspect-video w-full overflow-hidden rounded-lg">
									<VehicleLocationMap latitude={vehicle.latitude} longitude={vehicle.longitude} postcode={vehicle.postcode} radiusKm={10} />
								</div>
							)}
							<p className="text-muted-foreground mt-3 text-xs">Exact location will be shared after contacting the seller</p>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>Quick Stats</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex justify-between">
								<span className="text-muted-foreground text-sm">Condition</span>
								<span className="text-sm font-medium capitalize">{vehicle.condition.replace("-", " ")}</span>
							</div>
							<Separator />
							<div className="flex justify-between">
								<span className="text-muted-foreground text-sm">Status</span>
								<Badge variant={vehicle.status === "active" ? "default" : "secondary"} className="capitalize">
									{vehicle.status}
								</Badge>
							</div>
							<Separator />
							<div className="flex justify-between">
								<span className="text-muted-foreground text-sm">Listed</span>
								<span className="text-sm font-medium">{new Date(vehicle.created_at).toLocaleDateString()}</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

Page.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default Page;
