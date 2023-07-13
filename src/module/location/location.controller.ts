import type { Request, Response } from "express";
import type {
	GetCityDetailType,
	GetCityType,
	GetCountryType,
} from "./location.schema";
import { findCities, findCityById, findCountries } from "./location.repository";

export async function getCountryHandler(
	req: Request<{}, {}, {}, GetCountryType["query"]>,
	res: Response
) {
	const countries = await findCountries(req.query);

	return res.status(200).json({ data: countries });
}

export async function getCityHandler(
	req: Request<{}, {}, {}, GetCityType["query"]>,
	res: Response
) {
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
