<script setup lang="ts">
import { TestimonialCard } from "@/shared/ui";

defineOptions({ name: "TestimonialsSection" });

interface Testimonial {
    quote: string;
    authorName: string;
    authorRole: string;
}

interface Props {
    testimonials: Testimonial[];
}

defineProps<Props>();
</script>

<template>
    <section
        class="scroll-reveal flex flex-col items-center gap-12 bg-white px-6 py-20 md:px-20 md:py-20"
    >
        <h2 class="font-heading text-3xl font-bold text-foreground md:text-4xl" role="heading">
            ISPs que ya confían en PayNetLink
        </h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <TestimonialCard
                v-for="testimonial in testimonials"
                :key="testimonial.authorName"
                data-testid="testimonial-card"
                :quote="testimonial.quote"
                :author-name="testimonial.authorName"
                :author-role="testimonial.authorRole"
            />
        </div>
    </section>
</template>
