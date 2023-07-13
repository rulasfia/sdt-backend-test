import { createServer } from "@/index";
import { connectToDatabase } from "@/lib/db/database";
import type { Express } from "express";
import supertest from "supertest";
import { beforeEach, describe, expect, test } from "vitest";

interface LocalTestContext {
	app: Express;
}

describe("Test /location route", async () => {
	const DB_URL = process.env.DB_URL;

	beforeEach<LocalTestContext>((ctx) => {
		connectToDatabase(DB_URL);
		const app = createServer();
		ctx.app = app;
	});

	test<LocalTestContext>("GET /country", async ({ app }) => {
		await supertest(app)
			.get("/location/country")
			.expect(200)
			.expect("Content-Type", /application\/json/)
			.then((res) => {
				expect("data" in res.body).toBeTruthy();
				expect(Array.isArray(res.body.data)).toBeTruthy();
				expect(res.body.data.length).toEqual(50);

				expect(typeof res.body.data[0].id).toEqual("number");
				expect(typeof res.body.data[0].name).toEqual("string");
			});
	});

	test<LocalTestContext>("GET /city", async ({ app }) => {
		await supertest(app)
			.get("/location/city")
			.expect(200)
			.expect("Content-Type", /json/)
			.then((res) => {
				expect("data" in res.body).toBeTruthy();
				expect(Array.isArray(res.body.data)).toBeTruthy();
				expect(res.body.data.length).toEqual(50);

				expect("latitude" in res.body.data[0]).toBeTruthy();
				expect("longitude" in res.body.data[0]).toBeTruthy();
			});
	});

	test<LocalTestContext>("GET /city?name='yogya'", async ({ app }) => {
		await supertest(app)
			.get("/location/city?name=yogya")
			.expect(200)
			.expect("Content-Type", /json/)
			.then((res) => {
				expect("data" in res.body).toBeTruthy();
				expect(Array.isArray(res.body.data)).toBeTruthy();
				expect(res.body.data.length).toEqual(2);

				expect("latitude" in res.body.data[0]).toBeTruthy();
				expect("longitude" in res.body.data[0]).toBeTruthy();
			});
	});

	test<LocalTestContext>("GET /city/102", async ({ app }) => {
		await supertest(app)
			.get("/location/city/56816")
			.expect(200)
			.expect("Content-Type", /json/)
			.then((res) => {
				expect("data" in res.body).toBeTruthy();
				expect(Array.isArray(res.body.data)).toBeTruthy();
				expect(res.body.data.length).toEqual(1);

				expect("latitude" in res.body.data[0]).toBeTruthy();
				expect("longitude" in res.body.data[0]).toBeTruthy();
			});
	});
});
