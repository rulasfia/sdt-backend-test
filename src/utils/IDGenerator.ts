import { nanoid } from "nanoid/async";

export async function generateID() {
	const canonicID = await nanoid();

	return canonicID;
}
