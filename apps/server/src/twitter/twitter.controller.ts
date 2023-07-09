import PromiseRouter from "express-promise-router";
import { Router } from "express";
import { TwitterService } from "./twitter.service";

class TwitterController {
	#service: TwitterService;
	#router: Router;
	constructor(service: TwitterService) {
		this.#service = service;
		this.#router = PromiseRouter();
	}

	loadRoutes() {
		this.#router.get("/tweets", async (req, res) => {
			const tweets = await this.#service.listTweets();
			res.json(tweets);
		});

		this.#router.post("/tweets", async (req, res) => {
			const { message, author } = req.body;
			const created = await this.#service.createTweet(message, author);
			res.status(201).json(created);
		});

		this.#router.post("/tweets/:tweetId/like-tweet", async (req, res) => {
			/**
			 * Here :
			 * - Get `tweetId` path parameter (see https://expressjs.com/en/4x/api.html#req.params)
			 * - Call the like service method
			 * - Return the updated tweet
			 */
		});

		return this.#router;
	}
}

export { TwitterController };
