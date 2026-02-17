<script setup lang="ts">
import { AuthLeftPanel, BaseInput, Button, Logo } from "@/shared/ui";
import { ArrowLeft } from "lucide-vue-next";
import { ref } from "vue";

defineOptions({ name: "ForgotPasswordPage" });

// Form state
const email = ref("");
const isSubmitted = ref(false);
const isLoading = ref(false);

// Handlers
const handleSubmit = async () => {
    isLoading.value = true;

    // Simulate API call
    setTimeout(() => {
        console.log("Password reset requested for:", email.value);
        isSubmitted.value = true;
        isLoading.value = false;
        // TODO: Implement actual password reset API call
    }, 1500);
};

const handleResend = () => {
    isSubmitted.value = false;
    email.value = "";
};
</script>

<template>
    <div class="flex h-screen w-full">
        <!-- Left Panel - Blue Background with Logo and Info -->
        <AuthLeftPanel
            title="¿Olvidaste tu contraseña?"
            description="No te preocupes, es normal. Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña."
        />

        <!-- Right Panel - White Background with Forgot Password Form -->
        <div
            class="flex h-full w-full flex-col items-center justify-center gap-8 overflow-y-auto bg-white px-6 py-12 md:w-1/2 md:px-20"
        >
            <!-- Form Container -->
            <div class="flex w-full max-w-[400px] flex-col gap-8">
                <!-- Logo (visible only on mobile/tablet) -->
                <router-link
                    to="/"
                    class="flex justify-center transition-all duration-200 hover:opacity-70 md:hidden"
                    aria-label="Volver al inicio"
                >
                    <Logo size="md" variant="light" />
                </router-link>

                <!-- Back to Login Button -->
                <router-link
                    to="/login"
                    class="flex items-center gap-2 self-start font-body text-sm text-muted transition-colors hover:text-foreground"
                >
                    <ArrowLeft :size="16" />
                    <span>Volver al inicio de sesión</span>
                </router-link>

                <!-- Success State -->
                <div v-if="isSubmitted" class="flex flex-col gap-6">
                    <!-- Header -->
                    <div class="flex flex-col gap-2 text-center">
                        <div
                            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                        >
                            <svg
                                class="h-8 w-8 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h1
                            class="font-heading text-[28px] font-bold text-foreground md:text-[36px]"
                        >
                            Revisa tu correo
                        </h1>
                        <p class="font-body text-sm text-muted md:text-[15px]">
                            Te hemos enviado un enlace de recuperación a
                            <span class="font-semibold text-foreground">{{ email }}</span>
                        </p>
                    </div>

                    <!-- Instructions -->
                    <div class="rounded-lg bg-muted/20 px-4 py-3">
                        <p class="font-body text-xs text-muted leading-relaxed md:text-sm">
                            Si no recibes el correo en los próximos minutos, revisa tu carpeta de
                            spam o solicita un nuevo enlace.
                        </p>
                    </div>

                    <!-- Resend Button -->
                    <Button type="button" variant="outline" full-width @click="handleResend">
                        Enviar de nuevo
                    </Button>
                </div>

                <!-- Form State -->
                <div v-else class="flex flex-col gap-8">
                    <!-- Header -->
                    <div class="flex flex-col gap-2 text-center">
                        <h1
                            class="font-heading text-[28px] font-bold text-foreground md:text-[36px]"
                        >
                            Restablecer contraseña
                        </h1>
                        <p class="font-body text-sm text-muted md:text-[15px]">
                            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer
                            tu contraseña
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
                            :disabled="isLoading"
                        />

                        <!-- Submit Button -->
                        <Button type="submit" variant="primary" full-width :disabled="isLoading">
                            {{ isLoading ? "Enviando..." : "Enviar enlace de recuperación" }}
                        </Button>
                    </form>

                    <!-- Additional Help -->
                    <div class="rounded-lg border border-muted/30 px-4 py-3">
                        <p class="font-body text-xs text-muted leading-relaxed md:text-sm">
                            ¿Sigues teniendo problemas?
                            <router-link
                                to="/contact-sales"
                                class="font-semibold text-primary hover:underline"
                            >
                                Contacta con soporte
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
