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
import { onMounted } from "vue";

import customerControl from "@/assets/images/customer-control.png";
import mikrotikDashboard from "@/assets/images/mikrotik-dashboard.png";
import paymentAutomation from "@/assets/images/payment-automation.png";

defineOptions({ name: "HomePage" });

const navLinks = [
    { label: "Productos", href: "#productos" },
    { label: "Soluciones", href: "#soluciones" },
    { label: "Precios", href: "#pricing" },
    { label: "Recursos", href: "#recursos" },
    { label: "Empresa", href: "#empresa" },
];

const features = [
    {
        icon: Users,
        title: "Gestión de Clientes",
        description:
            "Registra clientes, contratos y planes en segundos. Consulta historial completo de pagos y servicios en un solo lugar.",
        linkText: "Conocer más →",
    },
    {
        icon: CreditCard,
        title: "Pagos Recurrentes",
        description:
            "Automatiza el cobro mensual con tarjetas o cuentas bancarias. Reduce morosidad con recordatorios automáticos.",
        linkText: "Conocer más →",
    },
    {
        icon: Router,
        title: "Automatización de Red",
        description:
            "Integración directa con MikroTik. Suspende o activa servicios según estado de pago sin intervención manual.",
        linkText: "Conocer más →",
    },
    {
        icon: Bell,
        title: "Notificaciones Automáticas",
        description:
            "Envía recordatorios de pago, confirmaciones y alertas por SMS, email o WhatsApp sin esfuerzo adicional.",
        linkText: "Conocer más →",
    },
    {
        icon: FileText,
        title: "Facturación Electrónica",
        description:
            "Genera facturas electrónicas válidas fiscalmente. Cumple con normativas locales sin complicaciones.",
        linkText: "Conocer más →",
    },
    {
        icon: BarChart3,
        title: "Reportes y Analítica",
        description:
            "Visualiza métricas clave de tu negocio. Identifica tendencias y toma decisiones basadas en datos reales.",
        linkText: "Conocer más →",
    },
];

const highlights = [
    {
        title: "Control total de tus clientes",
        description:
            "Visualiza el estado de cada cliente en tiempo real. Filtra por plan, estado de pago, ubicación y más. Exporta listados para análisis o campañas.",
        points: ["Búsqueda instantánea", "Filtros avanzados", "Exportación masiva"],
        image: customerControl,
    },
    {
        title: "Cobra sin esfuerzo",
        description:
            "Configura cobros recurrentes una vez y olvídate del resto. Acepta múltiples métodos de pago y concilia automáticamente con tu contabilidad.",
        points: ["Cobro automático", "Múltiples métodos", "Conciliación automática"],
        image: paymentAutomation,
    },
    {
        title: "Tu red bajo control",
        description:
            "Monitorea el estado de tu infraestructura MikroTik desde un solo panel. Ejecuta acciones masivas sin entrar a cada router.",
        points: ["Monitoreo en tiempo real", "Acciones masivas", "Alertas automáticas"],
        image: mikrotikDashboard,
    },
];

const steps = [
    {
        number: 1,
        title: "Crea tu cuenta",
        description: "Regístrate gratis y configura tu perfil de ISP en minutos.",
    },
    {
        number: 2,
        title: "Conecta tu red",
        description: "Integra tus routers MikroTik y sistemas de pago existentes.",
    },
    {
        number: 3,
        title: "Automatiza y crece",
        description: "Deja que PayNetLink maneje lo repetitivo mientras enfocas en expandir.",
    },
];

const pricingPlans = [
    {
        name: "Gratis",
        price: "$0",
        period: "/mes",
        features: ["Hasta 50 clientes", "Gestión básica", "Soporte por email", "1 integración"],
        buttonLabel: "Comenzar gratis",
        featured: false,
    },
    {
        name: "Profesional",
        price: "$49,900",
        period: "/mes",
        features: [
            "Hasta 500 clientes",
            "Todas las funciones",
            "Soporte prioritario",
            "Integraciones ilimitadas",
            "Facturación electrónica",
            "API completa",
        ],
        buttonLabel: "Comenzar ahora",
        featured: true,
        badgeLabel: "Más popular",
    },
    {
        name: "Empresa",
        price: "Personalizado",
        period: "",
        features: [
            "Clientes ilimitados",
            "Instalación dedicada",
            "Soporte 24/7",
            "SLA garantizado",
            "Capacitación incluida",
            "Personalización total",
        ],
        buttonLabel: "Contactar ventas",
        featured: false,
    },
];

const testimonials = [
    {
        quote: "Desde que implementamos PayNetLink, redujimos la morosidad en 40%. La automatización de pagos y suspensiones es increíble.",
        authorName: "Carlos Méndez",
        authorRole: "CEO, FibraNet",
    },
    {
        quote: "La integración con MikroTik nos ahorró horas de trabajo manual. Ahora gestionamos 300 clientes con la mitad del personal.",
        authorName: "María Rodríguez",
        authorRole: "CTO, NetSpeed Pro",
    },
    {
        quote: "El soporte es excelente y la plataforma muy intuitiva. Migramos desde Excel y fue la mejor decisión para nuestro ISP.",
        authorName: "Jorge López",
        authorRole: "Fundador, ConectaISP",
    },
];

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
