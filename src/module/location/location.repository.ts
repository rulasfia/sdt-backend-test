import db from "@/lib/db/database";
import { GetCityType, GetCountryType } from "./location.schema";
import { sql } from "kysely";

export async function findCountries(params: GetCountryType["query"]) {
	let query = db().selectFrom("countries");

	if (!!params.iso_name) {
		query = query.where(
			sql`lower(countries.iso_name)`,
			"like",
			`%${params.iso_name.toLowerCase()}%`
		);
	}

	if (!!params.name) {
		query = query.where(
			sql`lower(countries.name)`,
			"like",
			`%${params.name.toLowerCase()}%`
		);
	}

	/** limit to 50 by default */
	const res = await query.limit(50).selectAll().execute();

	return res;
}

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

	/** limit to 50 by default */
	const res = await query.limit(50).selectAll().execute();

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
