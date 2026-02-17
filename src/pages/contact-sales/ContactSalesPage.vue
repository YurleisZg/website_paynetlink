<script setup lang="ts">
import { BaseInput, BaseSelect, BaseTextarea, Button, ContactInfoItem, Logo } from "@/shared/ui";
import { Clock, Mail, Phone } from "lucide-vue-next";
import { ref } from "vue";

defineOptions({ name: "ContactSalesPage" });

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

const clientRangeOptions = [
    { value: "1-50", label: "1-50 clientes" },
    { value: "51-200", label: "51-200 clientes" },
    { value: "201-500", label: "201-500 clientes" },
    { value: "501-1000", label: "501-1000 clientes" },
    { value: "1000+", label: "Más de 1000 clientes" },
];

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
                aria-label="Volver al inicio"
            >
                <Logo size="md" variant="dark" />
            </router-link>

            <!-- Title -->
            <h1
                class="font-heading text-[28px] font-bold leading-tight text-white md:text-4xl md:leading-[1.2]"
            >
                Hablemos de tu plan Enterprise
            </h1>

            <!-- Description -->
            <p class="font-body text-base leading-relaxed text-white/80 md:leading-[1.6]">
                Nuestro equipo de ventas te ayudará a encontrar la solución perfecta para tu ISP.
                Planes personalizados, integraciones a medida y soporte dedicado.
            </p>

            <!-- Contact Info -->
            <div class="flex flex-col gap-5">
                <ContactInfoItem :icon="Mail" text="ventas@paynetlink.com" variant="dark" />
                <ContactInfoItem :icon="Phone" text="+57 (1) 234 5678" variant="dark" />
                <ContactInfoItem
                    :icon="Clock"
                    text="Lun-Vie, 8:00 AM - 6:00 PM COT"
                    variant="dark"
                />
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
                aria-label="Volver al inicio"
            >
                <Logo size="md" variant="light" />
            </router-link>

            <!-- Form Title -->
            <h2 class="font-heading text-[28px] font-bold text-foreground md:text-[32px]">
                Solicitar información
            </h2>

            <!-- Form -->
            <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
                <!-- First Name & Last Name Row -->
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <BaseInput
                        id="firstName"
                        v-model="formData.firstName"
                        label="Nombre"
                        placeholder=""
                        required
                    />
                    <BaseInput
                        id="lastName"
                        v-model="formData.lastName"
                        label="Apellido"
                        placeholder=""
                        required
                    />
                </div>

                <!-- Email -->
                <BaseInput
                    id="email"
                    v-model="formData.email"
                    type="email"
                    label="Correo electrónico"
                    placeholder="tu@empresa.com"
                    required
                />

                <!-- Phone -->
                <BaseInput
                    id="phone"
                    v-model="formData.phone"
                    type="tel"
                    label="Teléfono"
                    placeholder="+57"
                    required
                />

                <!-- ISP Name -->
                <BaseInput
                    id="ispName"
                    v-model="formData.ispName"
                    label="Nombre de tu ISP"
                    placeholder="Ej: FibraNet Colombia"
                    required
                />

                <!-- Client Range -->
                <BaseSelect
                    id="clientRange"
                    v-model="formData.clientRange"
                    label="¿Cuántos clientes gestionas?"
                    placeholder="Seleccionar rango"
                    :options="clientRangeOptions"
                    required
                />

                <!-- Message -->
                <BaseTextarea
                    id="message"
                    v-model="formData.message"
                    label="Mensaje (opcional)"
                    placeholder="Cuéntanos sobre tu ISP..."
                    :rows="3"
                />

                <!-- Submit Button -->
                <Button type="submit" variant="primary" class="h-12 w-full">
                    Enviar solicitud
                </Button>
            </form>
        </div>
    </div>
</template>
