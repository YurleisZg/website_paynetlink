<script setup lang="ts">
import { Button, Step } from "@/shared/ui";
import { useI18n } from "vue-i18n";

defineOptions({ name: "HowItWorks" });

const { t } = useI18n();

interface StepData {
    number: number;
    title: string;
    description: string;
}

interface Props {
    steps: StepData[];
}

defineProps<Props>();
</script>

<template>
    <section
        class="scroll-reveal flex flex-col items-center gap-12 bg-white px-6 py-20 md:px-20 md:py-20"
    >
        <h2 class="font-heading text-3xl font-bold text-foreground md:text-4xl" role="heading">
            {{ t("home.howItWorks.title") }}
        </h2>
        <div class="flex flex-col items-center gap-0 md:flex-row md:gap-0">
            <Step
                v-for="step in steps"
                :key="step.title"
                data-testid="step"
                :number="step.number"
                :title="step.title"
                :description="step.description"
            />
            <div v-for="i in 2" :key="i" class="hidden h-px w-20 bg-divider last:hidden md:block" />
        </div>
        <Button variant="primary" to="/register">{{ t("home.howItWorks.cta") }}</Button>
    </section>
</template>
