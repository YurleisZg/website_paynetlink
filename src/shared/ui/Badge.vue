<script setup lang="ts">
defineOptions({ name: "AppBadge" });

defineProps<{
    label: string;
}>();
</script>

<template>
    <span
        class="inline-flex items-center rounded-full bg-primary-light px-3 py-1.5 font-body text-xs font-semibold text-primary md:px-4 md:py-2 md:text-[13px]"
    >
        {{ label }}
    </span>
</template>
