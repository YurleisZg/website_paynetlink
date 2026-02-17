import { test, expect } from "@playwright/test";

test.describe("Demo Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/demo");
    });

    test("should display the demo page with correct structure", async ({ page }) => {
        // Verify title
        await expect(
            page.getByRole("heading", { name: /Demo interactiva de PayNetLink/i })
        ).toBeVisible();

        // Verify subtitle
        await expect(
            page.getByText(/Explora las funcionalidades principales de la plataforma/i)
        ).toBeVisible();

        // Verify video player is visible
        await expect(page.getByRole("button", { name: /Reproducir video demo/i })).toBeVisible();

        // Verify video label
        await expect(page.getByText(/Ver demostración/i)).toBeVisible();

        // Verify action links
        await expect(page.getByText(/Agendar demo personalizada/i)).toBeVisible();

        // Verify navbar logo
        const nav = page.locator("header");
        await expect(nav.getByText("PayNetLink").first()).toBeVisible();
        await expect(page.getByRole("link", { name: /Comenzar prueba gratis/i })).toBeVisible();
    });

    test("should not have horizontal overflow", async ({ page }) => {
        const body = page.locator("body");
        const bodyBox = await body.boundingBox();
        const scrollWidth = await body.evaluate((el) => el.scrollWidth);

        expect(bodyBox).toBeTruthy();
        if (bodyBox) {
            expect(scrollWidth).toBeLessThanOrEqual(bodyBox.width + 1);
        }
    });

    test("should be responsive on tablet", async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });

        // Verify key elements are still visible
        await expect(
            page.getByRole("heading", { name: /Demo interactiva de PayNetLink/i })
        ).toBeVisible();
        await expect(page.getByRole("button", { name: /Reproducir video demo/i })).toBeVisible();
    });

    test("should be responsive on mobile", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });

        // Verify key elements are still visible
        await expect(
            page.getByRole("heading", { name: /Demo interactiva de PayNetLink/i })
        ).toBeVisible();
        await expect(page.getByRole("button", { name: /Reproducir video demo/i })).toBeVisible();
    });

    test("should handle play button click", async ({ page }) => {
        const playButton = page.getByRole("button", { name: /Reproducir video demo/i });

        // Verify button is clickable
        await expect(playButton).toBeEnabled();

        // Click the button
        await playButton.click();

        // Note: In a real implementation, this would open a modal or navigate
        // For now, we just verify the button is interactive
    });
});
