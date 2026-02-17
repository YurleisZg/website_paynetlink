<script setup lang="ts">
import { Badge, Button } from "@/shared/ui";
import { Play, TrendingUp } from "lucide-vue-next";
import { onMounted, ref } from "vue";

defineOptions({ name: "HeroSection" });

interface ChartDataItem {
    month: string;
    value: number;
    height: number;
    color: string;
}

const chartData = ref<ChartDataItem[]>([
    { month: "Ene", value: 45, height: 0, color: "#c7d9f5" },
    { month: "Feb", value: 52, height: 0, color: "#a3c2ed" },
    { month: "Mar", value: 38, height: 0, color: "#8fb5e8" },
    { month: "Abr", value: 65, height: 0, color: "#7aa8e3" },
    { month: "May", value: 58, height: 0, color: "#5b97dd" },
    { month: "Jun", value: 85, height: 0, color: "#1a56db" },
]);

onMounted(() => {
    // Animate chart bars on mount
    setTimeout(() => {
        chartData.value.forEach((item, index) => {
            setTimeout(() => {
                item.height = item.value;
            }, index * 100);
        });
    }, 500);
});
</script>

<template>
    <section
        data-testid="hero-section"
        class="scroll-reveal flex flex-col items-center gap-15 bg-white px-6 py-24 md:flex-row md:px-20 md:py-32"
    >
        <div class="flex w-full flex-col gap-7">
            <Badge
                :show-arrow="true"
                data-testid="hero-badge"
                label="Nuevo: Facturación electrónica integrada"
            />
            <h1
                class="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl md:leading-[1.15]"
                role="heading"
            >
                Gestiona tu ISP desde un solo lugar. Cobra mejor, opera más rápido.
            </h1>
            <p class="font-body text-lg leading-relaxed text-muted md:text-xl md:leading-[1.6]">
                PayNetLink automatiza la gestión de clientes, pagos, red MikroTik y comunicaciones
                de tu proveedor de internet. Menos errores manuales, más control.
            </p>
            <div class="flex flex-col gap-4 md:flex-row">
                <Button variant="primary" to="/register">Comenzar prueba gratuita</Button>
                <Button variant="outline" to="/demo">
                    <Play :size="16" class="mr-2" />
                    Ver demo
                </Button>
            </div>
            <p class="font-body text-sm text-subtle">
                Sin tarjeta de crédito · Configuración en 10 minutos · Soporte incluido
            </p>
        </div>
        <div class="w-full">
            <!-- Enhanced Dashboard Mockup -->
            <div
                data-testid="hero-dashboard-mockup"
                class="group relative rounded-lg border border-divider bg-surface p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            >
                <!-- Mockup Header -->
                <div class="mb-4 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="flex gap-1.5">
                            <div class="h-3 w-3 rounded-full bg-danger" />
                            <div class="h-3 w-3 rounded-full bg-[#fbbf24]" />
                            <div class="h-3 w-3 rounded-full bg-success" />
                        </div>
                    </div>
                    <span class="font-body text-xs font-medium text-subtle">
                        PayNetLink — Dashboard
                    </span>
                </div>

                <!-- Stats Row -->
                <div class="mb-4 grid grid-cols-3 gap-3">
                    <div
                        class="flex flex-col gap-1 rounded-md bg-white p-3 shadow-sm transition-all hover:shadow-md"
                    >
                        <span class="font-body text-[11px] font-medium text-subtle">
                            Clientes activos
                        </span>
                        <span class="font-heading text-2xl font-bold text-foreground">1,247</span>
                        <span class="font-body text-[11px] font-medium text-success">
                            ↑ 12.3% este mes
                        </span>
                    </div>
                    <div
                        class="flex flex-col gap-1 rounded-md bg-white p-3 shadow-sm transition-all hover:shadow-md"
                    >
                        <span class="font-body text-[11px] font-medium text-subtle">
                            Recaudado
                        </span>
                        <span class="font-heading text-2xl font-bold text-foreground">$48.2M</span>
                        <span class="font-body text-[11px] font-medium text-success">
                            ↑ 8.7% este mes
                        </span>
                    </div>
                    <div
                        class="flex flex-col gap-1 rounded-md bg-white p-3 shadow-sm transition-all hover:shadow-md"
                    >
                        <span class="font-body text-[11px] font-medium text-subtle">
                            Uptime red
                        </span>
                        <span class="font-heading text-2xl font-bold text-foreground">99.9%</span>
                        <span class="font-body text-[11px] font-medium text-subtle">
                            Último mes
                        </span>
                    </div>
                </div>

                <!-- Chart -->
                <div class="rounded-md bg-white p-4 shadow-sm">
                    <div class="mb-3 flex items-center justify-between">
                        <h3 class="font-body text-xs font-semibold text-foreground">
                            Recaudo mensual
                        </h3>
                        <TrendingUp :size="14" class="text-success" />
                    </div>
                    <div class="flex h-52 items-end justify-around gap-2">
                        <div
                            v-for="(data, index) in chartData"
                            :key="index"
                            class="flex flex-1 flex-col items-center gap-1"
                        >
                            <div
                                class="w-full rounded-t shadow-sm transition-all duration-700 ease-out"
                                :style="{
                                    height: `${data.height}%`,
                                    minHeight: data.height > 0 ? `${data.value * 1.5}px` : '0',
                                    backgroundColor: data.color,
                                }"
                            />
                            <span class="font-body text-[10px] text-subtle">
                                {{ data.month }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
