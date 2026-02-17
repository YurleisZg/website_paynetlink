import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/login");
    });

    test.describe("Layout and Rendering", () => {
        test("should display left panel on desktop", async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });

            // Check logo and branding (using first() to select the left panel logo)
            await expect(page.getByText("PayNetLink").first()).toBeVisible();
            await expect(
                page.getByText("Simplifica tu ISP. Automatiza, cobra y crece.")
            ).toBeVisible();
        });

        test("should hide left panel on mobile", async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });

            // Left panel content should be hidden on mobile (check for specific left panel text)
            await expect(
                page.getByText("Simplifica tu ISP. Automatiza, cobra y crece.").first()
            ).toBeHidden();
        });

        test("should display all form elements", async ({ page }) => {
            // Title and subtitle
            await expect(page.getByRole("heading", { name: "Iniciar sesión" })).toBeVisible();
            await expect(
                page.getByText("Ingresa tus credenciales para acceder a tu cuenta")
            ).toBeVisible();

            // Form fields
            await expect(page.getByLabel("Correo electrónico")).toBeVisible();
            await expect(page.getByLabel("Contraseña")).toBeVisible();

            // Checkbox and links
            await expect(page.getByLabel("Recordarme")).toBeVisible();
            await expect(page.getByText("¿Olvidaste tu contraseña?")).toBeVisible();

            // Submit button
            await expect(page.getByRole("button", { name: "Iniciar sesión" })).toBeVisible();

            // Social login buttons
            await expect(page.getByRole("button", { name: /Google/i })).toBeVisible();
            await expect(page.getByRole("button", { name: /Microsoft/i })).toBeVisible();

            // Sign up link
            await expect(page.getByText("¿No tienes cuenta?")).toBeVisible();
            await expect(page.getByText("Regístrate gratis")).toBeVisible();
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

        test("should toggle remember me checkbox", async ({ page }) => {
            const checkbox = page.getByLabel("Recordarme");

            // Initially unchecked
            await expect(checkbox).not.toBeChecked();

            // Click to check
            await checkbox.click();
            await expect(checkbox).toBeChecked();

            // Click to uncheck
            await checkbox.click();
            await expect(checkbox).not.toBeChecked();
        });

        test("should handle form submission", async ({ page }) => {
            const emailInput = page.getByLabel("Correo electrónico");
            const passwordInput = page.getByLabel("Contraseña");
            const submitButton = page.getByRole("button", { name: "Iniciar sesión" });

            // Fill form
            await emailInput.fill("test@example.com");
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

            // Verify console log was called (login handler)
            expect(consoleLogs.some((log) => log.includes("Login attempt"))).toBeTruthy();
        });

        test("should handle forgot password click", async ({ page }) => {
            const forgotPasswordLink = page.getByText("¿Olvidaste tu contraseña?");

            await forgotPasswordLink.click();

            // Wait for navigation
            await page.waitForURL("/forgot-password");

            // Verify we're on forgot password page
            expect(page.url()).toContain("/forgot-password");
        });

        test("should handle social login clicks", async ({ page }) => {
            const consoleLogs: string[] = [];
            page.on("console", (msg) => {
                if (msg.type() === "log") {
                    consoleLogs.push(msg.text());
                }
            });

            // Google login
            await page.getByRole("button", { name: /Google/i }).click();
            await page.waitForTimeout(100);
            expect(consoleLogs.some((log) => log.includes("Google login"))).toBeTruthy();

            // Microsoft login
            await page.getByRole("button", { name: /Microsoft/i }).click();
            await page.waitForTimeout(100);
            expect(consoleLogs.some((log) => log.includes("Microsoft login"))).toBeTruthy();
        });

        test("should handle sign up click", async ({ page }) => {
            const signUpLink = page.getByText("Regístrate gratis");

            await signUpLink.click();

            // Wait for navigation
            await page.waitForURL("/register");

            // Verify we're on register page
            expect(page.url()).toContain("/register");
        });
    });

    test.describe("Accessibility", () => {
        test("should have proper form labels", async ({ page }) => {
            // Check that inputs have associated labels
            await expect(page.getByLabel("Correo electrónico")).toBeVisible();
            await expect(page.getByLabel("Contraseña")).toBeVisible();
            await expect(page.getByLabel("Recordarme")).toBeVisible();
        });

        test("should have proper button semantics", async ({ page }) => {
            // Submit button
            const submitButton = page.getByRole("button", { name: "Iniciar sesión" });
            await expect(submitButton).toHaveAttribute("type", "submit");

            // Social login buttons
            const googleButton = page.getByRole("button", { name: /Google/i });
            await expect(googleButton).toBeVisible();

            const microsoftButton = page.getByRole("button", { name: /Microsoft/i });
            await expect(microsoftButton).toBeVisible();
        });

        test("should support keyboard navigation", async ({ page }) => {
            const emailInput = page.getByLabel("Correo electrónico");
            const passwordInput = page.getByLabel("Contraseña");

            // Click on email input to start navigation
            await emailInput.click();
            await expect(emailInput).toBeFocused();

            // Tab to password input
            await page.keyboard.press("Tab");
            await expect(passwordInput).toBeFocused();
        });
    });
});
