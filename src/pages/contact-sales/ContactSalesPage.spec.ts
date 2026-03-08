import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import ContactSalesPage from "./ContactSalesPage.vue";

const renderPage = () => render(ContactSalesPage);

describe("ContactSalesPage", () => {
    describe("Form Fields", () => {
        it("renders all form fields with accessible labels", () => {
            renderPage();
            expect(screen.getByLabelText("Nombre", { exact: true })).toBeDefined();
            expect(screen.getByLabelText("Apellido")).toBeDefined();
            expect(screen.getByLabelText("Correo electrónico")).toBeDefined();
            expect(screen.getByLabelText("Teléfono")).toBeDefined();
            expect(screen.getByLabelText("Nombre de tu ISP")).toBeDefined();
            expect(screen.getByLabelText("¿Cuántos clientes gestionas?")).toBeDefined();
            expect(screen.getByLabelText(/Mensaje.*opcional/i)).toBeDefined();
            expect(screen.getByRole("button", { name: /Enviar solicitud/i })).toBeDefined();
        });

        it("email input has type email", () => {
            renderPage();
            const input = screen.getByLabelText("Correo electrónico") as HTMLInputElement;
            expect(input.type).toBe("email");
        });

        it("phone input has type tel", () => {
            renderPage();
            const input = screen.getByLabelText("Teléfono") as HTMLInputElement;
            expect(input.type).toBe("tel");
        });
    });

    describe("Form Interactions", () => {
        it("updates firstName when typing", async () => {
            renderPage();
            const input = screen.getByLabelText("Nombre", { exact: true }) as HTMLInputElement;
            await fireEvent.update(input, "Juan");
            expect(input.value).toBe("Juan");
        });

        it("updates lastName when typing", async () => {
            renderPage();
            const input = screen.getByLabelText("Apellido") as HTMLInputElement;
            await fireEvent.update(input, "Pérez");
            expect(input.value).toBe("Pérez");
        });

        it("updates email when typing", async () => {
            renderPage();
            const input = screen.getByLabelText("Correo electrónico") as HTMLInputElement;
            await fireEvent.update(input, "juan@example.com");
            expect(input.value).toBe("juan@example.com");
        });

        it("updates phone when typing", async () => {
            renderPage();
            const input = screen.getByLabelText("Teléfono") as HTMLInputElement;
            await fireEvent.update(input, "+57 300 123 4567");
            expect(input.value).toBe("+57 300 123 4567");
        });

        it("updates ISP name when typing", async () => {
            renderPage();
            const input = screen.getByLabelText("Nombre de tu ISP") as HTMLInputElement;
            await fireEvent.update(input, "FibraNet Colombia");
            expect(input.value).toBe("FibraNet Colombia");
        });

        it("updates client range when selecting", async () => {
            renderPage();
            const select = screen.getByLabelText(
                "¿Cuántos clientes gestionas?"
            ) as HTMLSelectElement;
            await fireEvent.update(select, "51-200");
            expect(select.value).toBe("51-200");
        });

        it("updates message when typing", async () => {
            renderPage();
            const textarea = screen.getByLabelText(/Mensaje.*opcional/i) as HTMLTextAreaElement;
            await fireEvent.update(textarea, "Me interesa el plan enterprise");
            expect(textarea.value).toBe("Me interesa el plan enterprise");
        });
    });
});
