import { z } from "zod";
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
