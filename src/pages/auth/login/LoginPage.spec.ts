import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import LoginPage from "./LoginPage.vue";

describe("LoginPage", () => {
    describe("Rendering", () => {
        it("renders the login form", () => {
            render(LoginPage);

            // Check title and subtitle
            expect(screen.getByRole("heading", { name: /Iniciar sesión/i })).toBeDefined();
            expect(
                screen.getByText(/Ingresa tus credenciales para acceder a tu cuenta/i)
            ).toBeDefined();
        });

        it("renders all form inputs", () => {
            render(LoginPage);

            // Email input
            expect(screen.getByLabelText(/Correo electrónico/i)).toBeDefined();

            // Password input
            expect(screen.getByLabelText(/Contraseña/i)).toBeDefined();

            // Remember me checkbox
            expect(screen.getByLabelText(/Recordarme/i)).toBeDefined();
        });

        it("renders action buttons", () => {
            render(LoginPage);

            // Main submit button
            expect(screen.getByRole("button", { name: /Iniciar sesión/i })).toBeDefined();

            // Social login buttons
            expect(screen.getByRole("button", { name: /Google/i })).toBeDefined();
            expect(screen.getByRole("button", { name: /Microsoft/i })).toBeDefined();
        });

        it("renders forgot password link", () => {
            render(LoginPage);
            expect(screen.getByText(/¿Olvidaste tu contraseña\?/i)).toBeDefined();
        });

        it("renders sign up link", () => {
            render(LoginPage);
            expect(screen.getByText(/¿No tienes cuenta\?/i)).toBeDefined();
            expect(screen.getByText(/Regístrate gratis/i)).toBeDefined();
        });

        it("renders divider with text", () => {
            render(LoginPage);
            expect(screen.getByText(/o continúa con/i)).toBeDefined();
        });

        it("renders AuthLeftPanel with correct props", () => {
            render(LoginPage);

            // Check if panel content is visible (will be hidden on mobile via CSS)
            expect(screen.getByText(/Simplifica tu ISP/i)).toBeDefined();
            expect(
                screen.getByText(
                    /Accede a tu panel de control para gestionar clientes, pagos, red y comunicaciones desde un solo lugar/i
                )
            ).toBeDefined();
        });
    });

    describe("Form Interactions", () => {
        it("updates email input value", async () => {
            render(LoginPage);

            const emailInput = screen.getByLabelText(/Correo electrónico/i) as HTMLInputElement;

            await fireEvent.update(emailInput, "test@example.com");

            expect(emailInput.value).toBe("test@example.com");
        });

        it("updates password input value", async () => {
            render(LoginPage);

            const passwordInput = screen.getByLabelText(/Contraseña/i) as HTMLInputElement;

            await fireEvent.update(passwordInput, "mypassword123");

            expect(passwordInput.value).toBe("mypassword123");
        });

        it("toggles remember me checkbox", async () => {
            render(LoginPage);

            const checkbox = screen.getByLabelText(/Recordarme/i) as HTMLInputElement;

            // Initially unchecked
            expect(checkbox.checked).toBe(false);

            // Check it
            await fireEvent.click(checkbox);
            expect(checkbox.checked).toBe(true);

            // Uncheck it
            await fireEvent.click(checkbox);
            expect(checkbox.checked).toBe(false);
        });

        it("calls console.log on form submit", async () => {
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

            const { container } = render(LoginPage);

            const emailInput = screen.getByLabelText(/Correo electrónico/i) as HTMLInputElement;
            const passwordInput = screen.getByLabelText(/Contraseña/i) as HTMLInputElement;

            await fireEvent.update(emailInput, "test@example.com");
            await fireEvent.update(passwordInput, "password123");

            const form = container.querySelector("form");
            expect(form).not.toBeNull();

            if (form) {
                await fireEvent.submit(form);
            }

            expect(consoleSpy).toHaveBeenCalledWith(
                "Login attempt:",
                expect.objectContaining({
                    email: "test@example.com",
                    password: "password123",
                })
            );

            consoleSpy.mockRestore();
        });

        it("calls handler on forgot password click", async () => {
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

            render(LoginPage);

            const forgotPasswordLink = screen.getByText(/¿Olvidaste tu contraseña\?/i);

            await fireEvent.click(forgotPasswordLink);

            expect(consoleSpy).toHaveBeenCalledWith("Forgot password clicked");

            consoleSpy.mockRestore();
        });

        it("calls handler on Google login click", async () => {
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

            render(LoginPage);

            const googleButton = screen.getByRole("button", { name: /Google/i });

            await fireEvent.click(googleButton);

            expect(consoleSpy).toHaveBeenCalledWith("Google login clicked");

            consoleSpy.mockRestore();
        });

        it("calls handler on Microsoft login click", async () => {
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

            render(LoginPage);

            const microsoftButton = screen.getByRole("button", { name: /Microsoft/i });

            await fireEvent.click(microsoftButton);

            expect(consoleSpy).toHaveBeenCalledWith("Microsoft login clicked");

            consoleSpy.mockRestore();
        });

        it("calls handler on sign up click", async () => {
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

            render(LoginPage);

            const signUpLink = screen.getByText(/Regístrate gratis/i);

            await fireEvent.click(signUpLink);

            expect(consoleSpy).toHaveBeenCalledWith("Sign up clicked");

            consoleSpy.mockRestore();
        });
    });

    describe("Form Validation", () => {
        it("has required attribute on email input", () => {
            const { container } = render(LoginPage);

            const emailInput = container.querySelector("#email") as HTMLInputElement;

            expect(emailInput.hasAttribute("required")).toBe(true);
        });

        it("has required attribute on password input", () => {
            const { container } = render(LoginPage);

            const passwordInput = container.querySelector("#password") as HTMLInputElement;

            expect(passwordInput.hasAttribute("required")).toBe(true);
        });

        it("has email type on email input", () => {
            render(LoginPage);

            const emailInput = screen.getByLabelText(/Correo electrónico/i) as HTMLInputElement;

            expect(emailInput.type).toBe("email");
        });
    });

    describe("Component Structure", () => {
        it("has proper form structure", () => {
            const { container } = render(LoginPage);

            const form = container.querySelector("form");
            expect(form).not.toBeNull();
        });

        it("renders in a full-height container", () => {
            const { container } = render(LoginPage);

            const mainContainer = container.querySelector(".h-screen");
            expect(mainContainer).not.toBeNull();
        });
    });
});
