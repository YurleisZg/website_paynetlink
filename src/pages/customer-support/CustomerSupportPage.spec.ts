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
    it("renders the search input", () => {
        renderPage();
        expect(screen.getByRole("searchbox")).toBeTruthy();
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

    it("renders the open ticket CTA link", () => {
        renderPage();
        const link = screen.getByRole("link", {
            name: /abrir ticket de soporte|open support ticket/i,
        });
        expect(link.getAttribute("href")).toBe("/contact");
    });
});
