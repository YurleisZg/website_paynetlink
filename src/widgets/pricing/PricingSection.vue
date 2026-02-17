<script setup lang="ts">
import { PricingCard } from "@/shared/ui";

defineOptions({ name: "PricingSection" });

interface PricingPlan {
    name: string;
    price: string;
    period: string;
    features: string[];
    buttonLabel: string;
    featured: boolean;
    badgeLabel?: string;
}

interface Props {
    plans: PricingPlan[];
}

defineProps<Props>();
</script>

<template>
    <section
        data-testid="pricing-section"
        class="scroll-reveal flex flex-col items-center gap-12 bg-surface px-6 py-20 md:px-20 md:py-20"
    >
        <div class="flex max-w-xl flex-col gap-3 text-center">
            <h2 class="font-heading text-3xl font-bold text-foreground md:text-4xl" role="heading">
                Planes que crecen contigo
            </h2>
            <p class="font-body text-base text-muted">
                Sin contratos de permanencia. Cambia o cancela cuando quieras.
            </p>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <PricingCard
                v-for="plan in plans"
                :key="plan.name"
                :data-testid="plan.featured ? 'pricing-card-featured' : 'pricing-card'"
                :plan-name="plan.name"
                :price="plan.price"
                :period="plan.period"
                :features="plan.features"
                :button-label="plan.buttonLabel"
                :featured="plan.featured"
                :badge-label="plan.badgeLabel"
            />
        </div>
    </section>
</template>
