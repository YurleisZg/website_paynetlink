<script setup lang="ts">
import { Navbar } from "@/widgets/navigation";
import { Footer } from "@/widgets/footer";
import { BaseInput, BaseTextarea, Button } from "@/shared/ui";
import { useNavLinks, useSeo } from "@/shared/composables";
import { PAGE_SEO } from "@/shared/config";
import { Mail, MapPin, Phone } from "lucide-vue-next";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({ name: "ContactPage" });
useSeo(PAGE_SEO["contact"]!);

const { t } = useI18n();

const { navLinks } = useNavLinks();

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

        <Footer />
    </div>
</template>
