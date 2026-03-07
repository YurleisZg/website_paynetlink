import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import TermsPage from "./TermsPage.vue";

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

const renderPage = () => render(TermsPage, { global: { plugins: [router] } });

describe("TermsPage", () => {
    it("renders the page title heading", () => {
        renderPage();
        expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    });

    it("renders the last updated date", () => {
        renderPage();
        expect(screen.getByText(/última actualización|last updated/i)).toBeTruthy();
    });

    it("renders the acceptance section", () => {
        renderPage();
        expect(
            screen.getByRole("heading", {
                name: /aceptación de los términos|acceptance of terms/i,
            })
        ).toBeTruthy();
    });

    it("renders the service description section", () => {
        renderPage();
        expect(
            screen.getByRole("heading", {
                name: /descripción del servicio|service description/i,
            })
        ).toBeTruthy();
    });

    it("renders the user accounts section", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /cuentas de usuario|user accounts/i })
        ).toBeTruthy();
    });

    it("renders the payments and billing section", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /pagos y facturación|payments and billing/i })
        ).toBeTruthy();
    });

    it("renders the acceptable use section", () => {
        renderPage();
        expect(screen.getByRole("heading", { name: /uso aceptable|acceptable use/i })).toBeTruthy();
    });

    it("renders the intellectual property section", () => {
        renderPage();
        expect(
            screen.getByRole("heading", {
                name: /propiedad intelectual|intellectual property/i,
            })
        ).toBeTruthy();
    });

    it("renders the limitation of liability section", () => {
        renderPage();
        expect(
            screen.getByRole("heading", {
                name: /limitación de responsabilidad|limitation of liability/i,
            })
        ).toBeTruthy();
    });

    it("renders the termination section", () => {
        renderPage();
        expect(screen.getByRole("heading", { name: /terminación|termination/i })).toBeTruthy();
    });

    it("renders the governing law section", () => {
        renderPage();
        expect(screen.getByRole("heading", { name: /ley aplicable|governing law/i })).toBeTruthy();
    });

    it("renders the contact section", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /^10\. contacto$|^10\. contact$/i })
        ).toBeTruthy();
    });

    it("renders all 10 sections", () => {
        renderPage();
        const headings = screen.getAllByRole("heading", { level: 2 });
        expect(headings.length).toBe(10);
    });

    it("hero section is labelled by the page heading", () => {
        renderPage();
        expect(document.querySelector("[aria-labelledby='terms-heading']")).toBeTruthy();
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
