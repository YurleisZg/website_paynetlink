<script setup lang="ts">
import { computed } from "vue";
import { Check } from "lucide-vue-next";

defineOptions({ name: "PricingCard" });

const props = withDefaults(
    defineProps<{
        planName: string;
        price: string;
        period?: string;
        features: string[];
        buttonLabel?: string;
        featured?: boolean;
        badgeLabel?: string;
    }>(),
    { period: "/mes", buttonLabel: "Get Started", featured: false, badgeLabel: "Más popular" }
);

const cardClasses = computed(() =>
    props.featured
        ? "border-2 border-primary shadow-[0_8px_32px_rgba(26,86,219,0.08)]"
        : "border border-divider"
);

const buttonClasses = computed(() =>
    props.featured
        ? "bg-primary text-white hover:bg-primary/90"
        : "border border-secondary text-secondary hover:bg-surface"
);
</script>

<template>
    <div
        :class="cardClasses"
        class="flex w-full flex-col gap-5 rounded-lg bg-white p-6 md:w-[340px] md:gap-6 md:p-8"
    >
        <div v-if="featured && badgeLabel" class="flex">
            <span
                class="rounded-xl bg-primary px-3 py-1 font-body text-xs font-semibold text-white"
            >
                {{ badgeLabel }}
            </span>
        </div>
        <h3 class="font-heading text-lg font-bold text-foreground md:text-[22px]">
            {{ planName }}
        </h3>
        <div class="flex items-end gap-1">
            <span class="font-heading text-3xl font-bold text-foreground md:text-4xl">
                {{ price }}
            </span>
            <span class="mb-1 font-body text-base text-subtle">{{ period }}</span>
        </div>
        <div class="h-px w-full bg-divider" />
        <ul class="flex flex-col gap-2.5 md:gap-3">
            <li v-for="feature in features" :key="feature" class="flex items-center gap-2.5">
                <Check :size="18" class="shrink-0 text-success" />
                <span class="font-body text-sm text-secondary">{{ feature }}</span>
            </li>
        </ul>
        <button
            :class="buttonClasses"
            class="w-full rounded py-3 text-center font-body text-[15px] font-semibold transition-colors md:py-3.5"
        >
            {{ buttonLabel }}
        </button>
    </div>
</template>
