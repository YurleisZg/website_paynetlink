import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import type { Component } from "vue";
import DemoPage from "./DemoPage.vue";

const mockRouter = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: { template: "<div>Home</div>" } },
        { path: "/demo", component: { template: "<div>Demo</div>" } },
        { path: "/register", component: { template: "<div>Register</div>" } },
        { path: "/login", component: { template: "<div>Login</div>" } },
    ],
});

const renderWithRouter = (component: Component) => {
    return render(component, {
        global: {
            plugins: [mockRouter],
        },
    });
};

describe("DemoPage", () => {
    it("renders the page title", () => {
        renderWithRouter(DemoPage);

        expect(screen.getByText("Demo interactiva de PayNetLink")).toBeDefined();
    });

    it("renders the page subtitle", () => {
        renderWithRouter(DemoPage);

        expect(
            screen.getByText(
                "Explora las funcionalidades principales de la plataforma sin necesidad de registrarte."
            )
        ).toBeDefined();
    });

    it("renders the main navbar and footer with logo", () => {
        renderWithRouter(DemoPage);

        // Logo appears in both Navbar and Footer
        const logos = screen.getAllByText("PayNetLink");
        expect(logos.length).toBeGreaterThanOrEqual(2);
    });

    it("renders the video player section", () => {
        renderWithRouter(DemoPage);

        expect(screen.getByText("Ver demostración — 5 min")).toBeDefined();
        expect(screen.getByLabelText("Reproducir video demo")).toBeDefined();
    });

    it("renders the action links with start free trial below schedule demo", () => {
        const { container } = renderWithRouter(DemoPage);

        expect(screen.getByText("Agendar demo personalizada")).toBeDefined();
        // Use container text content to handle text split across child elements
        expect(container.textContent).toContain("Comenzar prueba gratis");
    });

    it("has correct layout structure with nav, main, and footer", () => {
        const { container } = renderWithRouter(DemoPage);

        expect(container.querySelector("nav")).toBeDefined();
        expect(container.querySelector("main")).toBeDefined();
        expect(container.querySelector("footer")).toBeDefined();
    });
});
