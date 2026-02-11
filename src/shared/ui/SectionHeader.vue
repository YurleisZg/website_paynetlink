<script setup lang="ts">
defineOptions({ name: "SectionHeader" });

defineProps<{
    title: string;
    subtitle?: string;
}>();
</script>

<template>
    <div class="flex w-full flex-col items-center gap-3 text-center">
        <h2 class="font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            {{ title }}
        </h2>
        <p v-if="subtitle" class="max-w-[700px] font-body text-sm text-muted md:text-base">
            {{ subtitle }}
        </p>
    </div>
</template>
