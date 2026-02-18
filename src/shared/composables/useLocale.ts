import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { loadAndSetLocale, SUPPORTED_LOCALES, type SupportedLocale } from "@/shared/i18n";

const LOCALE_STORAGE_KEY = "paynetlink-locale";

interface LocaleOption {
    code: SupportedLocale;
    label: string;
}

const LOCALE_OPTIONS: LocaleOption[] = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
];

export function useLocale() {
    const { locale } = useI18n();

    const currentLocale = computed(() => locale.value as SupportedLocale);

    async function setLocale(newLocale: SupportedLocale): Promise<void> {
        if (!SUPPORTED_LOCALES.includes(newLocale)) return;
        if (newLocale === currentLocale.value) return;

        localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
        await loadAndSetLocale(newLocale);
    }

    async function toggleLocale(): Promise<void> {
        const next = currentLocale.value === "es" ? "en" : "es";
        await setLocale(next);
    }

    return {
        currentLocale,
        localeOptions: LOCALE_OPTIONS,
        setLocale,
        toggleLocale,
    };
}
