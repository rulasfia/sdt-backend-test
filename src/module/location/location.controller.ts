import type { Request, Response } from "express";
import type { GetCityType } from "./location.schema";
import { findCities } from "./location.repository";

export async function getCityHandler(
	req: Request<{}, {}, {}, GetCityType["query"]>,
	res: Response
) {
	console.log({ urlQuery: req.query });
	if (!req.query.country_id && !req.query.name) {
		return res.status(200).json({ data: [] });
	}

	const cities = findCities(req.query);

	return res.status(200).json({ data: cities });
}
