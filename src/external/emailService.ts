import { fetcher } from "@/utils/fetcher";

const EMAIL_API_URL = "https://email-service.digitalenvision.com.au/send-email";

export type EmailApiResponse = {
	status: string;
	sentTime: string;
};

export async function sendEmail(params: { email: string; message: string }) {
	const data = await fetcher<EmailApiResponse>(EMAIL_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(params),
	});

	return data;
}
