<script setup lang="ts">
import { Logo } from "@/shared/ui";

defineOptions({ name: "AppFooter" });
</script>

<template>
    <footer class="bg-foreground px-6 py-16 md:px-20 md:py-16">
        <div class="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
            <div data-testid="footer-column" class="flex flex-col gap-4">
                <Logo data-testid="footer-logo" size="sm" variant="dark" />
                <p class="font-body text-sm leading-relaxed text-[#666666]">
                    Automatiza tu ISP y cobra mejor
                </p>
            </div>
            <div data-testid="footer-column" class="flex flex-col gap-4">
                <h4 class="font-body text-sm font-semibold text-white">Producto</h4>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    Funciones
                </a>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    Precios
                </a>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    Integraciones
                </a>
            </div>
            <div data-testid="footer-column" class="flex flex-col gap-4">
                <h4 class="font-body text-sm font-semibold text-white">Recursos</h4>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    Blog
                </a>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    Ayuda
                </a>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    API Docs
                </a>
            </div>
            <div data-testid="footer-column" class="flex flex-col gap-4">
                <h4 class="font-body text-sm font-semibold text-white">Empresa</h4>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    Sobre nosotros
                </a>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    Contacto
                </a>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    Privacidad
                </a>
            </div>
        </div>
        <div data-testid="footer-divider" class="mb-8 h-px w-full bg-[#333333]" />
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p class="font-body text-sm text-[#666666]">
                © 2025 PayNetLink. Todos los derechos reservados.
            </p>
            <p class="font-body text-sm text-[#666666]">
                Hecho con amor para ISPs de Latinoamérica
            </p>
        </div>
    </footer>
</template>
