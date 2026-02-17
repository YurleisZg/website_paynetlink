import { test, expect } from "@playwright/test";

test.describe("Register Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/register");
    });

    test.describe("Layout and Rendering", () => {
        test("should display left panel on desktop with all benefits", async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });

            // Check logo and branding (using first() to select the left panel logo)
            await expect(page.getByText("PayNetLink").first()).toBeVisible();
            await expect(page.getByText("Comienza tu prueba")).toBeVisible();
            await expect(page.getByText("gratuita de 14 días")).toBeVisible();

            // Check all 4 benefits
            await expect(page.getByText("Sin tarjeta de crédito requerida")).toBeVisible();
            await expect(page.getByText("Configuración en 10 minutos")).toBeVisible();
            await expect(page.getByText("Soporte incluido desde el día 1")).toBeVisible();
            await expect(page.getByText("Cancela cuando quieras")).toBeVisible();
        });

        test("should hide left panel on mobile", async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });

            // Left panel should be hidden on mobile (check for benefits text which only appears in left panel)
            await expect(page.getByText("Sin tarjeta de crédito requerida")).toBeHidden();
        });

        test("should display all form elements", async ({ page }) => {
            // Title
            await expect(page.getByRole("heading", { name: "Crear tu cuenta" })).toBeVisible();

            // Form fields (5 inputs)
            await expect(page.getByLabel("Nombre", { exact: true })).toBeVisible();
            await expect(page.getByLabel("Apellido")).toBeVisible();
            await expect(page.getByLabel("Correo electrónico")).toBeVisible();
            await expect(page.getByLabel("Nombre de tu ISP")).toBeVisible();
            await expect(page.getByLabel("Contraseña")).toBeVisible();

            // Submit button
            await expect(page.getByRole("button", { name: "Crear cuenta gratis" })).toBeVisible();

            // Terms text
            await expect(
                page.getByText("Al registrarte aceptas nuestros Términos de Servicio")
            ).toBeVisible();

            // Login link
            await expect(page.getByText("¿Ya tienes cuenta?")).toBeVisible();
            await expect(page.getByText("Inicia sesión")).toBeVisible();
        });

        test("should not have horizontal overflow", async ({ page }) => {
            // Check desktop
            await page.setViewportSize({ width: 1440, height: 900 });
            const desktopScrollWidth = await page.evaluate(
                () => document.documentElement.scrollWidth
            );
            expect(desktopScrollWidth).toBeLessThanOrEqual(1440);

            // Check tablet
            await page.setViewportSize({ width: 768, height: 1024 });
            const tabletScrollWidth = await page.evaluate(
                () => document.documentElement.scrollWidth
            );
            expect(tabletScrollWidth).toBeLessThanOrEqual(768);

            // Check mobile
            await page.setViewportSize({ width: 375, height: 812 });
            const mobileScrollWidth = await page.evaluate(
                () => document.documentElement.scrollWidth
            );
            expect(mobileScrollWidth).toBeLessThanOrEqual(375);
        });
    });

    test.describe("Form Interactions", () => {
        test("should allow typing in firstName input", async ({ page }) => {
            const firstNameInput = page.getByLabel("Nombre", { exact: true });
            await firstNameInput.fill("John");
            await expect(firstNameInput).toHaveValue("John");
        });

        test("should allow typing in lastName input", async ({ page }) => {
            const lastNameInput = page.getByLabel("Apellido");
            await lastNameInput.fill("Doe");
            await expect(lastNameInput).toHaveValue("Doe");
        });

        test("should allow typing in email input", async ({ page }) => {
            const emailInput = page.getByLabel("Correo electrónico");
            await emailInput.fill("test@example.com");
            await expect(emailInput).toHaveValue("test@example.com");
        });

        test("should allow typing in ispName input", async ({ page }) => {
            const ispNameInput = page.getByLabel("Nombre de tu ISP");
            await ispNameInput.fill("My ISP Company");
            await expect(ispNameInput).toHaveValue("My ISP Company");
        });

        test("should allow typing in password input", async ({ page }) => {
            const passwordInput = page.getByLabel("Contraseña");
            await passwordInput.fill("password123");
            await expect(passwordInput).toHaveValue("password123");
        });

        test("should toggle password visibility", async ({ page }) => {
            const passwordInput = page.getByLabel("Contraseña");
            const toggleButton = page.getByRole("button", {
                name: /Show password|Hide password/i,
            });

            // Initially password should be hidden (type="password")
            await expect(passwordInput).toHaveAttribute("type", "password");

            // Click to show password
            await toggleButton.click();
            await expect(passwordInput).toHaveAttribute("type", "text");

            // Click to hide password again
            await toggleButton.click();
            await expect(passwordInput).toHaveAttribute("type", "password");
        });

        test("should handle form submission", async ({ page }) => {
            const firstNameInput = page.getByLabel("Nombre", { exact: true });
            const lastNameInput = page.getByLabel("Apellido");
            const emailInput = page.getByLabel("Correo electrónico");
            const ispNameInput = page.getByLabel("Nombre de tu ISP");
            const passwordInput = page.getByLabel("Contraseña");
            const submitButton = page.getByRole("button", { name: "Crear cuenta gratis" });

            // Fill form
            await firstNameInput.fill("John");
            await lastNameInput.fill("Doe");
            await emailInput.fill("test@example.com");
            await ispNameInput.fill("My ISP Company");
            await passwordInput.fill("password123");

            // Listen for console logs
            const consoleLogs: string[] = [];
            page.on("console", (msg) => {
                if (msg.type() === "log") {
                    consoleLogs.push(msg.text());
                }
            });

            // Submit form
            await submitButton.click();

            // Wait a bit for console log
            await page.waitForTimeout(100);

            // Verify console log was called (register handler)
            expect(consoleLogs.some((log) => log.includes("Register attempt"))).toBeTruthy();
        });

        test("should handle login link click", async ({ page }) => {
            const loginLink = page.getByText("Inicia sesión");

            // Click and verify navigation
            await loginLink.click();

            // Wait for navigation to login page
            await page.waitForURL("/login");

            // Verify we're on login page
            expect(page.url()).toContain("/login");
        });
    });

    test.describe("Accessibility", () => {
        test("should have proper form labels", async ({ page }) => {
            // Check that all inputs have associated labels
            await expect(page.getByLabel("Nombre", { exact: true })).toBeVisible();
            await expect(page.getByLabel("Apellido")).toBeVisible();
            await expect(page.getByLabel("Correo electrónico")).toBeVisible();
            await expect(page.getByLabel("Nombre de tu ISP")).toBeVisible();
            await expect(page.getByLabel("Contraseña")).toBeVisible();
        });

        test("should have proper button semantics", async ({ page }) => {
            // Submit button
            const submitButton = page.getByRole("button", { name: "Crear cuenta gratis" });
            await expect(submitButton).toHaveAttribute("type", "submit");
        });

        test("should support keyboard navigation", async ({ page }) => {
            const firstNameInput = page.getByLabel("Nombre", { exact: true });
            const lastNameInput = page.getByLabel("Apellido");

            // Click on firstName input to start navigation
            await firstNameInput.click();
            await expect(firstNameInput).toBeFocused();

            // Tab to lastName
            await page.keyboard.press("Tab");
            await expect(lastNameInput).toBeFocused();

            // Tab to email
            await page.keyboard.press("Tab");
            await expect(page.getByLabel("Correo electrónico")).toBeFocused();

            // Tab to ispName
            await page.keyboard.press("Tab");
            await expect(page.getByLabel("Nombre de tu ISP")).toBeFocused();

            // Tab to password
            await page.keyboard.press("Tab");
            await expect(page.getByLabel("Contraseña")).toBeFocused();
        });
    });
});
