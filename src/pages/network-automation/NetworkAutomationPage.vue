<script setup lang="ts">
import { Navbar } from "@/widgets/navigation";
import { Footer } from "@/widgets/footer";
import { useNavLinks } from "@/shared/composables";
import { useI18n } from "vue-i18n";
import { Activity, Link2, Router, Shield, Zap } from "lucide-vue-next";
import screenshot from "@/assets/images/network-automation.png";

defineOptions({ name: "NetworkAutomationPage" });

const { t } = useI18n();
const { navLinks } = useNavLinks();

const features = [
    {
        icon: Link2,
        title: t("networkAutomation.page.features.directApi.title"),
        description: t("networkAutomation.page.features.directApi.description"),
    },
    {
        icon: Zap,
        title: t("networkAutomation.page.features.autoActivation.title"),
        description: t("networkAutomation.page.features.autoActivation.description"),
    },
    {
        icon: Shield,
        title: t("networkAutomation.page.features.suspensionOnDefault.title"),
        description: t("networkAutomation.page.features.suspensionOnDefault.description"),
    },
    {
        icon: Activity,
        title: t("networkAutomation.page.features.realTimeMonitoring.title"),
        description: t("networkAutomation.page.features.realTimeMonitoring.description"),
    },
] as const;
</script>

<template>
    <div class="flex min-h-screen flex-col bg-white">
        <!-- Navbar -->
        <Navbar :links="navLinks" />

        <!-- Hero Section -->
        <section
            class="bg-primary-light py-16 sm:py-20 lg:py-24"
            aria-labelledby="network-automation-heading"
        >
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col items-center gap-5 text-center">
                    <!-- Badge -->
                    <span
                        class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 font-body text-sm font-medium text-primary shadow-sm"
                    >
                        <Router :size="16" aria-hidden="true" />
                        {{ t("networkAutomation.page.badge") }}
                    </span>

                    <!-- Title -->
                    <h1
                        id="network-automation-heading"
                        class="max-w-2xl font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-[46px] lg:leading-tight"
                    >
                        {{ t("networkAutomation.page.title") }}
                    </h1>

                    <!-- Subtitle -->
                    <p class="max-w-xl font-body text-base text-secondary sm:text-lg">
                        {{ t("networkAutomation.page.subtitle") }}
                    </p>

                    <!-- CTA -->
                    <a
                        href="/demo"
                        class="mt-1 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-body text-base font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                        {{ t("networkAutomation.page.cta") }}
                    </a>
                </div>
            </div>
        </section>

        <!-- Screenshot Section -->
        <section class="bg-white py-12 sm:py-14 lg:py-16" aria-label="Product screenshot">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <img
                    :src="screenshot"
                    :alt="t('networkAutomation.page.screenshotAlt')"
                    class="h-auto w-full rounded-xl border border-divider shadow-sm"
                />
            </div>
        </section>

        <!-- Features Section -->
        <section
            class="bg-white pb-16 sm:pb-18 lg:pb-20"
            aria-labelledby="network-features-heading"
        >
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <h2 id="network-features-heading" class="sr-only">
                    {{ t("networkAutomation.page.badge") }} features
                </h2>
                <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div
                        v-for="feature in features"
                        :key="feature.title"
                        class="flex flex-col gap-3"
                    >
                        <component
                            :is="feature.icon"
                            :size="28"
                            class="text-primary"
                            aria-hidden="true"
                        />
                        <h3 class="font-heading text-lg font-bold text-foreground">
                            {{ feature.title }}
                        </h3>
                        <p class="font-body text-sm leading-relaxed text-secondary">
                            {{ feature.description }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>
