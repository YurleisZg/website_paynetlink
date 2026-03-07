import { test, expect } from "@playwright/test";

/**
 * E2E tests for the Privacy Policy page (/privacy)
 * Tests layout, content sections, and responsive behavior across viewports
 */
test.describe("Privacy Page", () => {
    test.describe("Desktop (1440px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/privacy");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 1 });
            await expect(heading).toBeVisible();
            await expect(heading).toContainText(/política de privacidad|privacy policy/i);
        });

        test("renders the last updated date", async ({ page }) => {
            await expect(page.getByText(/última actualización|last updated/i)).toBeVisible();
        });

        test("hero section has a surface background", async ({ page }) => {
            const hero = page.locator('[aria-labelledby="privacy-heading"]');
            await expect(hero).toBeVisible();
            const className = await hero.getAttribute("class");
            expect(className).toContain("bg-surface");
        });

        test("renders all 8 content sections", async ({ page }) => {
            const headings = page.getByRole("heading", { level: 2 });
            await expect(headings).toHaveCount(8);
        });

        test("renders information collected section", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /información que recopilamos|information we collect/i,
                })
            ).toBeVisible();
        });

        test("renders use of information section", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /uso de la información|use of information/i })
            ).toBeVisible();
        });

        test("renders data security section", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /seguridad de los datos|data security/i })
            ).toBeVisible();
        });

        test("renders user rights section", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /derechos del usuario|user rights/i })
            ).toBeVisible();
        });

        test("renders the navbar with main navigation", async ({ page }) => {
            await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();
        });

        test("renders the footer", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });

        test("footer privacy link points to /privacy", async ({ page }) => {
            await page.goto("/");
            await page.waitForLoadState("domcontentloaded");
            const privacyLink = page.getByRole("contentinfo").getByText(/privacidad|privacy/i);
            await expect(privacyLink).toBeVisible();
            await expect(privacyLink).toHaveAttribute("href", "/privacy");
        });
    });

    test.describe("Mobile (375px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });
            await page.goto("/privacy");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title on mobile", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        });

        test("renders content sections on mobile", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /información que recopilamos|information we collect/i,
                })
            ).toBeVisible();
        });

        test("renders footer on mobile", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });
    });

    test.describe("Accessibility", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/privacy");
            await page.waitForLoadState("domcontentloaded");
        });

        test("hero section has aria-labelledby pointing to h1", async ({ page }) => {
            const hero = page.locator('[aria-labelledby="privacy-heading"]');
            await expect(hero).toBeVisible();
            await expect(page.locator("#privacy-heading")).toBeVisible();
        });

        test("each section has an accessible heading", async ({ page }) => {
            const articles = page.locator("article");
            const count = await articles.count();
            expect(count).toBe(8);
        });
    });
});
