<script setup lang="ts">
defineOptions({ name: "CTASection" });

defineProps<{
    title: string;
    subtitle?: string;
    primaryAction: string;
    secondaryAction?: string;
}>();

defineEmits<{
    primaryClick: [];
    secondaryClick: [];
}>();
</script>

<template>
    <section
        class="flex w-full flex-col items-center gap-5 bg-primary px-6 py-12 text-center md:gap-6 md:px-20 md:py-20 lg:px-[120px]"
    >
        <h2 class="font-heading text-2xl font-bold text-white md:text-3xl lg:text-[40px]">
            {{ title }}
        </h2>
        <p v-if="subtitle" class="font-body text-sm text-white/80 md:text-lg">
            {{ subtitle }}
        </p>
        <div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
                class="rounded bg-white px-6 py-3 font-body text-sm font-semibold text-primary transition-colors hover:bg-white/90 md:px-8 md:py-3.5 md:text-base"
                @click="$emit('primaryClick')"
            >
                {{ primaryAction }}
            </button>
            <button
                v-if="secondaryAction"
                class="rounded border border-white px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-white/10 md:px-8 md:py-3.5 md:text-base"
                @click="$emit('secondaryClick')"
            >
                {{ secondaryAction }}
            </button>
        </div>
    </section>
</template>
