<template>
	<honk-layout>
		<tweet-sign form-title="Sign in" btn-label="Login" img="https://source.unsplash.com/uymG7UVPXpI/1000x1200"
			:username="username" :password="password" @signsubmited="onSubmit">
			<p class="sign-option">
				Don't have an account yet?
				<RouterLink to="/signup">Register now</RouterLink>
			</p>
		</tweet-sign>
	</honk-layout>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

import honkLayout from "@/components/HonkLayout.vue";
import { AuthenticationService } from "@/business/authentication/authentication.service";

let authenticationService: AuthenticationService;

export default defineComponent({
	components: { honkLayout },
	data() {
		return {
			username: "",
			password: "",
		};
	},
	methods: {
		/**
		 *
		 */
		clearForm() {
			this.username = "";
			this.password = "";
		},
		/**
		 *
		 * @param event
		 */
		async onSubmit(event: any) {
			this.username = event.detail.username;
			this.password = event.detail.password;
			await authenticationService.authenticate(this.username, this.password);
			this.clearForm();
			this.redirect();
		},
		/**
		 *
		 */
		redirect() {
			this.$router.push("home");
		},
	},
	mounted() {
		this.username;
		this.password;
		authenticationService = inject('authenticationService');
	},
});
</script>
