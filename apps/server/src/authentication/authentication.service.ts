import { nanoid } from "nanoid";
import { AuthenticationRepository } from "./authentication.repository";

class AuthenticationService {
	#repository: AuthenticationRepository;

	constructor(repository: AuthenticationRepository) {
		this.#repository = repository;
	}

	async authenticate(username: string, password: string): Promise<string> {
		this.checkThatUserIsFilled(username);
		this.checkThatPasswordIsFilled(password);

		const found = await this.#repository.getUser(username);
		if (!found || found.password !== password) {
			throw new Error("Bad credentials");
		}

		return Buffer.from(`${username}:${password}`, "utf-8").toString("base64");
	}

	async register(username: string, password: string): Promise<void> {
		this.checkThatUserIsFilled(username);
		this.checkThatPasswordIsFilled(password);

		const found = await this.#repository.getUser(username);
		if (found) {
			throw new Error("User already exists");
		}

		this.#repository.register({
			id: nanoid(10),
			username,
			password,
		});
	}

	checkThatUserIsFilled(username: string) {
		if (!username.length) {
			throw new Error("Username could not be empty");
		}
	}

	checkThatPasswordIsFilled(password: string) {
		if (!password.length) {
			throw new Error("Password could not be empty");
		}
	}
}

export { AuthenticationService };
