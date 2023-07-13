import { z } from "zod";

// regex for date with dd/mm/yyyy format
const dateReg = /(19|20)\d{2}\/(0[1-9]|1[1,2])\/(0[1-9]|[12][0-9]|3[01])/;

export const createUserSchema = z.object({
	body: z.object({
		first_name: z.string().min(2),
		last_name: z.string().min(2),
		birthday: z
			.string()
			.regex(dateReg, { message: "Date format should be dd/mm/yyyy" }),
		location_address: z.string(),
		location_city_id: z.number(),
	}),
});

export type CreateUserType = z.infer<typeof createUserSchema>;
