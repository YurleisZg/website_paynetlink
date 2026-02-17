<script setup lang="ts">
import { ref } from "vue";
import { RegisterLeftPanel, BaseInput, PasswordInput, Button, Logo } from "@/shared/ui";

defineOptions({
    name: "RegisterPage",
});

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
</script>

<template>
    <div class="flex h-screen w-full">
        <!-- Left Panel -->
        <RegisterLeftPanel />

        <!-- Right Panel -->
        <div class="flex w-full items-center overflow-y-auto px-6 py-12 md:w-1/2 md:px-20 md:py-16">
            <div class="mx-auto flex max-w-[400px] flex-col">
                <!-- Logo (visible only on mobile/tablet) -->
                <router-link
                    to="/"
                    class="mb-8 flex justify-center transition-all duration-200 hover:opacity-70 md:hidden"
                    aria-label="Volver al inicio"
                >
                    <Logo size="md" variant="light" />
                </router-link>

                <!-- Title -->
                <h1
                    class="mb-8 font-heading text-[28px] font-bold leading-tight text-primary-900 md:text-[36px]"
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
                    <router-link to="/login" class="font-medium text-primary hover:underline">
                        Inicia sesión
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
