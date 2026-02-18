import type { App } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { setupI18n } from "@/shared/i18n";

export function registerProviders(app: App): void {
    const i18n = setupI18n();
    app.use(i18n);
    app.use(VueQueryPlugin, {
        enableDevtoolsV6Plugin: true,
    });
}
