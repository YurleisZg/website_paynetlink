<script setup lang="ts">
import { Network, CircleCheck } from "lucide-vue-next";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({
    name: "RegisterLeftPanel",
});

const { t, tm } = useI18n();

const benefits = computed(() => (tm("auth.registerPanel.benefits") as string[]).map(String));
</script>

<template>
    <div class="hidden md:flex md:w-1/2 flex-col justify-center gap-8 bg-primary px-[60px] py-20">
        <!-- Logo -->
        <router-link
            to="/"
            class="flex items-center gap-3 transition-opacity hover:opacity-80"
            :aria-label="t('auth.backToHome')"
        >
            <Network :size="32" class="text-white" />
            <span
                class="text-[28px] font-bold text-white"
                style="font-family: &quot;Red Hat Display&quot;, sans-serif"
            >
                PayNetLink
            </span>
        </router-link>

        <!-- Title -->
        <h1
            class="text-[36px] font-bold leading-[1.2] text-white whitespace-pre-line"
            style="font-family: &quot;Red Hat Display&quot;, sans-serif"
        >
            {{ t("auth.registerPanel.title") }}
        </h1>

        <!-- Benefits List -->
        <ul class="flex flex-col gap-4">
            <li v-for="(benefit, index) in benefits" :key="index" class="flex items-start gap-3">
                <CircleCheck :size="20" class="mt-[2px] flex-shrink-0 text-white" />
                <span class="text-[15px] leading-[1.6] text-white/80">
                    {{ benefit }}
                </span>
            </li>
        </ul>
    </div>
</template>
