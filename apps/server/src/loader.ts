import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationRepository } from "./authentication/authentication.repository";
import { AuthenticationService } from "./authentication/authentication.service";
import { TwitterController } from "./twitter/twitter.controller";
import { TwitterRepository } from "./twitter/twitter.repository";
import { TwitterService } from "./twitter/twitter.service";

class Loader {
	#authenticationRepository: AuthenticationRepository;
	#authenticationService: AuthenticationService;
	#authenticationController: AuthenticationController;
	#twitterRepository: TwitterRepository;
	#twitterService: TwitterService;
	#twitterController: TwitterController;

	constructor() {
		this.#authenticationRepository = new AuthenticationRepository();
		this.#authenticationService = new AuthenticationService(
			this.#authenticationRepository,
		);
		this.#authenticationController = new AuthenticationController(
			this.#authenticationService,
		);
		this.#twitterRepository = new TwitterRepository();
		this.#twitterService = new TwitterService(this.#twitterRepository);
		this.#twitterController = new TwitterController(this.#twitterService);
	}

	get authenticationRepository() {
		return this.#authenticationRepository;
	}

	get authenticationService() {
		return this.#authenticationService;
	}

	get authenticationController() {
		return this.#authenticationController;
	}

	get twitterRepository() {
		return this.#twitterRepository;
	}

	get twitterService() {
		return this.#twitterService;
	}

	get twitterController() {
		return this.#twitterController;
	}
}

export { Loader };
