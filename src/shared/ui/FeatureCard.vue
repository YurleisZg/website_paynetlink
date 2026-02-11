<script setup lang="ts">
import type { Component } from "vue";
import { Users } from "lucide-vue-next";

defineOptions({ name: "FeatureCard" });

withDefaults(
    defineProps<{
        icon?: Component;
        title: string;
        description: string;
        linkText?: string;
        linkHref?: string;
    }>(),
    { icon: () => Users, linkText: "", linkHref: "#" }
);
</script>

<template>
    <div
        class="flex w-full flex-col gap-3 rounded-lg border border-surface-card p-6 md:w-[380px] md:gap-4 md:p-8"
    >
        <div
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light md:h-12 md:w-12"
        >
            <slot name="icon">
                <component :is="icon" :size="24" class="text-primary" />
            </slot>
        </div>
        <h3 class="font-heading text-base font-bold text-foreground md:text-lg">
            {{ title }}
        </h3>
        <p class="font-body text-sm leading-relaxed text-muted md:text-[14px] md:leading-[1.6]">
            {{ description }}
        </p>
        <a
            v-if="linkText"
            :href="linkHref"
            class="font-body text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
            {{ linkText }}
        </a>
    </div>
</template>
