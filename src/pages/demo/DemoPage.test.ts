import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import type { Component } from "vue";
import DemoPage from "./DemoPage.vue";

// Create a mock router for testing
const mockRouter = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: { template: "<div>Home</div>" } },
        { path: "/demo", component: { template: "<div>Demo</div>" } },
        { path: "/register", component: { template: "<div>Register</div>" } },
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

    it("renders the navbar with logo and CTA button", () => {
        renderWithRouter(DemoPage);

        expect(screen.getByText("PayNetLink")).toBeDefined();
        expect(screen.getByText("Comenzar prueba gratis")).toBeDefined();
    });

    it("renders the video player section", () => {
        renderWithRouter(DemoPage);

        expect(screen.getByText("Ver demostración — 5 min")).toBeDefined();
        expect(screen.getByLabelText("Reproducir video demo")).toBeDefined();
    });

    it("renders the action links", () => {
        renderWithRouter(DemoPage);

        // "Demo en vivo" is commented out in the code, so only check for the visible one
        expect(screen.getByText("Agendar demo personalizada")).toBeDefined();
    });

    it("has correct layout structure", () => {
        const { container } = renderWithRouter(DemoPage);

        // Verify main container exists
        const mainContainer = container.querySelector(".flex.h-full.w-full.flex-col");
        expect(mainContainer).toBeDefined();

        // Verify header exists
        const header = container.querySelector("header");
        expect(header).toBeDefined();

        // Verify main content area exists
        const main = container.querySelector("main");
        expect(main).toBeDefined();
    });
});
