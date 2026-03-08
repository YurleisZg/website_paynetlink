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
    it("renders the CTA link pointing to /demo", () => {
        renderPage();
        const cta = screen.getByRole("link", {
            name: /probar módulo de pagos|try payment module/i,
        });
        expect(cta).toBeTruthy();
        expect(cta.getAttribute("href")).toBe("/demo");
    });
});
