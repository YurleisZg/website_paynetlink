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
        class="hidden w-full flex-col justify-center gap-6 bg-primary px-8 py-12 md:flex md:w-1/2 md:gap-8 md:px-[60px] md:py-20"
    >
        <div class="flex items-center gap-2">
            <Network :size="32" class="text-white" />
            <span class="font-heading text-2xl font-bold text-white md:text-[28px]">
                PayNetLink
            </span>
        </div>
        <h1
            class="font-heading text-2xl font-bold leading-tight text-white md:text-4xl md:leading-[1.2]"
        >
            {{ title }}
        </h1>
        <p class="font-body text-sm leading-relaxed text-white/80 md:text-base md:leading-[1.6]">
            {{ description }}
        </p>
    </div>
</template>
