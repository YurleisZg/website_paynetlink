<script setup lang="ts">
import { CTASection } from "@/widgets/cta";
import { FeatureHighlights, FeaturesSection } from "@/widgets/features";
import { Footer } from "@/widgets/footer";
import { HeroSection } from "@/widgets/hero";
import { HowItWorks } from "@/widgets/how-it-works";
import { IntegrationsSection } from "@/widgets/integrations";
import { Navbar } from "@/widgets/navigation";
import { PricingSection } from "@/widgets/pricing";
import { SocialProof } from "@/widgets/social-proof";
import { TestimonialsSection } from "@/widgets/testimonials";
import {
    BarChart3,
    Bell,
    Cloud,
    CreditCard,
    Database,
    FileText,
    Globe,
    Mail,
    Package,
    Router,
    Smartphone,
    Users,
    Zap,
} from "lucide-vue-next";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

import customerControl from "@/assets/images/customer-control.png";
import mikrotikDashboard from "@/assets/images/mikrotik-dashboard.png";
import paymentAutomation from "@/assets/images/payment-automation.png";

defineOptions({ name: "HomePage" });

const { t, tm } = useI18n();

const navLinks = computed(() => [
    { label: t("nav.links.products"), href: "#productos" },
    { label: t("nav.links.solutions"), href: "#soluciones" },
    { label: t("nav.links.pricing"), href: "#pricing" },
    { label: t("nav.links.resources"), href: "#recursos" },
    { label: t("nav.links.company"), href: "#empresa" },
]);

const features = computed(() => [
    {
        icon: Users,
        title: t("home.features.items.clients.title"),
        description: t("home.features.items.clients.description"),
        linkText: t("home.features.items.clients.linkText"),
    },
    {
        icon: CreditCard,
        title: t("home.features.items.payments.title"),
        description: t("home.features.items.payments.description"),
        linkText: t("home.features.items.payments.linkText"),
    },
    {
        icon: Router,
        title: t("home.features.items.network.title"),
        description: t("home.features.items.network.description"),
        linkText: t("home.features.items.network.linkText"),
    },
    {
        icon: Bell,
        title: t("home.features.items.notifications.title"),
        description: t("home.features.items.notifications.description"),
        linkText: t("home.features.items.notifications.linkText"),
    },
    {
        icon: FileText,
        title: t("home.features.items.invoicing.title"),
        description: t("home.features.items.invoicing.description"),
        linkText: t("home.features.items.invoicing.linkText"),
    },
    {
        icon: BarChart3,
        title: t("home.features.items.analytics.title"),
        description: t("home.features.items.analytics.description"),
        linkText: t("home.features.items.analytics.linkText"),
    },
]);

const highlights = computed(() => [
    {
        title: t("home.highlights.clientControl.title"),
        description: t("home.highlights.clientControl.description"),
        points: (tm("home.highlights.clientControl.points") as string[]).map(String),
        image: customerControl,
    },
    {
        title: t("home.highlights.payments.title"),
        description: t("home.highlights.payments.description"),
        points: (tm("home.highlights.payments.points") as string[]).map(String),
        image: paymentAutomation,
    },
    {
        title: t("home.highlights.network.title"),
        description: t("home.highlights.network.description"),
        points: (tm("home.highlights.network.points") as string[]).map(String),
        image: mikrotikDashboard,
    },
]);

const steps = computed(() => [
    {
        number: 1,
        title: t("home.howItWorks.steps.step1.title"),
        description: t("home.howItWorks.steps.step1.description"),
    },
    {
        number: 2,
        title: t("home.howItWorks.steps.step2.title"),
        description: t("home.howItWorks.steps.step2.description"),
    },
    {
        number: 3,
        title: t("home.howItWorks.steps.step3.title"),
        description: t("home.howItWorks.steps.step3.description"),
    },
]);

const pricingPlans = computed(() => [
    {
        name: t("home.pricing.plans.free.name"),
        price: t("home.pricing.plans.free.price"),
        period: t("home.pricing.plans.free.period"),
        features: (tm("home.pricing.plans.free.features") as string[]).map(String),
        buttonLabel: t("home.pricing.plans.free.buttonLabel"),
        featured: false,
    },
    {
        name: t("home.pricing.plans.pro.name"),
        price: t("home.pricing.plans.pro.price"),
        period: t("home.pricing.plans.pro.period"),
        features: (tm("home.pricing.plans.pro.features") as string[]).map(String),
        buttonLabel: t("home.pricing.plans.pro.buttonLabel"),
        featured: true,
        badgeLabel: t("home.pricing.plans.pro.badgeLabel"),
    },
    {
        name: t("home.pricing.plans.enterprise.name"),
        price: t("home.pricing.plans.enterprise.price"),
        period: t("home.pricing.plans.enterprise.period"),
        features: (tm("home.pricing.plans.enterprise.features") as string[]).map(String),
        buttonLabel: t("home.pricing.plans.enterprise.buttonLabel"),
        featured: false,
    },
]);

const testimonials = computed(() => [
    {
        quote: t("home.testimonials.items.testimonial1.quote"),
        authorName: t("home.testimonials.items.testimonial1.authorName"),
        authorRole: t("home.testimonials.items.testimonial1.authorRole"),
    },
    {
        quote: t("home.testimonials.items.testimonial2.quote"),
        authorName: t("home.testimonials.items.testimonial2.authorName"),
        authorRole: t("home.testimonials.items.testimonial2.authorRole"),
    },
    {
        quote: t("home.testimonials.items.testimonial3.quote"),
        authorName: t("home.testimonials.items.testimonial3.authorName"),
        authorRole: t("home.testimonials.items.testimonial3.authorRole"),
    },
]);

const integrations = [
    { label: "MikroTik", icon: Router, iconColor: "text-[#293239]" },
    { label: "Stripe", icon: CreditCard, iconColor: "text-[#635BFF]" },
    { label: "Mercado Pago", icon: Database, iconColor: "text-[#00B1EA]" },
    { label: "WhatsApp", icon: Smartphone, iconColor: "text-[#25D366]" },
    { label: "Gmail", icon: Mail, iconColor: "text-[#EA4335]" },
    { label: "Twilio", icon: Cloud, iconColor: "text-[#F22F46]" },
    { label: "Zapier", icon: Zap, iconColor: "text-[#FF4A00]" },
    { label: "API Rest", icon: Globe, iconColor: "text-[#0066cc]" },
    { label: "Webhooks", icon: Package, iconColor: "text-[#333333]" },
];

onMounted(() => {
    // Add scroll animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-fade-in");
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
});
</script>

<template>
    <div class="min-h-screen bg-white">
        <!-- Navbar -->
        <Navbar :links="navLinks" />

        <!-- Hero Section -->
        <HeroSection />

        <!-- Social Proof -->
        <SocialProof />

        <!-- Features -->
        <FeaturesSection :features="features" />

        <!-- Feature Highlights -->
        <FeatureHighlights :highlights="highlights" />

        <!-- How It Works -->
        <HowItWorks :steps="steps" />

        <!-- Pricing -->
        <PricingSection :plans="pricingPlans" />

        <!-- Testimonials -->
        <TestimonialsSection :testimonials="testimonials" />

        <!-- Integrations -->
        <IntegrationsSection :integrations="integrations" />

        <!-- CTA Final -->
        <CTASection />

        <!-- Footer -->
        <Footer />
    </div>
</template>

<style scoped>
.scroll-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition:
        opacity 0.6s ease-out,
        transform 0.6s ease-out;
}

.scroll-reveal.animate-fade-in {
    opacity: 1;
    transform: translateY(0);
}
</style>
