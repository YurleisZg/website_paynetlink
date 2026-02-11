<script setup lang="ts">
defineOptions({ name: "BlogCard" });

defineProps<{
    imageUrl?: string;
    tag: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
}>();
</script>

<template>
    <div class="flex w-full flex-col overflow-hidden rounded-xl border border-divider md:w-[380px]">
        <div class="h-40 w-full bg-divider md:h-[180px]">
            <img v-if="imageUrl" :src="imageUrl" :alt="title" class="h-full w-full object-cover" />
        </div>
        <div class="flex flex-col gap-2.5 p-4 md:gap-3 md:p-5">
            <span class="font-body text-[11px] font-bold tracking-wide text-primary uppercase">
                {{ tag }}
            </span>
            <h3 class="font-heading text-base font-bold text-foreground md:text-lg">
                {{ title }}
            </h3>
            <p class="font-body text-xs leading-relaxed text-muted md:text-[13px] md:leading-[1.5]">
                {{ description }}
            </p>
            <div class="flex items-center justify-between">
                <span class="font-body text-xs text-subtle">{{ date }}</span>
                <span class="font-body text-xs text-subtle">{{ readTime }}</span>
            </div>
        </div>
    </div>
</template>
