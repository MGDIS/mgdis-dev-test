import http from "http";
import express, { Express, Request, Response } from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

import { AuthenticationRepository } from "./authentication/authentication.repository";
import { AuthenticationService } from "./authentication/authentication.service";
import { AuthenticationController } from "./authentication/authentication.controller";
import { TwitterRepository } from "./twitter/twitter.repository";
import { TwitterService } from "./twitter/twitter.service";
import { TwitterController } from "./twitter/twitter.controller";
import { Loader } from "./loader";
import { insertDemoData } from "./demo-loader";

class Server {
	#app: Express;
	#server?: http.Server;

	constructor() {
		this.#app = express();
	}

	async bootstrap() {
		this.#app.use(cors());
		this.#app.use(express.json());
		this.#app.use(
			express.urlencoded({
				extended: false,
			}),
		);

		const loader = new Loader();
		this.#app.use(loader.authenticationController.loadRoutes());
		this.#app.use(loader.twitterController.loadRoutes());

		await insertDemoData(loader.authenticationService, loader.twitterService);

		this.#server = http.createServer(this.#app);

		console.log("Loaded routes :");
		listEndpoints(this.#app).forEach((endpoint) => {
			console.log(`${endpoint.methods[0]} ${endpoint.path}`);
		});

		return this.#app;
	}

	run() {
		this.#server?.listen(8080);
		console.log("🚀 server started and available on http://localhost:8080");
	}

	shutdown() {
		this.#server?.close(() => {
			console.log("HTTP server closed");
		});
	}
}

export { Server };
