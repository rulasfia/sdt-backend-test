import { isValidDateString } from "@/utils/dateTimeFormatter";
import { z } from "zod";

// regex for date with yyyy/mm/dd format
const dateReg = /(19|20)\d{2}\/(0[1-9]|1[1,2])\/(0[1-9]|[12][0-9]|3[01])/;

export const createUserSchema = z.object({
	body: z.object({
		first_name: z.string().min(2),
		last_name: z.string().min(2),
		birthday: z
			.string()
			.min(10)
			.max(10)
			.regex(dateReg, { message: "Date format should be yyyy/mm/dd" })
			.refine((val) => isValidDateString(val)),
		location_address: z.string(),
		location_city_id: z.number(),
	}),
});

export type CreateUserType = z.infer<typeof createUserSchema>;
