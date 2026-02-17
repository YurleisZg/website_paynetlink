import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import ContactAdvisorPage from "./ContactAdvisorPage.vue";

describe("ContactAdvisorPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Rendering", () => {
        it("renders the page with logo and company name", () => {
            render(ContactAdvisorPage);

            expect(screen.getAllByText("PayNetLink").length).toBeGreaterThan(0);
        });

        it("renders the main heading", () => {
            render(ContactAdvisorPage);

            expect(
                screen.getByRole("heading", { name: /Habla con un asesor de PayNetLink/i })
            ).toBeDefined();
        });

        it("renders the description text", () => {
            render(ContactAdvisorPage);

            expect(
                screen.getByText(
                    /Agenda una llamada o videollamada con un experto que te guiará por la plataforma/i
                )
            ).toBeDefined();
        });

        it("renders all contact information items", () => {
            render(ContactAdvisorPage);

            expect(screen.getByText("ventas@paynetlink.com")).toBeDefined();
            expect(screen.getByText("+57 (1) 234 5678")).toBeDefined();
            expect(screen.getByText(/Lun-Vie.*8:00 AM.*6:00 PM COT/i)).toBeDefined();
        });

        it("renders the form title", () => {
            render(ContactAdvisorPage);

            expect(screen.getByRole("heading", { name: /Agendar asesoría/i })).toBeDefined();
        });

        it("renders all form input fields with correct labels", () => {
            render(ContactAdvisorPage);

            expect(screen.getByLabelText("Nombre", { exact: true })).toBeDefined();
            expect(screen.getByLabelText("Apellido")).toBeDefined();
            expect(screen.getByLabelText("Correo electrónico")).toBeDefined();
            expect(screen.getByLabelText("Teléfono")).toBeDefined();
            expect(screen.getByLabelText("Nombre de tu ISP")).toBeDefined();
            expect(screen.getByLabelText("¿Cuántos clientes gestionas?")).toBeDefined();
            expect(screen.getByLabelText(/Mensaje.*opcional/i)).toBeDefined();
        });

        it("renders the submit button", () => {
            render(ContactAdvisorPage);

            expect(screen.getByRole("button", { name: /Enviar solicitud/i })).toBeDefined();
        });
    });

    describe("Form Interactions", () => {
        it("updates firstName when typing", async () => {
            render(ContactAdvisorPage);

            const input = screen.getByLabelText("Nombre", {
                exact: true,
            }) as HTMLInputElement;

            await fireEvent.update(input, "María");
            expect(input.value).toBe("María");
        });

        it("updates lastName when typing", async () => {
            render(ContactAdvisorPage);

            const input = screen.getByLabelText("Apellido") as HTMLInputElement;

            await fireEvent.update(input, "García");
            expect(input.value).toBe("García");
        });

        it("updates email when typing", async () => {
            render(ContactAdvisorPage);

            const input = screen.getByLabelText("Correo electrónico") as HTMLInputElement;

            await fireEvent.update(input, "maria@example.com");
            expect(input.value).toBe("maria@example.com");
        });

        it("updates phone when typing", async () => {
            render(ContactAdvisorPage);

            const input = screen.getByLabelText("Teléfono") as HTMLInputElement;

            await fireEvent.update(input, "+57 310 987 6543");
            expect(input.value).toBe("+57 310 987 6543");
        });

        it("updates ISP name when typing", async () => {
            render(ContactAdvisorPage);

            const input = screen.getByLabelText("Nombre de tu ISP") as HTMLInputElement;

            await fireEvent.update(input, "NetSpeed Colombia");
            expect(input.value).toBe("NetSpeed Colombia");
        });

        it("updates client range when selecting", async () => {
            render(ContactAdvisorPage);

            const select = screen.getByLabelText(
                "¿Cuántos clientes gestionas?"
            ) as HTMLSelectElement;

            await fireEvent.update(select, "201-500");
            expect(select.value).toBe("201-500");
        });

        it("updates message when typing", async () => {
            render(ContactAdvisorPage);

            const textarea = screen.getByLabelText(/Mensaje.*opcional/i) as HTMLTextAreaElement;

            await fireEvent.update(textarea, "Me gustaría una demo de la plataforma");
            expect(textarea.value).toBe("Me gustaría una demo de la plataforma");
        });

        it("calls console.log when form is submitted", async () => {
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

            const { container } = render(ContactAdvisorPage);

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

            await fireEvent.update(firstNameInput, "María");
            await fireEvent.update(lastNameInput, "García");
            await fireEvent.update(emailInput, "maria@example.com");
            await fireEvent.update(phoneInput, "+57 310 987 6543");
            await fireEvent.update(ispNameInput, "NetSpeed Colombia");
            await fireEvent.update(clientRangeSelect, "201-500");

            // Submit form
            const form = container.querySelector("form");
            await fireEvent.submit(form!);

            expect(consoleSpy).toHaveBeenCalledWith("Form submitted:", {
                firstName: "María",
                lastName: "García",
                email: "maria@example.com",
                phone: "+57 310 987 6543",
                ispName: "NetSpeed Colombia",
                clientRange: "201-500",
                message: "",
            });

            consoleSpy.mockRestore();
        });
    });

    describe("Form Validation", () => {
        it("all required fields have required attribute", () => {
            render(ContactAdvisorPage);

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
            render(ContactAdvisorPage);

            const messageTextarea = screen.getByLabelText(
                /Mensaje.*opcional/i
            ) as HTMLTextAreaElement;

            expect(messageTextarea.hasAttribute("required")).toBe(false);
        });

        it('email input has type="email"', () => {
            render(ContactAdvisorPage);

            const emailInput = screen.getByLabelText("Correo electrónico") as HTMLInputElement;

            expect(emailInput.type).toBe("email");
        });

        it('phone input has type="tel"', () => {
            render(ContactAdvisorPage);

            const phoneInput = screen.getByLabelText("Teléfono") as HTMLInputElement;

            expect(phoneInput.type).toBe("tel");
        });
    });

    describe("Component Structure", () => {
        it("has proper form structure", () => {
            const { container } = render(ContactAdvisorPage);

            const form = container.querySelector("form");
            expect(form).not.toBeNull();
        });

        it("has two main sections for layout", () => {
            const { container } = render(ContactAdvisorPage);

            // Check for two-column layout structure
            const mainContainer = container.querySelector(".flex.min-h-screen");
            expect(mainContainer).not.toBeNull();
        });
    });
});
