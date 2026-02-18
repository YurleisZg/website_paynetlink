<script setup lang="ts">
import { Metric } from "@/shared/ui";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({ name: "SocialProof" });

const { t } = useI18n();

interface MetricData {
    value: string;
    label: string;
}

interface Props {
    companyLogos?: string[];
    metrics?: MetricData[];
}

const props = withDefaults(defineProps<Props>(), {
    companyLogos: () => [
        "Conexion.Net",
        "Conexsures.net",
        "MelNet Internet",
        "Cibernet Telecomunicaciones",
        "Internet Tiquisio",
    ],
    metrics: undefined,
});

const displayMetrics = computed(
    () =>
        props.metrics ?? [
            { value: "200+", label: "ISPs" },
            { value: "$10,000+", label: t("home.socialProof.metrics.managedPayments") },
            { value: "24/7", label: t("home.socialProof.support") },
            { value: "500+", label: t("home.socialProof.manualWorkSaved") },
        ]
);
</script>

<template>
    <section
        data-testid="social-proof"
        class="scroll-reveal flex flex-col items-center gap-8 bg-surface px-6 py-12 md:px-20 md:py-12"
    >
        <p class="font-body text-sm font-medium text-subtle">
            {{ t("home.socialProof.trust") }}
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
                v-for="metric in displayMetrics"
                :key="metric.label"
                :value="metric.value"
                :label="metric.label"
            />
            <div v-for="i in 3" :key="i" class="hidden h-6 w-px bg-divider last:hidden md:block" />
        </div>
    </section>
</template>
