import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import ContactAdvisorPage from "./ContactAdvisorPage.vue";

const renderPage = () => render(ContactAdvisorPage);

describe("ContactAdvisorPage", () => {
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
            await fireEvent.update(input, "María");
            expect(input.value).toBe("María");
        });

        it("updates lastName when typing", async () => {
            renderPage();
            const input = screen.getByLabelText("Apellido") as HTMLInputElement;
            await fireEvent.update(input, "García");
            expect(input.value).toBe("García");
        });

        it("updates email when typing", async () => {
            renderPage();
            const input = screen.getByLabelText("Correo electrónico") as HTMLInputElement;
            await fireEvent.update(input, "maria@example.com");
            expect(input.value).toBe("maria@example.com");
        });

        it("updates phone when typing", async () => {
            renderPage();
            const input = screen.getByLabelText("Teléfono") as HTMLInputElement;
            await fireEvent.update(input, "+57 310 987 6543");
            expect(input.value).toBe("+57 310 987 6543");
        });

        it("updates ISP name when typing", async () => {
            renderPage();
            const input = screen.getByLabelText("Nombre de tu ISP") as HTMLInputElement;
            await fireEvent.update(input, "NetSpeed Colombia");
            expect(input.value).toBe("NetSpeed Colombia");
        });

        it("updates client range when selecting", async () => {
            renderPage();
            const select = screen.getByLabelText(
                "¿Cuántos clientes gestionas?"
            ) as HTMLSelectElement;
            await fireEvent.update(select, "201-500");
            expect(select.value).toBe("201-500");
        });

        it("updates message when typing", async () => {
            renderPage();
            const textarea = screen.getByLabelText(/Mensaje.*opcional/i) as HTMLTextAreaElement;
            await fireEvent.update(textarea, "Me gustaría una demo de la plataforma");
            expect(textarea.value).toBe("Me gustaría una demo de la plataforma");
        });
    });
});
