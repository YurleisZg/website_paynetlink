import { test } from "@playwright/test";

test.describe("Search Feature Demo", () => {
    test("should capture search closed state on desktop", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto("/");
        await page.waitForLoadState("networkidle");
        await page.screenshot({
            path: "e2e/screenshots/search-closed-desktop.png",
            fullPage: false,
        });
    });

    test("should capture search open state on desktop", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        // Click search button
        const searchButton = page.getByRole("button", { name: /open search/i });
        await searchButton.click();

        // Wait for animation
        await page.waitForTimeout(400);

        await page.screenshot({
            path: "e2e/screenshots/search-open-desktop.png",
            fullPage: false,
        });
    });

    test("should capture search open state on mobile", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        // Click search button
        const searchButton = page.getByRole("button", { name: /open search/i });
        await searchButton.click();

        // Wait for animation
        await page.waitForTimeout(400);

        await page.screenshot({
            path: "e2e/screenshots/search-open-mobile.png",
            fullPage: false,
        });
    });
});
