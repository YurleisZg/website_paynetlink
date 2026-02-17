import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import ContactSalesPage from "./ContactSalesPage.vue";

describe("ContactSalesPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Rendering", () => {
        it("renders the page with logo and company name", () => {
            render(ContactSalesPage);

            expect(screen.getAllByText("PayNetLink").length).toBeGreaterThan(0);
        });

        it("renders the main heading", () => {
            render(ContactSalesPage);

            expect(
                screen.getByRole("heading", { name: /Hablemos de tu plan Enterprise/i })
            ).toBeDefined();
        });

        it("renders the description text", () => {
            render(ContactSalesPage);

            expect(
                screen.getByText(
                    /Nuestro equipo de ventas te ayudará a encontrar la solución perfecta/i
                )
            ).toBeDefined();
        });

        it("renders all contact information items", () => {
            render(ContactSalesPage);

            expect(screen.getByText("ventas@paynetlink.com")).toBeDefined();
            expect(screen.getByText("+57 (1) 234 5678")).toBeDefined();
            expect(screen.getByText(/Lun-Vie.*8:00 AM.*6:00 PM COT/i)).toBeDefined();
        });

        it("renders the form title", () => {
            render(ContactSalesPage);

            expect(screen.getByRole("heading", { name: /Solicitar información/i })).toBeDefined();
        });

        it("renders all form input fields with correct labels", () => {
            render(ContactSalesPage);

            expect(screen.getByLabelText("Nombre", { exact: true })).toBeDefined();
            expect(screen.getByLabelText("Apellido")).toBeDefined();
            expect(screen.getByLabelText("Correo electrónico")).toBeDefined();
            expect(screen.getByLabelText("Teléfono")).toBeDefined();
            expect(screen.getByLabelText("Nombre de tu ISP")).toBeDefined();
            expect(screen.getByLabelText("¿Cuántos clientes gestionas?")).toBeDefined();
            expect(screen.getByLabelText(/Mensaje.*opcional/i)).toBeDefined();
        });

        it("renders the submit button", () => {
            render(ContactSalesPage);

            expect(screen.getByRole("button", { name: /Enviar solicitud/i })).toBeDefined();
        });
    });

    describe("Form Interactions", () => {
        it("updates firstName when typing", async () => {
            render(ContactSalesPage);

            const input = screen.getByLabelText("Nombre", {
                exact: true,
            }) as HTMLInputElement;

            await fireEvent.update(input, "Juan");
            expect(input.value).toBe("Juan");
        });

        it("updates lastName when typing", async () => {
            render(ContactSalesPage);

            const input = screen.getByLabelText("Apellido") as HTMLInputElement;

            await fireEvent.update(input, "Pérez");
            expect(input.value).toBe("Pérez");
        });

        it("updates email when typing", async () => {
            render(ContactSalesPage);

            const input = screen.getByLabelText("Correo electrónico") as HTMLInputElement;

            await fireEvent.update(input, "juan@example.com");
            expect(input.value).toBe("juan@example.com");
        });

        it("updates phone when typing", async () => {
            render(ContactSalesPage);

            const input = screen.getByLabelText("Teléfono") as HTMLInputElement;

            await fireEvent.update(input, "+57 300 123 4567");
            expect(input.value).toBe("+57 300 123 4567");
        });

        it("updates ISP name when typing", async () => {
            render(ContactSalesPage);

            const input = screen.getByLabelText("Nombre de tu ISP") as HTMLInputElement;

            await fireEvent.update(input, "FibraNet Colombia");
            expect(input.value).toBe("FibraNet Colombia");
        });

        it("updates client range when selecting", async () => {
            render(ContactSalesPage);

            const select = screen.getByLabelText(
                "¿Cuántos clientes gestionas?"
            ) as HTMLSelectElement;

            await fireEvent.update(select, "51-200");
            expect(select.value).toBe("51-200");
        });

        it("updates message when typing", async () => {
            render(ContactSalesPage);

            const textarea = screen.getByLabelText(/Mensaje.*opcional/i) as HTMLTextAreaElement;

            await fireEvent.update(textarea, "Me interesa el plan enterprise");
            expect(textarea.value).toBe("Me interesa el plan enterprise");
        });

        it("calls console.log when form is submitted", async () => {
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

            const { container } = render(ContactSalesPage);

            // Fill required fields
            const firstNameInput = screen.getByLabelText("Nombre", {
                exact: true,
            }) as HTMLInputElement;
            const lastNameInput = screen.getByLabelText("Apellido") as HTMLInputElement;
            const emailInput = screen.getByLabelText("Correo electrónico") as HTMLInputElement;
            const phoneInput = screen.getByLabelText("Teléfono") as HTMLInputElement;
            const ispNameInput = screen.getByLabelText("Nombre de tu ISP") as HTMLInputElement;
            const clientRangeSelect = screen.getByLabelText(
                "¿Cuántos clientes gestionas?"
            ) as HTMLSelectElement;

            await fireEvent.update(firstNameInput, "Juan");
            await fireEvent.update(lastNameInput, "Pérez");
            await fireEvent.update(emailInput, "juan@example.com");
            await fireEvent.update(phoneInput, "+57 300 123 4567");
            await fireEvent.update(ispNameInput, "FibraNet Colombia");
            await fireEvent.update(clientRangeSelect, "51-200");

            // Submit form
            const form = container.querySelector("form");
            await fireEvent.submit(form!);

            expect(consoleSpy).toHaveBeenCalledWith("Form submitted:", {
                firstName: "Juan",
                lastName: "Pérez",
                email: "juan@example.com",
                phone: "+57 300 123 4567",
                ispName: "FibraNet Colombia",
                clientRange: "51-200",
                message: "",
            });

            consoleSpy.mockRestore();
        });
    });

    describe("Form Validation", () => {
        it("all required fields have required attribute", () => {
            render(ContactSalesPage);

            const firstNameInput = screen.getByLabelText("Nombre", {
                exact: true,
            }) as HTMLInputElement;
            const lastNameInput = screen.getByLabelText("Apellido") as HTMLInputElement;
            const emailInput = screen.getByLabelText("Correo electrónico") as HTMLInputElement;
            const phoneInput = screen.getByLabelText("Teléfono") as HTMLInputElement;
            const ispNameInput = screen.getByLabelText("Nombre de tu ISP") as HTMLInputElement;
            const clientRangeSelect = screen.getByLabelText(
                "¿Cuántos clientes gestionas?"
            ) as HTMLSelectElement;

            expect(firstNameInput.hasAttribute("required")).toBe(true);
            expect(lastNameInput.hasAttribute("required")).toBe(true);
            expect(emailInput.hasAttribute("required")).toBe(true);
            expect(phoneInput.hasAttribute("required")).toBe(true);
            expect(ispNameInput.hasAttribute("required")).toBe(true);
            expect(clientRangeSelect.hasAttribute("required")).toBe(true);
        });

        it("message field is optional (no required attribute)", () => {
            render(ContactSalesPage);

            const messageTextarea = screen.getByLabelText(
                /Mensaje.*opcional/i
            ) as HTMLTextAreaElement;

            expect(messageTextarea.hasAttribute("required")).toBe(false);
        });

        it('email input has type="email"', () => {
            render(ContactSalesPage);

            const emailInput = screen.getByLabelText("Correo electrónico") as HTMLInputElement;

            expect(emailInput.type).toBe("email");
        });

        it('phone input has type="tel"', () => {
            render(ContactSalesPage);

            const phoneInput = screen.getByLabelText("Teléfono") as HTMLInputElement;

            expect(phoneInput.type).toBe("tel");
        });
    });

    describe("Component Structure", () => {
        it("has proper form structure", () => {
            const { container } = render(ContactSalesPage);

            const form = container.querySelector("form");
            expect(form).not.toBeNull();
        });

        it("has two main sections for layout", () => {
            const { container } = render(ContactSalesPage);

            // Check for two-column layout structure
            const mainContainer = container.querySelector(".flex.min-h-screen");
            expect(mainContainer).not.toBeNull();
        });
    });
});
