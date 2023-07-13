export async function fetcher<T>(
	url: string,
	config?: RequestInit
): Promise<T> {
	return fetch(url, config).then(async (res) => {
		if (res.ok) {
			return await res.json();
		} else {
			const errorMsg = await res.text();
			return Promise.reject(new Error(errorMsg));
		}
	});
}
