<script setup lang="ts">
import { Network } from "lucide-vue-next";

defineOptions({ name: "AuthLeftPanel" });

defineProps<{
    title: string;
    description: string;
}>();
</script>

<template>
    <div
        class="relative hidden w-full flex-col items-center justify-center gap-6 overflow-hidden bg-gradient-to-br from-primary to-blue-700 px-8 py-12 md:flex md:w-1/2 md:gap-8 md:px-[60px] md:py-20 lg:px-20 xl:px-24 2xl:px-32"
    >
        <!-- Decorative background elements -->
        <div
            class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"
        ></div>
        <div class="absolute -right-20 -top-20 size-80 rounded-full bg-white/5 blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 size-80 rounded-full bg-white/5 blur-3xl"></div>

        <!-- Content constrained for readability -->
        <div class="relative z-10 flex w-full max-w-[600px] flex-col gap-6 md:gap-8 lg:gap-10">
            <router-link
                to="/"
                class="flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:opacity-90"
                aria-label="Volver al inicio"
            >
                <Network :size="32" class="text-white lg:size-9" />
                <span
                    class="font-heading text-2xl font-bold text-white md:text-[28px] lg:text-[32px]"
                >
                    PayNetLink
                </span>
            </router-link>
            <h1
                class="font-heading text-2xl font-bold leading-tight text-white drop-shadow-lg md:text-4xl md:leading-[1.2] lg:text-5xl lg:leading-[1.15]"
            >
                {{ title }}
            </h1>
            <p
                class="font-body text-sm leading-relaxed text-white/90 drop-shadow-md md:text-base md:leading-[1.6] lg:text-lg lg:leading-[1.7]"
            >
                {{ description }}
            </p>
        </div>
    </div>
</template>
