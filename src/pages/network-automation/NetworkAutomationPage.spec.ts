import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import NetworkAutomationPage from "./NetworkAutomationPage.vue";

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

const renderPage = () => render(NetworkAutomationPage, { global: { plugins: [router] } });

describe("NetworkAutomationPage", () => {
    it("renders the CTA link pointing to /demo", () => {
        renderPage();
        const cta = screen.getByRole("link", {
            name: /probar automatización de red|try network automation/i,
        });
        expect(cta).toBeTruthy();
        expect(cta.getAttribute("href")).toBe("/demo");
    });
});
