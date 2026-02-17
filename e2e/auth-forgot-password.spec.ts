import { test, expect } from "@playwright/test";

test.describe("Forgot Password Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/forgot-password");
    });

    test.describe("Layout and Rendering", () => {
        test("should display left panel on desktop with correct content", async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });

            // Check logo and branding (using first() to select the left panel logo)
            await expect(page.getByText("PayNetLink").first()).toBeVisible();
            await expect(page.getByText("¿Olvidaste tu contraseña?")).toBeVisible();
            await expect(
                page.getByText(
                    "No te preocupes, es normal. Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña."
                )
            ).toBeVisible();
        });

        test("should hide left panel on mobile", async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });

            // Left panel content should be hidden on mobile (check for specific left panel text)
            await expect(page.getByText("¿Olvidaste tu contraseña?").first()).toBeHidden();
        });

        test("should display all form elements in initial state", async ({ page }) => {
            // Back to login link
            await expect(
                page.getByRole("link", { name: "Volver al inicio de sesión" })
            ).toBeVisible();

            // Title and subtitle
            await expect(
                page.getByRole("heading", { name: "Restablecer contraseña" })
            ).toBeVisible();

            // Form field
            await expect(page.getByLabel("Correo electrónico")).toBeVisible();

            // Submit button
            await expect(
                page.getByRole("button", { name: "Enviar enlace de recuperación" })
            ).toBeVisible();

            // Support link
            await expect(page.getByText("¿Sigues teniendo problemas?")).toBeVisible();
            await expect(page.getByText("Contacta con soporte")).toBeVisible();
        });

        test("should display success state after form submission", async ({ page }) => {
            // Fill and submit form
            const emailInput = page.getByLabel("Correo electrónico");
            await emailInput.fill("test@example.com");

            const submitButton = page.getByRole("button", {
                name: "Enviar enlace de recuperación",
            });
            await submitButton.click();

            // Wait for success state (1.5s simulation + buffer)
            await page.waitForTimeout(2000);

            // Check success state elements
            await expect(page.getByRole("heading", { name: "Revisa tu correo" })).toBeVisible();
            await expect(page.getByRole("button", { name: "Enviar de nuevo" })).toBeVisible();

            // Check mail icon is displayed
            const mailIcon = page.locator('svg[viewBox="0 0 24 24"]').first();
            await expect(mailIcon).toBeVisible();
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
        test("should allow typing in email input", async ({ page }) => {
            const emailInput = page.getByLabel("Correo electrónico");
            await emailInput.fill("test@example.com");
            await expect(emailInput).toHaveValue("test@example.com");
        });

        test("should show loading state during submission", async ({ page }) => {
            const emailInput = page.getByLabel("Correo electrónico");
            await emailInput.fill("test@example.com");

            const submitButton = page.getByRole("button", {
                name: "Enviar enlace de recuperación",
            });
            await submitButton.click();

            // Check loading state immediately after click
            await expect(page.getByRole("button", { name: "Enviando..." })).toBeVisible();

            // Input should be disabled during loading
            await expect(emailInput).toBeDisabled();
        });

        test("should handle form submission", async ({ page }) => {
            const emailInput = page.getByLabel("Correo electrónico");
            const submitButton = page.getByRole("button", {
                name: "Enviar enlace de recuperación",
            });

            // Fill form
            await emailInput.fill("test@example.com");

            // Listen for console logs
            const consoleLogs: string[] = [];
            page.on("console", (msg) => {
                if (msg.type() === "log") {
                    consoleLogs.push(msg.text());
                }
            });

            // Submit form
            await submitButton.click();

            // Wait for submission to complete
            await page.waitForTimeout(2000);

            // Verify console log was called
            expect(
                consoleLogs.some((log) => log.includes("Password reset requested for:"))
            ).toBeTruthy();
            expect(consoleLogs.some((log) => log.includes("test@example.com"))).toBeTruthy();
        });

        test("should handle resend button click", async ({ page }) => {
            // Submit form first
            const emailInput = page.getByLabel("Correo electrónico");
            await emailInput.fill("test@example.com");

            const submitButton = page.getByRole("button", {
                name: "Enviar enlace de recuperación",
            });
            await submitButton.click();

            // Wait for success state
            await page.waitForTimeout(2000);

            // Click resend button
            const resendButton = page.getByRole("button", { name: "Enviar de nuevo" });
            await resendButton.click();

            // Should return to form state
            await expect(
                page.getByRole("heading", { name: "Restablecer contraseña" })
            ).toBeVisible();
            await expect(page.getByLabel("Correo electrónico")).toBeVisible();
            await expect(page.getByLabel("Correo electrónico")).toHaveValue("");
        });

        test("should handle back to login button click", async ({ page }) => {
            const backButton = page.getByRole("link", { name: "Volver al inicio de sesión" });

            await backButton.click();

            // Wait for navigation
            await page.waitForURL("/login");

            // Verify we're on login page
            expect(page.url()).toContain("/login");
        });

        test("should have working support link", async ({ page }) => {
            const supportLink = page.getByText("Contacta con soporte");

            // Check that the link points to contact sales page
            await expect(supportLink).toHaveAttribute("href", "/contact-sales");
        });
    });

    test.describe("Accessibility", () => {
        test("should have proper form labels", async ({ page }) => {
            // Check that email input has associated label
            await expect(page.getByLabel("Correo electrónico")).toBeVisible();
        });

        test("should have proper button semantics", async ({ page }) => {
            // Back link (router-link renders as anchor)
            const backLink = page.getByRole("link", { name: "Volver al inicio de sesión" });
            await expect(backLink).toBeVisible();

            // Submit button
            const submitButton = page.getByRole("button", {
                name: "Enviar enlace de recuperación",
            });
            await expect(submitButton).toHaveAttribute("type", "submit");
        });

        test("should support keyboard navigation", async ({ page }) => {
            const emailInput = page.getByLabel("Correo electrónico");
            const submitButton = page.getByRole("button", {
                name: "Enviar enlace de recuperación",
            });

            // Click on email input to start navigation
            await emailInput.click();
            await expect(emailInput).toBeFocused();

            // Tab to submit button
            await page.keyboard.press("Tab");
            await expect(submitButton).toBeFocused();
        });

        test("should allow form submission via Enter key", async ({ page }) => {
            const emailInput = page.getByLabel("Correo electrónico");

            // Fill email and press Enter
            await emailInput.fill("test@example.com");
            await emailInput.press("Enter");

            // Wait for submission
            await page.waitForTimeout(2000);

            // Should show success state
            await expect(page.getByRole("heading", { name: "Revisa tu correo" })).toBeVisible();
        });
    });
});
