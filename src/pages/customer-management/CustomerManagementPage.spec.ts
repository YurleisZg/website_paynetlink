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
    it("renders the page title heading", () => {
        renderPage();
        expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    });

    it("renders the badge with product name", () => {
        renderPage();
        const badges = screen.getAllByText(/gestión de clientes|customer management/i);
        expect(badges.length).toBeGreaterThan(0);
    });

    it("renders the subtitle text", () => {
        renderPage();
        expect(screen.getByText(/registra, consulta|register, query/i)).toBeTruthy();
    });

    it("renders the CTA link pointing to /demo", () => {
        renderPage();
        const cta = screen.getByRole("link", {
            name: /probar gestión de clientes|try client management/i,
        });
        expect(cta).toBeTruthy();
        expect(cta.getAttribute("href")).toBe("/demo");
    });

    it("renders the screenshot image", () => {
        renderPage();
        const img = screen.getByRole("img");
        expect(img).toBeTruthy();
        expect(img.getAttribute("src")).toContain("customer-management");
    });

    it("renders all 4 feature titles as headings", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /registro rápido|quick registration/i })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: /filtros avanzados|advanced filters/i })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: /historial completo|complete history/i })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: /estados de servicio|service status/i })
        ).toBeTruthy();
    });

    it("renders 4 feature cards", () => {
        renderPage();
        const headings = screen.getAllByRole("heading", { level: 3 });
        expect(headings.length).toBe(4);
    });

    it("hero section is labelled by the page heading", () => {
        renderPage();
        expect(
            document.querySelector("[aria-labelledby='customer-management-heading']")
        ).toBeTruthy();
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
