import { Tweet } from "../types/tweet";

class TwitterRepository {
	tweets: Tweet[];

	constructor() {
		this.tweets = [];
	}

	async create(tweet: Tweet): Promise<void> {
		this.tweets.push(tweet);
	}

	async list(): Promise<Tweet[]> {
		return this.tweets;
	}

	async getTweet(tweetId: string): Promise<Tweet> {
		const found = this.tweets.find((tweet) => tweet.id === tweetId);
		if (!found) {
			throw new Error("Not found");
		}
		return found;
	}

	async updateLikes(tweetId: string): Promise<Tweet> {
		const found = await this.getTweet(tweetId);
		found.likes += 1;
		return found;
	}
}

export { TwitterRepository };
