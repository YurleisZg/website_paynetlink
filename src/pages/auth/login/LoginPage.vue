<script setup lang="ts">
import {
    AuthLeftPanel,
    BaseCheckbox,
    BaseInput,
    Button,
    Divider,
    Logo,
    PasswordInput,
    SocialLoginButton,
} from "@/shared/ui";
import { Globe, LayoutGrid } from "lucide-vue-next";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({ name: "LoginPage" });

const { t } = useI18n();

// Form state
const email = ref("");
const password = ref("");
const rememberMe = ref(false);

// Handlers
const handleSubmit = () => {
    console.log("Login attempt:", {
        email: email.value,
        password: password.value,
        rememberMe: rememberMe.value,
    });
    // TODO: Implement actual login logic
};

const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // TODO: Implement Google OAuth
};

const handleMicrosoftLogin = () => {
    console.log("Microsoft login clicked");
    // TODO: Implement Microsoft OAuth
};
</script>

<template>
    <div class="flex h-screen w-full">
        <!-- Left Panel - Blue Background with Logo and Info -->
        <AuthLeftPanel
            :title="t('auth.login.leftTitle')"
            :description="t('auth.login.leftDescription')"
        />

        <!-- Right Panel - White Background with Login Form -->
        <div
            class="flex h-full w-full flex-col items-center justify-center gap-8 overflow-y-auto bg-white px-6 py-12 md:w-1/2 md:px-20"
        >
            <!-- Form Container -->
            <div class="flex w-full max-w-[400px] flex-col gap-8">
                <!-- Logo (visible only on mobile/tablet) -->
                <router-link
                    to="/"
                    class="flex justify-center transition-all duration-200 hover:opacity-70 md:hidden"
                    :aria-label="t('auth.backToHome')"
                >
                    <Logo size="md" variant="light" />
                </router-link>
                <!-- Header -->
                <div class="flex flex-col gap-2 text-center">
                    <h1 class="font-heading text-[28px] font-bold text-foreground md:text-[36px]">
                        {{ t("auth.login.title") }}
                    </h1>
                    <p class="font-body text-sm text-muted md:text-[15px]">
                        {{ t("auth.login.subtitle") }}
                    </p>
                </div>

                <!-- Form -->
                <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
                    <!-- Email Input -->
                    <BaseInput
                        id="email"
                        v-model="email"
                        type="email"
                        :label="t('auth.login.emailLabel')"
                        :placeholder="t('auth.login.emailPlaceholder')"
                        required
                    />

                    <!-- Password Input -->
                    <PasswordInput
                        id="password"
                        v-model="password"
                        :label="t('auth.login.passwordLabel')"
                        :placeholder="t('auth.login.passwordPlaceholder')"
                        required
                    />

                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between">
                        <BaseCheckbox
                            id="remember"
                            v-model="rememberMe"
                            :label="t('auth.login.rememberMe')"
                        />
                        <router-link
                            to="/forgot-password"
                            class="font-body text-xs text-primary font-medium transition-colors hover:underline md:text-[13px]"
                        >
                            {{ t("auth.login.forgotPassword") }}
                        </router-link>
                    </div>

                    <!-- Submit Button -->
                    <Button type="submit" variant="primary" full-width>
                        {{ t("auth.login.submit") }}
                    </Button>
                </form>

                <!-- Divider -->
                <Divider :label="t('auth.login.divider')" />

                <!-- Social Login Buttons -->
                <div class="flex w-full flex-col gap-3">
                    <SocialLoginButton label="Google" :icon="Globe" @click="handleGoogleLogin" />
                    <SocialLoginButton
                        label="Microsoft"
                        :icon="LayoutGrid"
                        @click="handleMicrosoftLogin"
                    />
                </div>

                <!-- Sign Up Link -->
                <div class="flex items-center justify-center gap-1">
                    <span class="font-body text-sm text-muted">
                        {{ t("auth.login.noAccount") }}
                    </span>
                    <router-link
                        to="/register"
                        class="font-body text-sm font-semibold text-primary transition-colors hover:underline"
                    >
                        {{ t("auth.login.signUpFree") }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
