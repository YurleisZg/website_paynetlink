<script setup lang="ts">
import { Network, CircleCheck } from "lucide-vue-next";

defineOptions({
    name: "RegisterLeftPanel",
});

const benefits = [
    "Sin tarjeta de crédito requerida",
    "Configuración en 10 minutos",
    "Soporte incluido desde el día 1",
    "Cancela cuando quieras",
];
</script>

<template>
    <div class="hidden md:flex md:w-1/2 flex-col justify-center gap-8 bg-primary px-[60px] py-20">
        <!-- Logo -->
        <div class="flex items-center gap-3">
            <Network :size="32" class="text-white" />
            <span
                class="text-[28px] font-bold text-white"
                style="font-family: &quot;Red Hat Display&quot;, sans-serif"
            >
                PayNetLink
            </span>
        </div>

        <!-- Title -->
        <h1
            class="text-[36px] font-bold leading-[1.2] text-white"
            style="font-family: &quot;Red Hat Display&quot;, sans-serif"
        >
            Comienza tu prueba<br />gratuita de 14 días
        </h1>

        <!-- Benefits List -->
        <ul class="flex flex-col gap-4">
            <li v-for="(benefit, index) in benefits" :key="index" class="flex items-start gap-3">
                <CircleCheck :size="20" class="mt-[2px] flex-shrink-0 text-white" />
                <span class="text-[15px] leading-[1.6] text-white/80">
                    {{ benefit }}
                </span>
            </li>
        </ul>
    </div>
</template>
