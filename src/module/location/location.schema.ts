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
