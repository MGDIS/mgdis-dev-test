import { nanoid } from "nanoid";
import { Tweet } from "../types/tweet";
import { TwitterRepository } from "./twitter.repository";

class TwitterService {
	#repository: TwitterRepository;

	constructor(repository: TwitterRepository) {
		this.#repository = repository;
	}

	async listTweets(): Promise<Tweet[]> {
		const tweets = await this.#repository.list();
		return tweets.reverse();
	}

	async createTweet(message: string, author: string): Promise<Tweet> {
		this.#checkThatMessageIsFilled(message);
		this.#checkTweetLength(message);
		this.#checkThatAutorIsFilled(author);

		const tweet = {
			id: nanoid(10),
			message,
			author,
			likes: 0,
			created_at: new Date().toISOString(),
		};

		await this.#repository.create(tweet);
		return tweet;
	}

	async likeTweet(tweetId: string) {
		/**
		 * Here :
		 * - Call the repository to check if the tweet exists
		 * - Update likes counter
		 * - Return updated tweet
		 * - (Bonus) add Typescript function return type
		 */
	}

	#checkThatMessageIsFilled(message: string) {
		if (!message.length) {
			throw new Error("Message could not be empty");
		}
	}

	#checkThatAutorIsFilled(author: string) {
		if (!author.length) {
			throw new Error("Author could not be empty");
		}
	}

	#checkTweetLength(message: string) {
		if (message.length > 144) {
			throw new Error("Message length must be lower than 144 characters");
		}
	}
}

export { TwitterService };
