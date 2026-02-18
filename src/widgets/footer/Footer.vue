<script setup lang="ts">
import { Logo } from "@/shared/ui";
import { useI18n } from "vue-i18n";

defineOptions({ name: "AppFooter" });

const { t } = useI18n();
</script>

<template>
    <footer class="bg-foreground px-6 py-16 md:px-20 md:py-16">
        <div class="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
            <div data-testid="footer-column" class="flex flex-col gap-4">
                <Logo data-testid="footer-logo" size="sm" variant="dark" />
                <p class="font-body text-sm leading-relaxed text-[#666666]">
                    {{ t("footer.tagline") }}
                </p>
            </div>
            <div data-testid="footer-column" class="flex flex-col gap-4">
                <h4 class="font-body text-sm font-semibold text-white">
                    {{ t("footer.product.title") }}
                </h4>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    {{ t("footer.product.features") }}
                </a>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    {{ t("footer.product.pricing") }}
                </a>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    {{ t("footer.product.integrations") }}
                </a>
            </div>
            <div data-testid="footer-column" class="flex flex-col gap-4">
                <h4 class="font-body text-sm font-semibold text-white">
                    {{ t("footer.resources.title") }}
                </h4>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    {{ t("footer.resources.blog") }}
                </a>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    {{ t("footer.resources.help") }}
                </a>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    {{ t("footer.resources.apiDocs") }}
                </a>
            </div>
            <div data-testid="footer-column" class="flex flex-col gap-4">
                <h4 class="font-body text-sm font-semibold text-white">
                    {{ t("footer.company.title") }}
                </h4>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    {{ t("footer.company.about") }}
                </a>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    {{ t("footer.company.contact") }}
                </a>
                <a
                    href="#"
                    class="font-body text-sm text-[#666666] transition-colors hover:text-white"
                >
                    {{ t("footer.company.privacy") }}
                </a>
            </div>
        </div>
        <div data-testid="footer-divider" class="mb-8 h-px w-full bg-[#333333]" />
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p class="font-body text-sm text-[#666666]">
                {{ t("footer.copyright", { year: new Date().getFullYear() }) }}
            </p>
            <p class="font-body text-sm text-[#666666]">
                {{ t("footer.madeWith") }}
            </p>
        </div>
    </footer>
</template>
