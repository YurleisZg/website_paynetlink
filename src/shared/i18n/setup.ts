import { nextTick } from "vue";
import { createI18n } from "vue-i18n";
import type { I18n, LocaleMessages, VueMessageType } from "vue-i18n";

import { config } from "@/shared/config";

type MessageSchema = LocaleMessages<VueMessageType>;
type SupportedLocale = "es" | "en";

const SUPPORTED_LOCALES: SupportedLocale[] = ["es", "en"];
const DEFAULT_LOCALE: SupportedLocale = "es";
const FALLBACK_LOCALE: SupportedLocale = "es";
const LOCALE_STORAGE_KEY = "paynetlink-locale";

function loadLocaleFiles(locale: string): MessageSchema {
    const modules = import.meta.glob<{ default: MessageSchema }>("./locales/**/*.json", {
        eager: true,
    });

    const messages: MessageSchema = {};

    for (const [path, module] of Object.entries(modules)) {
        const match = path.match(/\.\/locales\/([^/]+)\/(.+)\.json$/);
        if (!match || match[1] !== locale) continue;

        Object.assign(messages, module.default);
    }

    return messages;
}

function createOptions(locale: SupportedLocale) {
    return {
        legacy: false,
        globalInjection: true,
        locale,
        fallbackLocale: FALLBACK_LOCALE,
        missingWarn: config.isDev,
        fallbackWarn: config.isDev,
        messages: {
            es: loadLocaleFiles("es"),
            en: loadLocaleFiles("en"),
        },
    };
}

export type AppI18n = I18n<
    Record<string, MessageSchema>,
    Record<string, never>,
    Record<string, never>,
    string,
    false
>;

let i18nInstance: AppI18n | null = null;

function getInitialLocale(): SupportedLocale {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
        return stored as SupportedLocale;
    }

    const browserLang = navigator.language.split("-")[0];
    if (SUPPORTED_LOCALES.includes(browserLang as SupportedLocale)) {
        return browserLang as SupportedLocale;
    }

    return DEFAULT_LOCALE;
}

export function setupI18n(): AppI18n {
    const initialLocale = getInitialLocale();
    const i18n = createI18n(createOptions(initialLocale)) as AppI18n;
    i18nInstance = i18n;
    setI18nLanguage(initialLocale);
    return i18n;
}

export function setI18nLanguage(locale: SupportedLocale): void {
    if (!i18nInstance) return;

    i18nInstance.global.locale.value = locale;
    document.querySelector("html")?.setAttribute("lang", locale);
}

export async function loadAndSetLocale(locale: SupportedLocale): Promise<void> {
    if (!i18nInstance) return;
    if (!SUPPORTED_LOCALES.includes(locale)) return;

    const current = i18nInstance.global.locale.value;
    if (current === locale) return;

    const messages = loadLocaleFiles(locale);
    i18nInstance.global.setLocaleMessage(locale, messages);
    setI18nLanguage(locale);

    await nextTick();
}

export { SUPPORTED_LOCALES, DEFAULT_LOCALE, FALLBACK_LOCALE };
export type { SupportedLocale };
