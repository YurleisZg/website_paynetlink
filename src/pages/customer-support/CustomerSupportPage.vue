<script setup lang="ts">
import { Navbar } from "@/widgets/navigation";
import { Footer } from "@/widgets/footer";
import { BaseInput, BaseSelect, BaseTextarea, Button } from "@/shared/ui";
import { useNavLinks } from "@/shared/composables";
import { useI18n } from "vue-i18n";
import {
    Bell,
    BookOpen,
    Clock,
    CreditCard,
    Headphones,
    Mail,
    MessageCircle,
    Phone,
    Router,
    Search,
    Users,
} from "lucide-vue-next";
import { ref, computed } from "vue";

defineOptions({ name: "CustomerSupportPage" });

const { t, tm } = useI18n();
const { navLinks } = useNavLinks();

const searchQuery = ref("");

interface Category {
    icon: object;
    iconBg: string;
    iconColor: string;
    titleKey: string;
    descKey: string;
    linkKey: string;
    href: string;
}

const categories: Category[] = [
    {
        icon: BookOpen,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        titleKey: "support.page.resources.categories.gettingStarted.title",
        descKey: "support.page.resources.categories.gettingStarted.description",
        linkKey: "support.page.resources.categories.gettingStarted.link",
        href: "/#ayuda",
    },
    {
        icon: CreditCard,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
        titleKey: "support.page.resources.categories.billingPayments.title",
        descKey: "support.page.resources.categories.billingPayments.description",
        linkKey: "support.page.resources.categories.billingPayments.link",
        href: "/payment-module",
    },
    {
        icon: Router,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        titleKey: "support.page.resources.categories.networkMikrotik.title",
        descKey: "support.page.resources.categories.networkMikrotik.description",
        linkKey: "support.page.resources.categories.networkMikrotik.link",
        href: "/network-automation",
    },
    {
        icon: Users,
        iconBg: "bg-pink-50",
        iconColor: "text-pink-600",
        titleKey: "support.page.resources.categories.clientManagement.title",
        descKey: "support.page.resources.categories.clientManagement.description",
        linkKey: "support.page.resources.categories.clientManagement.link",
        href: "/customer-management",
    },
    {
        icon: Bell,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        titleKey: "support.page.resources.categories.notifications.title",
        descKey: "support.page.resources.categories.notifications.description",
        linkKey: "support.page.resources.categories.notifications.link",
        href: "/notifications",
    },
    {
        icon: Headphones,
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
        titleKey: "support.page.resources.categories.contactSupport.title",
        descKey: "support.page.resources.categories.contactSupport.description",
        linkKey: "support.page.resources.categories.contactSupport.link",
        href: "/contact",
    },
];

const subjectOptions = computed(() =>
    (
        tm("support.page.contactForm.subjectOptions") as Array<{
            value: string;
            label: string;
        }>
    ).map((o) => ({ value: o.value, label: o.label }))
);

const formData = ref({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
});

const handleSubmit = (): void => {
    // TODO: implement form submission
    console.log("Support form submitted:", formData.value);
};
</script>

<template>
    <div class="flex min-h-screen flex-col bg-white">
        <!-- Navbar -->
        <Navbar :links="navLinks" />

        <!-- Hero Section -->
        <section class="bg-primary py-14 sm:py-16 lg:py-20" aria-labelledby="support-heading">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col items-center gap-6 text-center">
                    <!-- Title -->
                    <h1
                        id="support-heading"
                        class="max-w-2xl font-heading text-3xl font-bold text-white sm:text-4xl lg:text-[46px] lg:leading-tight"
                    >
                        {{ t("support.page.hero.title") }}
                    </h1>

                    <!-- Subtitle -->
                    <p class="max-w-lg font-body text-base text-white/80 sm:text-lg">
                        {{ t("support.page.hero.subtitle") }}
                    </p>

                    <!-- Search bar -->
                    <div class="w-full max-w-xl">
                        <div class="relative">
                            <Search
                                :size="18"
                                class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                                aria-hidden="true"
                            />
                            <input
                                v-model="searchQuery"
                                type="search"
                                :placeholder="t('support.page.hero.searchPlaceholder')"
                                class="h-12 w-full rounded-lg border border-divider bg-white pl-11 pr-4 font-body text-sm text-foreground outline-none transition-colors placeholder:text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20"
                                :aria-label="t('support.page.hero.searchPlaceholder')"
                            />
                        </div>
                    </div>

                    <!-- Popular tags -->
                    <div class="flex flex-wrap items-center justify-center gap-2">
                        <span class="font-body text-sm text-white/70">
                            {{ t("support.page.hero.popular") }}
                        </span>
                        <a
                            v-for="tag in t('support.page.hero.tags') as unknown as string[]"
                            :key="tag"
                            href="#"
                            class="rounded-full border border-white px-4 py-1.5 font-body text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            {{ tag }}
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Resources Section -->
        <section class="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="resources-heading">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="mb-10 flex flex-col items-center gap-3 text-center sm:mb-14">
                    <h2
                        id="resources-heading"
                        class="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl"
                    >
                        {{ t("support.page.resources.title") }}
                    </h2>
                    <p class="max-w-lg font-body text-base text-secondary">
                        {{ t("support.page.resources.subtitle") }}
                    </p>
                </div>

                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <a
                        v-for="category in categories"
                        :key="category.titleKey"
                        :href="category.href"
                        class="flex flex-col gap-3 rounded-xl border border-divider bg-white p-6 transition-shadow hover:shadow-md"
                    >
                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-xl"
                            :class="category.iconBg"
                        >
                            <component
                                :is="category.icon"
                                :size="22"
                                :class="category.iconColor"
                                aria-hidden="true"
                            />
                        </div>
                        <h3 class="font-heading text-base font-bold text-foreground">
                            {{ t(category.titleKey) }}
                        </h3>
                        <p class="font-body text-sm leading-relaxed text-secondary">
                            {{ t(category.descKey) }}
                        </p>
                        <span class="font-body text-sm font-semibold text-primary">
                            {{ t(category.linkKey) }} &rarr;
                        </span>
                    </a>
                </div>
            </div>
        </section>

        <!-- How It Works Section -->
        <section class="bg-surface py-16 sm:py-20 lg:py-24" aria-labelledby="how-it-works-heading">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <h2
                    id="how-it-works-heading"
                    class="mb-12 text-center font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl"
                >
                    {{ t("support.page.howItWorks.title") }}
                </h2>

                <div class="grid grid-cols-1 gap-10 sm:grid-cols-3">
                    <div
                        v-for="key in ['search', 'explore', 'contact'] as const"
                        :key="key"
                        class="flex flex-col items-center gap-4 text-center"
                    >
                        <div
                            class="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-heading text-xl font-bold text-white"
                            aria-hidden="true"
                        >
                            {{ t(`support.page.howItWorks.steps.${key}.number`) }}
                        </div>
                        <h4 class="font-heading text-lg font-bold text-foreground">
                            {{ t(`support.page.howItWorks.steps.${key}.title`) }}
                        </h4>
                        <p class="max-w-xs font-body text-sm leading-relaxed text-secondary">
                            {{ t(`support.page.howItWorks.steps.${key}.description`) }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Direct Help + Contact Form Section -->
        <section class="bg-white py-16 sm:py-20 lg:py-24" aria-label="Contact section">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
                    <!-- Left: Direct help info -->
                    <div class="flex flex-col gap-6 lg:w-[360px] lg:shrink-0">
                        <div class="flex flex-col gap-2">
                            <h2 class="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                                {{ t("support.page.directHelp.title") }}
                            </h2>
                            <p class="font-body text-base leading-relaxed text-secondary">
                                {{ t("support.page.directHelp.subtitle") }}
                            </p>
                        </div>

                        <div class="flex flex-col gap-4">
                            <div class="flex items-center gap-3">
                                <Clock
                                    :size="18"
                                    class="shrink-0 text-primary"
                                    aria-hidden="true"
                                />
                                <span class="font-body text-sm text-secondary">
                                    {{ t("support.page.directHelp.hours") }}
                                </span>
                            </div>
                            <div class="flex items-center gap-3">
                                <Mail :size="18" class="shrink-0 text-primary" aria-hidden="true" />
                                <a
                                    href="mailto:soporte@paynetlink.com"
                                    class="font-body text-sm text-secondary hover:text-primary"
                                >
                                    {{ t("support.page.directHelp.email") }}
                                </a>
                            </div>
                            <div class="flex items-center gap-3">
                                <MessageCircle
                                    :size="18"
                                    class="shrink-0 text-primary"
                                    aria-hidden="true"
                                />
                                <span class="font-body text-sm text-secondary">
                                    {{ t("support.page.directHelp.chat") }}
                                </span>
                            </div>
                            <div class="flex items-center gap-3">
                                <Phone
                                    :size="18"
                                    class="shrink-0 text-primary"
                                    aria-hidden="true"
                                />
                                <a
                                    href="https://wa.me/573043408837"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="font-body text-sm text-secondary hover:text-primary"
                                >
                                    {{ t("support.page.directHelp.whatsapp") }}
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Contact form -->
                    <div class="flex-1">
                        <div
                            class="rounded-xl border border-divider bg-white px-6 py-8 shadow-sm sm:px-8"
                        >
                            <h2
                                class="mb-6 font-heading text-xl font-semibold text-foreground sm:text-2xl"
                            >
                                {{ t("support.page.contactForm.title") }}
                            </h2>

                            <form
                                class="flex flex-col gap-5"
                                aria-label="Support contact form"
                                @submit.prevent="handleSubmit"
                            >
                                <!-- Name row -->
                                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <BaseInput
                                        id="firstName"
                                        v-model="formData.firstName"
                                        :label="t('support.page.contactForm.firstName')"
                                        :placeholder="
                                            t('support.page.contactForm.firstNamePlaceholder')
                                        "
                                        required
                                    />
                                    <BaseInput
                                        id="lastName"
                                        v-model="formData.lastName"
                                        :label="t('support.page.contactForm.lastName')"
                                        :placeholder="
                                            t('support.page.contactForm.lastNamePlaceholder')
                                        "
                                        required
                                    />
                                </div>

                                <!-- Email -->
                                <BaseInput
                                    id="supportEmail"
                                    v-model="formData.email"
                                    type="email"
                                    :label="t('support.page.contactForm.email')"
                                    :placeholder="t('support.page.contactForm.emailPlaceholder')"
                                    required
                                />

                                <!-- Subject -->
                                <BaseSelect
                                    id="subject"
                                    v-model="formData.subject"
                                    :label="t('support.page.contactForm.subject')"
                                    :placeholder="t('support.page.contactForm.subjectPlaceholder')"
                                    :options="subjectOptions"
                                />

                                <!-- Message -->
                                <BaseTextarea
                                    id="supportMessage"
                                    v-model="formData.message"
                                    :label="t('support.page.contactForm.message')"
                                    :placeholder="t('support.page.contactForm.messagePlaceholder')"
                                    :rows="5"
                                />

                                <!-- Submit -->
                                <Button type="submit" variant="primary" class="mt-1 h-12 w-full">
                                    {{ t("support.page.contactForm.submit") }}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="bg-primary px-6 py-20 text-center md:px-20" aria-label="Call to action">
            <div class="mx-auto flex max-w-screen-xl flex-col items-center gap-6">
                <h2 class="font-heading text-3xl font-bold text-white md:text-4xl">
                    {{ t("support.page.ctaSection.title") }}
                </h2>
                <p class="font-body text-lg text-white/80">
                    {{ t("support.page.ctaSection.subtitle") }}
                </p>
                <div class="flex flex-col gap-4 sm:flex-row">
                    <a
                        href="/contact"
                        class="inline-flex items-center justify-center rounded-lg border border-white bg-white px-6 py-3 font-body text-base font-semibold text-primary transition-colors hover:bg-white/90"
                    >
                        {{ t("support.page.ctaSection.openTicket") }}
                    </a>
                    <a
                        href="https://wa.me/573043408837"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 font-body text-base font-semibold text-white transition-colors hover:bg-white/10"
                    >
                        {{ t("support.page.ctaSection.liveChat") }}
                    </a>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <Footer />
    </div>
</template>
