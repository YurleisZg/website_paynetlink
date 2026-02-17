import { test, expect } from "@playwright/test";

test.describe("Contact Sales Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/contact-sales");
    });

    test.describe("Visual Regression", () => {
        test("should match snapshot on desktop (1440x900)", async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.waitForLoadState("networkidle");

            // Wait for fonts to load
            await page.waitForTimeout(500);

            // Take screenshot for visual regression
            await expect(page).toHaveScreenshot("contact-sales-desktop.png", {
                fullPage: true,
                animations: "disabled",
            });
        });

        test("should match snapshot on tablet (768x1024)", async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await page.waitForLoadState("networkidle");

            // Wait for fonts to load
            await page.waitForTimeout(500);

            // Take screenshot for visual regression
            await expect(page).toHaveScreenshot("contact-sales-tablet.png", {
                fullPage: true,
                animations: "disabled",
            });
        });

        test("should match snapshot on mobile (375x812)", async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });
            await page.waitForLoadState("networkidle");

            // Wait for fonts to load
            await page.waitForTimeout(500);

            // Take screenshot for visual regression
            await expect(page).toHaveScreenshot("contact-sales-mobile.png", {
                fullPage: true,
                animations: "disabled",
            });
        });
    });

    test.describe("Layout and Structure", () => {
        test("should display logo and title on desktop", async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });

            await expect(page.getByText("PayNetLink").first()).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /Hablemos de tu plan Enterprise/i })
            ).toBeVisible();
        });

        test("should display contact information", async ({ page }) => {
            await expect(page.getByText("ventas@paynetlink.com")).toBeVisible();
            await expect(page.getByText("+57 (1) 234 5678")).toBeVisible();
            await expect(page.getByText(/Lun-Vie.*8:00 AM.*6:00 PM COT/i)).toBeVisible();
        });

        test("should display form title", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /Solicitar información/i })
            ).toBeVisible();
        });

        test("should display all form fields", async ({ page }) => {
            await expect(page.getByLabel("Nombre", { exact: true })).toBeVisible();
            await expect(page.getByLabel("Apellido")).toBeVisible();
            await expect(page.getByLabel("Correo electrónico")).toBeVisible();
            await expect(page.getByLabel("Teléfono")).toBeVisible();
            await expect(page.getByLabel("Nombre de tu ISP")).toBeVisible();
            await expect(page.getByLabel("¿Cuántos clientes gestionas?")).toBeVisible();
            await expect(page.getByLabel(/Mensaje.*opcional/i)).toBeVisible();
        });

        test("should display submit button", async ({ page }) => {
            await expect(page.getByRole("button", { name: /Enviar solicitud/i })).toBeVisible();
        });

        test("should not have horizontal overflow on any viewport", async ({ page }) => {
            const viewports = [
                { width: 1440, height: 900 },
                { width: 768, height: 1024 },
                { width: 375, height: 812 },
            ];

            for (const viewport of viewports) {
                await page.setViewportSize(viewport);
                const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
                const clientWidth = await page.evaluate(() => document.body.clientWidth);
                expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
            }
        });
    });

    test.describe("Responsive Behavior", () => {
        test("should display two-column layout on desktop", async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });

            // Both sections should be visible horizontally
            const leftSection = page.locator("text=Hablemos de tu plan Enterprise").first();
            const rightSection = page.locator("text=Solicitar información").first();

            const leftBox = await leftSection.boundingBox();
            const rightBox = await rightSection.boundingBox();

            expect(leftBox).toBeTruthy();
            expect(rightBox).toBeTruthy();

            // Right section should be to the right of left section
            expect(rightBox!.x).toBeGreaterThan(leftBox!.x + leftBox!.width);
        });

        test("should stack vertically on mobile", async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });

            const leftSection = page.locator("text=Hablemos de tu plan Enterprise").first();
            const rightSection = page.locator("text=Solicitar información").first();

            const leftBox = await leftSection.boundingBox();
            const rightBox = await rightSection.boundingBox();

            expect(leftBox).toBeTruthy();
            expect(rightBox).toBeTruthy();

            // Right section should be below left section on mobile
            expect(rightBox!.y).toBeGreaterThan(leftBox!.y + leftBox!.height);
        });
    });

    test.describe("Form Interactions", () => {
        test("should allow filling out all form fields", async ({ page }) => {
            await page.getByLabel("Nombre", { exact: true }).fill("Juan");
            await page.getByLabel("Apellido").fill("Pérez");
            await page.getByLabel("Correo electrónico").fill("juan@example.com");
            await page.getByLabel("Teléfono").fill("+57 300 123 4567");
            await page.getByLabel("Nombre de tu ISP").fill("FibraNet Colombia");
            await page.getByLabel("¿Cuántos clientes gestionas?").selectOption("51-200");
            await page.getByLabel(/Mensaje.*opcional/i).fill("Me interesa el plan enterprise");

            // Verify values were filled
            await expect(page.getByLabel("Nombre", { exact: true })).toHaveValue("Juan");
            await expect(page.getByLabel("Apellido")).toHaveValue("Pérez");
            await expect(page.getByLabel("Correo electrónico")).toHaveValue("juan@example.com");
        });

        test("should handle form submission", async ({ page }) => {
            // Fill required fields
            await page.getByLabel("Nombre", { exact: true }).fill("Juan");
            await page.getByLabel("Apellido").fill("Pérez");
            await page.getByLabel("Correo electrónico").fill("juan@example.com");
            await page.getByLabel("Teléfono").fill("+57 300 123 4567");
            await page.getByLabel("Nombre de tu ISP").fill("FibraNet Colombia");
            await page.getByLabel("¿Cuántos clientes gestionas?").selectOption("51-200");

            // Listen for console logs
            const consoleLogs: string[] = [];
            page.on("console", (msg) => {
                if (msg.type() === "log") {
                    consoleLogs.push(msg.text());
                }
            });

            // Submit form
            await page.getByRole("button", { name: /Enviar solicitud/i }).click();
            await page.waitForTimeout(100);

            // Verify console log was called (placeholder for actual submission)
            expect(consoleLogs.some((log) => log.includes("Form submitted"))).toBeTruthy();
        });

        test("should require all mandatory fields", async ({ page }) => {
            // Try to submit without filling fields
            await page.getByRole("button", { name: /Enviar solicitud/i }).click();

            // Check that form is not submitted (browser validation should prevent it)
            const firstNameInput = page.getByLabel("Nombre", { exact: true });
            await expect(firstNameInput).toBeFocused();
        });
    });

    test.describe("Accessibility", () => {
        test("should have proper focus states on form fields", async ({ page }) => {
            const firstName = page.getByLabel("Nombre", { exact: true });
            await firstName.focus();
            await expect(firstName).toBeFocused();

            const email = page.getByLabel("Correo electrónico");
            await email.focus();
            await expect(email).toBeFocused();
        });

        test("should support keyboard navigation", async ({ page }) => {
            // Focus first field
            await page.getByLabel("Nombre", { exact: true }).focus();

            // Tab through fields
            await page.keyboard.press("Tab");
            await expect(page.getByLabel("Apellido")).toBeFocused();

            await page.keyboard.press("Tab");
            await expect(page.getByLabel("Correo electrónico")).toBeFocused();
        });
    });
});
