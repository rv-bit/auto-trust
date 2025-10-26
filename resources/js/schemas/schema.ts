import { z } from "zod";
export const UpdateVehicleRequest = z.object({
	make_id: z.number().int().optional(),
	model_id: z.number().int().optional(),
	body_style: z.string().optional(),
	fuel_type: z.string().optional(),
	gearbox: z.string().optional(),
	color: z.string().optional(),
	mileage: z.number().int().min(0).optional(),
	price: z.number().int().min(100).optional(),
	doors: z.number().int().min(2).max(6).optional(),
	seats: z.number().int().min(1).nullable().optional(),
	boot_space: z.string().max(255).nullable().optional(),
	engine: z.string().max(255).nullable().optional(),
	postcode: z.string().max(10).optional(),
	latitude: z.number().nullable().optional(),
	longitude: z.number().nullable().optional(),
	extras: z.string().nullable().optional(),
	specification: z.string().nullable().optional(),
	safety_rating: z.number().int().min(1).max(5).nullable().optional(),
	image_url: z.string().url().nullable().optional(),
	status: z.string().optional(),
});
type UpdateVehicleRequest = z.infer<typeof UpdateVehicleRequest>;

export const StoreVehicleRequest = z.object({
	make_id: z.number().int(),
	model_id: z.number().int(),
	body_style: z.string(),
	fuel_type: z.string(),
	gearbox: z.string(),
	color: z.string(),
	mileage: z.number().int().min(0),
	price: z.number().int().min(100),
	doors: z.number().int().min(2).max(6),
	seats: z.number().int().min(1).nullable().optional(),
	boot_space: z.string().max(255).nullable().optional(),
	engine: z.string().max(255).nullable().optional(),
	postcode: z.string().max(10),
	latitude: z.number().nullable().optional(),
	longitude: z.number().nullable().optional(),
	extras: z.string().nullable().optional(),
	specification: z.string().nullable().optional(),
	safety_rating: z.number().int().min(1).max(5).nullable().optional(),
	image_url: z.string().url().nullable().optional(),
});
type StoreVehicleRequest = z.infer<typeof StoreVehicleRequest>;

export const TwoFactorAuthenticationRequest = z.object({});

export const ProfileUpdateRequest = z.object({
	name: z.string().max(255),
	email: z.email(),
});
type ProfileUpdateRequest = z.infer<typeof ProfileUpdateRequest>;

export const StoreMessageRequest = z.object({
	message: z
		.string()
		.max(550)
		.nullable()
		.refine((val) => val === null || val.length > 0, {
			message: "Message cannot be empty",
		})
		.refine((val) => val === null || val.length <= 550, {
			message: "Message exceeds maximum length",
		}),
	receiver_id: z.string(),
	attachments: z.array(z.string().optional()),
});
type StoreMessageRequest = z.infer<typeof StoreMessageRequest>;

export const LoginRequest = z.object({
	email: z.email(),
	password: z.string(),
});
type LoginRequest = z.infer<typeof LoginRequest>;
