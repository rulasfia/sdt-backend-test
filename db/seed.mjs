import "dotenv/config";
import { createConnection } from "mysql2/promise";
import fs from "fs/promises";

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
	console.error("Invalid DB_URL!");
	process.exit(1);
}

const db = await createConnection({
	uri: DB_URL,
	multipleStatements: true /** multiple statement to accomodate cities.sql */,
});

async function seed() {
	/** check if countries & cities table exist */
	const existingTable = await Promise.all([
		await db.query("SHOW TABLES LIKE 'countries'"),
		await db.query("SHOW TABLES LIKE 'cities'"),
	]);

	/** check one of locatation table didn't exist, throw error */
	if (existingTable[0][0] < 1 || existingTable[1][0] < 1) {
		console.log(existingTable[0][0], existingTable[1][0]);
		throw new Error("countries or cities table not found!");
	}

	/** count() total row in countries table */
	const [countriesCount] = await db.query("SELECT COUNT(id) FROM countries");

	/** if countries table is empty, seed it */
	if (countriesCount[0]["COUNT(id)"] === 0) {
		/** seed countries table  */
		const countries = await fs.readFile("./db/seeds/countries.sql");
		const [countriesResult] = await db.query(countries.toString());
		console.log({ countriesResult });
	} else {
		console.log("countries table is not empty!");
	}

	/** count() total row in cities table */
	const [citiesCount] = await db.query("SELECT COUNT(id) FROM cities");

	/** if cities table is empty, seed it */
	if (citiesCount[0]["COUNT(id)"] === 0) {
		/** seed cities table */
		const cities = await fs.readFile("./db/seeds/cities.sql");
		const [citiesResult] = await db.query(cities.toString());
		console.log({ citiesResult });
	} else {
		console.log("cities table is not empty!");
	}

	console.log({ countriesCount: countriesCount[0]["COUNT(id)"] });
	console.log({ citiesCount: citiesCount[0]["COUNT(id)"] });
}

seed()
	.then(() => {
		console.log("Seeding finished!");
	})
	.catch((e) => {
		console.error(e);
		console.log("Seeding failed!");
	})
	.finally(async () => {
		await db.end();
		process.exit(1);
	});
