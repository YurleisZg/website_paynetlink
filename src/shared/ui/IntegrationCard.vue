<script setup lang="ts">
import type { Component } from "vue";
import { Router } from "lucide-vue-next";

defineOptions({ name: "IntegrationCard" });

withDefaults(
    defineProps<{
        label: string;
        icon?: Component;
        iconColor?: string;
    }>(),
    { icon: () => Router, iconColor: "text-secondary" }
);
</script>

<template>
    <div
        class="flex h-24 w-28 flex-col items-center justify-center gap-2.5 rounded-xl border border-surface-card bg-white md:h-[100px] md:w-[120px]"
    >
        <component :is="icon" :size="28" :class="iconColor" />
        <span class="font-body text-xs font-medium text-muted text-center">{{ label }}</span>
    </div>
</template>
