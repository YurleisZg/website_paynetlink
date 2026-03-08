import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import type { Component } from "vue";
import LoginPage from "./LoginPage.vue";

const mockRouter = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: { template: "<div>Home</div>" } },
        { path: "/login", component: { template: "<div>Login</div>" } },
        { path: "/register", component: { template: "<div>Register</div>" } },
        { path: "/forgot-password", component: { template: "<div>Forgot Password</div>" } },
    ],
});

describe("LoginPage", () => {
    const renderWithRouter = (component: Component) =>
        render(component, { global: { plugins: [mockRouter] } });

    describe("Form Fields", () => {
        it("renders all form inputs with accessible labels", () => {
            renderWithRouter(LoginPage);
            expect(screen.getByLabelText(/Correo electrónico/i)).toBeDefined();
            expect(screen.getByLabelText(/Contraseña/i)).toBeDefined();
            expect(screen.getByLabelText(/Recordarme/i)).toBeDefined();
            expect(screen.getByRole("button", { name: /Iniciar sesión/i })).toBeDefined();
            expect(screen.getByRole("button", { name: /Google/i })).toBeDefined();
            expect(screen.getByRole("button", { name: /Microsoft/i })).toBeDefined();
        });

        it("email input has type email", () => {
            renderWithRouter(LoginPage);
            const input = screen.getByLabelText(/Correo electrónico/i) as HTMLInputElement;
            expect(input.type).toBe("email");
        });
    });

    describe("Form Interactions", () => {
        it("updates email input value", async () => {
            renderWithRouter(LoginPage);
            const input = screen.getByLabelText(/Correo electrónico/i) as HTMLInputElement;
            await fireEvent.update(input, "test@example.com");
            expect(input.value).toBe("test@example.com");
        });

        it("updates password input value", async () => {
            renderWithRouter(LoginPage);
            const input = screen.getByLabelText(/Contraseña/i) as HTMLInputElement;
            await fireEvent.update(input, "mypassword123");
            expect(input.value).toBe("mypassword123");
        });

        it("toggles remember me checkbox", async () => {
            renderWithRouter(LoginPage);
            const checkbox = screen.getByLabelText(/Recordarme/i) as HTMLInputElement;
            expect(checkbox.checked).toBe(false);
            await fireEvent.click(checkbox);
            expect(checkbox.checked).toBe(true);
            await fireEvent.click(checkbox);
            expect(checkbox.checked).toBe(false);
        });

        it("navigates to forgot-password on link click", async () => {
            const pushSpy = vi.spyOn(mockRouter, "push");
            renderWithRouter(LoginPage);
            await fireEvent.click(screen.getByText(/¿Olvidaste tu contraseña\?/i));
            expect(pushSpy).toHaveBeenCalledWith("/forgot-password");
        });

        it("navigates to register on sign up click", async () => {
            const pushSpy = vi.spyOn(mockRouter, "push");
            renderWithRouter(LoginPage);
            await fireEvent.click(screen.getByText(/Regístrate gratis/i));
            expect(pushSpy).toHaveBeenCalledWith("/register");
        });
    });
});
