<script setup lang="ts">
import { Check } from "lucide-vue-next";

defineOptions({ name: "FeatureCheckItem" });

defineProps<{
    label: string;
}>();
</script>

<template>
    <div class="flex items-center gap-2.5">
        <Check :size="18" class="shrink-0 text-success" />
        <span class="font-body text-sm text-secondary md:text-[14px]">{{ label }}</span>
    </div>
</template>
