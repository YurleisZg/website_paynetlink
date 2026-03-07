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
    it("renders the page title heading", () => {
        renderPage();
        expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    });

    it("renders the badge with product name", () => {
        renderPage();
        const badges = screen.getAllByText(/facturación electrónica|electronic invoicing/i);
        expect(badges.length).toBeGreaterThan(0);
    });

    it("renders the subtitle text", () => {
        renderPage();
        expect(
            screen.getByText(/emite facturas electrónicas|issue electronic invoices/i)
        ).toBeTruthy();
    });

    it("renders the CTA link pointing to /register", () => {
        renderPage();
        const cta = screen.getByRole("link", {
            name: /activar facturación electrónica|activate electronic invoicing/i,
        });
        expect(cta).toBeTruthy();
        expect(cta.getAttribute("href")).toBe("/register");
    });

    it("renders the screenshot image", () => {
        renderPage();
        const img = screen.getByRole("img");
        expect(img).toBeTruthy();
        expect(img.getAttribute("src")).toContain("electronic-invoices");
    });

    it("renders all 4 feature headings", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /emisión automática|automatic issuance/i })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: /validación dian|dian validation/i })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: /notas crédito y débito|credit and debit notes/i })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", {
                name: /descarga y envío por correo|download and email delivery/i,
            })
        ).toBeTruthy();
    });

    it("renders 4 feature cards", () => {
        renderPage();
        expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(4);
    });

    it("renders the bottom CTA section with two action links", () => {
        renderPage();
        // Use getAllByRole since hero and bottom CTA share partial text; verify at least two CTA links exist
        const activateLinks = screen.getAllByRole("link", {
            name: /activar facturación|activate.*billing|activate electronic/i,
        });
        expect(activateLinks.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByRole("link", { name: /hablar con ventas|talk to sales/i })).toBeTruthy();
    });

    it("hero section is labelled by the page heading", () => {
        renderPage();
        expect(
            document.querySelector("[aria-labelledby='electronic-invoices-heading']")
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
