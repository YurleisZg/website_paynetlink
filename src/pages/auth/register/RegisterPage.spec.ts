import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import RegisterPage from "./RegisterPage.vue";

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", name: "home", component: { template: "<div>Home</div>" } },
        { path: "/login", name: "login", component: { template: "<div>Login</div>" } },
    ],
});

const renderPage = () => render(RegisterPage, { global: { plugins: [router] } });

describe("RegisterPage", () => {
    describe("Form Fields", () => {
        it("renders all input fields with accessible labels and submit button", () => {
            renderPage();
            expect(screen.getByLabelText("Nombre", { exact: true })).toBeDefined();
            expect(screen.getByLabelText(/Apellido/i)).toBeDefined();
            expect(screen.getByLabelText(/Correo electrónico/i)).toBeDefined();
            expect(screen.getByLabelText(/Nombre de tu ISP/i)).toBeDefined();
            expect(screen.getByLabelText(/Contraseña/i)).toBeDefined();
            expect(screen.getByRole("button", { name: /Crear cuenta gratis/i })).toBeDefined();
        });

        it("email input has type email", () => {
            renderPage();
            const input = screen.getByLabelText(/Correo electrónico/i) as HTMLInputElement;
            expect(input.type).toBe("email");
        });

        it("login link navigates to /login", () => {
            renderPage();
            const link = screen.getByRole("link", { name: /Inicia sesión/i });
            expect(link.getAttribute("href")).toBe("/login");
        });
    });

    describe("Form Interactions", () => {
        it("updates firstName value when typing", async () => {
            renderPage();
            const input = screen.getByLabelText("Nombre", { exact: true }) as HTMLInputElement;
            await fireEvent.update(input, "John");
            expect(input.value).toBe("John");
        });

        it("updates lastName value when typing", async () => {
            renderPage();
            const input = screen.getByLabelText(/Apellido/i) as HTMLInputElement;
            await fireEvent.update(input, "Doe");
            expect(input.value).toBe("Doe");
        });

        it("updates email value when typing", async () => {
            renderPage();
            const input = screen.getByLabelText(/Correo electrónico/i) as HTMLInputElement;
            await fireEvent.update(input, "john@example.com");
            expect(input.value).toBe("john@example.com");
        });

        it("updates ispName value when typing", async () => {
            renderPage();
            const input = screen.getByLabelText(/Nombre de tu ISP/i) as HTMLInputElement;
            await fireEvent.update(input, "My ISP Company");
            expect(input.value).toBe("My ISP Company");
        });

        it("updates password value when typing", async () => {
            renderPage();
            const input = screen.getByLabelText(/Contraseña/i) as HTMLInputElement;
            await fireEvent.update(input, "password123");
            expect(input.value).toBe("password123");
        });
    });
});
