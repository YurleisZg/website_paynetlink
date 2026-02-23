<script setup lang="ts">
import { Button, Container, LocaleSwitcher, Logo } from "@/shared/ui";
import ActionLink from "@/shared/ui/ActionLink.vue";
import VideoPlayer from "@/shared/ui/VideoPlayer.vue";
import { useI18n } from "vue-i18n";

defineOptions({ name: "DemoPage" });

const { t } = useI18n();
</script>

<template>
    <div class="flex h-full w-full flex-col bg-surface">
        <!-- Navbar -->
        <header class="w-full border-b border-divider bg-white px-4 py-3 sm:px-6 lg:px-20">
            <Container class="flex items-center justify-between">
                <router-link to="/" :aria-label="t('auth.backToHome')">
                    <Logo size="sm" />
                </router-link>
                <div class="flex items-center gap-3">
                    <LocaleSwitcher />
                    <div class="h-5 w-px bg-divider" aria-hidden="true" />
                    <Button variant="primary" to="/register">
                        {{ t("demo.startFreeTrial") }}
                    </Button>
                </div>
            </Container>
        </header>

        <!-- Main Content -->
        <main class="w-full flex-1 px-6 py-8 md:px-12 md:py-10 lg:px-20 lg:py-12">
            <Container class="flex flex-col items-center gap-6 md:gap-8">
                <!-- Title -->
                <h1
                    class="text-center font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl"
                >
                    {{ t("demo.title") }}
                </h1>

                <!-- Subtitle -->
                <p class="max-w-2xl text-center font-body text-sm text-muted md:text-base">
                    {{ t("demo.subtitle") }}
                </p>

                <!-- Video Player -->
                <VideoPlayer class="mt-2 md:mt-4" />

                <!-- Actions -->
                <div class="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                    <!-- <ActionLink icon="monitor" color="primary">Demo en vivo</ActionLink> -->
                    <ActionLink icon="calendar" color="info">
                        {{ t("demo.scheduleDemo") }}
                    </ActionLink>
                </div>
            </Container>
        </main>
    </div>
</template>
