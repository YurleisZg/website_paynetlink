import { test, expect } from "@playwright/test";

/**
 * E2E tests for the About page (/about)
 * Tests layout, content sections, and responsive behavior across viewports
 */
test.describe("About Page", () => {
    test.describe("Desktop (1440px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/about");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title in the hero", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 1 });
            await expect(heading).toBeVisible();
            await expect(heading).toContainText(/sobre nosotros|about us/i);
        });

        test("hero section has a dark background", async ({ page }) => {
            const hero = page.locator('section[aria-labelledby="about-heading"]');
            await expect(hero).toBeVisible();
            const className = await hero.getAttribute("class");
            expect(className).toContain("bg-foreground");
        });

        test("renders the mission label", async ({ page }) => {
            await expect(page.getByText(/nuestra misión|our mission/i)).toBeVisible();
        });

        test("renders the mission heading", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 2, name: /democratiz/i });
            await expect(heading).toBeVisible();
        });

        test("renders the about image", async ({ page }) => {
            const img = page.getByRole("img");
            await expect(img).toBeVisible();
            await expect(img).toHaveAttribute("src", "/images/about.png");
        });

        test("renders the values section heading", async ({ page }) => {
            const heading = page.getByRole("heading", { name: /nuestros valores|our values/i });
            await expect(heading).toBeVisible();
        });

        test("renders all three value cards", async ({ page }) => {
            await expect(page.getByText(/pasión|passion/i)).toBeVisible();
            await expect(page.getByText(/confianza|trust/i)).toBeVisible();
            await expect(page.getByText(/innovación|innovation/i)).toBeVisible();
        });

        test("values section has a surface background", async ({ page }) => {
            const section = page.locator('section[aria-labelledby="values-heading"]');
            await expect(section).toBeVisible();
            const className = await section.getAttribute("class");
            expect(className).toContain("bg-surface");
        });

        test("renders the navbar with main navigation", async ({ page }) => {
            const nav = page.getByRole("navigation", { name: /main navigation/i });
            await expect(nav).toBeVisible();
        });

        test("renders the footer", async ({ page }) => {
            const footer = page.getByRole("contentinfo");
            await expect(footer).toBeVisible();
        });

        test("mission section displays in two-column layout", async ({ page }) => {
            const missionSection = page.locator("section").nth(1);
            const layout = missionSection.locator(".lg\\:flex-row");
            await expect(layout).toBeVisible();
        });
    });

    test.describe("Mobile (375px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });
            await page.goto("/about");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title on mobile", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 1 });
            await expect(heading).toBeVisible();
        });

        test("renders mission content on mobile", async ({ page }) => {
            await expect(page.getByText(/nuestra misión|our mission/i)).toBeVisible();
            await expect(page.getByRole("img")).toBeVisible();
        });

        test("renders value cards stacked on mobile", async ({ page }) => {
            await expect(page.getByText(/pasión|passion/i)).toBeVisible();
            await expect(page.getByText(/confianza|trust/i)).toBeVisible();
            await expect(page.getByText(/innovación|innovation/i)).toBeVisible();
        });

        test("renders footer on mobile", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });
    });

    test.describe("Tablet (768px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await page.goto("/about");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders all sections on tablet", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(page.getByText(/democratiz/i)).toBeVisible();
            await expect(page.getByText(/nuestros valores|our values/i)).toBeVisible();
        });
    });

    test.describe("Accessibility", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/about");
            await page.waitForLoadState("domcontentloaded");
        });

        test("hero section has aria-labelledby pointing to h1", async ({ page }) => {
            const hero = page.locator('[aria-labelledby="about-heading"]');
            await expect(hero).toBeVisible();
            const h1 = page.locator("#about-heading");
            await expect(h1).toBeVisible();
        });

        test("values section has aria-labelledby pointing to its heading", async ({ page }) => {
            const section = page.locator('[aria-labelledby="values-heading"]');
            await expect(section).toBeVisible();
            const heading = page.locator("#values-heading");
            await expect(heading).toBeVisible();
        });

        test("about image has descriptive alt text", async ({ page }) => {
            const img = page.getByRole("img");
            const alt = await img.getAttribute("alt");
            expect(alt).toBeTruthy();
            expect(alt!.length).toBeGreaterThan(5);
        });
    });
});
