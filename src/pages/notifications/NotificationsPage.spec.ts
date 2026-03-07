import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import NotificationsPage from "./NotificationsPage.vue";

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

const renderPage = () => render(NotificationsPage, { global: { plugins: [router] } });

describe("NotificationsPage", () => {
    it("renders the page title heading", () => {
        renderPage();
        expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    });

    it("renders the badge with product name", () => {
        renderPage();
        const badges = screen.getAllByText(/notificaciones|notifications/i);
        expect(badges.length).toBeGreaterThan(0);
    });

    it("renders the subtitle text", () => {
        renderPage();
        expect(screen.getAllByText(/sms|correo|whatsapp/i).length).toBeGreaterThan(0);
    });

    it("renders the CTA link pointing to /register", () => {
        renderPage();
        const cta = screen.getByRole("link", {
            name: /configurar notificaciones|configure notifications/i,
        });
        expect(cta).toBeTruthy();
        expect(cta.getAttribute("href")).toBe("/register");
    });

    it("renders the screenshot image", () => {
        renderPage();
        const img = screen.getByRole("img");
        expect(img).toBeTruthy();
        expect(img.getAttribute("src")).toBeTruthy();
    });

    it("renders all 4 feature headings", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /multicanal integrado|integrated multichannel/i })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: /alertas automáticas|automatic alerts/i })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", {
                name: /plantillas personalizables|customizable templates/i,
            })
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: /reportes de entrega|delivery reports/i })
        ).toBeTruthy();
    });

    it("renders 4 feature cards", () => {
        renderPage();
        // 4 feature h3 + 4 channel h3 = 8 total h3 headings
        expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(8);
    });

    it("renders the channels section heading", () => {
        renderPage();
        expect(
            screen.getByRole("heading", {
                name: /canales de notificación disponibles|available notification channels/i,
            })
        ).toBeTruthy();
    });

    it("renders all 4 channel headings", () => {
        renderPage();
        expect(screen.getByRole("heading", { name: /^sms$/i })).toBeTruthy();
        expect(screen.getByRole("heading", { name: /correo electrónico|email/i })).toBeTruthy();
        expect(screen.getByRole("heading", { name: /whatsapp/i })).toBeTruthy();
        expect(screen.getByRole("heading", { name: /push notifications/i })).toBeTruthy();
    });

    it("renders the bottom CTA section with two action links", () => {
        renderPage();
        const activateLinks = screen.getAllByRole("link", {
            name: /activar notificaciones|activate notifications/i,
        });
        expect(activateLinks.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByRole("link", { name: /hablar con ventas|talk to sales/i })).toBeTruthy();
    });

    it("hero section is labelled by the page heading", () => {
        renderPage();
        expect(document.querySelector("[aria-labelledby='notifications-heading']")).toBeTruthy();
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
