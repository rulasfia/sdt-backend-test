import { test, expect } from "vitest";
import type { NewUser } from "../user.repository";
import { generateID } from "@/utils/IDGenerator";
import { createUserSchema } from "../user.schema";

test("new user resource validation", async () => {
	const id = await generateID();
	const newUser: NewUser = {
		id: id,
		first_name: "Lorem",
		last_name: "Ipsum",
		birthday: "1925/01/18",
		location_address: "Somewhere",
		location_city_id: 219,
		updated_at: new Date(),
	};

	const result = createUserSchema.safeParse({ body: newUser });
	if (!result.success) {
		console.log(JSON.stringify(result));
	}

	expect(result.success).toBe(true);
});
