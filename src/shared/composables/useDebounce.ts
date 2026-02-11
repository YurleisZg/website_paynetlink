import { ref, watch, type Ref } from "vue";

/**
 * Returns a debounced ref that updates after the given delay when the source changes.
 */
export function useDebounce<T>(source: Ref<T>, delayMs: number): Ref<T> {
    const debounced = ref(source.value) as Ref<T>;
    watch(source, (value, _oldValue, onCleanup) => {
        const id = setTimeout(() => {
            debounced.value = value;
        }, delayMs);
        onCleanup(() => clearTimeout(id));
    });
    return debounced;
}
