<script setup lang="ts">
import type { Component } from "vue";
import { Button, LocaleSwitcher, Logo } from "@/shared/ui";
import { ChevronDown, Menu, Search, X } from "lucide-vue-next";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({ name: "AppNavbar" });

const { t } = useI18n();

export interface NavDropdownItem {
    label: string;
    description?: string;
    href: string;
    icon?: Component;
}

export interface NavLink {
    label: string;
    href?: string;
    dropdown?: NavDropdownItem[];
}

withDefaults(
    defineProps<{
        links?: NavLink[];
    }>(),
    {
        links: () => [],
    }
);

// --- Mobile menu ---
const mobileMenuOpen = ref(false);
const mobileActiveAccordion = ref<string | null>(null);

const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
    mobileActiveAccordion.value = null;
};

const toggleMobileAccordion = (label: string) => {
    mobileActiveAccordion.value = mobileActiveAccordion.value === label ? null : label;
};

// --- Desktop dropdowns ---
const activeDropdown = ref<string | null>(null);
let closeTimeoutId: ReturnType<typeof setTimeout> | null = null;

const openDropdown = (label: string) => {
    if (closeTimeoutId) {
        clearTimeout(closeTimeoutId);
        closeTimeoutId = null;
    }
    activeDropdown.value = label;
};

const cancelClose = () => {
    if (closeTimeoutId) {
        clearTimeout(closeTimeoutId);
        closeTimeoutId = null;
    }
};

const scheduleClose = () => {
    closeTimeoutId = setTimeout(() => {
        activeDropdown.value = null;
    }, 150);
};

const closeAllDropdowns = () => {
    if (closeTimeoutId) clearTimeout(closeTimeoutId);
    activeDropdown.value = null;
};

const toggleDropdown = (label: string) => {
    if (activeDropdown.value === label) {
        closeAllDropdowns();
    } else {
        openDropdown(label);
    }
};

// --- Search ---
const searchOpen = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);
const searchQuery = ref("");
const searchContainerRef = ref<HTMLDivElement | null>(null);

const openSearch = async () => {
    searchOpen.value = true;
    await nextTick();
    searchInput.value?.focus();
};

const closeSearch = () => {
    searchOpen.value = false;
    searchQuery.value = "";
};

const handleSearch = (event: Event) => {
    event.preventDefault();
    if (searchQuery.value.trim()) {
        console.log("Search query:", searchQuery.value);
    }
};

const handleNavigation = () => {
    closeMobileMenu();
    closeSearch();
    closeAllDropdowns();
};

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
        if (searchOpen.value) {
            closeSearch();
        } else {
            closeAllDropdowns();
        }
    }
};

const handleClickOutside = (event: MouseEvent) => {
    if (
        searchOpen.value &&
        searchContainerRef.value &&
        !searchContainerRef.value.contains(event.target as Node)
    ) {
        closeSearch();
    }
};

watch([mobileMenuOpen, searchOpen], ([menuOpen, searchIsOpen]) => {
    document.body.style.overflow = menuOpen || searchIsOpen ? "hidden" : "";
});

onMounted(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("mousedown", handleClickOutside);
    if (closeTimeoutId) clearTimeout(closeTimeoutId);
    document.body.style.overflow = "";
});
</script>

<template>
    <nav
        class="sticky top-0 z-50 border-b border-divider bg-white/95 backdrop-blur-sm"
        role="navigation"
        aria-label="Main navigation"
    >
        <div
            class="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3 sm:px-6 lg:px-20"
        >
            <!-- Logo and Desktop Navigation -->
            <div class="flex items-center gap-8 lg:gap-10">
                <Logo size="sm" role="img" aria-label="PayNetLink" />

                <!-- Desktop Navigation Links -->
                <div class="hidden items-center gap-1 lg:flex">
                    <template v-for="link in links" :key="link.label">
                        <!-- Dropdown trigger -->
                        <div
                            v-if="link.dropdown"
                            class="relative"
                            @mouseenter="openDropdown(link.label)"
                            @mouseleave="scheduleClose"
                        >
                            <button
                                :aria-expanded="activeDropdown === link.label"
                                :aria-haspopup="true"
                                class="flex items-center gap-1 rounded-md px-3 py-2 font-body text-sm font-medium text-secondary transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                @click="toggleDropdown(link.label)"
                                @keydown.escape="closeAllDropdowns"
                            >
                                {{ link.label }}
                                <ChevronDown
                                    :size="14"
                                    class="mt-px shrink-0 transition-transform duration-200"
                                    :class="{ 'rotate-180': activeDropdown === link.label }"
                                />
                            </button>

                            <!-- Dropdown panel -->
                            <Transition
                                enter-active-class="transition-all duration-200 ease-out"
                                enter-from-class="translate-y-1 opacity-0"
                                enter-to-class="translate-y-0 opacity-100"
                                leave-active-class="transition-all duration-150 ease-in"
                                leave-from-class="translate-y-0 opacity-100"
                                leave-to-class="translate-y-1 opacity-0"
                            >
                                <div
                                    v-if="activeDropdown === link.label"
                                    class="absolute left-0 top-full z-50 pt-2"
                                    role="menu"
                                    :aria-label="`${link.label} menu`"
                                    @mouseenter="cancelClose"
                                    @mouseleave="scheduleClose"
                                >
                                    <div
                                        class="min-w-[260px] overflow-hidden rounded-xl border border-divider bg-white shadow-xl"
                                    >
                                        <div class="px-2 py-2">
                                            <p
                                                class="px-3 pb-1 pt-1.5 font-body text-[11px] font-semibold uppercase tracking-wider text-subtle"
                                            >
                                                {{ link.label }}
                                            </p>
                                            <a
                                                v-for="item in link.dropdown"
                                                :key="item.href"
                                                :href="item.href"
                                                role="menuitem"
                                                class="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                                                @click="closeAllDropdowns"
                                            >
                                                <div
                                                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-light"
                                                >
                                                    <component
                                                        :is="item.icon"
                                                        v-if="item.icon"
                                                        :size="18"
                                                        class="text-primary"
                                                    />
                                                </div>
                                                <div class="flex min-w-0 flex-col gap-0.5">
                                                    <span
                                                        class="font-body text-sm font-medium text-foreground"
                                                    >
                                                        {{ item.label }}
                                                    </span>
                                                    <span
                                                        v-if="item.description"
                                                        class="font-body text-xs text-subtle"
                                                    >
                                                        {{ item.description }}
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>

                        <!-- Plain link -->
                        <a
                            v-else
                            :href="link.href"
                            class="rounded-md px-3 py-2 font-body text-sm font-medium text-secondary transition-colors hover:bg-surface hover:text-foreground"
                        >
                            {{ link.label }}
                        </a>
                    </template>
                </div>
            </div>

            <!-- Desktop Actions -->
            <div class="hidden items-center gap-3 md:flex">
                <LocaleSwitcher />
                <div class="mx-0.5 h-5 w-px bg-divider" aria-hidden="true" />
                <button
                    aria-label="Open search"
                    :aria-expanded="searchOpen"
                    class="flex h-10 w-10 items-center justify-center rounded-md text-secondary transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    @click="openSearch"
                >
                    <Search :size="20" />
                </button>
                <Button variant="ghost" to="/login" @click="handleNavigation">{{
                    t("nav.login")
                }}</Button>
                <Button variant="primary" to="/register" @click="handleNavigation">{{
                    t("nav.freeTrial")
                }}</Button>
            </div>

            <!-- Mobile Actions -->
            <div class="flex items-center gap-2 md:hidden">
                <button
                    aria-label="Open search"
                    :aria-expanded="searchOpen"
                    class="flex h-11 w-11 items-center justify-center rounded-md text-secondary transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    @click="openSearch"
                >
                    <Search :size="20" />
                </button>
                <button
                    aria-label="Toggle menu"
                    :aria-expanded="mobileMenuOpen"
                    class="flex h-11 w-11 items-center justify-center rounded-md text-secondary transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    @click="mobileMenuOpen = !mobileMenuOpen"
                >
                    <Menu v-if="!mobileMenuOpen" :size="24" />
                    <X v-else :size="24" />
                </button>
            </div>
        </div>

        <!-- Mobile Menu Overlay -->
        <Transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="mobileMenuOpen"
                class="fixed inset-0 top-[73px] z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
                @click="closeMobileMenu"
            />
        </Transition>

        <!-- Mobile Menu Panel -->
        <Transition
            enter-active-class="transition-transform duration-300"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition-transform duration-300"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
        >
            <div
                v-if="mobileMenuOpen"
                class="fixed right-0 top-[73px] z-50 h-[calc(100vh-73px)] w-full max-w-sm overflow-y-auto border-l border-divider bg-white shadow-2xl md:hidden"
            >
                <!-- Mobile Navigation Links -->
                <div class="flex flex-col gap-0.5 border-b border-divider p-4">
                    <template v-for="link in links" :key="link.label">
                        <!-- Accordion item with dropdown -->
                        <div v-if="link.dropdown">
                            <button
                                class="flex w-full items-center justify-between rounded-md px-4 py-3 font-body text-base font-medium text-secondary transition-colors hover:bg-surface hover:text-foreground"
                                :aria-expanded="mobileActiveAccordion === link.label"
                                @click="toggleMobileAccordion(link.label)"
                            >
                                {{ link.label }}
                                <ChevronDown
                                    :size="16"
                                    class="shrink-0 transition-transform duration-200"
                                    :class="{ 'rotate-180': mobileActiveAccordion === link.label }"
                                />
                            </button>

                            <!-- Accordion content -->
                            <Transition
                                enter-active-class="transition-all duration-200 ease-out"
                                enter-from-class="opacity-0 -translate-y-1"
                                enter-to-class="opacity-100 translate-y-0"
                                leave-active-class="transition-all duration-150 ease-in"
                                leave-from-class="opacity-100 translate-y-0"
                                leave-to-class="opacity-0 -translate-y-1"
                            >
                                <div
                                    v-if="mobileActiveAccordion === link.label"
                                    class="mt-0.5 flex flex-col gap-0.5 pl-2"
                                >
                                    <a
                                        v-for="item in link.dropdown"
                                        :key="item.href"
                                        :href="item.href"
                                        class="flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors hover:bg-surface"
                                        @click="closeMobileMenu"
                                    >
                                        <div
                                            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-light"
                                        >
                                            <component
                                                :is="item.icon"
                                                v-if="item.icon"
                                                :size="16"
                                                class="text-primary"
                                            />
                                        </div>
                                        <div class="flex min-w-0 flex-col gap-0.5">
                                            <span
                                                class="font-body text-sm font-medium text-foreground"
                                            >
                                                {{ item.label }}
                                            </span>
                                            <span
                                                v-if="item.description"
                                                class="font-body text-xs text-subtle"
                                            >
                                                {{ item.description }}
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </Transition>
                        </div>

                        <!-- Plain link -->
                        <a
                            v-else
                            :href="link.href"
                            class="rounded-md px-4 py-3 font-body text-base font-medium text-secondary transition-colors hover:bg-surface hover:text-foreground"
                            @click="closeMobileMenu"
                        >
                            {{ link.label }}
                        </a>
                    </template>
                </div>

                <!-- Mobile Action Buttons -->
                <div class="flex flex-col gap-3 p-6">
                    <Button variant="ghost" full-width to="/login" @click="handleNavigation">{{
                        t("nav.login")
                    }}</Button>
                    <Button variant="primary" full-width to="/register" @click="handleNavigation">{{
                        t("nav.freeTrial")
                    }}</Button>
                </div>

                <!-- Mobile Locale Switcher -->
                <div
                    class="mt-auto flex items-center justify-center gap-2 border-t border-divider px-6 py-4"
                >
                    <LocaleSwitcher />
                </div>
            </div>
        </Transition>

        <!-- Search Overlay -->
        <Transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="searchOpen"
                class="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm"
                aria-label="Search overlay"
            >
                <div class="flex min-h-screen items-start justify-center px-4 pt-20 sm:pt-32">
                    <Transition
                        enter-active-class="transition-all duration-300"
                        enter-from-class="scale-95 opacity-0"
                        enter-to-class="scale-100 opacity-100"
                        leave-active-class="transition-all duration-200"
                        leave-from-class="scale-100 opacity-100"
                        leave-to-class="scale-95 opacity-0"
                    >
                        <div
                            v-if="searchOpen"
                            ref="searchContainerRef"
                            class="w-full max-w-2xl rounded-lg border border-divider bg-white shadow-2xl"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="search-title"
                        >
                            <form @submit="handleSearch">
                                <div class="flex items-center gap-3 border-b border-divider p-4">
                                    <Search :size="20" class="flex-shrink-0 text-secondary" />
                                    <input
                                        ref="searchInput"
                                        v-model="searchQuery"
                                        type="search"
                                        :placeholder="t('nav.search.placeholder')"
                                        aria-label="Search input"
                                        class="flex-1 bg-transparent font-body text-base text-foreground placeholder-secondary focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        aria-label="Close search"
                                        class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-secondary transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                        @click="closeSearch"
                                    >
                                        <X :size="18" />
                                    </button>
                                </div>

                                <div class="p-4">
                                    <p
                                        v-if="!searchQuery"
                                        class="text-center text-sm text-secondary"
                                    >
                                        {{ t("nav.search.startTyping") }}
                                    </p>
                                    <div v-else class="space-y-2">
                                        <p class="text-sm text-secondary">
                                            {{ t("nav.search.searchingFor") }} "{{ searchQuery }}"
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Transition>
                </div>
            </div>
        </Transition>
    </nav>
</template>
