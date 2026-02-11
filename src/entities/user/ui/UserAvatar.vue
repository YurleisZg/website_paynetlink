<script setup lang="ts">
import type { User } from "../model/types";

defineProps<{
    user: User;
    size?: "sm" | "md" | "lg";
}>();
</script>

<template>
    <div
        class="inline-flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-medium"
        :class="{
            'h-8 w-8 text-sm': size === 'sm',
            'h-10 w-10 text-base': size === 'md' || !size,
            'h-12 w-12 text-lg': size === 'lg',
        }"
    >
        <img
            v-if="user.avatarUrl"
            :src="user.avatarUrl"
            :alt="user.name"
            class="h-full w-full rounded-full object-cover"
        />
        <span v-else>{{ user.name.charAt(0).toUpperCase() }}</span>
    </div>
</template>
