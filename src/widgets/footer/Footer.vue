<script setup lang="ts">
import { Container, Logo } from "@/shared/ui";
import { useI18n } from "vue-i18n";

defineOptions({ name: "AppFooter" });

const { t } = useI18n();
</script>

<template>
    <footer class="bg-foreground px-6 py-12 md:px-20">
        <Container>
            <!-- Main grid: logo column + 4 content columns -->
            <div
                class="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr_1.5fr_1fr]"
            >
                <!-- Column 1: Logo + tagline + learn more -->
                <div class="flex flex-col gap-4">
                    <Logo size="sm" variant="dark" />
                    <p class="max-w-xs font-body text-sm leading-relaxed text-[#666666]">
                        {{ t("footer.tagline") }}
                    </p>
                    <a
                        href="/about"
                        class="font-body text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                        {{ t("footer.learnMore") }}
                    </a>
                </div>

                <!-- Column 2: Site -->
                <div class="flex flex-col gap-3">
                    <h4 class="font-body text-sm font-semibold text-white">
                        {{ t("footer.site.title") }}
                    </h4>
                    <a
                        href="/#precios"
                        class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                    >
                        {{ t("footer.site.plans") }}
                    </a>
                    <a
                        href="/#coverage"
                        class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                    >
                        {{ t("footer.site.coverage") }}
                    </a>
                    <a
                        href="/#ayuda"
                        class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                    >
                        {{ t("footer.site.support") }}
                    </a>
                </div>

                <!-- Column 3: Attention / Hours -->
                <div class="flex flex-col gap-3">
                    <h4 class="font-body text-sm font-semibold text-white">
                        {{ t("footer.attention.title") }}
                    </h4>
                    <p class="font-body text-sm text-[#666666]">
                        {{ t("footer.attention.weekdays") }}
                    </p>
                    <p class="font-body text-sm text-[#666666]">
                        {{ t("footer.attention.saturdays") }}
                    </p>
                    <p class="font-body text-sm text-[#666666]">
                        {{ t("footer.attention.holidays") }}
                    </p>
                    <p class="font-body text-sm font-medium text-white">
                        {{ t("footer.attention.company") }}
                    </p>
                    <p class="font-body text-sm text-[#666666]">
                        {{ t("footer.attention.address") }}
                    </p>
                </div>

                <!-- Column 4: Links of Interest -->
                <div class="flex flex-col gap-3">
                    <h4 class="font-body text-sm font-semibold text-white">
                        {{ t("footer.links.title") }}
                    </h4>
                    <a
                        href="https://wa.me/573043408837"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                    >
                        {{ t("footer.links.whatsapp") }}
                    </a>
                    <a
                        href="https://instagram.com/paynetlink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                    >
                        {{ t("footer.links.instagram") }}
                    </a>
                    <a
                        href="/contact"
                        class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                    >
                        {{ t("footer.links.contact") }}
                    </a>
                    <a
                        href="mailto:soporte@paynetlink.com"
                        class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                    >
                        {{ t("footer.links.email") }}
                    </a>
                </div>

                <!-- Column 5: Legal -->
                <div class="flex flex-col gap-3">
                    <h4 class="font-body text-sm font-semibold text-white">
                        {{ t("footer.legal.title") }}
                    </h4>
                    <a
                        href="/terms"
                        class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                    >
                        {{ t("footer.legal.terms") }}
                    </a>
                    <a
                        href="/privacy"
                        class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                    >
                        {{ t("footer.legal.privacy") }}
                    </a>
                    <a
                        href="/user-protection"
                        class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                    >
                        {{ t("footer.legal.userProtection") }}
                    </a>
                </div>
            </div>

            <!-- Divider -->
            <div class="h-px w-full bg-[#333333]" />

            <!-- Copyright -->
            <div class="mt-6 text-center">
                <p class="font-body text-sm text-[#666666]">
                    {{ t("footer.copyright", { year: new Date().getFullYear() }) }}
                </p>
            </div>
        </Container>
    </footer>
</template>
