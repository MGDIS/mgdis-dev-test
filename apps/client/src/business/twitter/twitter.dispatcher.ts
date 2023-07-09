import type { Tweet } from "../types/tweet";

class TweetEventsDispatcher {
	emitTweetCreated(tweet: Tweet): void {
		const event = new CustomEvent("tweetCreated", {
			detail: tweet,
		});
		document.dispatchEvent(event);
	}
}

export { TweetEventsDispatcher };
