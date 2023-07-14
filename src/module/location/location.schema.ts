import { z } from "zod";

export const getCitySchema = z.object({
	query: z.object({
		country_id: z
			.string()
			.refine((val) => !isNaN(Number(val)))
			.optional(),
		name: z.string().min(2).optional(),
	}),
});

export type GetCityType = z.infer<typeof getCitySchema>;

export const getCityDetailSchema = z.object({
	params: z.object({
		id: z.string().refine((val) => !isNaN(Number(val))),
	}),
});

export type GetCityDetailType = z.infer<typeof getCityDetailSchema>;

export const getCountrySchema = z.object({
	query: z.object({
		iso_name: z.string().max(2).optional(),
		name: z.string().min(2).optional(),
	}),
});

export type GetCountryType = z.infer<typeof getCountrySchema>;

/**
 * @openapi
 * components:
 *  schemas:
 *    GetCountryResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *            iso_name:
 *              type: string
 *    GetCityResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *            country_id:
 *              type: number
 *            latitude:
 *              type: string
 *            longitude:
 *              type: string
 */
