import type { Request, Response } from "express";
import type { GetCityDetailType, GetCityType } from "./location.schema";
import { findCities, findCityById } from "./location.repository";

export async function getCityHandler(
	req: Request<{}, {}, {}, GetCityType["query"]>,
	res: Response
) {
	if (!req.query.country_id && !req.query.name) {
		return res.status(200).json({ data: [] });
	}

	const cities = await findCities(req.query);

	return res.status(200).json({ data: cities });
}

export async function getCityDetailHandler(
	req: Request<GetCityDetailType["params"]>,
	res: Response
) {
	const city = await findCityById(Number(req.params.id));

	return res.status(200).json({ data: city });
}
