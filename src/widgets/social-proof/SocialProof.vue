<script setup lang="ts">
import { Metric } from "@/shared/ui";

defineOptions({ name: "SocialProof" });

interface MetricData {
    value: string;
    label: string;
}

interface Props {
    companyLogos?: string[];
    metrics?: MetricData[];
}

withDefaults(defineProps<Props>(), {
    companyLogos: () => [
        "FibraNet",
        "NetSpeed",
        "ConectaISP",
        "WiFiMax",
        "RedCo",
        "TelcoFibra",
        "NetPro",
    ],
    metrics: () => [
        { value: "200+", label: "ISPs" },
        { value: "$10,000+", label: "pagos gestionados" },
        { value: "99.9%", label: "uptime" },
        { value: "$20+", label: "recaudado" },
    ],
});
</script>

<template>
    <section
        data-testid="social-proof"
        class="scroll-reveal flex flex-col items-center gap-8 bg-surface px-6 py-12 md:px-20 md:py-12"
    >
        <p class="font-body text-sm font-medium text-subtle">
            Más de 200 proveedores de internet confían en PayNetLink
        </p>
        <div class="flex flex-wrap items-center justify-center gap-12">
            <span
                v-for="logo in companyLogos"
                :key="logo"
                class="font-heading text-lg font-bold text-placeholder transition-colors hover:text-secondary"
            >
                {{ logo }}
            </span>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-16">
            <Metric
                v-for="metric in metrics"
                :key="metric.label"
                :value="metric.value"
                :label="metric.label"
            />
            <div v-for="i in 3" :key="i" class="hidden h-6 w-px bg-divider last:hidden md:block" />
        </div>
    </section>
</template>
