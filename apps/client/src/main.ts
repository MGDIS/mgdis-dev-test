import { createApp, InjectionKey } from "vue";
import "@picocss/pico/css/pico.css";
import "@mgdis/style";
import {
	applyPolyfills,
	defineCustomElements,
} from "@mgdis/web-components/loader";
import App from "./App.vue";
import router from "./router";
import { Loader } from "./business/loader";

applyPolyfills().then(() => {
	defineCustomElements(window, {
		ce: (eventName: string, opts: any) =>
			new CustomEvent(eventName.toLowerCase(), opts),
	} as any);
});

const instances = new Loader();

const app = createApp(App);
app.provide("authenticationService", instances.authenticationService);
app.provide("twitterService", instances.twitterService);

app.use(router);

app.mount("#app");
