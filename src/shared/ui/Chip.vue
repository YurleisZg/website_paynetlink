<script setup lang="ts">
import { computed } from "vue";

defineOptions({ name: "AppChip" });

const props = withDefaults(
    defineProps<{
        label: string;
        active?: boolean;
    }>(),
    { active: false }
);

const classes = computed(() =>
    props.active ? "bg-primary text-white font-semibold" : "bg-surface text-secondary font-medium"
);
</script>

<template>
    <span
        :class="classes"
        class="inline-flex items-center rounded-full px-4 py-1.5 font-body text-xs md:px-5 md:py-2 md:text-[13px]"
    >
        {{ label }}
    </span>
</template>
