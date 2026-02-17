import { ref, watch, onMounted, onUnmounted, nextTick, type Ref } from "vue";

export interface UseSearchOptions {
    onSearch?: (query: string) => void;
    onClose?: () => void;
    debounceMs?: number;
}

export interface UseSearchReturn {
    searchOpen: Ref<boolean>;
    searchQuery: Ref<string>;
    searchInputRef: Ref<HTMLInputElement | null>;
    searchButtonRef: Ref<HTMLButtonElement | null>;
    toggleSearch: () => void;
    openSearch: () => void;
    closeSearch: () => void;
    clearSearch: () => void;
    handleSearchSubmit: () => void;
}

/**
 * Composable for managing search state and interactions
 * Handles: open/close state, focus management, keyboard events, outside clicks
 */
export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
    const { onSearch, onClose, debounceMs = 0 } = options;

    // State
    const searchOpen = ref(false);
    const searchQuery = ref("");
    const searchInputRef = ref<HTMLInputElement | null>(null);
    const searchButtonRef = ref<HTMLButtonElement | null>(null);

    // Debounced search query (optional)
    let searchTimeout: ReturnType<typeof setTimeout> | null = null;

    // Toggle search visibility
    const toggleSearch = () => {
        if (searchOpen.value) {
            closeSearch();
        } else {
            openSearch();
        }
    };

    // Open search and focus input
    const openSearch = async () => {
        searchOpen.value = true;
        await nextTick();
        searchInputRef.value?.focus();
    };

    // Close search and return focus to button
    const closeSearch = () => {
        searchOpen.value = false;
        searchQuery.value = "";
        onClose?.();

        // Return focus to search button
        nextTick(() => {
            searchButtonRef.value?.focus();
        });
    };

    // Clear search input
    const clearSearch = () => {
        searchQuery.value = "";
        searchInputRef.value?.focus();
    };

    // Handle search submission
    const handleSearchSubmit = () => {
        if (searchQuery.value.trim()) {
            onSearch?.(searchQuery.value.trim());
        }
    };

    // Handle keyboard events
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && searchOpen.value) {
            event.preventDefault();
            closeSearch();
        }
    };

    // Handle outside clicks
    const handleClickOutside = (event: MouseEvent) => {
        if (!searchOpen.value) return;

        const target = event.target as HTMLElement;
        const searchContainer = searchInputRef.value?.closest("[data-search-container]");
        const searchButton = searchButtonRef.value;

        // Close if click is outside search container and button
        if (
            searchContainer &&
            !searchContainer.contains(target) &&
            searchButton &&
            !searchButton.contains(target)
        ) {
            closeSearch();
        }
    };

    // Watch search query for debounced search
    if (debounceMs > 0 && onSearch) {
        watch(searchQuery, (newQuery) => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }

            if (newQuery.trim()) {
                searchTimeout = setTimeout(() => {
                    onSearch(newQuery.trim());
                }, debounceMs);
            }
        });
    }

    // Prevent body scroll when search is open (mobile)
    watch(searchOpen, (isOpen) => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    // Setup event listeners
    onMounted(() => {
        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("click", handleClickOutside);
    });

    // Cleanup
    onUnmounted(() => {
        document.removeEventListener("keydown", handleKeydown);
        document.removeEventListener("click", handleClickOutside);

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Restore body scroll
        document.body.style.overflow = "";
    });

    return {
        searchOpen,
        searchQuery,
        searchInputRef,
        searchButtonRef,
        toggleSearch,
        openSearch,
        closeSearch,
        clearSearch,
        handleSearchSubmit,
    };
}
