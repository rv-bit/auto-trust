import { useState } from "react";

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
		e?.stopPropagation();
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
	};

	const goToNext = (e?: React.MouseEvent) => {
		e?.stopPropagation();
		setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
	};

	const goToImage = (index: number, e?: React.MouseEvent) => {
		e?.stopPropagation();
		setCurrentIndex(index);
	};

	return (
		<div className={cn("relative overflow-hidden", className)}>
			{/* Main Image */}
			<div className="relative h-full w-full">
				<img src={`/storage/${images[currentIndex]}`} alt={`${alt} - Image ${currentIndex + 1}`} className="h-full w-full object-cover" />

				{/* Image Counter */}
				{images.length > 1 && (
					<div className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white backdrop-blur-sm">
						{currentIndex + 1} / {images.length}
					</div>
				)}
			</div>

			{/* Navigation Arrows */}
			{showControls && images.length > 1 && (
				<>
					<Button
						variant="ghost"
						size="icon"
						className="absolute top-1/2 left-2 h-10 w-10 -translate-y-1/2 rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 hover:text-white"
						onClick={goToPrevious}
					>
						<ChevronLeft className="h-6 w-6" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						className="absolute top-1/2 right-2 h-10 w-10 -translate-y-1/2 rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 hover:text-white"
						onClick={goToNext}
					>
						<ChevronRight className="h-6 w-6" />
					</Button>
				</>
			)}

			{/* Thumbnail Dots */}
			{images.length > 1 && images.length <= 10 && (
				<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
					{images.map((_, index) => (
						<button
							key={index}
							onClick={(e) => goToImage(index, e)}
							className={cn("h-2 w-2 rounded-full transition-all", index === currentIndex ? "w-4 bg-white" : "bg-white/50 hover:bg-white/75")}
							aria-label={`Go to image ${index + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}
