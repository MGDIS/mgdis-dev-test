import { User } from "../types/user";

class AuthenticationRepository {
	users: User[];

	constructor() {
		this.users = [];
	}

	async register(user: User): Promise<void> {
		this.users.push(user);
	}

	async getUser(username: string): Promise<User | undefined> {
		const found = this.users.find((user) => user.username === username);
		return found;
	}
}

export { AuthenticationRepository };
