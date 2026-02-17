<script setup lang="ts">
import type { LucideIcon } from "lucide-vue-next";
import { computed } from "vue";

defineOptions({ name: "ContactInfoItem" });

const props = withDefaults(
    defineProps<{
        icon: LucideIcon;
        text: string;
        variant?: "light" | "dark";
    }>(),
    { variant: "light" }
);

const iconColorClass = computed(() => (props.variant === "dark" ? "text-white" : "text-primary"));

const textColorClass = computed(() =>
    props.variant === "dark" ? "text-white/80" : "text-[#333333]"
);
</script>

<template>
    <div class="flex items-center gap-3">
        <component :is="icon" :size="20" :class="['shrink-0', iconColorClass]" />
        <span :class="['font-body text-[15px]', textColorClass]">{{ text }}</span>
    </div>
</template>
