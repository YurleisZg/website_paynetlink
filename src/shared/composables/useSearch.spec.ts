import { describe, it, expect, vi } from "vitest";
import { nextTick, defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { useSearch } from "./useSearch";
import type { UseSearchOptions } from "./useSearch";

describe("useSearch", () => {
    const createWrapper = (options?: UseSearchOptions) => {
        return mount(
            defineComponent({
                setup() {
                    const search = useSearch(options);
                    return { ...search };
                },
                render() {
                    return h("div");
                },
            })
        );
    };

    it("should initialize with correct default values", () => {
        const wrapper = createWrapper();

        expect(wrapper.vm.searchOpen).toBe(false);
        expect(wrapper.vm.searchQuery).toBe("");

        wrapper.unmount();
    });

    it("should toggle search state", async () => {
        const wrapper = createWrapper();

        expect(wrapper.vm.searchOpen).toBe(false);

        wrapper.vm.toggleSearch();
        await nextTick();
        expect(wrapper.vm.searchOpen).toBe(true);

        wrapper.vm.toggleSearch();
        await nextTick();
        expect(wrapper.vm.searchOpen).toBe(false);

        wrapper.unmount();
    });

    it("should open and close search", async () => {
        const wrapper = createWrapper();

        await wrapper.vm.openSearch();
        expect(wrapper.vm.searchOpen).toBe(true);

        wrapper.vm.closeSearch();
        await nextTick();
        expect(wrapper.vm.searchOpen).toBe(false);

        wrapper.unmount();
    });

    it("should clear query on close", async () => {
        const wrapper = createWrapper();

        await wrapper.vm.openSearch();
        wrapper.vm.searchQuery = "test query";

        wrapper.vm.closeSearch();
        await nextTick();

        expect(wrapper.vm.searchQuery).toBe("");

        wrapper.unmount();
    });

    it("should call onClose callback", async () => {
        const onCloseMock = vi.fn();
        const wrapper = createWrapper({ onClose: onCloseMock });

        await wrapper.vm.openSearch();
        wrapper.vm.closeSearch();
        await nextTick();

        expect(onCloseMock).toHaveBeenCalled();

        wrapper.unmount();
    });

    it("should clear search but keep it open", () => {
        const wrapper = createWrapper();

        wrapper.vm.searchQuery = "test";
        wrapper.vm.clearSearch();

        expect(wrapper.vm.searchQuery).toBe("");

        wrapper.unmount();
    });

    it("should handle search submission", () => {
        const onSearchMock = vi.fn();
        const wrapper = createWrapper({ onSearch: onSearchMock });

        wrapper.vm.searchQuery = "  test query  ";
        wrapper.vm.handleSearchSubmit();

        expect(onSearchMock).toHaveBeenCalledWith("test query");

        wrapper.unmount();
    });

    it("should not search with empty query", () => {
        const onSearchMock = vi.fn();
        const wrapper = createWrapper({ onSearch: onSearchMock });

        wrapper.vm.searchQuery = "   ";
        wrapper.vm.handleSearchSubmit();

        expect(onSearchMock).not.toHaveBeenCalled();

        wrapper.unmount();
    });

    it("should prevent body scroll when open", async () => {
        const wrapper = createWrapper();

        await wrapper.vm.openSearch();
        await nextTick();

        expect(document.body.style.overflow).toBe("hidden");

        wrapper.vm.closeSearch();
        await nextTick();

        expect(document.body.style.overflow).toBe("");

        wrapper.unmount();
    });

    it("should handle ESC key", async () => {
        const wrapper = createWrapper();

        await wrapper.vm.openSearch();
        expect(wrapper.vm.searchOpen).toBe(true);

        const event = new KeyboardEvent("keydown", { key: "Escape" });
        document.dispatchEvent(event);
        await nextTick();

        expect(wrapper.vm.searchOpen).toBe(false);

        wrapper.unmount();
    });

    it("should support debounced search", async () => {
        vi.useFakeTimers();

        const onSearchMock = vi.fn();
        const wrapper = createWrapper({
            onSearch: onSearchMock,
            debounceMs: 300,
        });

        wrapper.vm.searchQuery = "test";
        await nextTick();

        expect(onSearchMock).not.toHaveBeenCalled();

        vi.advanceTimersByTime(300);
        await nextTick();

        expect(onSearchMock).toHaveBeenCalledWith("test");

        wrapper.unmount();
        vi.useRealTimers();
    });

    it("should cancel previous debounced search", async () => {
        vi.useFakeTimers();

        const onSearchMock = vi.fn();
        const wrapper = createWrapper({
            onSearch: onSearchMock,
            debounceMs: 300,
        });

        wrapper.vm.searchQuery = "test1";
        await nextTick();
        vi.advanceTimersByTime(150);

        wrapper.vm.searchQuery = "test2";
        await nextTick();
        vi.advanceTimersByTime(300);
        await nextTick();

        expect(onSearchMock).toHaveBeenCalledWith("test2");
        expect(onSearchMock).toHaveBeenCalledTimes(1);

        wrapper.unmount();
        vi.useRealTimers();
    });

    it("should restore body overflow on unmount", async () => {
        const wrapper = createWrapper();

        await wrapper.vm.openSearch();
        expect(document.body.style.overflow).toBe("hidden");

        wrapper.unmount();
        await nextTick();

        expect(document.body.style.overflow).toBe("");
    });
});
