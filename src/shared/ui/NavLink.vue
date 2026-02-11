<script setup lang="ts">
defineOptions({ name: "NavLink" });

defineProps<{
    label: string;
    href?: string;
    to?: string | Record<string, unknown>;
}>();
</script>

<template>
    <RouterLink
        v-if="to"
        :to="to"
        class="inline-flex items-center px-0 py-2 font-body text-sm font-medium text-secondary transition-colors hover:text-primary md:text-[14px]"
    >
        {{ label }}
    </RouterLink>
    <a
        v-else
        :href="href"
        class="inline-flex items-center px-0 py-2 font-body text-sm font-medium text-secondary transition-colors hover:text-primary md:text-[14px]"
    >
        {{ label }}
    </a>
</template>
