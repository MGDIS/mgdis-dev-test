import PromiseRouter from "express-promise-router";
import { AuthenticationService } from "./authentication.service";
import { Router } from "express";
class AuthenticationController {
	#service: AuthenticationService;
	#router: Router;
	constructor(service: AuthenticationService) {
		this.#service = service;
		this.#router = PromiseRouter();
	}

	loadRoutes() {
		this.#router.post("/register", async (req, res) => {
			const { username, password } = req.body;
			try {
				await this.#service.register(username, password);
				res.status(201).send();
			} catch (error) {
				res.status(400).json({
					error: "User already exists",
				});
			}
		});

		this.#router.post("/signin", async (req, res) => {
			const { username, password } = req.body;
			try {
				const token = await this.#service.authenticate(username, password);
				res.send(token);
			} catch (error) {
				res.status(401).send();
			}
		});

		return this.#router;
	}
}

export { AuthenticationController };
