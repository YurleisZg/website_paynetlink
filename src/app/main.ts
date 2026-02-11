import { createApp } from "vue";
import App from "./App.vue";
import { registerProviders } from "./providers";
import { router } from "./router";
import "@/styles/index.css";

const app = createApp(App);
registerProviders(app);
app.use(router);
app.mount("#app");
