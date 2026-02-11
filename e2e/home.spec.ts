import { test, expect } from "@playwright/test";

test.describe("Home", () => {
    test("should display the home page with the title PayNetLink", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByRole("heading", { name: /Welcome to PayNetLink/i })).toBeVisible();
    });

    test("should display the start link", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    });
});
