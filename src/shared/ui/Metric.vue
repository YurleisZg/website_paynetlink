<script setup lang="ts">
defineOptions({ name: "AppMetric" });

defineProps<{
    value: string;
    label: string;
}>();
</script>

<template>
    <div class="flex items-center gap-2">
        <span class="font-heading text-lg font-bold text-foreground md:text-xl">
            {{ value }}
        </span>
        <span class="font-body text-sm text-muted">{{ label }}</span>
    </div>
</template>
