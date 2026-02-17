<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { RegisterLeftPanel, BaseInput, PasswordInput, Button } from "@/shared/ui";

defineOptions({
    name: "RegisterPage",
});

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const ispName = ref("");
const password = ref("");

function handleRegister() {
    console.log("Register attempt:", {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        ispName: ispName.value,
        password: password.value,
    });
}

function handleGoToLogin() {
    console.log("Navigating to login");
    router.push("/login");
}
</script>

<template>
    <div class="flex h-screen w-full">
        <!-- Left Panel -->
        <RegisterLeftPanel />

        <!-- Right Panel -->
        <div class="flex w-full items-center overflow-y-auto px-6 py-12 md:w-1/2 md:px-20 md:py-16">
            <div class="mx-auto flex max-w-[400px] flex-col">
                <!-- Title -->
                <h1
                    class="mb-8 text-[32px] font-bold leading-tight text-primary-900"
                    style="font-family: &quot;Red Hat Display&quot;, sans-serif"
                >
                    Crear tu cuenta
                </h1>

                <!-- Form -->
                <form class="flex flex-col gap-5" @submit.prevent="handleRegister">
                    <!-- First Name and Last Name Row -->
                    <div class="grid grid-cols-2 gap-3">
                        <BaseInput
                            id="firstName"
                            v-model="firstName"
                            label="Nombre"
                            placeholder="Tu nombre"
                            required
                        />
                        <BaseInput
                            id="lastName"
                            v-model="lastName"
                            label="Apellido"
                            placeholder="Tu apellido"
                            required
                        />
                    </div>

                    <!-- Email -->
                    <BaseInput
                        id="email"
                        v-model="email"
                        type="email"
                        label="Correo electrónico"
                        placeholder="tu@email.com"
                        required
                    />

                    <!-- ISP Name -->
                    <BaseInput
                        id="ispName"
                        v-model="ispName"
                        label="Nombre de tu ISP"
                        placeholder="Nombre de tu empresa"
                        required
                    />

                    <!-- Password -->
                    <PasswordInput
                        id="password"
                        v-model="password"
                        label="Contraseña"
                        placeholder="Mínimo 8 caracteres"
                        required
                    />

                    <!-- Submit Button -->
                    <Button type="submit" variant="primary" class="mt-6 h-12 w-full">
                        Crear cuenta gratis
                    </Button>
                </form>

                <!-- Terms -->
                <p class="mt-4 text-[12px] leading-relaxed text-subtle">
                    Al registrarte aceptas nuestros Términos de Servicio y Política de Privacidad.
                </p>

                <!-- Footer -->
                <div class="mt-6 flex items-center justify-center gap-1 text-[14px]">
                    <span class="text-secondary-700">¿Ya tienes cuenta?</span>
                    <button
                        type="button"
                        class="font-medium text-primary hover:underline"
                        @click="handleGoToLogin"
                    >
                        Inicia sesión
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
