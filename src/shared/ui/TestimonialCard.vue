<script setup lang="ts">
import { User } from "lucide-vue-next";

defineOptions({ name: "TestimonialCard" });

defineProps<{
    quote: string;
    authorName: string;
    authorRole: string;
}>();
</script>

<template>
    <div
        class="flex w-full flex-col gap-4 rounded-lg bg-surface-alt p-6 md:w-[380px] md:gap-5 md:p-8"
    >
        <p
            class="font-body text-sm leading-relaxed text-secondary italic md:text-[15px] md:leading-[1.7]"
        >
            "{{ quote }}"
        </p>
        <div class="flex items-center gap-3">
            <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 md:h-11 md:w-11"
            >
                <slot name="avatar">
                    <User :size="20" class="text-primary" />
                </slot>
            </div>
            <div class="flex flex-col gap-0.5">
                <span class="font-body text-sm font-semibold text-foreground">
                    {{ authorName }}
                </span>
                <span class="font-body text-xs text-subtle md:text-[13px]">
                    {{ authorRole }}
                </span>
            </div>
        </div>
    </div>
</template>
