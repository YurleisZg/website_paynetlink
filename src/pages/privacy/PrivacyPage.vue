<script setup lang="ts">
import { Navbar } from "@/widgets/navigation";
import { Footer } from "@/widgets/footer";
import { useNavLinks } from "@/shared/composables";
import { useI18n } from "vue-i18n";

defineOptions({ name: "PrivacyPage" });

const { t } = useI18n();
const { navLinks } = useNavLinks();

const sections = [
    "informationCollected",
    "useOfInformation",
    "dataSecurity",
    "userRights",
    "cookies",
    "thirdParties",
    "policyChanges",
    "contact",
] as const;
</script>

<template>
    <div class="flex min-h-screen flex-col bg-white">
        <!-- Navbar -->
        <Navbar :links="navLinks" />

        <!-- Hero Section -->
        <section class="bg-surface py-12 sm:py-14 lg:py-16" aria-labelledby="privacy-heading">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col items-center gap-2 text-center">
                    <h1
                        id="privacy-heading"
                        class="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-[42px] lg:leading-tight"
                    >
                        {{ t("privacy.page.title") }}
                    </h1>
                    <p class="font-body text-sm text-secondary">
                        {{ t("privacy.page.lastUpdated") }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Content Section -->
        <section class="flex-1 bg-white py-12 sm:py-14 lg:py-16">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="mx-auto max-w-3xl">
                    <article
                        v-for="section in sections"
                        :key="section"
                        class="mb-10 last:mb-0"
                        :aria-labelledby="`section-${section}`"
                    >
                        <h2
                            :id="`section-${section}`"
                            class="mb-3 font-heading text-xl font-semibold text-foreground"
                        >
                            {{ t(`privacy.page.sections.${section}.title`) }}
                        </h2>
                        <p class="font-body text-base leading-relaxed text-secondary">
                            {{ t(`privacy.page.sections.${section}.content`) }}
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>
