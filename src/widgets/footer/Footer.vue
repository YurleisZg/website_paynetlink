<script setup lang="ts">
import { Container, Logo } from "@/shared/ui";
import { useI18n } from "vue-i18n";

defineOptions({ name: "AppFooter" });

const { t } = useI18n();
</script>

<template>
    <footer class="border-t border-divider bg-white px-6 py-12 md:px-20">
        <Container>
            <!-- Main grid: logo column + 4 content columns -->
            <div
                class="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr_1.5fr_1fr]"
            >
                <!-- Column 1: Logo + tagline + learn more -->
                <div class="flex flex-col gap-4">
                    <Logo size="sm" />
                    <p class="max-w-xs font-body text-sm leading-relaxed text-secondary">
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
                    <h4 class="font-body text-sm font-semibold text-foreground">
                        {{ t("footer.site.title") }}
                    </h4>
                    <a
                        href="/#precios"
                        class="font-body text-sm text-secondary transition-colors hover:text-foreground"
                    >
                        {{ t("footer.site.plans") }}
                    </a>
                    <a
                        href="/#coverage"
                        class="font-body text-sm text-secondary transition-colors hover:text-foreground"
                    >
                        {{ t("footer.site.coverage") }}
                    </a>
                    <a
                        href="/#ayuda"
                        class="font-body text-sm text-secondary transition-colors hover:text-foreground"
                    >
                        {{ t("footer.site.support") }}
                    </a>
                </div>

                <!-- Column 3: Attention / Hours -->
                <div class="flex flex-col gap-3">
                    <h4 class="font-body text-sm font-semibold text-foreground">
                        {{ t("footer.attention.title") }}
                    </h4>
                    <p class="font-body text-sm text-secondary">
                        {{ t("footer.attention.weekdays") }}
                    </p>
                    <p class="font-body text-sm text-secondary">
                        {{ t("footer.attention.saturdays") }}
                    </p>
                    <p class="font-body text-sm text-secondary">
                        {{ t("footer.attention.holidays") }}
                    </p>
                    <p class="font-body text-sm text-secondary">
                        {{ t("footer.attention.address") }}
                    </p>
                </div>

                <!-- Column 4: Links of Interest -->
                <div class="flex flex-col gap-3">
                    <h4 class="font-body text-sm font-semibold text-foreground">
                        {{ t("footer.links.title") }}
                    </h4>
                    <a
                        href="https://wa.me/573043408837"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-body text-sm text-secondary transition-colors hover:text-foreground"
                    >
                        {{ t("footer.links.whatsapp") }}
                    </a>
                    <a
                        href="https://instagram.com/paynetlink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-body text-sm text-secondary transition-colors hover:text-foreground"
                    >
                        {{ t("footer.links.instagram") }}
                    </a>
                    <a
                        href="/contact"
                        class="font-body text-sm text-secondary transition-colors hover:text-foreground"
                    >
                        {{ t("footer.links.contact") }}
                    </a>
                    <a
                        href="mailto:soporte@paynetlink.com"
                        class="font-body text-sm text-secondary transition-colors hover:text-foreground"
                    >
                        {{ t("footer.links.email") }}
                    </a>
                </div>

                <!-- Column 5: Legal -->
                <div class="flex flex-col gap-3">
                    <h4 class="font-body text-sm font-semibold text-foreground">
                        {{ t("footer.legal.title") }}
                    </h4>
                    <a
                        href="/terms"
                        class="font-body text-sm text-secondary transition-colors hover:text-foreground"
                    >
                        {{ t("footer.legal.terms") }}
                    </a>
                    <a
                        href="/privacy"
                        class="font-body text-sm text-secondary transition-colors hover:text-foreground"
                    >
                        {{ t("footer.legal.privacy") }}
                    </a>
                    <a
                        href="/user-protection"
                        class="font-body text-sm text-secondary transition-colors hover:text-foreground"
                    >
                        {{ t("footer.legal.userProtection") }}
                    </a>
                </div>
            </div>

            <!-- Divider -->
            <div class="h-px w-full bg-divider" />

            <!-- Copyright -->
            <div class="mt-6 text-center">
                <p class="font-body text-sm text-secondary">
                    {{ t("footer.copyright", { year: new Date().getFullYear() }) }}
                </p>
            </div>
        </Container>
    </footer>
</template>
