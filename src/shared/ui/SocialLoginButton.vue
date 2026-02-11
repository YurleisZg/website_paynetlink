<script setup lang="ts">
import type { Component } from "vue";
import { Globe } from "lucide-vue-next";

defineOptions({ name: "SocialLoginButton" });

withDefaults(
    defineProps<{
        label: string;
        icon?: Component;
    }>(),
    { icon: Globe as unknown as Component }
);

defineEmits<{
    click: [];
}>();
</script>

<template>
    <button
        class="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-input-border px-4 font-body text-sm font-medium text-secondary transition-colors hover:bg-surface md:text-[14px]"
        @click="$emit('click')"
    >
        <component :is="icon" :size="18" class="text-secondary" />
        <span>{{ label }}</span>
    </button>
</template>
