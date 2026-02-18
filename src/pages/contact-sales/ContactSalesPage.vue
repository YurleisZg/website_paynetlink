<script setup lang="ts">
import { BaseInput, BaseSelect, BaseTextarea, Button, ContactInfoItem, Logo } from "@/shared/ui";
import { Clock, Mail, Phone } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({ name: "ContactSalesPage" });

const { t } = useI18n();

// Form state
const formData = ref({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ispName: "",
    clientRange: "",
    message: "",
});

const clientRangeOptions = computed(() => [
    { value: "1-50", label: t("contact.form.clientRangeOptions.1-50") },
    { value: "51-200", label: t("contact.form.clientRangeOptions.51-200") },
    { value: "201-500", label: t("contact.form.clientRangeOptions.201-500") },
    { value: "501-1000", label: t("contact.form.clientRangeOptions.501-1000") },
    { value: "1000+", label: t("contact.form.clientRangeOptions.1000+") },
]);

const handleSubmit = () => {
    console.log("Form submitted:", formData.value);
    // TODO: Implement form submission
};
</script>

<template>
    <div class="flex min-h-screen w-full flex-col lg:flex-row">
        <!-- Left Panel - Primary Background (hidden on mobile) -->
        <div
            class="hidden w-full flex-col justify-center gap-8 bg-primary px-8 py-16 md:px-[60px] md:py-20 lg:flex lg:w-1/2"
        >
            <!-- Logo -->
            <router-link
                to="/"
                class="flex items-center gap-2 transition-opacity hover:opacity-80"
                :aria-label="t('contact.backToHome')"
            >
                <Logo size="md" variant="dark" />
            </router-link>

            <!-- Title -->
            <h1
                class="font-heading text-[28px] font-bold leading-tight text-white md:text-4xl md:leading-[1.2]"
            >
                {{ t("contact.sales.title") }}
            </h1>

            <!-- Description -->
            <p class="font-body text-base leading-relaxed text-white/80 md:leading-[1.6]">
                {{ t("contact.sales.description") }}
            </p>

            <!-- Contact Info -->
            <div class="flex flex-col gap-5">
                <ContactInfoItem :icon="Mail" text="ventas@paynetlink.com" variant="dark" />
                <ContactInfoItem :icon="Phone" text="+57 (1) 234 5678" variant="dark" />
                <ContactInfoItem :icon="Clock" :text="t('contact.sales.schedule')" variant="dark" />
            </div>
        </div>

        <!-- Right Panel - White Background with Form -->
        <div
            class="flex w-full flex-col justify-center gap-8 bg-white px-8 py-16 md:px-[60px] md:py-20 lg:w-1/2"
        >
            <!-- Logo (visible only on mobile/tablet) -->
            <router-link
                to="/"
                class="flex justify-center transition-all duration-200 hover:opacity-70 lg:hidden"
                :aria-label="t('contact.backToHome')"
            >
                <Logo size="md" variant="light" />
            </router-link>

            <!-- Form Title -->
            <h2 class="font-heading text-[28px] font-bold text-foreground md:text-[32px]">
                {{ t("contact.sales.formTitle") }}
            </h2>

            <!-- Form -->
            <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
                <!-- First Name & Last Name Row -->
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <BaseInput
                        id="firstName"
                        v-model="formData.firstName"
                        :label="t('contact.form.firstNameLabel')"
                        placeholder=""
                        required
                    />
                    <BaseInput
                        id="lastName"
                        v-model="formData.lastName"
                        :label="t('contact.form.lastNameLabel')"
                        placeholder=""
                        required
                    />
                </div>

                <!-- Email -->
                <BaseInput
                    id="email"
                    v-model="formData.email"
                    type="email"
                    :label="t('contact.form.emailLabel')"
                    :placeholder="t('contact.form.emailPlaceholder')"
                    required
                />

                <!-- Phone -->
                <BaseInput
                    id="phone"
                    v-model="formData.phone"
                    type="tel"
                    :label="t('contact.form.phoneLabel')"
                    :placeholder="t('contact.form.phonePlaceholder')"
                    required
                />

                <!-- ISP Name -->
                <BaseInput
                    id="ispName"
                    v-model="formData.ispName"
                    :label="t('contact.form.ispNameLabel')"
                    :placeholder="t('contact.form.ispNamePlaceholder')"
                    required
                />

                <!-- Client Range -->
                <BaseSelect
                    id="clientRange"
                    v-model="formData.clientRange"
                    :label="t('contact.form.clientRangeLabel')"
                    :placeholder="t('contact.form.clientRangePlaceholder')"
                    :options="clientRangeOptions"
                    required
                />

                <!-- Message -->
                <BaseTextarea
                    id="message"
                    v-model="formData.message"
                    :label="t('contact.form.messageLabel')"
                    :placeholder="t('contact.form.messagePlaceholder')"
                    :rows="3"
                />

                <!-- Submit Button -->
                <Button type="submit" variant="primary" class="h-12 w-full">
                    {{ t("contact.form.submit") }}
                </Button>
            </form>
        </div>
    </div>
</template>
