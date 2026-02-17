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

const iconSize = computed(() => ({ sm: 20, md: 28, lg: 36 })[props.size]);
const textClass = computed(
    () => ({ sm: "text-base", md: "text-[22px]", lg: "text-3xl" })[props.size]
);
const textColor = computed(() => (props.variant === "dark" ? "text-white" : "text-foreground"));
</script>

<template>
    <div class="flex items-center gap-2 py-3 md:py-5">
        <Network :size="iconSize" class="text-primary" />
        <span :class="[textClass, textColor]" class="font-heading font-bold">PayNetLink</span>
    </div>
</template>
