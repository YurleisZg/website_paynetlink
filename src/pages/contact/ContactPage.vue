<script setup lang="ts">
import { Navbar } from "@/widgets/navigation";
import type { NavLink } from "@/widgets/navigation";
import { BaseInput, BaseTextarea, Button } from "@/shared/ui";
import {
    Bell,
    Building2,
    Code,
    CreditCard,
    Database,
    FileText,
    Globe,
    HelpCircle,
    Info,
    Mail,
    MapPin,
    Phone,
    PenLine,
    Router,
    Trophy,
    Users,
    Wifi,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({ name: "ContactPage" });

const { t } = useI18n();

const navLinks = computed<NavLink[]>(() => [
    {
        label: t("nav.links.products"),
        dropdown: [
            {
                label: t("nav.dropdown.products.clients.label"),
                description: t("nav.dropdown.products.clients.description"),
                href: "/#clientes",
                icon: Users,
            },
            {
                label: t("nav.dropdown.products.billing.label"),
                description: t("nav.dropdown.products.billing.description"),
                href: "/#pagos",
                icon: CreditCard,
            },
            {
                label: t("nav.dropdown.products.network.label"),
                description: t("nav.dropdown.products.network.description"),
                href: "/#red",
                icon: Router,
            },
            {
                label: t("nav.dropdown.products.notifications.label"),
                description: t("nav.dropdown.products.notifications.description"),
                href: "/#notificaciones",
                icon: Bell,
            },
            {
                label: t("nav.dropdown.products.invoicing.label"),
                description: t("nav.dropdown.products.invoicing.description"),
                href: "/#facturacion",
                icon: FileText,
            },
        ],
    },
    {
        label: t("nav.links.solutions"),
        dropdown: [
            {
                label: t("nav.dropdown.solutions.smallIsp.label"),
                description: t("nav.dropdown.solutions.smallIsp.description"),
                href: "/#isp-pequenos",
                icon: Building2,
            },
            {
                label: t("nav.dropdown.solutions.mediumIsp.label"),
                description: t("nav.dropdown.solutions.mediumIsp.description"),
                href: "/#isp-medianos",
                icon: Database,
            },
            {
                label: t("nav.dropdown.solutions.wisps.label"),
                description: t("nav.dropdown.solutions.wisps.description"),
                href: "/#wisps",
                icon: Wifi,
            },
        ],
    },
    { label: t("nav.links.pricing"), href: "/#precios" },
    {
        label: t("nav.links.resources"),
        dropdown: [
            {
                label: t("nav.dropdown.resources.blog.label"),
                description: t("nav.dropdown.resources.blog.description"),
                href: "/#blog",
                icon: PenLine,
            },
            {
                label: t("nav.dropdown.resources.helpCenter.label"),
                description: t("nav.dropdown.resources.helpCenter.description"),
                href: "/#ayuda",
                icon: HelpCircle,
            },
            {
                label: t("nav.dropdown.resources.apiDocs.label"),
                description: t("nav.dropdown.resources.apiDocs.description"),
                href: "/#api",
                icon: Code,
            },
            {
                label: t("nav.dropdown.resources.caseStudies.label"),
                description: t("nav.dropdown.resources.caseStudies.description"),
                href: "/#casos",
                icon: Trophy,
            },
        ],
    },
    {
        label: t("nav.links.company"),
        dropdown: [
            {
                label: t("nav.dropdown.company.about.label"),
                description: t("nav.dropdown.company.about.description"),
                href: "/#nosotros",
                icon: Info,
            },
            {
                label: t("nav.dropdown.company.contact.label"),
                description: t("nav.dropdown.company.contact.description"),
                href: "/contact",
                icon: Mail,
            },
            {
                label: t("nav.dropdown.company.partners.label"),
                description: t("nav.dropdown.company.partners.description"),
                href: "/#partners",
                icon: Globe,
            },
        ],
    },
]);

const contactItems = [
    { icon: Mail, label: t("contact.page.email.label"), value: t("contact.page.email.value") },
    { icon: Phone, label: t("contact.page.phone.label"), value: t("contact.page.phone.value") },
    { icon: MapPin, label: t("contact.page.office.label"), value: t("contact.page.office.value") },
] as const;

const formData = ref({
    fullName: "",
    email: "",
    message: "",
});

const handleSubmit = () => {
    console.log("Contact form submitted:", formData.value);
    // TODO: Implement form submission
};
</script>

<template>
    <div class="flex min-h-screen flex-col bg-white">
        <!-- Navbar -->
        <Navbar :links="navLinks" />

        <!-- Hero Section -->
        <section class="bg-surface py-14 sm:py-16 lg:py-20" aria-labelledby="contact-heading">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col items-center gap-3 text-center">
                    <h1
                        id="contact-heading"
                        class="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-[42px] lg:leading-tight"
                    >
                        {{ t("contact.page.title") }}
                    </h1>
                    <p class="max-w-xl font-body text-base text-secondary sm:text-lg">
                        {{ t("contact.page.subtitle") }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Content Section -->
        <section class="flex-1 bg-white py-14 sm:py-16 lg:py-20">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-20">
                <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
                    <!-- Left: Contact Info -->
                    <div
                        class="flex flex-col gap-8 lg:w-[340px] lg:shrink-0"
                        aria-label="Contact information"
                    >
                        <div
                            v-for="item in contactItems"
                            :key="item.label"
                            class="flex items-start gap-4"
                        >
                            <div
                                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light"
                                aria-hidden="true"
                            >
                                <component :is="item.icon" :size="20" class="text-primary" />
                            </div>
                            <div class="flex flex-col gap-0.5">
                                <span class="font-body text-sm font-semibold text-foreground">
                                    {{ item.label }}
                                </span>
                                <span class="font-body text-sm text-secondary">
                                    {{ item.value }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Form Card -->
                    <div class="flex-1">
                        <div
                            class="rounded-xl border border-divider bg-white px-6 py-8 shadow-sm sm:px-8"
                        >
                            <h2
                                class="mb-6 font-heading text-xl font-semibold text-foreground sm:text-2xl"
                            >
                                {{ t("contact.page.formTitle") }}
                            </h2>

                            <form
                                class="flex flex-col gap-5"
                                aria-label="Contact form"
                                @submit.prevent="handleSubmit"
                            >
                                <!-- Full Name -->
                                <BaseInput
                                    id="fullName"
                                    v-model="formData.fullName"
                                    :label="t('contact.page.fullNameLabel')"
                                    :placeholder="t('contact.page.fullNamePlaceholder')"
                                    required
                                />

                                <!-- Email -->
                                <BaseInput
                                    id="email"
                                    v-model="formData.email"
                                    type="email"
                                    :label="t('contact.page.emailLabel')"
                                    :placeholder="t('contact.page.emailPlaceholder')"
                                    required
                                />

                                <!-- Message -->
                                <BaseTextarea
                                    id="message"
                                    v-model="formData.message"
                                    :label="t('contact.page.messageLabel')"
                                    :placeholder="t('contact.page.messagePlaceholder')"
                                    :rows="5"
                                />

                                <!-- Submit Button -->
                                <Button
                                    type="submit"
                                    variant="primary"
                                    class="mt-1 h-12 w-full"
                                    aria-label="Submit contact form"
                                >
                                    {{ t("contact.page.submit") }}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
