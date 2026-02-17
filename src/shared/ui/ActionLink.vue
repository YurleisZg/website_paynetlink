<script setup lang="ts">
import { computed } from "vue";
import { Monitor, Calendar, type LucideIcon } from "lucide-vue-next";

defineOptions({ name: "ActionLink" });

const props = withDefaults(
    defineProps<{
        icon: "monitor" | "calendar";
        color?: "primary" | "info";
        href?: string;
    }>(),
    {
        color: "primary",
        href: undefined,
    }
);

const iconComponent = computed<LucideIcon>(() => {
    return props.icon === "monitor" ? Monitor : Calendar;
});

const colorClasses = computed(() => {
    return props.color === "primary" ? "text-primary" : "text-info";
});
</script>

<template>
    <a
        v-if="href"
        :href="href"
        class="group flex items-center gap-2 font-body text-sm font-medium transition-opacity hover:opacity-80"
        :class="colorClasses"
    >
        <component :is="iconComponent" :size="18" />
        <span><slot /></span>
    </a>
    <button
        v-else
        class="group flex items-center gap-2 font-body text-sm font-medium transition-opacity hover:opacity-80 focus:outline-none"
        :class="colorClasses"
    >
        <component :is="iconComponent" :size="18" />
        <span><slot /></span>
    </button>
</template>
