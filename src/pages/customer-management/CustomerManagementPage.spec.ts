import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import CustomerManagementPage from "./CustomerManagementPage.vue";

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

const renderPage = () => render(CustomerManagementPage, { global: { plugins: [router] } });

describe("CustomerManagementPage", () => {
    it("renders the CTA link pointing to /demo", () => {
        renderPage();
        const cta = screen.getByRole("link", {
            name: /probar gestión de clientes|try client management/i,
        });
        expect(cta).toBeTruthy();
        expect(cta.getAttribute("href")).toBe("/demo");
    });
});
