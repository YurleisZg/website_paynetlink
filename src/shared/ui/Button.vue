<script setup lang="ts">
defineProps<{
    type?: "button" | "submit";
    variant?: "primary" | "secondary";
    disabled?: boolean;
}>();
</script>

<template>
    <button
        :type="type ?? 'button'"
        :disabled="disabled"
        class="px-4 py-2 rounded font-medium transition"
        :class="
            variant === 'secondary'
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                : 'bg-blue-500 hover:bg-blue-700 text-white'
        "
    >
        <slot />
    </button>
</template>
