<script setup lang="ts">
import { computed } from "vue";

defineOptions({ name: "StatCard" });

const props = withDefaults(
    defineProps<{
        label: string;
        value: string;
        change?: string;
        changeType?: "positive" | "negative";
    }>(),
    { changeType: "positive", change: undefined }
);

const changeColor = computed(() =>
    props.changeType === "positive" ? "text-success" : "text-danger"
);
</script>

<template>
    <div class="flex w-full flex-col gap-1.5 rounded-md bg-white p-3 md:w-[200px] md:p-4">
        <span class="font-body text-[11px] font-medium text-subtle uppercase">{{ label }}</span>
        <span class="font-heading text-2xl font-bold text-foreground md:text-[28px]">
            {{ value }}
        </span>
        <span v-if="change" :class="changeColor" class="font-body text-[11px] font-medium">
            {{ change }}
        </span>
    </div>
</template>
