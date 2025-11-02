import "react-lazy-load-image-component/src/effects/blur.css";

import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface VehicleImageCarouselProps {
	images: string[];
	alt: string;
	className?: string;
	showControls?: boolean;
}

export function VehicleImageCarousel({ images, alt, className, showControls = true }: VehicleImageCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	// If no images, show placeholder
	if (!images || images.length === 0) {
		return (
			<div className={cn("bg-muted relative flex items-center justify-center", className)}>
				<span className="text-muted-foreground text-6xl">🚗</span>
			</div>
		);
	}

	const goToPrevious = (e?: React.MouseEvent) => {
		e?.preventDefault();
		e?.stopPropagation();
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
	};

	const goToNext = (e?: React.MouseEvent) => {
		e?.preventDefault();
		e?.stopPropagation();
		setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
	};

	const goToImage = (index: number, e?: React.MouseEvent) => {
		e?.preventDefault();
		e?.stopPropagation();
		setCurrentIndex(index);
	};

	return (
		<div className={cn("relative overflow-hidden", className)}>
			<div className="relative h-full w-full">
				<div key={`placeholder-${alt}`} className="flex h-full w-full items-center justify-center bg-gray-200">
					<svg className="size-20 animate-pulse text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
						<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
					</svg>
				</div>
				<LazyLoadImage
					key={`main-${alt}`}
					src={`/storage/${images[currentIndex]}`}
					alt={`${alt} - Image ${currentIndex + 1}`}
					height="100%"
					width="100%"
					effect="blur"
					className="h-full w-full object-cover"
				/>
			</div>

			{showControls && images.length > 1 && (
				<div className="absolute right-1.5 bottom-1.5 flex gap-1 items-center">
					<Button
						variant="ghost"
						size="icon"
						className="size-5 rounded-sm bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 hover:text-white"
						onClick={goToPrevious}
					>
						<ChevronLeft className="h-6 w-6" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						className=" size-5 rounded-sm bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 hover:text-white"
						onClick={goToNext}
					>
						<ChevronRight className="h-6 w-6" />
					</Button>
				</div>
			)}

			{images.length > 1 && images.length <= 10 && (
				<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
					{images.map((_, index) => (
						<button
							key={index}
							onClick={(e) => goToImage(index, e)}
							className={cn("h-2 w-2 rounded-full transition-all", index === currentIndex ? "w-4 bg-black" : "bg-black/60 hover:bg-black/85")}
							aria-label={`Go to image ${index + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}
