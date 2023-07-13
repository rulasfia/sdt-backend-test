import { isValidDateString } from "@/utils/dateTimeFormatter";
import { z } from "zod";

const userBodySchema = z.object({
	first_name: z.string().min(2),
	last_name: z.string().min(2),
	email: z.string().email(),
	birthday: z
		.string()
		.min(10)
		.max(10)
		.refine((val) => isValidDateString(val), {
			message: "birthday should be in yyyy/mm/dd",
		}),
	location_address: z.string(),
	location_city_id: z.number(),
});

export const createUserSchema = z.object({
	body: userBodySchema,
});

export type CreateUserType = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
	body: userBodySchema,
	params: z.object({
		id: z.string(),
	}),
});

export type UpdateUserType = z.infer<typeof updateUserSchema>;

export const userDetailSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
});

export type UserDetailType = z.infer<typeof userDetailSchema>;
