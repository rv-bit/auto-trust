import { useEffect, useRef } from "react";

interface VehicleLocationMapProps {
	latitude: number;
	longitude: number;
	postcode: string;
	radiusKm?: number;
}

declare global {
	interface Window {
		google: any;
	}
}

export function VehicleLocationMap({ latitude, longitude, postcode, radiusKm = 10 }: VehicleLocationMapProps) {
	const mapRef = useRef<HTMLDivElement>(null);
	const googleMapRef = useRef<any>(null);

	useEffect(() => {
		// Load Google Maps script if not already loaded
		if (!window.google) {
			const script = document.createElement("script");
			script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=geometry`;
			script.async = true;
			script.defer = true;
			script.onload = initMap;
			document.head.appendChild(script);
		} else {
			initMap();
		}

		function initMap() {
			if (!mapRef.current) return;

			const center = { lat: latitude, lng: longitude };

			// Create map
			const map = new window.google.maps.Map(mapRef.current, {
				center: center,
				zoom: 11,
				disableDefaultUI: false,
				zoomControl: true,
				mapTypeControl: false,
				streetViewControl: false,
				fullscreenControl: true,
			});

			googleMapRef.current = map;

			// Add a circle to show approximate area (radius in km)
			const circle = new window.google.maps.Circle({
				strokeColor: "#3b82f6",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "#3b82f6",
				fillOpacity: 0.2,
				map: map,
				center: center,
				radius: radiusKm * 1000, // Convert km to meters
			});

			// Add a marker in the center
			new window.google.maps.Marker({
				position: center,
				map: map,
				title: `Approximate location: ${postcode}`,
				icon: {
					path: window.google.maps.SymbolPath.CIRCLE,
					scale: 8,
					fillColor: "#3b82f6",
					fillOpacity: 1,
					strokeColor: "#ffffff",
					strokeWeight: 2,
				},
			});

			// Fit map to circle bounds
			map.fitBounds(circle.getBounds());
		}
	}, [latitude, longitude, postcode, radiusKm]);

	return (
		<div className="relative h-full w-full">
			<div ref={mapRef} className="h-full w-full rounded-lg" />
			<div className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-xs backdrop-blur-sm">Approximate location within {radiusKm}km</div>
		</div>
	);
}
