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

	return await query.selectAll().execute();
}
