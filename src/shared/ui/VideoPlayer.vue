<script setup lang="ts">
import { Play } from "lucide-vue-next";

defineOptions({ name: "VideoPlayer" });

defineProps<{
    videoUrl?: string;
}>();

const handlePlayClick = () => {
    // TODO: Implementar lógica para reproducir video
    console.log("Play video clicked");
};
</script>

<template>
    <div
        class="flex w-full max-w-[960px] flex-col items-center justify-center rounded-xl bg-foreground shadow-[0_12px_40px_rgba(0,0,0,0.12)] aspect-[16/9] md:aspect-video"
    >
        <!-- Play Button -->
        <button
            class="flex h-16 w-16 items-center justify-center rounded-full bg-primary transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 md:h-20 md:w-20"
            aria-label="Reproducir video demo"
            @click="handlePlayClick"
        >
            <Play :size="24" class="text-white md:w-8 md:h-8" fill="white" />
        </button>

        <!-- Video Label -->
        <p class="mt-2 font-body text-sm text-white opacity-70 md:mt-3 md:text-base">
            Ver demostración — 5 min
        </p>
    </div>
</template>
