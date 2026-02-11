<script setup lang="ts">
import type { Component } from "vue";
import { Users } from "lucide-vue-next";

defineOptions({ name: "DropdownItem" });

withDefaults(
    defineProps<{
        title: string;
        description?: string;
        icon?: Component;
    }>(),
    { icon: Users as unknown as Component }
);
</script>

<template>
    <div
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface md:px-4 md:py-3"
    >
        <div
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-light md:h-9 md:w-9"
        >
            <component :is="icon" :size="18" class="text-primary" />
        </div>
        <div class="flex min-w-0 flex-col gap-0.5">
            <span class="font-body text-sm font-medium text-foreground">{{ title }}</span>
            <span v-if="description" class="font-body text-xs text-subtle">
                {{ description }}
            </span>
        </div>
    </div>
</template>
