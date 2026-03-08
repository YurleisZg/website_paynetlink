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
    it("renders the CTA link pointing to /register", () => {
        renderPage();
        const cta = screen.getByRole("link", {
            name: /configurar notificaciones|configure notifications/i,
        });
        expect(cta).toBeTruthy();
        expect(cta.getAttribute("href")).toBe("/register");
    });

    it("renders the bottom CTA section with two action links", () => {
        renderPage();
        const activateLinks = screen.getAllByRole("link", {
            name: /activar notificaciones|activate notifications/i,
        });
        expect(activateLinks.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByRole("link", { name: /hablar con ventas|talk to sales/i })).toBeTruthy();
    });
});
