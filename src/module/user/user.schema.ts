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

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - first_name
 *        - last_name
 *        - email
 *        - birthday
 *        - location_address
 *        - location_city_id
 *      properties:
 *        first_name:
 *          type: string
 *          default: Khoirul
 *        last_name:
 *          type: string
 *          default: Asfian
 *        email:
 *          type: string
 *          default: asfian@email.com
 *        birthday:
 *          type: string
 *          default: 2023/04/18
 *        location_address:
 *          type: string
 *          default: Jl. Rumah Besar
 *        location_city_id:
 *          type: number
 *          default: 56304
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *            first_name:
 *              type: string
 *            last_name:
 *              type: string
 *            email:
 *              type: string
 *            birthday:
 *              type: string
 *            location_address:
 *              type: string
 *            location_city_id:
 *              type: number
 *            created_at:
 *              type: string
 *            updated_at:
 *              type: string
 *    SuccessResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */
