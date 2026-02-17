<script setup lang="ts">
import { router } from "@/app/router";
import { Button, Logo } from "@/shared/ui";
import ActionLink from "@/shared/ui/ActionLink.vue";
import VideoPlayer from "@/shared/ui/VideoPlayer.vue";

defineOptions({ name: "DemoPage" });

const goTo = (href: string) => {
    router.push(href);
};
</script>

<template>
    <div class="flex h-full w-full flex-col bg-surface">
        <!-- Navbar -->
        <header
            class="flex w-full items-center justify-between border-b border-divider bg-white px-6 md:px-12 lg:px-20"
        >
            <Logo size="sm" class="cursor-pointer" @click="goTo('/')" />
            <div class="flex items-center gap-3">
                <Button
                    variant="primary"
                    class="rounded px-4 py-2 text-xs md:px-6 md:py-2.5 md:text-sm font-semibold"
                    @click="goTo('/register')"
                >
                    Comenzar prueba gratis
                </Button>
            </div>
        </header>

        <!-- Main Content -->
        <main
            class="flex w-full flex-1 flex-col items-center gap-6 px-6 py-8 md:gap-8 md:px-12 md:py-10 lg:px-20 lg:py-12"
        >
            <!-- Title -->
            <h1
                class="text-center font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl"
            >
                Demo interactiva de PayNetLink
            </h1>

            <!-- Subtitle -->
            <p class="max-w-2xl text-center font-body text-sm text-muted md:text-base">
                Explora las funcionalidades principales de la plataforma sin necesidad de
                registrarte.
            </p>

            <!-- Video Player -->
            <VideoPlayer class="mt-2 md:mt-4" />

            <!-- Actions -->
            <div class="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                <!-- <ActionLink icon="monitor" color="primary">Demo en vivo</ActionLink> -->
                <ActionLink icon="calendar" color="info"> Agendar demo personalizada </ActionLink>
            </div>
        </main>
    </div>
</template>
