<script setup lang="ts">
import { IntegrationCard } from "@/shared/ui";
import type { Component } from "vue";

defineOptions({ name: "IntegrationsSection" });

interface Integration {
    label: string;
    icon: Component;
    iconColor: string;
}

interface Props {
    integrations: Integration[];
}

defineProps<Props>();
</script>

<template>
    <section
        data-testid="integrations-section"
        class="scroll-reveal flex flex-col items-center gap-10 bg-surface px-6 py-20 md:px-20 md:py-20"
    >
        <h2 class="font-heading text-3xl font-bold text-foreground md:text-4xl" role="heading">
            Se integra con las herramientas que ya usas
        </h2>
        <div class="flex flex-wrap items-center justify-center gap-6">
            <IntegrationCard
                v-for="integration in integrations"
                :key="integration.label"
                data-testid="integration-card"
                :label="integration.label"
                :icon="integration.icon"
                :icon-color="integration.iconColor"
            />
        </div>
        <p class="font-body text-sm text-muted md:text-[15px]">
            ¿No encuentras tu integración? Nuestra API abierta te permite conectar cualquier
            sistema.
        </p>
    </section>
</template>
