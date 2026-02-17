<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";

defineOptions({ name: "AppBadge" });

defineProps<{
    label: string;
    showArrow?: boolean;
}>();
</script>

<template>
    <span
        class="flex items-center gap-1.5 self-baseline rounded-full bg-primary-light px-3 py-1.5 font-body text-xs font-semibold text-primary shadow-sm transition-all hover:shadow-md md:px-3.5 md:py-1.5 md:text-xs"
    >
        {{ label }}
        <ArrowRight v-if="showArrow !== false" :size="14" class="text-primary" />
    </span>
</template>
