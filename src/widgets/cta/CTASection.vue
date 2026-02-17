<script setup lang="ts">
import { Button } from "@/shared/ui";

defineOptions({ name: "CTASection" });
</script>

<template>
    <section
        data-testid="cta-final"
        class="scroll-reveal flex flex-col items-center gap-6 bg-primary px-6 py-20 text-center md:px-30 md:py-20"
    >
        <h2 class="font-heading text-3xl font-bold text-white md:text-4xl" role="heading">
            Lleva tu ISP al siguiente nivel
        </h2>
        <p class="font-body text-lg text-white/80">
            Únete a cientos de proveedores que ya optimizan su operación con PayNetLink.
        </p>
        <div class="flex flex-col gap-4 md:flex-row">
            <Button variant="white" role="button">Empezar ahora gratis</Button>
            <Button variant="outline-white" role="button">Hablar con ventas</Button>
        </div>
    </section>
</template>
