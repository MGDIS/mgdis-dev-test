<template>
	<honk-layout>
		<template #nav>
			<ul>
				<li>{{ username }}</li>
				<li>
					<button @click="logout" class="outline">Logout</button>
				</li>
			</ul>
		</template>
		<article>
			<header>
				<CreateTweet />
			</header>
			<tweet-card v-for="(tweet, index) in tweets" :key="tweet.id" :id="`tweet-card-${tweet.id}`" :tweet-id="tweet.id"
				:author="tweet.author" :message="tweet.message" :created-at="tweet.createdAt" :likes="tweet.likes"
				@tweetliked="likeTweet(tweet.id, index)"></tweet-card>
		</article>
	</honk-layout>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import HonkLayout from "@/components/HonkLayout.vue";
import CreateTweet from "@/components/CreateTweet.vue";
import { AuthenticationService } from "@/business/authentication/authentication.service";
import { TwitterService } from "@/business/twitter/twitter.service";
import { Tweet } from "@/business/types/tweet";

let authenticationService: AuthenticationService
let twitterService: TwitterService;

export default defineComponent({
	data() {
		return {
			message: "",
			username: "",
			tweets: [] as Tweet[],
		};
	},
	methods: {
		async listTweets() {
			this.tweets = await twitterService.listTweets();
		},

		async refresh() {
			this.listTweets();
		},

		clearForm() {
			this.message = "";
		},

		async logout() {
			await authenticationService.logout();
			this.$router.push("signin");
		},

		async likeTweet(id = "", index: number) {
			const tweet = await twitterService.like(id);
			this.tweets[index].likes = tweet.likes;
		},
	},
	mounted() {
		this.username;
		this.message;
		this.tweets;

		authenticationService = inject('authenticationService');
		twitterService = inject('twitterService');

		if (!authenticationService.isAuthenticated()) {
			this.$router.push("/");
		} else {
			this.username = authenticationService.getUsername();
			this.listTweets();
		}

		document.addEventListener("tweetCreated", this.refresh);
	},
	unmounted() {
		document.removeEventListener("tweetCreated", this.refresh);
	},
	components: { HonkLayout, CreateTweet },
});
</script>
