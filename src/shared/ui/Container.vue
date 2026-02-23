<script setup lang="ts">
import { computed } from "vue";

defineOptions({ name: "Container" });

interface Props {
    /**
     * Maximum width of the container
     * @default 'screen-2xl'
     */
    maxWidth?: "screen-sm" | "screen-md" | "screen-lg" | "screen-xl" | "screen-2xl" | "full";
    /**
     * Whether to center the container horizontally
     * @default true
     */
    centered?: boolean;
    /**
     * Additional CSS classes
     */
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    maxWidth: "screen-2xl",
    centered: true,
    class: "",
});

const containerClass = computed(() => {
    const classes = [props.class];

    if (props.centered) {
        classes.push("mx-auto");
    }

    if (props.maxWidth !== "full") {
        classes.push(`max-w-${props.maxWidth}`);
    }

    return classes.filter(Boolean).join(" ");
});
</script>

<template>
    <div :class="containerClass">
        <slot />
    </div>
</template>
