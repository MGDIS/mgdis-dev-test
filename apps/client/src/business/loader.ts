import { AuthenticationRestAdapter } from "./authentication/authentication.adapter";
import { AuthenticationService } from "./authentication/authentication.service";
import { SessionCookieAdapter } from "./authentication/session.adapter";
import { TwitterRestAdapter } from "./twitter/twitter.adapter";
import { TweetEventsDispatcher } from "./twitter/twitter.dispatcher";
import { TwitterService } from "./twitter/twitter.service";

class Loader {
	#sessionAdapter: SessionCookieAdapter;
	#authenticationAdapter: AuthenticationRestAdapter;
	#authenticationService: AuthenticationService;
	#tweetEventsDispatcher: TweetEventsDispatcher;
	#twitterAdapter: TwitterRestAdapter;
	#twitterService: TwitterService;
	constructor() {
		this.#sessionAdapter = new SessionCookieAdapter();
		this.#authenticationAdapter = new AuthenticationRestAdapter();
		this.#authenticationService = new AuthenticationService(
			this.#authenticationAdapter,
			this.#sessionAdapter,
		);
		this.#tweetEventsDispatcher = new TweetEventsDispatcher();
		this.#twitterAdapter = new TwitterRestAdapter();
		this.#twitterService = new TwitterService(
			this.#authenticationService,
			this.#twitterAdapter,
			this.#tweetEventsDispatcher,
		);
	}

	get authenticationService() {
		return this.#authenticationService;
	}

	get twitterService() {
		return this.#twitterService;
	}
}

export { Loader };
