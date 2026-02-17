import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { useRouter } from "vue-router";
import type { Router } from "vue-router";
import RegisterPage from "./RegisterPage.vue";

// Mock vue-router
vi.mock("vue-router", () => ({
    useRouter: vi.fn(),
}));

describe("RegisterPage", () => {
    const mockRouterPush = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useRouter).mockReturnValue({
            push: mockRouterPush,
        } as unknown as Router);

        // Mock console.log
        vi.spyOn(console, "log").mockImplementation(() => {});
    });

    describe("Rendering", () => {
        it("renders the page title", () => {
            render(RegisterPage);
            expect(screen.getByRole("heading", { name: /Crear tu cuenta/i })).toBeDefined();
        });

        it("renders all 5 input fields with correct labels", () => {
            render(RegisterPage);

            expect(screen.getByLabelText("Nombre", { exact: true })).toBeDefined();
            expect(screen.getByLabelText(/Apellido/i)).toBeDefined();
            expect(screen.getByLabelText(/Correo electrónico/i)).toBeDefined();
            expect(screen.getByLabelText(/Nombre de tu ISP/i)).toBeDefined();
            expect(screen.getByLabelText(/Contraseña/i)).toBeDefined();
        });

        it("renders the submit button with correct text", () => {
            render(RegisterPage);
            expect(screen.getByRole("button", { name: /Crear cuenta gratis/i })).toBeDefined();
        });

        it("renders the terms text", () => {
            render(RegisterPage);
            expect(
                screen.getByText(/Al registrarte aceptas nuestros Términos de Servicio/i)
            ).toBeDefined();
        });

        it("renders the login link", () => {
            render(RegisterPage);
            expect(screen.getByText(/¿Ya tienes cuenta\?/i)).toBeDefined();
            expect(screen.getByRole("button", { name: /Inicia sesión/i })).toBeDefined();
        });
    });

    describe("Form Interactions", () => {
        it("updates firstName value when typing", async () => {
            render(RegisterPage);
            const input = screen.getByLabelText("Nombre", { exact: true }) as HTMLInputElement;

            await fireEvent.update(input, "John");
            expect(input.value).toBe("John");
        });

        it("updates lastName value when typing", async () => {
            render(RegisterPage);
            const input = screen.getByLabelText(/Apellido/i) as HTMLInputElement;

            await fireEvent.update(input, "Doe");
            expect(input.value).toBe("Doe");
        });

        it("updates email value when typing", async () => {
            render(RegisterPage);
            const input = screen.getByLabelText(/Correo electrónico/i) as HTMLInputElement;

            await fireEvent.update(input, "john@example.com");
            expect(input.value).toBe("john@example.com");
        });

        it("updates ispName value when typing", async () => {
            render(RegisterPage);
            const input = screen.getByLabelText(/Nombre de tu ISP/i) as HTMLInputElement;

            await fireEvent.update(input, "My ISP Company");
            expect(input.value).toBe("My ISP Company");
        });

        it("updates password value when typing", async () => {
            render(RegisterPage);
            const input = screen.getByLabelText(/Contraseña/i) as HTMLInputElement;

            await fireEvent.update(input, "password123");
            expect(input.value).toBe("password123");
        });

        it("calls console.log with form data on submit", async () => {
            render(RegisterPage);

            const firstNameInput = screen.getByLabelText("Nombre", {
                exact: true,
            }) as HTMLInputElement;
            const lastNameInput = screen.getByLabelText(/Apellido/i) as HTMLInputElement;
            const emailInput = screen.getByLabelText(/Correo electrónico/i) as HTMLInputElement;
            const ispNameInput = screen.getByLabelText(/Nombre de tu ISP/i) as HTMLInputElement;
            const passwordInput = screen.getByLabelText(/Contraseña/i) as HTMLInputElement;
            const submitButton = screen.getByRole("button", { name: /Crear cuenta gratis/i });

            await fireEvent.update(firstNameInput, "John");
            await fireEvent.update(lastNameInput, "Doe");
            await fireEvent.update(emailInput, "john@example.com");
            await fireEvent.update(ispNameInput, "My ISP");
            await fireEvent.update(passwordInput, "password123");
            await fireEvent.click(submitButton);

            expect(console.log).toHaveBeenCalledWith("Register attempt:", {
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                ispName: "My ISP",
                password: "password123",
            });
        });

        it("navigates to login page when clicking login link", async () => {
            render(RegisterPage);

            const loginLink = screen.getByRole("button", { name: /Inicia sesión/i });
            await fireEvent.click(loginLink);

            expect(console.log).toHaveBeenCalledWith("Navigating to login");
            expect(mockRouterPush).toHaveBeenCalledWith("/login");
        });
    });

    describe("Form Validation", () => {
        it("all form inputs have required attribute", () => {
            render(RegisterPage);

            const firstNameInput = screen.getByLabelText("Nombre", {
                exact: true,
            }) as HTMLInputElement;
            const lastNameInput = screen.getByLabelText(/Apellido/i) as HTMLInputElement;
            const emailInput = screen.getByLabelText(/Correo electrónico/i) as HTMLInputElement;
            const ispNameInput = screen.getByLabelText(/Nombre de tu ISP/i) as HTMLInputElement;
            const passwordInput = screen.getByLabelText(/Contraseña/i) as HTMLInputElement;

            expect(firstNameInput.hasAttribute("required")).toBe(true);
            expect(lastNameInput.hasAttribute("required")).toBe(true);
            expect(emailInput.hasAttribute("required")).toBe(true);
            expect(ispNameInput.hasAttribute("required")).toBe(true);
            expect(passwordInput.hasAttribute("required")).toBe(true);
        });

        it('email input has type="email"', () => {
            render(RegisterPage);
            const emailInput = screen.getByLabelText(/Correo electrónico/i) as HTMLInputElement;
            expect(emailInput.type).toBe("email");
        });
    });
});
