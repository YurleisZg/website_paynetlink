<script setup lang="ts">
defineOptions({ name: "FeatureHighlights" });

interface Highlight {
    title: string;
    description: string;
    points: string[];
    image: string;
}

interface Props {
    highlights: Highlight[];
}

defineProps<Props>();
</script>

<template>
    <section class="flex flex-col gap-20 bg-surface px-6 py-20 md:px-20 md:py-20">
        <div
            v-for="(highlight, index) in highlights"
            :key="highlight.title"
            data-testid="feature-highlight"
            class="scroll-reveal flex flex-col items-center gap-15"
            :class="index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'"
        >
            <!-- Enhanced Mockup Image -->
            <div
                class="group relative flex h-100 w-full items-center justify-center overflow-hidden rounded-xl border border-divider bg-white p-6 shadow-lg transition-all duration-500 hover:shadow-2xl"
            >
                <div class="h-full w-full space-y-3">
                    <img
                        :src="highlight.image"
                        :alt="highlight.title"
                        class="h-full w-full object-cover"
                    />
                </div>
            </div>

            <div data-testid="highlight-content" class="flex w-full flex-col gap-5">
                <h3 class="font-heading text-2xl font-bold text-foreground md:text-3xl">
                    {{ highlight.title }}
                </h3>
                <p class="font-body text-base leading-relaxed text-muted md:text-lg">
                    {{ highlight.description }}
                </p>
                <ul class="flex flex-col gap-2">
                    <li
                        v-for="point in highlight.points"
                        :key="point"
                        class="flex items-center gap-2"
                    >
                        <div class="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span class="font-body text-sm text-secondary">{{ point }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
