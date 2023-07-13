import db from "@/lib/db/database";
import { DB } from "@/lib/db/database.types";
import type { Insertable, Selectable, Updateable } from "kysely";

export type User = Selectable<DB["users"]>;
export type NewUser = Insertable<DB["users"]>;
export type EditedUser = Omit<Updateable<DB["users"]>, "id">;

export async function findAllUser() {
	return db().selectFrom("users").selectAll().execute();
}

export async function insertNewUser(params: NewUser) {
	return db().insertInto("users").values(params).execute();
}
