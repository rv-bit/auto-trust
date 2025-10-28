import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { NumericFormat } from "react-number-format";

import { cn } from "@/lib/utils";
import { Prices } from "@/types/stripe";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea }  from "@/components/ui/textarea";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { StoreVehicleRequest, type StoreVehicleRequestSchemaInfer } from "@/schemas/schema";

const MAX_FILE_SIZE_BYTES = 1024 * 1024 * 2; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/webp"];

export default function ListVehicleForm() {
    const [openAvailableCategories, setOpenAvailableCategories] = useState(false);
	const [openedSubDrawer, setOpenedSubDrawer] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<StoreVehicleRequestSchemaInfer>({
		mode: "onChange",
		resolver: zodResolver(StoreVehicleRequest),
		defaultValues: {
			name: "",
			description: "",
			images: [],
		},
	});

	const {
		fields: pricesFields,
		append: appendPrice,
		update: updatePrice,
	} = useFieldArray({
		control: form.control,
		name: "prices",
	});

    const handleAddImages = async () => {
		if (!window.showOpenFilePicker) return; // unsupported browsers

		try {
			const fileHandles = await window.showOpenFilePicker({
				multiple: true,
				types: [
					{
						description: "Image Files",
						accept: { "image/*": [".png", ".webp"] },
					},
				],
			});

			const files = await Promise.all(fileHandles.map((handle: any) => handle.getFile()));
			const currentImages = form.getValues("images") || [];

			if (files.some((file: File) => !ACCEPTED_IMAGE_TYPES.includes(file.type))) {
				return form.setError("images", { type: "manual", message: "Invalid file type. Only PNG, and WEBP are allowed." });
			}

			if (files.some((file: File) => file.size > MAX_FILE_SIZE_BYTES)) {
				return form.setError("images", { type: "manual", message: `File size must be less than ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB.` });
			}

			if (currentImages.length + files.length > 8) {
				return form.setError("images", { type: "manual", message: "Maximum of 8 images allowed." });
			}

			form.setValue("images", [...currentImages, ...files], { shouldValidate: true });
		} catch (err) {
			console.error("File selection cancelled or failed:", err);
		}
	};

    function onSubmit(values: StoreVehicleRequestSchemaInfer) {
		if (values.images?.some((img: File) => !ACCEPTED_IMAGE_TYPES.includes(img.type))) {
			return form.setError("images", { type: "manual", message: "Invalid file type. Only JPEG, PNG, and WEBP are allowed." });
		}

		if (values.images?.some((img: File) => values.images?.some((file: File) => file.size > MAX_FILE_SIZE_BYTES))) {
			return form.setError("images", { type: "manual", message: `File size must be less than ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB.` });
		}

		if ((values.images?.length ?? 0) > 8) {
			return form.setError("images", { type: "manual", message: "Maximum of 8 images allowed." });
		}

		const formData = new FormData();

		if (values.images && values.images.length > 0) {
			values.images.forEach((image, index) => {
				formData.append(`images[${index}]`, image);
			});
		}

		formData.append("name", values.name);
		formData.append("description", values.description || "none");
		formData.append("stock", values.stock.toString());
		formData.append("category", values.category);
	}

    return (
        <Form {...form}>
			<form
				onSubmit={(e) => {
					form.handleSubmit(onSubmit)(e);
				}}
				className="flex h-full w-full flex-col justify-end sm:gap-4"
			>
				<div className="max-h-full flex-1 overflow-auto pb-16 max-sm:pb-20">
					<span className="flex h-full w-full flex-col justify-start gap-4 overflow-x-hidden p-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
									<span className="flex flex-col items-start justify-start">
										<FormLabel className="text-base">Name (required)</FormLabel>
										<FormDescription className="text-sm text-gray-500">Name of the product</FormDescription>
									</span>
									<FormControl className="flex-1">
										<Input {...field} className="rounded-sm p-3" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
									<span className="flex flex-col items-start justify-start">
										<FormLabel className="text-base">Description</FormLabel>
										<FormDescription className="text-sm text-gray-500">Appears at checkout, in product lists</FormDescription>
									</span>
									<FormControl className="flex-1">
										<Textarea {...field} name="Description" className="rounded-sm" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="images"
							render={({ field }) => (
								<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
									<span className="flex flex-col items-start justify-start">
										<FormLabel className="text-base">Images</FormLabel>
										<FormDescription className="text-sm text-gray-500">Appears at checkout. JPEG, PNG or WEBP under 2MB (up to 8 images)</FormDescription>
									</span>

									<span className="flex w-full items-center justify-start gap-2 overflow-x-auto p-1">
										<Button
											type="button"
											onClick={() => handleAddImages()}
											className="size-50 flex-col rounded-sm bg-transparent p-3 text-black ring ring-black/20 transition-colors duration-200 ease-linear hover:bg-gray-200"
										>
											<svg className="size-10 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
												<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
											</svg>
											Upload Image
										</Button>

										{form.getValues("images") && (
											<div className="flex gap-2">
												{form.getValues("images")?.map((file: File, index: number) => (
													<div key={index} data-id={index} className="relative flex size-50 items-center justify-center rounded-md bg-gray-200">
														<img src={URL.createObjectURL(file)} className="h-full w-full rounded-md object-cover" />

														<Button
															onClick={() => {
																const images = form.getValues("images") || [];
																const newImages = images.some((img: File) => img === file) ? images.filter((img: File) => img !== file) : images;

																form.setValue("images", newImages, { shouldValidate: true });
															}}
															variant={"link"}
															className="absolute inset-0 top-0 left-0 size-fit w-full justify-end hover:no-underline"
														>
															<XIcon size={20} className="text-gray-700" />
														</Button>
													</div>
												))}
											</div>
										)}
									</span>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="stock"
							render={({ field }) => (
								<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
									<span className="flex flex-col items-start justify-start">
										<FormLabel className="text-base">Stock (required)</FormLabel>
										<FormDescription className="text-sm text-gray-500">Number of units available</FormDescription>
									</span>
									<FormControl className="flex-1">
										<Input {...field} type="number" className="rounded-sm p-3" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem className="flex h-auto w-full flex-col items-start justify-between gap-1">
									<span className="flex flex-col items-start justify-start">
										<FormLabel className="text-base">Category (required)</FormLabel>
										<FormDescription className="text-sm text-gray-500">Category of the product</FormDescription>
									</span>
									<FormControl className="w-full flex-1">
										<Popover open={openAvailableCategories} onOpenChange={setOpenAvailableCategories}>
											<PopoverTrigger asChild className="text-muted-foreground hover:text-foreground w-full rounded-sm shadow-none">
												<Button variant={"outline"} role="combobox" aria-expanded={openAvailableCategories} className="w-full justify-between gap-0">
													{field.value ? availableCategories[field.value] : <CommandEmpty />}
													<ChevronsUpDown className="opacity-50" />
												</Button>
											</PopoverTrigger>
											<PopoverContent align="end" className="w-full p-0">
												<Command>
													<CommandInput className="w-full rounded-none border-0 p-0 focus:ring-0" containerClassName="px-1" />
													<CommandList>
														<CommandEmpty>No category found.</CommandEmpty>
														<CommandGroup className="max-h-[150px] overflow-y-auto">
															{Object.keys(availableCategories).map((category, index) => (
																<CommandItem
																	key={index}
																	value={category}
																	onSelect={(newValue: string) => {
																		form.setValue("category", newValue, { shouldValidate: true });
																		setOpenAvailableCategories(false);
																	}}
																	className="items-center justify-between gap-2"
																>
																	{availableCategories[category]}
																	<Check className={cn("w-fit", { "opacity-0": field.value !== category })} />
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
                    </span>
                </div>	

				<span className="sticky bottom-0 left-0 flex h-fit gap-2 border-t border-gray-200 bg-white p-4 max-sm:flex-col sm:flex-row sm:justify-end">
					<DrawerClose asChild>
						<Button variant={"link"}>Close</Button>
					</DrawerClose>
					<Button type="submit" disabled={isSubmitting} className="group relative size-auto min-w-30 overflow-hidden rounded-sm bg-black/80 p-2 px-5 disabled:cursor-not-allowed">
						<div className="absolute -left-16 h-[100px] w-10 -rotate-45 bg-gradient-to-r from-white/10 via-white/50 to-white/10 blur-sm duration-700 group-hover:left-[150%] group-hover:delay-200 group-hover:duration-700" />

						<span className="flex items-center justify-center">
							{isSubmitting && <SpinerLoader className="mr-2 h-5 w-5" />}
							<h1>Save</h1>
						</span>
					</Button>
				</span>
			</form>
		</Form>
    )
}
