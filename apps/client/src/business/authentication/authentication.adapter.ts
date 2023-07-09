class AuthenticationRestAdapter {
	async auth(username: string, password: string): Promise<string> {
		const response = await fetch("/api/signin", {
			method: "POST",
			headers: {
				Accept: "text/plain",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});
		const token = await response.text();
		return token;
	}

	async register(username: string, password: string) {
		const response = await fetch("/api/register", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});
		if (response.status !== 201) {
			throw new Error("Registration error");
		}
	}
}

export { AuthenticationRestAdapter };
