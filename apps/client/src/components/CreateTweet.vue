<template>
	<tweet-create :message="data.message" @tweetsubmited="methods.onSubmit"></tweet-create>
</template>

<script lang="ts">
import { reactive, defineComponent, inject } from "vue";
import "@mgdis/web-components/dist/components/tweet-create";
import { TwitterService } from "@/business/twitter/twitter.service";

type CreateTweetData = {
	message: string;
};

export default defineComponent({
	name: "CreateTweet",
	setup() {
		const twitterService: TwitterService = inject('twitterService');
		const data = reactive<CreateTweetData>({ message: "" });

		function clearForm() {
			data.message = "";
		}

		async function onSubmit(event: CustomEvent) {
			data.message = event.detail;
			await twitterService.tweet(data.message);
			clearForm();
		}

		return {
			methods: { onSubmit },
			data,
		};
	},
});
</script>
