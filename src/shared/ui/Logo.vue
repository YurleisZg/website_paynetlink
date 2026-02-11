<script setup lang="ts">
import { computed } from "vue";
import { Network } from "lucide-vue-next";

defineOptions({ name: "AppLogo" });

const props = withDefaults(
    defineProps<{
        size?: "sm" | "md" | "lg";
    }>(),
    { size: "md" }
);

const iconSize = computed(() => ({ sm: 20, md: 28, lg: 36 })[props.size]);
const textClass = computed(
    () => ({ sm: "text-base", md: "text-[22px]", lg: "text-3xl" })[props.size]
);
</script>

<template>
    <div class="flex items-center gap-2 py-3 md:py-5">
        <Network :size="iconSize" class="text-primary" />
        <span :class="textClass" class="font-heading font-bold text-foreground">PayNetLink</span>
    </div>
</template>
