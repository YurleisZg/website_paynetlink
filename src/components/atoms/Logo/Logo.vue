<script setup lang="ts">
import { computed } from "vue";

interface LogoProps {
    size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<LogoProps>(), {
    size: "md",
});

const sizeClasses = computed(() => {
    const sizes = {
        sm: { icon: "w-5 h-5", text: "text-base" },
        md: { icon: "w-7 h-7", text: "text-[22px]" },
        lg: { icon: "w-9 h-9", text: "text-3xl" },
    };
    return sizes[props.size];
});
</script>

<template>
    <div class="flex items-center gap-2 py-5">
        <svg
            :class="sizeClasses.icon"
            class="fill-(--primary)"
            viewBox="0 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M14 2L2 7l10 5 10-5-10-5zM2 21l10 5 10-5-10-5-10 5z" />
            <path d="M2 14l10 5 10-5-10-5-10 5z" opacity="0.5" />
        </svg>
        <span :class="sizeClasses.text" class="font-heading font-bold text-(--black)">
            PayNetLink
        </span>
    </div>
</template>
