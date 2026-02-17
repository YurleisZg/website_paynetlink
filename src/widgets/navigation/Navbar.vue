<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { Logo, Button } from "@/shared/ui";
import { Search, Menu, X } from "lucide-vue-next";

defineOptions({ name: "AppNavbar" });

export interface NavLink {
    label: string;
    href: string;
}

withDefaults(
    defineProps<{
        links?: NavLink[];
    }>(),
    {
        links: () => [],
    }
);

const mobileMenuOpen = ref(false);
const searchOpen = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);
const searchQuery = ref("");
const searchContainerRef = ref<HTMLDivElement | null>(null);

// Close mobile menu when clicking outside or on a link
const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
};

// Open search overlay and focus input
const openSearch = async () => {
    searchOpen.value = true;
    await nextTick();
    searchInput.value?.focus();
};

// Close search overlay and clear query
const closeSearch = () => {
    searchOpen.value = false;
    searchQuery.value = "";
};

// Handle search submission
const handleSearch = (event: Event) => {
    event.preventDefault();
    if (searchQuery.value.trim()) {
        console.log("Search query:", searchQuery.value);
        // TODO: Implement actual search logic
    }
};

// Handle ESC key to close search
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && searchOpen.value) {
        closeSearch();
    }
};

// Handle click outside search container
const handleClickOutside = (event: MouseEvent) => {
    if (
        searchOpen.value &&
        searchContainerRef.value &&
        !searchContainerRef.value.contains(event.target as Node)
    ) {
        closeSearch();
    }
};

// Prevent body scroll when mobile menu or search is open
watch([mobileMenuOpen, searchOpen], ([menuOpen, searchIsOpen]) => {
    if (menuOpen || searchIsOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
});

// Add/remove event listeners
onMounted(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("mousedown", handleClickOutside);
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
            class="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-0 sm:px-6 lg:px-20"
        >
            <!-- Logo and Desktop Navigation -->
            <div class="flex items-center gap-8 lg:gap-10">
                <Logo size="sm" role="img" aria-label="PayNetLink" />

                <!-- Desktop Navigation Links -->
                <div class="hidden items-center gap-6 lg:flex lg:gap-8">
                    <a
                        v-for="link in links"
                        :key="link.label"
                        :href="link.href"
                        class="font-body text-sm font-medium text-secondary transition-colors hover:text-foreground"
                    >
                        {{ link.label }}
                    </a>
                </div>
            </div>

            <!-- Desktop Actions -->
            <div class="hidden items-center gap-3 md:flex">
                <button
                    aria-label="Open search"
                    :aria-expanded="searchOpen"
                    class="flex h-10 w-10 items-center justify-center rounded-md text-secondary transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    @click="openSearch"
                >
                    <Search :size="20" />
                </button>
                <Button variant="ghost">Iniciar sesión</Button>
                <Button variant="primary">Prueba gratis</Button>
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
                <div class="flex flex-col gap-1 border-b border-divider p-6">
                    <a
                        v-for="link in links"
                        :key="link.label"
                        :href="link.href"
                        class="rounded-md px-4 py-3 font-body text-base font-medium text-secondary transition-colors hover:bg-surface hover:text-foreground"
                        @click="closeMobileMenu"
                    >
                        {{ link.label }}
                    </a>
                </div>

                <!-- Mobile Action Buttons -->
                <div class="flex flex-col gap-3 p-6">
                    <Button variant="ghost" full-width>Iniciar sesión</Button>
                    <Button variant="primary" full-width>Prueba gratis</Button>
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
                                        placeholder="Search..."
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
                                        Start typing to search...
                                    </p>
                                    <div v-else class="space-y-2">
                                        <p class="text-sm text-secondary">
                                            Searching for: "{{ searchQuery }}"
                                        </p>
                                        <!-- TODO: Add search results here -->
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
