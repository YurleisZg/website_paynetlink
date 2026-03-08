import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import { Users, CreditCard } from "lucide-vue-next";
import Navbar from "./Navbar.vue";
import type { NavLink } from "./Navbar.vue";

// Helper to get first element from array (for TypeScript safety)
const getFirstElement = <T>(arr: T[]): T => {
    if (arr.length === 0) throw new Error("Expected at least one element");
    return arr[0] as T;
};

// Create mock router for testing
const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", name: "home", component: { template: "<div>Home</div>" } },
        { path: "/login", name: "login", component: { template: "<div>Login</div>" } },
        { path: "/register", name: "register", component: { template: "<div>Register</div>" } },
    ],
});

// Helper function for rendering Navbar with router
const renderNavbar = (options: { props?: { links?: NavLink[] } } = {}) => {
    return render(Navbar, {
        props: options.props || { links: [] },
        global: { plugins: [router] },
    });
};

describe("Navbar", () => {
    const mockNavLinks: NavLink[] = [
        { label: "Productos", href: "#productos" },
        { label: "Soluciones", href: "#soluciones" },
        { label: "Precios", href: "#precios" },
    ];

    beforeEach(() => {
        document.body.style.overflow = "";
    });

    afterEach(() => {
        document.body.style.overflow = "";
    });

    describe("Basic Rendering", () => {
        it("renders the logo with a home link", () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const logoLink = screen.getByLabelText(/PayNetLink/i);
            expect(logoLink).toBeDefined();
            expect(logoLink.getAttribute("href")).toBe("/");
        });

        it("shows hamburger menu button on mobile", () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const menuButton = screen.getByLabelText("Toggle menu");
            expect(menuButton).toBeDefined();
        });
    });

    describe("Mobile Menu Functionality", () => {
        it("toggles mobile menu when hamburger is clicked", async () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const menuButton = screen.getByLabelText("Toggle menu");

            expect(screen.queryByRole("navigation", { name: /mobile/i })).toBeNull();

            await fireEvent.click(menuButton);

            expect(document.body.style.overflow).toBe("hidden");
        });

        it("closes mobile menu when clicking outside", async () => {
            const { container } = renderNavbar({ props: { links: mockNavLinks } });

            const menuButton = screen.getByLabelText("Toggle menu");

            await fireEvent.click(menuButton);
            expect(document.body.style.overflow).toBe("hidden");

            const overlay =
                container.querySelector('[data-testid="menu-overlay"]') ||
                container.querySelector(".fixed.inset-0");
            if (overlay) {
                await fireEvent.click(overlay);
            }

            expect(document.body.style.overflow).toBe("");
        });
    });

    describe("Search Functionality", () => {
        it("opens search overlay when search button is clicked", async () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));

            expect(screen.queryByLabelText("Search overlay")).toBeNull();

            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(screen.getByLabelText("Search overlay")).toBeDefined();
            });
        });

        it("search input receives focus when opened", async () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;
                expect(document.activeElement).toBe(searchInput);
            });
        });

        it("search query is reactive (v-model binding)", async () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(async () => {
                const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;
                await fireEvent.update(searchInput, "test query");
                expect(searchInput.value).toBe("test query");
            });
        });

        it("ESC key closes search overlay", async () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(screen.getByLabelText("Search overlay")).toBeDefined();
            });

            await fireEvent.keyDown(document, { key: "Escape" });

            await waitFor(() => {
                expect(screen.queryByLabelText("Search overlay")).toBeNull();
            });
        });

        it("close button closes search overlay", async () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(async () => {
                const closeButton = screen.getByLabelText("Close search");
                await fireEvent.click(closeButton);
            });

            await waitFor(() => {
                expect(screen.queryByLabelText("Search overlay")).toBeNull();
            });
        });

        it("click outside closes search overlay", async () => {
            const { container } = renderNavbar({ props: { links: mockNavLinks } });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(screen.getByLabelText("Search overlay")).toBeDefined();
            });

            const overlay = container.querySelector('[aria-label="Search overlay"]');
            if (overlay) {
                await fireEvent.mouseDown(overlay);
            }

            await waitFor(() => {
                expect(screen.queryByLabelText("Search overlay")).toBeNull();
            });
        });

        it("search query is cleared when search is closed", async () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(async () => {
                const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;
                await fireEvent.update(searchInput, "test query");
                expect(searchInput.value).toBe("test query");

                const closeButton = screen.getByLabelText("Close search");
                await fireEvent.click(closeButton);
            });

            await fireEvent.click(searchButton);

            await waitFor(() => {
                const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;
                expect(searchInput.value).toBe("");
            });
        });

        it("prevents body scroll when search is open", async () => {
            renderNavbar({ props: { links: mockNavLinks } });

            expect(document.body.style.overflow).toBe("");

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(document.body.style.overflow).toBe("hidden");
            });

            const closeButton = screen.getByLabelText("Close search");
            await fireEvent.click(closeButton);

            await waitFor(() => {
                expect(document.body.style.overflow).toBe("");
            });
        });

        it("search button has proper aria-expanded attribute", async () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));

            expect(searchButton.getAttribute("aria-expanded")).toBe("false");

            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(searchButton.getAttribute("aria-expanded")).toBe("true");
            });

            const closeButton = screen.getByLabelText("Close search");
            await fireEvent.click(closeButton);

            await waitFor(() => {
                expect(searchButton.getAttribute("aria-expanded")).toBe("false");
            });
        });

        it("displays search query feedback", async () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(async () => {
                const searchInput = screen.getByLabelText("Search input") as HTMLInputElement;
                await fireEvent.update(searchInput, "test query");

                expect(screen.getByText('Buscando: "test query"')).toBeDefined();
            });
        });
    });

    describe("Accessibility", () => {
        it("has proper accessibility attributes for navigation", () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const nav = screen.getByRole("navigation", { name: "Main navigation" });
            expect(nav).toBeDefined();
        });
    });

    describe("Dropdown Menu Functionality", () => {
        const navLinksWithDropdown: NavLink[] = [
            {
                label: "Products",
                dropdown: [
                    {
                        label: "Customer Management",
                        description: "Register clients",
                        href: "#clients",
                        icon: Users,
                    },
                    {
                        label: "Payments",
                        description: "Automate billing",
                        href: "#billing",
                        icon: CreditCard,
                    },
                ],
            },
            { label: "Pricing", href: "#pricing" },
        ];

        it("renders dropdown trigger button for nav items with dropdown", () => {
            renderNavbar({ props: { links: navLinksWithDropdown } });

            const trigger = screen.getByRole("button", { name: /products/i });
            expect(trigger).toBeDefined();
        });

        it("dropdown trigger has aria-expanded false by default", () => {
            renderNavbar({ props: { links: navLinksWithDropdown } });

            const trigger = screen.getByRole("button", { name: /products/i });
            expect(trigger.getAttribute("aria-expanded")).toBe("false");
        });

        it("opens dropdown when trigger is clicked", async () => {
            renderNavbar({ props: { links: navLinksWithDropdown } });

            const trigger = screen.getByRole("button", { name: /products/i });
            await fireEvent.click(trigger);

            await waitFor(() => {
                expect(screen.getByRole("menu", { name: /products menu/i })).toBeDefined();
            });
        });

        it("aria-expanded updates to true when dropdown is open", async () => {
            renderNavbar({ props: { links: navLinksWithDropdown } });

            const trigger = screen.getByRole("button", { name: /products/i });
            await fireEvent.click(trigger);

            await waitFor(() => {
                expect(trigger.getAttribute("aria-expanded")).toBe("true");
            });
        });

        it("renders dropdown items when dropdown is open", async () => {
            renderNavbar({ props: { links: navLinksWithDropdown } });

            const trigger = screen.getByRole("button", { name: /products/i });
            await fireEvent.click(trigger);

            await waitFor(() => {
                expect(
                    screen.getByRole("menuitem", { name: /customer management/i })
                ).toBeDefined();
                expect(screen.getByRole("menuitem", { name: /payments/i })).toBeDefined();
            });
        });

        it("closes dropdown when trigger is clicked again", async () => {
            renderNavbar({ props: { links: navLinksWithDropdown } });

            const trigger = screen.getByRole("button", { name: /products/i });

            await fireEvent.click(trigger);
            await waitFor(() => {
                expect(screen.getByRole("menu", { name: /products menu/i })).toBeDefined();
            });

            await fireEvent.click(trigger);
            await waitFor(() => {
                expect(screen.queryByRole("menu", { name: /products menu/i })).toBeNull();
            });
        });

        it("closes dropdown on Escape key", async () => {
            renderNavbar({ props: { links: navLinksWithDropdown } });

            const trigger = screen.getByRole("button", { name: /products/i });
            await fireEvent.click(trigger);

            await waitFor(() => {
                expect(screen.getByRole("menu", { name: /products menu/i })).toBeDefined();
            });

            await fireEvent.keyDown(document, { key: "Escape" });

            await waitFor(() => {
                expect(screen.queryByRole("menu", { name: /products menu/i })).toBeNull();
            });
        });

        it("renders mobile accordion for dropdown items in mobile menu", async () => {
            renderNavbar({ props: { links: navLinksWithDropdown } });

            const menuButton = screen.getByLabelText("Toggle menu");
            await fireEvent.click(menuButton);

            await waitFor(() => {
                const accordionButtons = screen.getAllByRole("button", { name: /products/i });
                expect(accordionButtons.length).toBeGreaterThan(0);
            });
        });

        it("expands accordion in mobile menu when clicked", async () => {
            renderNavbar({ props: { links: navLinksWithDropdown } });

            const menuButton = screen.getByLabelText("Toggle menu");
            await fireEvent.click(menuButton);

            await waitFor(async () => {
                const allProductButtons = screen.getAllByRole("button", { name: /products/i });
                const accordionBtn = allProductButtons.find(
                    (btn) => btn.getAttribute("aria-expanded") !== null
                );
                expect(accordionBtn).toBeDefined();

                if (accordionBtn) {
                    expect(accordionBtn.getAttribute("aria-expanded")).toBe("false");
                    await fireEvent.click(accordionBtn);
                    expect(accordionBtn.getAttribute("aria-expanded")).toBe("true");
                }
            });
        });
    });

    describe("Edge Cases", () => {
        it("handles multiple rapid clicks on search button", async () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));

            await fireEvent.click(searchButton);
            await fireEvent.click(searchButton);
            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(screen.getByLabelText("Search overlay")).toBeDefined();
            });
        });

        it("restores body overflow on unmount", () => {
            const { unmount } = renderNavbar({ props: { links: mockNavLinks } });

            document.body.style.overflow = "hidden";

            unmount();

            expect(document.body.style.overflow).toBe("");
        });

        it("handles both mobile menu and search open simultaneously", async () => {
            renderNavbar({ props: { links: mockNavLinks } });

            const menuButton = screen.getByLabelText("Toggle menu");
            await fireEvent.click(menuButton);

            expect(document.body.style.overflow).toBe("hidden");

            const searchButton = getFirstElement(screen.getAllByLabelText("Open search"));
            await fireEvent.click(searchButton);

            await waitFor(() => {
                expect(screen.getByLabelText("Search overlay")).toBeDefined();
                expect(document.body.style.overflow).toBe("hidden");
            });
        });
    });
});
