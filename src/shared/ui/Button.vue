<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import type { RouteLocationRaw } from "vue-router";

defineOptions({ name: "AppButton" });

const props = withDefaults(
    defineProps<{
        variant?: "primary" | "outline" | "ghost" | "white" | "outline-white";
        type?: "button" | "submit";
        disabled?: boolean;
        fullWidth?: boolean;
        // Navigation props
        to?: RouteLocationRaw;
        href?: string;
        target?: "_blank" | "_self" | "_parent" | "_top";
        rel?: string;
    }>(),
    {
        variant: "primary",
        type: "button",
        disabled: false,
        fullWidth: false,
        to: undefined,
        href: undefined,
        target: undefined,
        rel: undefined,
    }
);

// Determine element type based on props
const elementType = computed(() => {
    if (props.to) return RouterLink;
    if (props.href) return "a";
    return "button";
});

// Build dynamic attributes based on element type
const componentAttrs = computed(() => {
    if (props.to) {
        // RouterLink doesn't support disabled natively
        // We handle it via CSS classes instead
        return { to: props.to };
    }
    if (props.href) {
        const attrs: Record<string, string> = { href: props.href };
        if (props.target) {
            attrs.target = props.target;
            // Auto-add security attributes for _blank
            if (props.target === "_blank" && !props.rel) {
                attrs.rel = "noopener noreferrer";
            } else if (props.rel) {
                attrs.rel = props.rel;
            }
        }
        return attrs;
    }
    // Regular button
    return {
        type: props.type,
        disabled: props.disabled,
    };
});

const classes = computed(() => {
    const base =
        "inline-flex items-center justify-center rounded font-body text-sm md:text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 px-5 py-3 md:px-7 md:py-3.5";

    const variants: Record<string, string> = {
        primary: "bg-primary text-white hover:bg-primary/90",
        outline: "border border-secondary text-secondary font-medium hover:bg-surface",
        ghost: "text-primary font-semibold hover:bg-primary-light",
        white: "bg-white text-primary font-semibold hover:bg-white/90",
        "outline-white": "border border-white text-white font-medium hover:bg-white/10",
    };

    const width = props.fullWidth ? "w-full" : "";

    // Handle disabled state for all element types (including RouterLink)
    const disabledStyles = props.disabled ? "opacity-50 pointer-events-none" : "";

    return [base, variants[props.variant], width, disabledStyles].filter(Boolean).join(" ");
});
</script>

<template>
    <component
        :is="elementType"
        v-bind="componentAttrs"
        :class="classes"
        :aria-disabled="disabled ? 'true' : undefined"
    >
        <slot />
    </component>
</template>
