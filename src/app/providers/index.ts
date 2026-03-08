import type { App } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createUnhead, headSymbol } from "@unhead/vue";
import { setupI18n } from "@/shared/i18n";

export function registerProviders(app: App): void {
    const head = createUnhead();
    const i18n = setupI18n();
    app.provide(headSymbol, head);
    app.use(i18n);
    app.use(VueQueryPlugin, {
        enableDevtoolsV6Plugin: true,
    });
}
