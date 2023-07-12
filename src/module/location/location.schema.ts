import { z } from "zod";

export const filterCityQuerySchema = z.object({
	country_id: z
		.string()
		.refine((val) => !isNaN(Number(val)))
		.optional(),
	name: z.string().min(2).optional(),
});

export const getCitySchema = z.object({
	query: filterCityQuerySchema,
});

export type GetCityType = z.infer<typeof getCitySchema>;
