<script setup lang="ts">
import { FeatureCard } from "@/shared/ui";
import type { Component } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({ name: "FeaturesSection" });

const { t } = useI18n();

interface Feature {
    icon: Component;
    title: string;
    description: string;
    linkText: string;
}

interface Props {
    features: Feature[];
}

defineProps<Props>();
</script>

<template>
    <section
        id="productos"
        class="scroll-reveal flex flex-col items-center gap-12 bg-white px-6 py-20 md:px-20 md:py-20"
    >
        <div class="flex max-w-2xl flex-col gap-3 text-center">
            <h2 class="font-heading text-3xl font-bold text-foreground md:text-4xl" role="heading">
                {{ t("home.features.title") }}
            </h2>
            <p class="font-body text-base leading-relaxed text-muted md:text-lg md:leading-[1.5]">
                {{ t("home.features.description") }}
            </p>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
                v-for="feature in features"
                :key="feature.title"
                data-testid="feature-card"
                :icon="feature.icon"
                :title="feature.title"
                :description="feature.description"
                :link-text="feature.linkText"
            />
        </div>
    </section>
</template>
