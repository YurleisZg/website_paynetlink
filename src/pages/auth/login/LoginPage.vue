<script setup lang="ts">
import { ref } from "vue";
import { Globe, LayoutGrid } from "lucide-vue-next";
import {
    AuthLeftPanel,
    BaseInput,
    PasswordInput,
    BaseCheckbox,
    Button,
    Divider,
    SocialLoginButton,
} from "@/shared/ui";

defineOptions({ name: "LoginPage" });

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

const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // TODO: Navigate to forgot password page
};

const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // TODO: Implement Google OAuth
};

const handleMicrosoftLogin = () => {
    console.log("Microsoft login clicked");
    // TODO: Implement Microsoft OAuth
};

const handleSignUp = () => {
    console.log("Sign up clicked");
    // TODO: Navigate to sign up page
};
</script>

<template>
    <div class="flex h-screen w-full">
        <!-- Left Panel - Blue Background with Logo and Info -->
        <AuthLeftPanel
            title="Simplifica tu ISP.
Automatiza, cobra y crece."
            description="Accede a tu panel de control para gestionar clientes, pagos, red y comunicaciones desde un solo lugar."
        />

        <!-- Right Panel - White Background with Login Form -->
        <div
            class="flex h-full w-full flex-col items-center justify-center gap-8 overflow-y-auto bg-white px-6 py-12 md:px-20"
        >
            <!-- Form Container -->
            <div class="flex w-full max-w-[400px] flex-col gap-8">
                <!-- Header -->
                <div class="flex flex-col gap-2 text-center">
                    <h1 class="font-heading text-2xl font-bold text-foreground md:text-[32px]">
                        Iniciar sesión
                    </h1>
                    <p class="font-body text-sm text-muted md:text-[15px]">
                        Ingresa tus credenciales para acceder a tu cuenta
                    </p>
                </div>

                <!-- Form -->
                <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
                    <!-- Email Input -->
                    <BaseInput
                        id="email"
                        v-model="email"
                        type="email"
                        label="Correo electrónico"
                        placeholder="tu@correo.com"
                        required
                    />

                    <!-- Password Input -->
                    <PasswordInput
                        id="password"
                        v-model="password"
                        label="Contraseña"
                        placeholder="••••••••"
                        required
                    />

                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between">
                        <BaseCheckbox id="remember" v-model="rememberMe" label="Recordarme" />
                        <button
                            type="button"
                            class="font-body text-xs text-primary font-medium transition-colors hover:underline md:text-[13px]"
                            @click="handleForgotPassword"
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>

                    <!-- Submit Button -->
                    <Button type="submit" variant="primary" full-width> Iniciar sesión </Button>
                </form>

                <!-- Divider -->
                <Divider label="o continúa con" />

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
                    <span class="font-body text-sm text-muted"> ¿No tienes cuenta? </span>
                    <button
                        type="button"
                        class="font-body text-sm font-semibold text-primary transition-colors hover:underline"
                        @click="handleSignUp"
                    >
                        Regístrate gratis
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
