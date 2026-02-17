<script setup lang="ts">
import { computed } from "vue";
import { Network } from "lucide-vue-next";

defineOptions({ name: "AppLogo" });

const props = withDefaults(
    defineProps<{
        size?: "sm" | "md" | "lg";
        variant?: "light" | "dark";
    }>(),
    { size: "md", variant: "light" }
);

const iconSize = computed(() => ({ sm: 18, md: 28, lg: 36 })[props.size]);
const textClass = computed(
    () => ({ sm: "text-[15px]", md: "text-[22px]", lg: "text-3xl" })[props.size]
);
const gapClass = computed(() => ({ sm: "gap-1.5", md: "gap-2", lg: "gap-2.5" })[props.size]);
const paddingClass = computed(
    () => ({ sm: "py-2", md: "py-3 md:py-5", lg: "py-4 md:py-6" })[props.size]
);
const textColor = computed(() => (props.variant === "dark" ? "text-white" : "text-foreground"));
const iconColor = computed(() => (props.variant === "dark" ? "text-white" : "text-primary"));
</script>

<template>
    <div :class="['flex items-center', gapClass, paddingClass]">
        <Network :size="iconSize" :class="iconColor" />
        <span :class="[textClass, textColor]" class="font-heading font-bold tracking-tight"
            >PayNetLink</span
        >
    </div>
</template>
