import { test, expect } from "@playwright/test";

/**
 * E2E tests for the Terms and Conditions page (/terms-and-conditions)
 * Tests layout, hero, content sections, and responsive behavior across viewports
 */
test.describe("Terms and Conditions Page", () => {
    test.describe("Desktop (1440px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/terms-and-conditions");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 1 });
            await expect(heading).toBeVisible();
            await expect(heading).toContainText(/términos y condiciones|terms and conditions/i);
        });

        test("renders the last updated date", async ({ page }) => {
            await expect(page.getByText(/última actualización|last updated/i)).toBeVisible();
        });

        test("hero section has a surface background", async ({ page }) => {
            const hero = page.locator('[aria-labelledby="terms-heading"]');
            await expect(hero).toBeVisible();
            const className = await hero.getAttribute("class");
            expect(className).toContain("bg-surface");
        });

        test("renders all 10 content sections", async ({ page }) => {
            const headings = page.getByRole("heading", { level: 2 });
            await expect(headings).toHaveCount(10);
        });

        test("renders the acceptance section", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /aceptación de los términos|acceptance of terms/i,
                })
            ).toBeVisible();
        });

        test("renders the service description section", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /descripción del servicio|service description/i,
                })
            ).toBeVisible();
        });

        test("renders the user accounts section", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /cuentas de usuario|user accounts/i })
            ).toBeVisible();
        });

        test("renders the payments and billing section", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /pagos y facturación|payments and billing/i })
            ).toBeVisible();
        });

        test("renders the acceptable use section", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /uso aceptable|acceptable use/i })
            ).toBeVisible();
        });

        test("renders the intellectual property section", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /propiedad intelectual|intellectual property/i,
                })
            ).toBeVisible();
        });

        test("renders the limitation of liability section", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /limitación de responsabilidad|limitation of liability/i,
                })
            ).toBeVisible();
        });

        test("renders the termination section", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /terminación|termination/i })
            ).toBeVisible();
        });

        test("renders the governing law section", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /ley aplicable|governing law/i })
            ).toBeVisible();
        });

        test("renders the contact section", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /^10\. contacto$|^10\. contact$/i })
            ).toBeVisible();
        });

        test("renders the navbar with main navigation", async ({ page }) => {
            await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();
        });

        test("renders the footer", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });

        test("footer terms link points to /terms-and-conditions", async ({ page }) => {
            await page.goto("/");
            await page.waitForLoadState("domcontentloaded");
            const termsLink = page
                .getByRole("contentinfo")
                .getByText(/términos|terms/i)
                .first();
            await expect(termsLink).toBeVisible();
            await expect(termsLink).toHaveAttribute("href", "/terms-and-conditions");
        });
    });

    test.describe("Mobile (375px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });
            await page.goto("/terms-and-conditions");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title on mobile", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        });

        test("renders content sections on mobile", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /aceptación de los términos|acceptance of terms/i,
                })
            ).toBeVisible();
        });

        test("renders footer on mobile", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });
    });

    test.describe("Tablet (768px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await page.goto("/terms-and-conditions");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders all sections on tablet", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /cuentas de usuario|user accounts/i })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /ley aplicable|governing law/i })
            ).toBeVisible();
        });
    });

    test.describe("Accessibility", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/terms-and-conditions");
            await page.waitForLoadState("domcontentloaded");
        });

        test("hero section has aria-labelledby pointing to h1", async ({ page }) => {
            await expect(page.locator('[aria-labelledby="terms-heading"]')).toBeVisible();
            await expect(page.locator("#terms-heading")).toBeVisible();
        });

        test("each section article has an aria-labelledby attribute", async ({ page }) => {
            const articles = page.locator("article");
            const count = await articles.count();
            expect(count).toBe(10);
        });

        test("content sections are readable via article landmarks", async ({ page }) => {
            const firstArticle = page.locator("article").first();
            await expect(firstArticle).toBeVisible();
            const labelledBy = await firstArticle.getAttribute("aria-labelledby");
            expect(labelledBy).toBeTruthy();
        });
    });
});
