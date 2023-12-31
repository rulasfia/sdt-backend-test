import { fetcher } from "@/utils/fetcher";

const TIMEZONE_API_URL = "https://maps.googleapis.com/maps/api/timezone/json";

export type TimezoneApiResponse = {
	dstOffset: number;
	rawOffset: number;
	status: string;
	timeZoneId: string;
	timeZoneName: string;
};

export async function getTimezoneData(lat: string, long: string) {
	const TIMEZONE_API_KEY = process.env.TIMEZONE_API_KEY;

	const today = Math.floor(new Date().getTime() / 1000);
	const url = `${TIMEZONE_API_URL}?location=${lat}%2C${long}&timestamp=${today}&key=${TIMEZONE_API_KEY}`;

	const data = await fetcher<TimezoneApiResponse>(url);

	return data;
}
