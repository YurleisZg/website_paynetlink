<script setup lang="ts">
import { useNavLinks } from "@/shared/composables";
import { Container } from "@/shared/ui";
import ActionLink from "@/shared/ui/ActionLink.vue";
import VideoPlayer from "@/shared/ui/VideoPlayer.vue";
import { Footer } from "@/widgets/footer";
import { Navbar } from "@/widgets/navigation";
import { useI18n } from "vue-i18n";

defineOptions({ name: "DemoPage" });

const { t } = useI18n();
const { navLinks } = useNavLinks();
</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-white">
        <!-- Navbar -->
        <Navbar :links="navLinks" />

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
                <div class="flex flex-col items-center gap-4">
                    <ActionLink icon="calendar" color="info">
                        {{ t("demo.scheduleDemo") }}
                    </ActionLink>
                    <a
                        href="/register"
                        class="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-body text-base font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                        {{ t("demo.startFreeTrial") }}
                    </a>
                </div>
            </Container>
        </main>

        <!-- Footer -->
        <Footer />
    </div>
</template>
