import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import CustomerSupportPage from "./CustomerSupportPage.vue";

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

const renderPage = () => render(CustomerSupportPage, { global: { plugins: [router] } });

describe("CustomerSupportPage", () => {
    it("renders the page title heading", () => {
        renderPage();
        expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    });

    it("renders the hero title text", () => {
        renderPage();
        expect(screen.getByText(/cómo podemos ayudarte|how can we help/i)).toBeTruthy();
    });

    it("renders the search input", () => {
        renderPage();
        expect(screen.getByRole("searchbox")).toBeTruthy();
    });

    it("renders the resources section heading", () => {
        renderPage();
        expect(
            screen.getByRole("heading", {
                name: /explora nuestros recursos|explore our help resources/i,
            })
        ).toBeTruthy();
    });

    it("renders all 6 category cards", () => {
        renderPage();
        expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(6);
    });

    it("renders getting started category", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /guías de inicio|getting started/i })
        ).toBeTruthy();
    });

    it("renders billing and payments category", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /facturación y pagos|billing and payments/i })
        ).toBeTruthy();
    });

    it("renders network and mikrotik category", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /red y mikrotik|network and mikrotik/i })
        ).toBeTruthy();
    });

    it("renders client management category", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /gestión de clientes|client management/i })
        ).toBeTruthy();
    });

    it("renders notifications category", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /^notificaciones$|^notifications$/i })
        ).toBeTruthy();
    });

    it("renders contact support category", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /contactar soporte|contact support/i })
        ).toBeTruthy();
    });

    it("renders the how it works section heading", () => {
        renderPage();
        expect(
            screen.getByRole("heading", {
                name: /cómo funciona nuestro soporte|how does our support work/i,
            })
        ).toBeTruthy();
    });

    it("renders all 3 how-it-works step headings", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { level: 4, name: /busca tu duda|search your question/i })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", {
                level: 4,
                name: /explora las categorías|explore the categories/i,
            })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", { level: 4, name: /contacta al equipo|contact the team/i })
        ).toBeTruthy();
    });

    it("renders the direct help section heading", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /necesitas ayuda directa|need direct help/i })
        ).toBeTruthy();
    });

    it("renders the contact form heading", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /envíanos un mensaje|send us a message/i })
        ).toBeTruthy();
    });

    it("renders the contact form with all required fields", () => {
        renderPage();
        expect(screen.getByLabelText(/^nombre$|^first name$/i)).toBeTruthy();
        expect(screen.getByLabelText(/^apellido$|^last name$/i)).toBeTruthy();
        expect(screen.getByLabelText(/correo electrónico|email/i)).toBeTruthy();
        expect(screen.getByLabelText(/^asunto$|^subject$/i)).toBeTruthy();
        expect(screen.getByLabelText(/^mensaje$|^message$/i)).toBeTruthy();
    });

    it("renders the form submit button", () => {
        renderPage();
        expect(screen.getByRole("button", { name: /enviar mensaje|send message/i })).toBeTruthy();
    });

    it("renders the CTA section heading", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /aún tienes dudas|still have questions/i })
        ).toBeTruthy();
    });

    it("renders the open ticket CTA link", () => {
        renderPage();
        const link = screen.getByRole("link", {
            name: /abrir ticket de soporte|open support ticket/i,
        });
        expect(link.getAttribute("href")).toBe("/contact");
    });

    it("hero section is labelled by the page heading", () => {
        renderPage();
        expect(document.querySelector("[aria-labelledby='support-heading']")).toBeTruthy();
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
