<template>
	<honk-layout>
		<tweet-sign form-title="Register" btn-label="Register" img="https://source.unsplash.com/r6WPOp_q_xM/800x1000"
			:username="username" :password="password" @signsubmited="onSubmit">
			<p class="sign-option">
				Already have login and password?
				<RouterLink to="/signin">Sign in</RouterLink>
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
			await authenticationService.register(this.username, this.password);
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
