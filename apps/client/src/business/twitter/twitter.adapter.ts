import type { Tweet } from "../types/tweet";

/**
 * Generate output date
 *
 * @param {Date} date input date
 * @returns {string} output
 */
function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("fr-FR", {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	}).format(date);
}

class TwitterRestAdapter {
	async listTweets(): Promise<Tweet[]> {
		const response = await fetch("http://localhost:8080/tweets");
		const jsonResp = await response.json();
		const tweets: Array<Tweet> = [];
		for (const tweet of jsonResp) {
			tweets.push({
				id: tweet.id,
				message: tweet.message,
				author: tweet.author,
				createdAt: formatDate(new Date(tweet.created_at)),
				likes: tweet.likes,
			});
		}
		return tweets;
	}

	async createTweet(tweet: Tweet) {
		/**
		 * Here :
		 * - Call POST /tweets API endpoint to create tweets (see https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)
		 * - Return created tweet
		 */
	}

	async likeTweet(tweetId: string) {
		/**
		 * Here :
		 * - Call POST /tweets/:tweetId/like-tweet API endpoint to create tweets (same as create tweet solution)
		 * - Return updated tweet
		 */
	}
}

export { TwitterRestAdapter };
