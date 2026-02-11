<script setup lang="ts">
defineOptions({ name: "AppDivider" });

defineProps<{
    label?: string;
}>();
</script>

<template>
    <div class="flex w-full items-center gap-3 md:gap-4">
        <div class="h-px flex-1 bg-divider" />
        <span v-if="label" class="font-body text-xs text-subtle md:text-[13px]">
            {{ label }}
        </span>
        <div v-if="label" class="h-px flex-1 bg-divider" />
    </div>
</template>
