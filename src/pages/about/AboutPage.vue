<script setup lang="ts">
import { Navbar } from "@/widgets/navigation";
import { Footer } from "@/widgets/footer";
import { useNavLinks } from "@/shared/composables";
import { Heart, Shield, Zap } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

defineOptions({ name: "AboutPage" });

const { t } = useI18n();
const { navLinks } = useNavLinks();

const values = [
    {
        icon: Heart,
        title: t("about.page.values.passion.title"),
        description: t("about.page.values.passion.description"),
    },
    {
        icon: Shield,
        title: t("about.page.values.trust.title"),
        description: t("about.page.values.trust.description"),
    },
    {
        icon: Zap,
        title: t("about.page.values.innovation.title"),
        description: t("about.page.values.innovation.description"),
    },
] as const;
</script>

<template>
    <div class="flex min-h-screen flex-col bg-white">
        <!-- Navbar -->
        <Navbar :links="navLinks" />

        <!-- Hero Section -->
        <section class="bg-foreground py-16 sm:py-20 lg:py-24" aria-labelledby="about-heading">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col items-center gap-3 text-center">
                    <h1
                        id="about-heading"
                        class="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-[46px] lg:leading-tight"
                    >
                        {{ t("about.page.title") }}
                    </h1>
                    <p class="max-w-xl font-body text-base text-white/70 sm:text-lg">
                        {{ t("about.page.subtitle") }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Mission Section -->
        <section class="bg-white py-14 sm:py-16 lg:py-20">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div
                    class="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16"
                >
                    <!-- Image -->
                    <div class="w-full lg:w-[420px] lg:shrink-0">
                        <img
                            :src="'/images/about.png'"
                            :alt="t('about.page.mission.heading')"
                            class="h-auto w-full rounded-xl border border-divider object-cover"
                        />
                    </div>

                    <!-- Text -->
                    <div class="flex flex-col gap-4">
                        <span
                            class="font-body text-sm font-semibold uppercase tracking-widest text-primary"
                        >
                            {{ t("about.page.mission.label") }}
                        </span>
                        <h2
                            class="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-[36px] lg:leading-tight"
                        >
                            {{ t("about.page.mission.heading") }}
                        </h2>
                        <p class="font-body text-base leading-relaxed text-secondary">
                            {{ t("about.page.mission.description") }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Values Section -->
        <section class="bg-surface py-14 sm:py-16 lg:py-20" aria-labelledby="values-heading">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <h2
                    id="values-heading"
                    class="mb-10 text-center font-heading text-2xl font-bold text-foreground sm:text-3xl"
                >
                    {{ t("about.page.values.title") }}
                </h2>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div
                        v-for="value in values"
                        :key="value.title"
                        class="flex flex-col items-center gap-3 rounded-xl border border-divider bg-white px-6 py-8 text-center shadow-sm"
                    >
                        <div
                            class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light"
                            aria-hidden="true"
                        >
                            <component :is="value.icon" :size="24" class="text-primary" />
                        </div>
                        <h3 class="font-heading text-lg font-semibold text-foreground">
                            {{ value.title }}
                        </h3>
                        <p class="font-body text-sm text-secondary">
                            {{ value.description }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>
