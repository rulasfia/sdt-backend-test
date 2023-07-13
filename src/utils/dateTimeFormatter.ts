import dayjs from "dayjs";

export function isValidDateString(dateString: string) {
	console.log(dateString, dayjs(dateString, "YYYY/MM/DD").toString());

	return dayjs(dateString, "YYYY/MM/DD").isValid();
}
