import { test, expect } from "@playwright/test";

/**
 * E2E tests for the Customer Management page (/customer-management)
 * Tests layout, hero, screenshot, feature grid, and responsive behavior
 */
test.describe("Customer Management Page", () => {
    test.describe("Desktop (1440px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/customer-management");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 1 });
            await expect(heading).toBeVisible();
            await expect(heading).toContainText(/control total|total control/i);
        });

        test("renders the badge chip", async ({ page }) => {
            await expect(
                page.getByText(/gestión de clientes|customer management/i).first()
            ).toBeVisible();
        });

        test("hero section has a primary-light background", async ({ page }) => {
            const hero = page.locator('[aria-labelledby="customer-management-heading"]');
            await expect(hero).toBeVisible();
            const className = await hero.getAttribute("class");
            expect(className).toContain("bg-primary-light");
        });

        test("renders the CTA button linking to /demo", async ({ page }) => {
            const cta = page.getByRole("link", {
                name: /probar gestión de clientes|try client management/i,
            });
            await expect(cta).toBeVisible();
            await expect(cta).toHaveAttribute("href", "/demo");
        });

        test("renders the screenshot image", async ({ page }) => {
            const img = page.getByRole("img");
            await expect(img).toBeVisible();
        });

        test("renders all 4 feature headings", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /registro rápido|quick registration/i })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /filtros avanzados|advanced filters/i })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /historial completo|complete history/i })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /estados de servicio|service status/i })
            ).toBeVisible();
        });

        test("features render in a 4-column grid on desktop", async ({ page }) => {
            const grid = page.locator(".lg\\:grid-cols-4");
            await expect(grid).toBeVisible();
        });

        test("renders the navbar", async ({ page }) => {
            await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();
        });

        test("renders the footer", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });

        test("Products dropdown links to customer management page", async ({ page }) => {
            await page.goto("/");
            await page.waitForLoadState("domcontentloaded");
            const productsMenu = page.getByRole("button", { name: /producto|product/i });
            await productsMenu.click();
            const clientsLink = page.getByRole("menuitem", {
                name: /clientes|clients/i,
            });
            await expect(clientsLink).toBeVisible();
            await expect(clientsLink).toHaveAttribute("href", "/customer-management");
        });
    });

    test.describe("Mobile (375px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });
            await page.goto("/customer-management");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title on mobile", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        });

        test("renders the CTA button on mobile", async ({ page }) => {
            await expect(
                page.getByRole("link", {
                    name: /probar gestión de clientes|try client management/i,
                })
            ).toBeVisible();
        });

        test("renders feature cards stacked on mobile", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /registro rápido|quick registration/i })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /filtros avanzados|advanced filters/i })
            ).toBeVisible();
        });

        test("renders footer on mobile", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });
    });

    test.describe("Tablet (768px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await page.goto("/customer-management");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders all sections on tablet", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(page.getByRole("img")).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /registro rápido|quick registration/i })
            ).toBeVisible();
        });
    });

    test.describe("Accessibility", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/customer-management");
            await page.waitForLoadState("domcontentloaded");
        });

        test("hero section has aria-labelledby pointing to h1", async ({ page }) => {
            await expect(
                page.locator('[aria-labelledby="customer-management-heading"]')
            ).toBeVisible();
            await expect(page.locator("#customer-management-heading")).toBeVisible();
        });

        test("screenshot image has descriptive alt text", async ({ page }) => {
            const img = page.getByRole("img");
            const alt = await img.getAttribute("alt");
            expect(alt).toBeTruthy();
            expect(alt!.length).toBeGreaterThan(5);
        });

        test("feature icons are hidden from screen readers", async ({ page }) => {
            const hiddenIcons = page.locator("[aria-hidden='true']");
            const count = await hiddenIcons.count();
            expect(count).toBeGreaterThan(0);
        });
    });
});
