<script setup lang="ts">
import type { Component } from "vue";
import { Linkedin } from "lucide-vue-next";

defineOptions({ name: "SocialIcon" });

withDefaults(
    defineProps<{
        icon?: Component;
        href?: string;
        ariaLabel?: string;
    }>(),
    { icon: () => Linkedin, href: undefined, ariaLabel: undefined }
);
</script>

<template>
    <a
        v-if="href"
        :href="href"
        :aria-label="ariaLabel"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex text-muted transition-colors hover:text-foreground"
    >
        <component :is="icon" :size="20" />
    </a>
    <span v-else class="inline-flex text-muted">
        <component :is="icon" :size="20" />
    </span>
</template>
