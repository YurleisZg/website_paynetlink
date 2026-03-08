<script setup lang="ts">
import { Navbar } from "@/widgets/navigation";
import { Footer } from "@/widgets/footer";
import { useNavLinks, useSeo } from "@/shared/composables";
import { PAGE_SEO } from "@/shared/config";
import { useI18n } from "vue-i18n";
import image1 from "@/assets/images/success-stories-1.png";
import image2 from "@/assets/images/success-stories-2.png";

defineOptions({ name: "SuccessStoriesPage" });
useSeo(PAGE_SEO["success-stories"]!);

const { t } = useI18n();
const { navLinks } = useNavLinks();

interface Metric {
    value: string;
    label: string;
}

interface Story {
    key: string;
    badge: string;
    heading: string;
    description: string;
    metrics: Metric[];
    image?: string;
    imagePosition?: "left" | "right";
}

const stories: Story[] = [
    {
        key: "fibranet",
        badge: t("successStories.page.stories.fibranet.badge"),
        heading: t("successStories.page.stories.fibranet.heading"),
        description: t("successStories.page.stories.fibranet.description"),
        metrics: [
            {
                value: t("successStories.page.stories.fibranet.metrics.delinquency.value"),
                label: t("successStories.page.stories.fibranet.metrics.delinquency.label"),
            },
            {
                value: t("successStories.page.stories.fibranet.metrics.subscribers.value"),
                label: t("successStories.page.stories.fibranet.metrics.subscribers.label"),
            },
            {
                value: t("successStories.page.stories.fibranet.metrics.implementation.value"),
                label: t("successStories.page.stories.fibranet.metrics.implementation.label"),
            },
        ],
        image: image1,
        imagePosition: "left",
    },
    {
        key: "netpro",
        badge: t("successStories.page.stories.netpro.badge"),
        heading: t("successStories.page.stories.netpro.heading"),
        description: t("successStories.page.stories.netpro.description"),
        metrics: [
            {
                value: t("successStories.page.stories.netpro.metrics.automated.value"),
                label: t("successStories.page.stories.netpro.metrics.automated.label"),
            },
            {
                value: t("successStories.page.stories.netpro.metrics.clients.value"),
                label: t("successStories.page.stories.netpro.metrics.clients.label"),
            },
        ],
    },
    {
        key: "connectmax",
        badge: t("successStories.page.stories.connectmax.badge"),
        heading: t("successStories.page.stories.connectmax.heading"),
        description: t("successStories.page.stories.connectmax.description"),
        metrics: [
            {
                value: t("successStories.page.stories.connectmax.metrics.growth.value"),
                label: t("successStories.page.stories.connectmax.metrics.growth.label"),
            },
            {
                value: t("successStories.page.stories.connectmax.metrics.savings.value"),
                label: t("successStories.page.stories.connectmax.metrics.savings.label"),
            },
        ],
        image: image2,
        imagePosition: "right",
    },
];
</script>

<template>
    <div class="flex min-h-screen flex-col bg-white">
        <!-- Navbar -->
        <Navbar :links="navLinks" />

        <!-- Hero Section -->
        <section
            class="bg-surface py-14 sm:py-16 lg:py-20"
            aria-labelledby="success-stories-heading"
        >
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col items-center gap-3 text-center">
                    <h1
                        id="success-stories-heading"
                        class="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-[42px] lg:leading-tight"
                    >
                        {{ t("successStories.page.title") }}
                    </h1>
                    <p class="max-w-xl font-body text-base text-secondary sm:text-lg">
                        {{ t("successStories.page.subtitle") }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Stories Section -->
        <section class="flex-1 bg-white py-14 sm:py-16 lg:py-20">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col gap-16 lg:gap-20">
                    <article
                        v-for="story in stories"
                        :key="story.key"
                        :aria-label="story.heading"
                        class="flex flex-col gap-8"
                        :class="{
                            'lg:flex-row lg:items-center lg:gap-12':
                                story.image && story.imagePosition === 'left',
                            'lg:flex-row-reverse lg:items-center lg:gap-12':
                                story.image && story.imagePosition === 'right',
                        }"
                    >
                        <!-- Image -->
                        <div v-if="story.image" class="w-full shrink-0 lg:w-[420px]">
                            <img
                                :src="story.image"
                                :alt="story.heading"
                                class="h-auto w-full rounded-xl border border-divider object-cover"
                            />
                        </div>

                        <!-- Text content -->
                        <div class="flex flex-col gap-5">
                            <!-- Badge -->
                            <span
                                class="inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary-light px-3 py-1 font-body text-xs font-semibold text-primary"
                            >
                                {{ story.badge }}
                            </span>

                            <!-- Heading -->
                            <h2 class="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                                {{ story.heading }}
                            </h2>

                            <!-- Description -->
                            <p class="font-body text-base leading-relaxed text-secondary">
                                {{ story.description }}
                            </p>

                            <!-- Metrics -->
                            <div class="flex flex-wrap gap-8 pt-1">
                                <div
                                    v-for="metric in story.metrics"
                                    :key="metric.label"
                                    class="flex flex-col gap-0.5"
                                >
                                    <span
                                        class="font-heading text-2xl font-bold text-primary sm:text-3xl"
                                    >
                                        {{ metric.value }}
                                    </span>
                                    <span class="font-body text-sm text-secondary">
                                        {{ metric.label }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="bg-primary py-14 sm:py-16 lg:py-20" aria-labelledby="cta-heading">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col items-center gap-6 text-center">
                    <h2
                        id="cta-heading"
                        class="font-heading text-2xl font-bold text-white sm:text-3xl lg:text-[36px]"
                    >
                        {{ t("successStories.page.cta.heading") }}
                    </h2>
                    <a
                        href="/demo"
                        class="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 font-body text-base font-semibold text-white transition-colors hover:bg-white hover:text-primary"
                    >
                        {{ t("successStories.page.cta.button") }}
                    </a>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>
