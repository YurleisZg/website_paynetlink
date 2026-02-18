<script setup lang="ts">
import { Button } from "@/shared/ui";
import { useI18n } from "vue-i18n";

defineOptions({ name: "CTASection" });

const { t } = useI18n();
</script>

<template>
    <section
        data-testid="cta-final"
        class="scroll-reveal flex flex-col items-center gap-6 bg-primary px-6 py-20 text-center md:px-30 md:py-20"
    >
        <h2 class="font-heading text-3xl font-bold text-white md:text-4xl" role="heading">
            {{ t("home.cta.title") }}
        </h2>
        <p class="font-body text-lg text-white/80">
            {{ t("home.cta.description") }}
        </p>
        <div class="flex flex-col gap-4 md:flex-row">
            <Button variant="white" to="/register">{{ t("home.cta.ctaPrimary") }}</Button>
            <Button variant="outline-white" to="/contact-advisor">{{
                t("home.cta.ctaSecondary")
            }}</Button>
        </div>
    </section>
</template>
