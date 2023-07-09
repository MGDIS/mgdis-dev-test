import type { AuthenticationService } from "../authentication/authentication.service";
import type { Tweet } from "../types/tweet";
import type { TwitterRestAdapter } from "./twitter.adapter";
import type { TweetEventsDispatcher } from "./twitter.dispatcher";

class TwitterService {
	#authService: AuthenticationService;

	#tweetAdapter: TwitterRestAdapter;

	#tweetDispatcher: TweetEventsDispatcher;

	constructor(
		authService: AuthenticationService,
		tweetAdapter: TwitterRestAdapter,
		tweetDispatcher: TweetEventsDispatcher,
	) {
		this.#authService = authService;
		this.#tweetAdapter = tweetAdapter;
		this.#tweetDispatcher = tweetDispatcher;
	}

	async listTweets(): Promise<Tweet[]> {
		const tweets = await this.#tweetAdapter.listTweets();
		return tweets.reverse();
	}

	async tweet(message: string): Promise<Tweet> {
		const author = this.#authService.getUsername();
		this.#checkThatAutorIsFilled(author);

		const tweet = await this.#tweetAdapter.createTweet({ message, author });
		this.#tweetDispatcher.emitTweetCreated(tweet);
		return tweet;
	}

	like(tweetId: string): Promise<Tweet> {
		return this.#tweetAdapter.likeTweet(tweetId);
	}

	#checkThatAutorIsFilled(author: string) {
		if (!author.length) {
			throw new Error("Author could not be empty");
		}
	}
}

export { TwitterService };
