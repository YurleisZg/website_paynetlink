import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import PaymentModulePage from "./PaymentModulePage.vue";

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

const renderPage = () => render(PaymentModulePage, { global: { plugins: [router] } });

describe("PaymentModulePage", () => {
    it("renders the page title heading", () => {
        renderPage();
        expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    });

    it("renders the badge with product name", () => {
        renderPage();
        const badges = screen.getAllByText(/pagos y recaudo|payments and collections/i);
        expect(badges.length).toBeGreaterThan(0);
    });

    it("renders the subtitle text", () => {
        renderPage();
        expect(screen.getByText(/automatiza cobros|automate recurring/i)).toBeTruthy();
    });

    it("renders the CTA link pointing to /demo", () => {
        renderPage();
        const cta = screen.getByRole("link", {
            name: /probar módulo de pagos|try payment module/i,
        });
        expect(cta).toBeTruthy();
        expect(cta.getAttribute("href")).toBe("/demo");
    });

    it("renders the screenshot image", () => {
        renderPage();
        const img = screen.getByRole("img");
        expect(img).toBeTruthy();
        expect(img.getAttribute("src")).toContain("payment-module");
    });

    it("renders all 4 feature headings", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /cobros recurrentes|recurring collections/i })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: /múltiples canales|multiple channels/i })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: /control de mora|delinquency control/i })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: /reconciliación|reconciliation/i })
        ).toBeTruthy();
    });

    it("renders 4 feature cards", () => {
        renderPage();
        expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(4);
    });

    it("hero section is labelled by the page heading", () => {
        renderPage();
        expect(document.querySelector("[aria-labelledby='payment-module-heading']")).toBeTruthy();
    });

    it("renders the navbar", () => {
        renderPage();
        expect(screen.getByTestId("navbar")).toBeTruthy();
    });

    it("renders the footer", () => {
        renderPage();
        expect(screen.getByTestId("footer")).toBeTruthy();
    });
});
