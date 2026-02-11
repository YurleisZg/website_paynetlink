<script setup lang="ts">
defineOptions({ name: "MiniFooter" });

interface FooterLink {
    label: string;
    href: string;
}

defineProps<{
    copyright: string;
    links?: FooterLink[];
}>();
</script>

<template>
    <footer
        class="flex w-full flex-col items-center gap-3 bg-foreground px-6 py-4 sm:flex-row sm:justify-between md:px-20"
    >
        <span class="font-body text-xs text-muted md:text-[13px]">{{ copyright }}</span>
        <nav v-if="links?.length" class="flex gap-4 md:gap-6">
            <a
                v-for="link in links"
                :key="link.href"
                :href="link.href"
                class="font-body text-xs text-subtle transition-colors hover:text-white md:text-[13px]"
            >
                {{ link.label }}
            </a>
        </nav>
    </footer>
</template>
