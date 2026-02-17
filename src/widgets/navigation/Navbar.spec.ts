import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/vue";
import Navbar from "./Navbar.vue";
import type { NavLink } from "./Navbar.vue";

// Helper to get first element from array (for TypeScript safety)
const getFirstElement = <T>(arr: T[]): T => {
    if (arr.length === 0) throw new Error("Expected at least one element");
    return arr[0] as T;
};

describe("Navbar", () => {
    const mockNavLinks: NavLink[] = [
        { label: "Productos", href: "#productos" },
        { label: "Soluciones", href: "#soluciones" },
        { label: "Precios", href: "#precios" },
    ];

    beforeEach(() => {
        // Reset body overflow style before each test
        document.body.style.overflow = "";
    });

    afterEach(() => {
        // Clean up any remaining styles
        document.body.style.overflow = "";
    });

    describe("Basic Rendering", () => {
        it("renders the logo", () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            expect(screen.getByLabelText("PayNetLink")).toBeDefined();
        });

        it("renders desktop navigation links", () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            mockNavLinks.forEach((link) => {
                const links = screen.getAllByText(link.label);
                expect(links.length).toBeGreaterThan(0);
            });
        });

        it("renders action buttons in desktop view", () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const loginButtons = screen.getAllByText("Iniciar sesión");
            const signupButtons = screen.getAllByText("Prueba gratis");

            expect(loginButtons.length).toBeGreaterThan(0);
            expect(signupButtons.length).toBeGreaterThan(0);
        });

        it("shows hamburger menu button on mobile", () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const menuButton = screen.getByLabelText("Toggle menu");
            expect(menuButton).toBeDefined();
        });
    });

    describe("Mobile Menu Functionality", () => {
        it("toggles mobile menu when hamburger is clicked", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const menuButton = screen.getByLabelText("Toggle menu");

            // Mobile menu should not be visible initially
            expect(screen.queryByRole("navigation", { name: /mobile/i })).toBeNull();

            // Click to open menu
            await fireEvent.click(menuButton);

            // Body overflow should be hidden when menu is open
            expect(document.body.style.overflow).toBe("hidden");
        });

        it("closes mobile menu when clicking outside", async () => {
            const { container } = render(Navbar, {
                props: { links: mockNavLinks },
            });

            const menuButton = screen.getByLabelText("Toggle menu");

            // Open menu
            await fireEvent.click(menuButton);
            expect(document.body.style.overflow).toBe("hidden");

            // Click overlay
            const overlay = container.querySelector(".fixed.inset-0");
            if (overlay) {
                await fireEvent.click(overlay);
            }

            // Body overflow should be restored
            expect(document.body.style.overflow).toBe("");
        });
    });

    describe("Search Functionality", () => {
        it("renders search button", () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButtons = screen.getAllByLabelText("Open search");
            expect(searchButtons.length).toBeGreaterThan(0);
        });

        it("opens search overlay when search button is clicked", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            expect(searchButton).toBeDefined();

            if (!searchButton) return;

            // Search overlay should not be visible initially
            expect(screen.queryByLabelText("Search overlay")).toBeNull();

            // Click search button
            await fireEvent.click(searchButton);

            // Search overlay should be visible
            await waitFor(() => {
                expect(screen.getByLabelText("Search overlay")).toBeDefined();
            });
        });

        it("search input is visible when search is open", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                const searchInput = screen.getByLabelText("Search input");
                expect(searchInput).toBeDefined();
            });
        });

        it("search input receives focus when opened", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;
                expect(document.activeElement).toBe(searchInput);
            });
        });

        it("search query is reactive (v-model binding)", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(async () => {
                const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;
                expect(searchInput).toBeDefined();

                // Type in search input
                await fireEvent.update(searchInput, "test query");

                // Check if value is updated
                expect(searchInput.value).toBe("test query");
            });
        });

        it("ESC key closes search overlay", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            // Wait for search overlay to be visible
            await waitFor(() => {
                expect(screen.getByLabelText("Search overlay")).toBeDefined();
            });

            // Press ESC key
            await fireEvent.keyDown(document, { key: "Escape" });

            // Search overlay should be closed
            await waitFor(() => {
                expect(screen.queryByLabelText("Search overlay")).toBeNull();
            });
        });

        it("close button closes search overlay", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(async () => {
                const closeButton = screen.getByLabelText("Close search");
                expect(closeButton).toBeDefined();

                await fireEvent.click(closeButton);
            });

            // Search overlay should be closed
            await waitFor(() => {
                expect(screen.queryByLabelText("Search overlay")).toBeNull();
            });
        });

        it("click outside closes search overlay", async () => {
            const { container } = render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(screen.getByLabelText("Search overlay")).toBeDefined();
            });

            // Click on the overlay backdrop (outside the search container)
            const overlay = container.querySelector('[aria-label="Search overlay"]');
            if (overlay) {
                await fireEvent.mouseDown(overlay);
            }

            // Search overlay should be closed
            await waitFor(() => {
                expect(screen.queryByLabelText("Search overlay")).toBeNull();
            });
        });

        it("search query is cleared when search is closed", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(async () => {
                const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;

                // Type in search input
                await fireEvent.update(searchInput, "test query");
                expect(searchInput.value).toBe("test query");

                // Close search
                const closeButton = screen.getByLabelText("Close search");
                await fireEvent.click(closeButton);
            });

            // Reopen search
            await fireEvent.click(searchButton);

            await waitFor(() => {
                const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;
                expect(searchInput.value).toBe("");
            });
        });

        it("prevents body scroll when search is open", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            expect(document.body.style.overflow).toBe("");

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(document.body.style.overflow).toBe("hidden");
            });

            // Close search
            const closeButton = screen.getByLabelText("Close search");
            await fireEvent.click(closeButton);

            await waitFor(() => {
                expect(document.body.style.overflow).toBe("");
            });
        });

        it("search button has proper aria-expanded attribute", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));

            // Initially false
            expect(searchButton.getAttribute("aria-expanded")).toBe("false");

            // Open search
            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(searchButton.getAttribute("aria-expanded")).toBe("true");
            });

            // Close search
            const closeButton = screen.getByLabelText("Close search");
            await fireEvent.click(closeButton);

            await waitFor(() => {
                expect(searchButton.getAttribute("aria-expanded")).toBe("false");
            });
        });

        it("search overlay has proper dialog attributes", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                const dialog = screen.getByRole("dialog");
                expect(dialog).toBeDefined();
                expect(dialog.getAttribute("aria-modal")).toBe("true");
                expect(dialog.getAttribute("aria-labelledby")).toBe("search-title");
            });
        });

        it("displays placeholder text when search is empty", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(screen.getByText("Start typing to search...")).toBeDefined();
            });
        });

        it("displays search query feedback", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(async () => {
                const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;
                await fireEvent.update(searchInput, "test query");

                expect(screen.getByText('Searching for: "test query"')).toBeDefined();
            });
        });

        it("search form can be submitted", async () => {
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

            const { container } = render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(screen.getByLabelText("Search input")).toBeDefined();
            });

            const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;
            await fireEvent.update(searchInput, "test query");

            // Find the form and submit it
            const form = container.querySelector("form");
            expect(form).not.toBeNull();

            if (form) {
                await fireEvent.submit(form);
            }

            // Verify console.log was called with correct arguments
            expect(consoleSpy).toHaveBeenCalledWith("Search query:", "test query");

            consoleSpy.mockRestore();
        });
    });

    describe("Accessibility", () => {
        it("has proper accessibility attributes for navigation", () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const nav = screen.getByRole("navigation", { name: "Main navigation" });
            expect(nav).toBeDefined();
        });

        it("search button has proper aria-label", () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButtons = screen.getAllByLabelText("Open search");
            expect(searchButtons.length).toBeGreaterThan(0);
        });

        it("menu button has proper aria attributes", () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const menuButton = screen.getByLabelText("Toggle menu");
            expect(menuButton).toBeDefined();
            expect(menuButton.getAttribute("aria-expanded")).toBeDefined();
        });

        it("all interactive elements have focus styles", () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            expect(searchButton.className).toContain("focus-visible:ring");
        });

        it("search input has proper type attribute", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;
                expect(searchInput.type).toBe("search");
            });
        });
    });

    describe("Edge Cases", () => {
        it("handles multiple rapid clicks on search button", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));

            // Rapid clicks
            await fireEvent.click(searchButton);
            await fireEvent.click(searchButton);
            await fireEvent.click(searchButton);

            // Should still open properly
            await waitFor(() => {
                expect(screen.getByLabelText("Search overlay")).toBeDefined();
            });
        });

        it("handles empty search submission", async () => {
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

            render(Navbar, {
                props: { links: mockNavLinks },
            });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(async () => {
                const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;

                // Try to submit without entering anything
                await fireEvent.keyDown(searchInput, { key: "Enter" });

                // Should not trigger search with empty query
                expect(consoleSpy).not.toHaveBeenCalled();
            });

            consoleSpy.mockRestore();
        });

        it("cleans up event listeners on unmount", async () => {
            const addEventListenerSpy = vi.spyOn(document, "addEventListener");
            const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

            const { unmount } = render(Navbar, {
                props: { links: mockNavLinks },
            });

            expect(addEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
            expect(addEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));

            unmount();

            expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
            expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));

            addEventListenerSpy.mockRestore();
            removeEventListenerSpy.mockRestore();
        });

        it("restores body overflow on unmount", () => {
            const { unmount } = render(Navbar, {
                props: { links: mockNavLinks },
            });

            document.body.style.overflow = "hidden";

            unmount();

            expect(document.body.style.overflow).toBe("");
        });

        it("handles both mobile menu and search open simultaneously", async () => {
            render(Navbar, {
                props: { links: mockNavLinks },
            });

            // Open mobile menu
            const menuButton = screen.getByLabelText("Toggle menu");
            await fireEvent.click(menuButton);

            expect(document.body.style.overflow).toBe("hidden");

            // Open search
            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(screen.getByLabelText("Search overlay")).toBeDefined();
                // Body should still have overflow hidden
                expect(document.body.style.overflow).toBe("hidden");
            });
        });
    });
});
