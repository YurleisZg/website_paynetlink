<script setup lang="ts">
import { computed } from "vue";

defineOptions({ name: "AppButton" });

const props = withDefaults(
    defineProps<{
        variant?: "primary" | "outline" | "ghost" | "white" | "outline-white";
        type?: "button" | "submit";
        disabled?: boolean;
        fullWidth?: boolean;
    }>(),
    { variant: "primary", type: "button", disabled: false, fullWidth: false }
);

const classes = computed(() => {
    const base =
        "inline-flex items-center justify-center rounded font-body text-sm md:text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none px-5 py-3 md:px-7 md:py-3.5";

    const variants: Record<string, string> = {
        primary: "bg-primary text-white hover:bg-primary/90",
        outline: "border border-secondary text-secondary font-medium hover:bg-surface",
        ghost: "text-primary font-semibold hover:bg-primary-light",
        white: "bg-white text-primary font-semibold hover:bg-white/90",
        "outline-white": "border border-white text-white font-medium hover:bg-white/10",
    };

    const width = props.fullWidth ? "w-full" : "";

    return [base, variants[props.variant], width].filter(Boolean).join(" ");
});
</script>

<template>
    <button :type="type" :disabled="disabled" :class="classes">
        <slot />
    </button>
</template>
