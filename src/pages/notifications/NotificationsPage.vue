<script setup lang="ts">
import { Navbar } from "@/widgets/navigation";
import { Footer } from "@/widgets/footer";
import { useNavLinks, useSeo } from "@/shared/composables";
import { PAGE_SEO } from "@/shared/config";
import { useI18n } from "vue-i18n";
import {
    BarChart2,
    Bell,
    LayoutTemplate,
    Mail,
    MessageSquare,
    Smartphone,
    Zap,
} from "lucide-vue-next";
import screenshot from "@/assets/images/communications.png";

defineOptions({ name: "NotificationsPage" });
useSeo(PAGE_SEO["notifications"]!);

const { t } = useI18n();
const { navLinks } = useNavLinks();

const features = [
    {
        icon: Mail,
        title: t("notifications.page.features.multichannel.title"),
        description: t("notifications.page.features.multichannel.description"),
    },
    {
        icon: Zap,
        title: t("notifications.page.features.automaticAlerts.title"),
        description: t("notifications.page.features.automaticAlerts.description"),
    },
    {
        icon: LayoutTemplate,
        title: t("notifications.page.features.customTemplates.title"),
        description: t("notifications.page.features.customTemplates.description"),
    },
    {
        icon: BarChart2,
        title: t("notifications.page.features.deliveryReports.title"),
        description: t("notifications.page.features.deliveryReports.description"),
    },
] as const;

const channels = [
    {
        icon: MessageSquare,
        title: t("notifications.page.channels.sms.title"),
        description: t("notifications.page.channels.sms.description"),
        color: "text-green-600",
        bg: "bg-green-50",
    },
    {
        icon: Mail,
        title: t("notifications.page.channels.email.title"),
        description: t("notifications.page.channels.email.description"),
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        icon: Smartphone,
        title: t("notifications.page.channels.whatsapp.title"),
        description: t("notifications.page.channels.whatsapp.description"),
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    {
        icon: Bell,
        title: t("notifications.page.channels.push.title"),
        description: t("notifications.page.channels.push.description"),
        color: "text-amber-600",
        bg: "bg-amber-50",
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
            aria-labelledby="notifications-heading"
        >
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col items-center gap-5 text-center">
                    <!-- Badge -->
                    <span
                        class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 font-body text-sm font-medium text-primary shadow-sm"
                    >
                        <Bell :size="16" aria-hidden="true" />
                        {{ t("notifications.page.badge") }}
                    </span>

                    <!-- Title -->
                    <h1
                        id="notifications-heading"
                        class="max-w-2xl font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-[46px] lg:leading-tight"
                    >
                        {{ t("notifications.page.title") }}
                    </h1>

                    <!-- Subtitle -->
                    <p class="max-w-xl font-body text-base text-secondary sm:text-lg">
                        {{ t("notifications.page.subtitle") }}
                    </p>

                    <!-- CTA -->
                    <a
                        href="/register"
                        class="mt-1 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-body text-base font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                        {{ t("notifications.page.cta") }}
                    </a>
                </div>
            </div>
        </section>

        <!-- Screenshot Section -->
        <section class="bg-white py-12 sm:py-14 lg:py-16" aria-label="Product screenshot">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <img
                    :src="screenshot"
                    :alt="t('notifications.page.screenshotAlt')"
                    class="h-auto w-full rounded-xl border border-divider shadow-sm"
                />
            </div>
        </section>

        <!-- Features Section -->
        <section
            class="bg-white pb-16 sm:pb-18 lg:pb-20"
            aria-labelledby="notifications-features-heading"
        >
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <h2 id="notifications-features-heading" class="sr-only">
                    {{ t("notifications.page.badge") }} features
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

        <!-- Channels Section -->
        <section
            class="bg-gray-50 py-16 sm:py-20 lg:py-24"
            aria-labelledby="notifications-channels-heading"
        >
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="mb-10 flex flex-col items-center gap-4 text-center sm:mb-14">
                    <h2
                        id="notifications-channels-heading"
                        class="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl"
                    >
                        {{ t("notifications.page.channels.sectionTitle") }}
                    </h2>
                    <p class="max-w-lg font-body text-base text-secondary">
                        {{ t("notifications.page.channels.sectionSubtitle") }}
                    </p>
                </div>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div
                        v-for="channel in channels"
                        :key="channel.title"
                        class="flex flex-col gap-4 rounded-xl border border-divider bg-white p-6 shadow-sm"
                    >
                        <div
                            class="flex h-12 w-12 items-center justify-center rounded-xl"
                            :class="channel.bg"
                        >
                            <component
                                :is="channel.icon"
                                :size="24"
                                :class="channel.color"
                                aria-hidden="true"
                            />
                        </div>
                        <h3 class="font-heading text-lg font-bold text-foreground">
                            {{ channel.title }}
                        </h3>
                        <p class="font-body text-sm leading-relaxed text-secondary">
                            {{ channel.description }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="bg-primary px-6 py-20 text-center md:px-20" aria-label="Call to action">
            <div class="mx-auto flex max-w-screen-xl flex-col items-center gap-6">
                <h2 class="font-heading text-3xl font-bold text-white md:text-4xl">
                    {{ t("notifications.page.ctaSection.title") }}
                </h2>
                <p class="font-body text-lg text-white/80">
                    {{ t("notifications.page.ctaSection.subtitle") }}
                </p>
                <div class="flex flex-col gap-4 sm:flex-row">
                    <a
                        href="/register"
                        class="inline-flex items-center justify-center rounded-lg border border-white bg-white px-6 py-3 font-body text-base font-semibold text-primary transition-colors hover:bg-white/90"
                    >
                        {{ t("notifications.page.ctaSection.activateNotifications") }}
                    </a>
                    <a
                        href="/contact"
                        class="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 font-body text-base font-semibold text-white transition-colors hover:bg-white/10"
                    >
                        {{ t("notifications.page.ctaSection.talkToSales") }}
                    </a>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <Footer />
    </div>
</template>
