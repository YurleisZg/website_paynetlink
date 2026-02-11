import type { App } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

export function registerProviders(app: App): void {
    app.use(VueQueryPlugin, {
        enableDevtoolsV6Plugin: true,
    });
}
