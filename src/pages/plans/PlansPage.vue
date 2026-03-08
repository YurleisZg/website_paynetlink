<script setup lang="ts">
import { Navbar } from "@/widgets/navigation";
import { Footer } from "@/widgets/footer";
import { useNavLinks, useSeo } from "@/shared/composables";
import { PAGE_SEO } from "@/shared/config";
import { useI18n } from "vue-i18n";
import { Check, ChevronDown, Tag } from "lucide-vue-next";
import { ref, computed } from "vue";

defineOptions({ name: "PlansPage" });
useSeo(PAGE_SEO["plans"]!);

const { t } = useI18n();
const { navLinks } = useNavLinks();

const isAnnual = ref(false);

type PlanKey = "starter" | "professional" | "enterprise";

const planKeys: PlanKey[] = ["starter", "professional", "enterprise"];

const plans = computed(() =>
    planKeys.map((key) => ({
        key,
        name: t(`plans.page.plans.${key}.name`),
        price: isAnnual.value
            ? t(`plans.page.plans.${key}.annualPrice`)
            : t(`plans.page.plans.${key}.monthlyPrice`),
        period: t(`plans.page.plans.${key}.period`),
        features: [
            t(`plans.page.plans.${key}.features.0`),
            t(`plans.page.plans.${key}.features.1`),
            t(`plans.page.plans.${key}.features.2`),
            t(`plans.page.plans.${key}.features.3`),
            t(`plans.page.plans.${key}.features.4`),
            ...(key !== "starter" ? [t(`plans.page.plans.${key}.features.5`)] : []),
            ...(key === "enterprise" ? [t(`plans.page.plans.${key}.features.6`)] : []),
        ],
        buttonLabel: t(`plans.page.plans.${key}.buttonLabel`),
        featured: key === "professional",
        href: key === "enterprise" ? "/contact" : "/register",
    }))
);

type FaqKey = "changePlan" | "freeTrial" | "paymentMethods" | "modules" | "annualDiscount";

const faqKeys: FaqKey[] = [
    "changePlan",
    "freeTrial",
    "paymentMethods",
    "modules",
    "annualDiscount",
];

const openFaq = ref<FaqKey | null>("changePlan");

function toggleFaq(key: FaqKey): void {
    openFaq.value = openFaq.value === key ? null : key;
}
</script>

<template>
    <div class="flex min-h-screen flex-col bg-white">
        <!-- Navbar -->
        <Navbar :links="navLinks" />

        <!-- Hero Section -->
        <section class="bg-surface py-14 sm:py-16 lg:py-20" aria-labelledby="plans-heading">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col items-center gap-5 text-center">
                    <!-- Badge -->
                    <span
                        class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 font-body text-sm font-medium text-primary shadow-sm"
                    >
                        <Tag :size="14" aria-hidden="true" />
                        {{ t("plans.page.badge") }}
                    </span>

                    <!-- Title -->
                    <h1
                        id="plans-heading"
                        class="max-w-2xl font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-[46px] lg:leading-tight"
                    >
                        {{ t("plans.page.title") }}
                    </h1>

                    <!-- Subtitle -->
                    <p class="max-w-xl font-body text-base text-secondary sm:text-lg">
                        {{ t("plans.page.subtitle") }}
                    </p>

                    <!-- Billing toggle -->
                    <div
                        class="mt-1 flex items-center rounded-full bg-white p-1 shadow-sm ring-1 ring-divider"
                        role="group"
                        :aria-label="t('plans.page.badge')"
                    >
                        <button
                            :class="
                                !isAnnual
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-secondary hover:text-foreground'
                            "
                            class="rounded-full px-5 py-2 font-body text-sm font-semibold transition-all"
                            :aria-pressed="!isAnnual"
                            @click="isAnnual = false"
                        >
                            {{ t("plans.page.billing.monthly") }}
                        </button>
                        <button
                            :class="
                                isAnnual
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-secondary hover:text-foreground'
                            "
                            class="rounded-full px-5 py-2 font-body text-sm font-semibold transition-all"
                            :aria-pressed="isAnnual"
                            @click="isAnnual = true"
                        >
                            {{ t("plans.page.billing.annual") }}
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pricing Cards Section -->
        <section class="bg-surface pb-16 sm:pb-20 lg:pb-24" aria-label="Pricing plans">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div
                        v-for="plan in plans"
                        :key="plan.key"
                        :class="
                            plan.featured
                                ? 'border-2 border-primary shadow-[0_8px_32px_rgba(26,86,219,0.10)]'
                                : 'border border-divider'
                        "
                        class="flex flex-col rounded-xl bg-white p-7"
                    >
                        <!-- Popular badge -->
                        <div class="mb-4 min-h-[24px]">
                            <span
                                v-if="plan.featured"
                                class="inline-block rounded-full bg-primary px-3 py-1 font-body text-xs font-semibold text-white"
                            >
                                {{ t("plans.page.popular") }}
                            </span>
                        </div>

                        <!-- Plan name -->
                        <h2 class="font-heading text-xl font-bold text-foreground">
                            {{ plan.name }}
                        </h2>

                        <!-- Price -->
                        <div class="mt-3 flex items-end gap-1">
                            <span
                                class="font-heading text-3xl font-bold text-foreground sm:text-4xl"
                            >
                                {{ plan.price }}
                            </span>
                            <span class="mb-1 font-body text-base text-secondary">
                                {{ plan.period }}
                            </span>
                        </div>

                        <!-- Divider -->
                        <div class="my-5 h-px w-full bg-divider" />

                        <!-- Features -->
                        <ul class="flex flex-1 flex-col gap-3">
                            <li
                                v-for="feature in plan.features"
                                :key="feature"
                                class="flex items-center gap-2.5"
                            >
                                <Check
                                    :size="16"
                                    class="shrink-0 text-success"
                                    aria-hidden="true"
                                />
                                <span class="font-body text-sm text-secondary">{{ feature }}</span>
                            </li>
                        </ul>

                        <!-- CTA button -->
                        <a
                            :href="plan.href"
                            :class="
                                plan.featured
                                    ? 'bg-primary text-white hover:bg-primary/90'
                                    : 'border border-secondary text-secondary hover:bg-surface'
                            "
                            class="mt-7 block w-full rounded-lg py-3 text-center font-body text-[15px] font-semibold transition-colors"
                        >
                            {{ plan.buttonLabel }}
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="faq-heading">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="mx-auto max-w-2xl">
                    <h2
                        id="faq-heading"
                        class="mb-10 text-center font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl"
                    >
                        {{ t("plans.page.faq.title") }}
                    </h2>

                    <div class="divide-y divide-divider">
                        <div v-for="key in faqKeys" :key="key">
                            <button
                                class="flex w-full items-center justify-between gap-4 py-5 text-left"
                                :aria-expanded="openFaq === key"
                                :aria-controls="`faq-answer-${key}`"
                                @click="toggleFaq(key)"
                            >
                                <span class="font-body text-base font-semibold text-foreground">
                                    {{ t(`plans.page.faq.items.${key}.question`) }}
                                </span>
                                <ChevronDown
                                    :size="20"
                                    class="shrink-0 text-secondary transition-transform duration-200"
                                    :class="openFaq === key ? 'rotate-180' : ''"
                                    aria-hidden="true"
                                />
                            </button>
                            <div v-show="openFaq === key" :id="`faq-answer-${key}`" class="pb-5">
                                <p class="font-body text-sm leading-relaxed text-secondary">
                                    {{ t(`plans.page.faq.items.${key}.answer`) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="bg-primary px-6 py-20 text-center md:px-20" aria-label="Call to action">
            <div class="mx-auto flex max-w-screen-xl flex-col items-center gap-6">
                <h2 class="font-heading text-3xl font-bold text-white md:text-4xl">
                    {{ t("plans.page.ctaSection.title") }}
                </h2>
                <p class="font-body text-lg text-white/80">
                    {{ t("plans.page.ctaSection.subtitle") }}
                </p>
                <div class="flex flex-col gap-4 sm:flex-row">
                    <a
                        href="/register"
                        class="inline-flex items-center justify-center rounded-lg border border-white bg-white px-6 py-3 font-body text-base font-semibold text-primary transition-colors hover:bg-white/90"
                    >
                        {{ t("plans.page.ctaSection.startTrial") }}
                    </a>
                    <a
                        href="/contact"
                        class="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 font-body text-base font-semibold text-white transition-colors hover:bg-white/10"
                    >
                        {{ t("plans.page.ctaSection.contactSales") }}
                    </a>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <Footer />
    </div>
</template>
