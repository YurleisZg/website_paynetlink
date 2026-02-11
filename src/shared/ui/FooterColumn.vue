<script setup lang="ts">
defineOptions({ name: "FooterColumn" });

interface FooterLink {
    label: string;
    href: string;
}

defineProps<{
    title: string;
    links: FooterLink[];
}>();
</script>

<template>
    <div class="flex flex-col gap-3 md:gap-4">
        <h4 class="font-body text-sm font-semibold text-white">{{ title }}</h4>
        <nav class="flex flex-col gap-2 md:gap-3">
            <a
                v-for="link in links"
                :key="link.href"
                :href="link.href"
                class="font-body text-xs text-subtle transition-colors hover:text-white md:text-[13px]"
            >
                {{ link.label }}
            </a>
        </nav>
    </div>
</template>
