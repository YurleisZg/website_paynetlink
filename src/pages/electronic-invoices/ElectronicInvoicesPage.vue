<script setup lang="ts">
import { useNavLinks } from "@/shared/composables";
import { Footer } from "@/widgets/footer";
import { Navbar } from "@/widgets/navigation";
import { Download, FileCheck, FileText, ShieldCheck } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

defineOptions({ name: "ElectronicInvoicesPage" });

const { t } = useI18n();
const { navLinks } = useNavLinks();

const features = [
    {
        icon: FileText,
        title: t("electronicInvoices.page.features.automaticIssuance.title"),
        description: t("electronicInvoices.page.features.automaticIssuance.description"),
    },
    {
        icon: ShieldCheck,
        title: t("electronicInvoices.page.features.dianValidation.title"),
        description: t("electronicInvoices.page.features.dianValidation.description"),
    },
    {
        icon: FileCheck,
        title: t("electronicInvoices.page.features.creditDebitNotes.title"),
        description: t("electronicInvoices.page.features.creditDebitNotes.description"),
    },
    {
        icon: Download,
        title: t("electronicInvoices.page.features.downloadAndEmail.title"),
        description: t("electronicInvoices.page.features.downloadAndEmail.description"),
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
            aria-labelledby="electronic-invoices-heading"
        >
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col items-center gap-5 text-center">
                    <!-- Badge -->
                    <span
                        class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 font-body text-sm font-medium text-primary shadow-sm"
                    >
                        <FileText :size="16" aria-hidden="true" />
                        {{ t("electronicInvoices.page.badge") }}
                    </span>

                    <!-- Title -->
                    <h1
                        id="electronic-invoices-heading"
                        class="max-w-2xl font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-[46px] lg:leading-tight"
                    >
                        {{ t("electronicInvoices.page.title") }}
                    </h1>

                    <!-- Subtitle -->
                    <p class="max-w-xl font-body text-base text-secondary sm:text-lg">
                        {{ t("electronicInvoices.page.subtitle") }}
                    </p>

                    <!-- CTA -->
                    <a
                        href="/register"
                        class="mt-1 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-body text-base font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                        {{ t("electronicInvoices.page.cta") }}
                    </a>
                </div>
            </div>
        </section>

        <!-- Screenshot Section -->
        <section class="bg-white py-12 sm:py-14 lg:py-16" aria-label="Product screenshot">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <img
                    src="/images/electronic-invoices.png"
                    :alt="t('electronicInvoices.page.screenshotAlt')"
                    class="h-auto w-full rounded-xl border border-divider shadow-sm"
                />
            </div>
        </section>

        <!-- Features Section -->
        <section
            class="bg-white pb-16 sm:pb-18 lg:pb-20"
            aria-labelledby="electronic-invoices-features-heading"
        >
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <h2 id="electronic-invoices-features-heading" class="sr-only">
                    {{ t("electronicInvoices.page.badge") }} features
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

        <!-- CTA Section -->
        <section class="bg-primary px-6 py-20 text-center md:px-20" aria-label="Call to action">
            <div class="mx-auto flex max-w-screen-xl flex-col items-center gap-6">
                <h2 class="font-heading text-3xl font-bold text-white md:text-4xl">
                    {{ t("electronicInvoices.page.ctaSection.title") }}
                </h2>
                <p class="font-body text-lg text-white/80">
                    {{ t("electronicInvoices.page.ctaSection.subtitle") }}
                </p>
                <div class="flex flex-col gap-4 sm:flex-row">
                    <a
                        href="/register"
                        class="inline-flex items-center justify-center rounded-lg border border-white bg-white px-6 py-3 font-body text-base font-semibold text-primary transition-colors hover:bg-white/90"
                    >
                        {{ t("electronicInvoices.page.ctaSection.activateBilling") }}
                    </a>
                    <a
                        href="/contact"
                        class="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 font-body text-base font-semibold text-white transition-colors hover:bg-white/10"
                    >
                        {{ t("electronicInvoices.page.ctaSection.talkToSales") }}
                    </a>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <Footer />
    </div>
</template>
