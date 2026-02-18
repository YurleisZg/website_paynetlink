<script setup lang="ts">
import { useLocale } from "@/shared/composables";
import { Globe } from "lucide-vue-next";

defineOptions({ name: "LocaleSwitcher" });

const { currentLocale, localeOptions, setLocale } = useLocale();
</script>

<template>
    <div class="flex items-center gap-1.5" role="radiogroup" aria-label="Language">
        <Globe :size="15" class="text-subtle" aria-hidden="true" />
        <div class="flex items-center overflow-hidden rounded-full bg-surface">
            <button
                v-for="option in localeOptions"
                :key="option.code"
                type="button"
                role="radio"
                :aria-checked="currentLocale === option.code"
                :aria-label="option.code === 'es' ? 'Español' : 'English'"
                class="relative px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-wide transition-all duration-200"
                :class="
                    currentLocale === option.code
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-muted hover:text-foreground'
                "
                :style="currentLocale === option.code ? 'border-radius: 9999px' : ''"
                @click="setLocale(option.code)"
            >
                {{ option.label }}
            </button>
        </div>
    </div>
</template>
