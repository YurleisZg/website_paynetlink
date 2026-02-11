<script setup lang="ts">
defineOptions({ name: "AppStep" });

defineProps<{
    number: number | string;
    title: string;
    description?: string;
}>();
</script>

<template>
    <div class="flex w-full flex-col items-center gap-3 px-4 text-center md:w-60 md:gap-4 md:px-6">
        <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-xl font-bold text-white md:h-14 md:w-14 md:text-2xl"
        >
            {{ number }}
        </div>
        <h3 class="font-heading text-lg font-bold text-foreground md:text-xl">
            {{ title }}
        </h3>
        <p v-if="description" class="font-body text-sm leading-relaxed text-muted md:text-[15px]">
            {{ description }}
        </p>
    </div>
</template>
