import db from "@/lib/db/database";
import { DB } from "@/lib/db/database.types";
import type { Insertable, Selectable, Updateable } from "kysely";

export type User = Selectable<DB["users"]>;
export type NewUser = Insertable<DB["users"]>;
export type EditedUser = Omit<Updateable<DB["users"]>, "id" | "created_at">;

export async function findAllUser() {
	return db()
		.selectFrom("users")
		.orderBy("users.created_at", "asc")
		.selectAll()
		.execute();
}

export async function insertNewUser(params: NewUser) {
	return db().insertInto("users").values(params).execute();
}

export async function updateUserById(id: string, user: EditedUser) {
	return db()
		.updateTable("users")
		.set(user)
		.where("users.id", "=", id)
		.execute();
}
