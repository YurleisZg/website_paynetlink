<script setup lang="ts">
import { Navbar } from "@/widgets/navigation";
import { Footer } from "@/widgets/footer";
import { useNavLinks, useSeo } from "@/shared/composables";
import { PAGE_SEO } from "@/shared/config";
import { useI18n } from "vue-i18n";
import { BadgeDollarSign, CreditCard, RefreshCw, TrendingUp, Wallet } from "lucide-vue-next";
import screenshot from "@/assets/images/payment-module.png";

defineOptions({ name: "PaymentModulePage" });
useSeo(PAGE_SEO["payment-module"]!);

const { t } = useI18n();
const { navLinks } = useNavLinks();

const features = [
    {
        icon: RefreshCw,
        title: t("paymentModule.page.features.recurringCollections.title"),
        description: t("paymentModule.page.features.recurringCollections.description"),
    },
    {
        icon: Wallet,
        title: t("paymentModule.page.features.multipleChannels.title"),
        description: t("paymentModule.page.features.multipleChannels.description"),
    },
    {
        icon: TrendingUp,
        title: t("paymentModule.page.features.delinquencyControl.title"),
        description: t("paymentModule.page.features.delinquencyControl.description"),
    },
    {
        icon: BadgeDollarSign,
        title: t("paymentModule.page.features.reconciliation.title"),
        description: t("paymentModule.page.features.reconciliation.description"),
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
            aria-labelledby="payment-module-heading"
        >
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col items-center gap-5 text-center">
                    <!-- Badge -->
                    <span
                        class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 font-body text-sm font-medium text-primary shadow-sm"
                    >
                        <CreditCard :size="16" aria-hidden="true" />
                        {{ t("paymentModule.page.badge") }}
                    </span>

                    <!-- Title -->
                    <h1
                        id="payment-module-heading"
                        class="max-w-2xl font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-[46px] lg:leading-tight"
                    >
                        {{ t("paymentModule.page.title") }}
                    </h1>

                    <!-- Subtitle -->
                    <p class="max-w-xl font-body text-base text-secondary sm:text-lg">
                        {{ t("paymentModule.page.subtitle") }}
                    </p>

                    <!-- CTA -->
                    <a
                        href="/demo"
                        class="mt-1 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-body text-base font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                        {{ t("paymentModule.page.cta") }}
                    </a>
                </div>
            </div>
        </section>

        <!-- Screenshot Section -->
        <section class="bg-white py-12 sm:py-14 lg:py-16" aria-label="Product screenshot">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <img
                    :src="screenshot"
                    :alt="t('paymentModule.page.screenshotAlt')"
                    class="h-auto w-full rounded-xl border border-divider shadow-sm"
                />
            </div>
        </section>

        <!-- Features Section -->
        <section
            class="bg-white pb-16 sm:pb-18 lg:pb-20"
            aria-labelledby="payment-features-heading"
        >
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <h2 id="payment-features-heading" class="sr-only">
                    {{ t("paymentModule.page.badge") }} features
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
