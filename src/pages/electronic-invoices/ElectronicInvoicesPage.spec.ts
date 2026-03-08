import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import ElectronicInvoicesPage from "./ElectronicInvoicesPage.vue";

vi.mock("@/widgets/navigation", () => ({
    Navbar: { name: "Navbar", template: "<nav data-testid='navbar'></nav>" },
}));

vi.mock("@/widgets/footer", () => ({
    Footer: { name: "Footer", template: "<footer data-testid='footer'></footer>" },
}));

const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", name: "home", component: { template: "<div>Home</div>" } }],
});

const renderPage = () => render(ElectronicInvoicesPage, { global: { plugins: [router] } });

describe("ElectronicInvoicesPage", () => {
    it("renders the CTA link pointing to /register", () => {
        renderPage();
        const cta = screen.getByRole("link", {
            name: /activar facturación electrónica|activate electronic invoicing/i,
        });
        expect(cta).toBeTruthy();
        expect(cta.getAttribute("href")).toBe("/register");
    });

    it("renders the bottom CTA section with two action links", () => {
        renderPage();
        const activateLinks = screen.getAllByRole("link", {
            name: /activar facturación|activate.*billing|activate electronic/i,
        });
        expect(activateLinks.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByRole("link", { name: /hablar con ventas|talk to sales/i })).toBeTruthy();
    });
});
