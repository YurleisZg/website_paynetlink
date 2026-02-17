import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import RegisterLeftPanel from "./RegisterLeftPanel.vue";

describe("RegisterLeftPanel", () => {
    describe("Rendering", () => {
        it("renders the logo with PayNetLink text", () => {
            render(RegisterLeftPanel);
            expect(screen.getByText("PayNetLink")).toBeDefined();
        });

        it("renders the main title", () => {
            render(RegisterLeftPanel);
            expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
            expect(screen.getByText(/Comienza tu prueba/i)).toBeDefined();
            expect(screen.getByText(/gratuita de 14 días/i)).toBeDefined();
        });

        it("renders all 4 benefits", () => {
            render(RegisterLeftPanel);

            expect(screen.getByText("Sin tarjeta de crédito requerida")).toBeDefined();
            expect(screen.getByText("Configuración en 10 minutos")).toBeDefined();
            expect(screen.getByText("Soporte incluido desde el día 1")).toBeDefined();
            expect(screen.getByText("Cancela cuando quieras")).toBeDefined();
        });

        it("renders as a list with 4 items", () => {
            const { container } = render(RegisterLeftPanel);
            const listItems = container.querySelectorAll("ul li");
            expect(listItems.length).toBe(4);
        });
    });

    describe("Styling", () => {
        it("has primary background color", () => {
            const { container } = render(RegisterLeftPanel);
            const panel = container.querySelector(".bg-primary");
            expect(panel).toBeDefined();
        });

        it("is hidden on mobile and visible on medium+ screens", () => {
            const { container } = render(RegisterLeftPanel);
            const panel = container.firstChild as HTMLElement;
            expect(panel.classList.contains("hidden")).toBe(true);
            expect(panel.classList.contains("md:flex")).toBe(true);
        });
    });
});
