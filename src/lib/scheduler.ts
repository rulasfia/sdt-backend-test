import { findCityById } from "@/module/location/location.repository";
import { User, findAllUser } from "@/module/user/user.repository";
import { timezoneGetter } from "@/utils/external/TimeZoneGetter";
import schedule from "node-schedule";

/**
 * run this function everytime app start
 * to create job for existing user.
 */
export async function setupBirthdayJob() {
	const users = await findAllUser();

	for (let user of users) {
		const city = await findCityById(user.location_city_id);

		if (city.length < 1) continue;

		const tz = await timezoneGetter(city[0].latitude, city[0].longitude);

		/** run job every year at 9 AM local timezone */
		const rule = new schedule.RecurrenceRule();
		rule.date = user.birthday.getDate();
		rule.month = user.birthday.getMonth();
		rule.hour = 9;
		rule.minute = 0;
		rule.tz = tz.timeZoneId;

		schedule.scheduleJob(user.id, rule, (fireDate) => {
			console.log(
				`${fireDate.toDateString()} - Happy birthday ${user.first_name}`
			);
			// send email here
		});
	}
}

/**
 * run this function everytime new user added
 * to create job for new user.
 * When the app need to restart, that user will included in setupJob() fn.
 */
export async function addNewBirthdayJob(user: User) {
	const city = await findCityById(user.location_city_id);

	if (city.length < 1) return;

	const tz = await timezoneGetter(city[0].latitude, city[0].longitude);

	/** run job every year at 9 AM local timezone */
	const rule = new schedule.RecurrenceRule();
	rule.date = user.birthday.getDate();
	rule.month = user.birthday.getMonth();
	rule.hour = 9;
	rule.minute = 0;
	rule.tz = tz.timeZoneId;

	schedule.scheduleJob(user.id, rule, (fireDate) => {
		console.log(
			`${fireDate.toDateString()} - Happy birthday ${user.first_name}`
		);
		// send email here
	});
}

/**
 * run this function everytime user deleted
 * to cancel user job
 */
export function removeBirthdayJob(id: User["id"]) {
	const userJob = schedule.scheduledJobs[id];
	console.log(userJob.name, userJob.nextInvocation());

	userJob.cancel();
}

/**
 * run this function everytime user data updated
 * to reschedule the job
 */
export async function rescheduleBirthdayJob(user: User) {
	const userJob = schedule.scheduledJobs[user.id];
	console.log(userJob.name, userJob.nextInvocation());

	const city = await findCityById(user.location_city_id);

	if (city.length < 1) return;

	const tz = await timezoneGetter(city[0].latitude, city[0].longitude);

	/** run job every year at 9 AM local timezone */
	const rule = new schedule.RecurrenceRule();
	rule.date = user.birthday.getDate();
	rule.month = user.birthday.getMonth();
	rule.hour = 9;
	rule.minute = 0;
	rule.tz = tz.timeZoneId;

	userJob.reschedule(rule);
}