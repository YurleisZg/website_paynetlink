# useSearch Composable

A reusable Vue 3 composable for managing search functionality with focus management, keyboard shortcuts, and outside click detection.

## Features

- Toggle search visibility
- Auto-focus input when opened
- Return focus to button when closed
- ESC key to close
- Click outside to close
- Enter key to submit search
- Clear search functionality
- Optional debounced search
- Prevent body scroll when open
- TypeScript support

## Basic Usage

```typescript
import { useSearch } from "@/shared/composables";

const {
    searchOpen,
    searchQuery,
    searchInputRef,
    searchButtonRef,
    toggleSearch,
    closeSearch,
    clearSearch,
    handleSearchSubmit,
} = useSearch({
    onSearch: (query) => {
        console.log("Search for:", query);
    },
    onClose: () => {
        console.log("Search closed");
    },
});
```

## Template Example

```vue
<template>
    <!-- Search Button -->
    <button
        ref="searchButtonRef"
        aria-label="Search"
        :aria-expanded="searchOpen"
        @click="toggleSearch"
    >
        <Search :size="20" />
    </button>

    <!-- Search Overlay -->
    <div v-if="searchOpen" @click="closeSearch">
        <div data-search-container @click.stop>
            <input
                ref="searchInputRef"
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                @keydown.enter="handleSearchSubmit"
            />
            <button v-if="searchQuery" @click="clearSearch">Clear</button>
        </div>
    </div>
</template>
```

## API

### Options

```typescript
export interface UseSearchOptions {
    onSearch?: (query: string) => void; // Called when search is submitted
    onClose?: () => void; // Called when search is closed
    debounceMs?: number; // Debounce search input (default: 0)
}
```

### Return Value

```typescript
export interface UseSearchReturn {
    // State
    searchOpen: Ref<boolean>; // Whether search is open
    searchQuery: Ref<string>; // Current search query

    // Template refs
    searchInputRef: Ref<HTMLInputElement | null>; // Ref for search input
    searchButtonRef: Ref<HTMLButtonElement | null>; // Ref for search button

    // Methods
    toggleSearch: () => void; // Toggle search visibility
    openSearch: () => void; // Open search and focus input
    closeSearch: () => void; // Close search and clear query
    clearSearch: () => void; // Clear query but keep open
    handleSearchSubmit: () => void; // Submit search (trim and call onSearch)
}
```

## Advanced Features

### Debounced Search

Automatically call `onSearch` after user stops typing:

```typescript
const { searchQuery } = useSearch({
    onSearch: (query) => {
        // Called 300ms after user stops typing
        fetchSearchResults(query);
    },
    debounceMs: 300,
});
```

### Manual Search Submission

Only search when user presses Enter:

```typescript
const { handleSearchSubmit } = useSearch({
    onSearch: (query) => {
        // Only called when user presses Enter
        fetchSearchResults(query);
    },
});

// In template:
// <input @keydown.enter="handleSearchSubmit" />
```

### Focus Management

The composable automatically handles focus:

1. **On Open**: Focuses the search input
2. **On Close**: Returns focus to the search button
3. **ESC Key**: Closes search and returns focus
4. **Outside Click**: Closes search and returns focus

### Accessibility

The composable is designed with accessibility in mind:

- Use `data-search-container` attribute on the search container
- Set `aria-expanded` on the search button
- Set `aria-label` on the search button and overlay
- Focus management follows ARIA practices

## Example: Navbar with Search

See `/Users/oscles/Projects/website_paynetlink/src/widgets/navigation/Navbar.vue` for a complete implementation example.

## Testing

The composable is fully tested with 13 unit tests covering:

- State initialization
- Toggle functionality
- Open/close behavior
- Focus management
- Keyboard shortcuts
- Debounced search
- Body scroll prevention
- Cleanup on unmount

Run tests:

```bash
pnpm run test:run src/shared/composables/useSearch.spec.ts
```

## Browser Support

- Modern browsers with ES2015+ support
- Vue 3.5+
- TypeScript 5.9+
