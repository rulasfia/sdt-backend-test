import db from "@/lib/db/database";
import { GetCityType } from "./location.schema";
import { sql } from "kysely";

export async function findCities(params: GetCityType["query"]) {
	let query = db().selectFrom("cities");

	if (!!params.country_id) {
		query = query.where("cities.country_id", "=", Number(params.country_id));
	}

	if (!!params.name) {
		query = query.where(
			sql`lower(cities.name)`,
			"like",
			`%${params.name.toLowerCase()}%`
		);
	}

	const res = await query.selectAll().execute();

	return res;
}

export async function findCityById(id: number) {
	const res = await db()
		.selectFrom("cities")
		.where("cities.id", "=", id)
		.limit(1)
		.selectAll()
		.execute();

	return res;
}
