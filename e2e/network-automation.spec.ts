import { test, expect } from "@playwright/test";

/**
 * E2E tests for the Network Automation page (/network-automation)
 * Tests layout, hero, screenshot, feature grid, and responsive behavior
 */
test.describe("Network Automation Page", () => {
    test.describe("Desktop (1440px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/network-automation");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 1 });
            await expect(heading).toBeVisible();
            await expect(heading).toContainText(/tu red bajo control|your network under/i);
        });

        test("renders the badge chip", async ({ page }) => {
            await expect(
                page.getByText(/automatización mikrotik|mikrotik automation/i).first()
            ).toBeVisible();
        });

        test("hero section has a primary-light background", async ({ page }) => {
            const hero = page.locator('[aria-labelledby="network-automation-heading"]');
            await expect(hero).toBeVisible();
            const className = await hero.getAttribute("class");
            expect(className).toContain("bg-primary-light");
        });

        test("renders the CTA button linking to /demo", async ({ page }) => {
            const cta = page.getByRole("link", {
                name: /probar automatización de red|try network automation/i,
            });
            await expect(cta).toBeVisible();
            await expect(cta).toHaveAttribute("href", "/demo");
        });

        test("renders the screenshot image", async ({ page }) => {
            await expect(page.getByRole("img")).toBeVisible();
        });

        test("renders all 4 feature headings", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /conexión api directa|direct api connection/i })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /activación automática|automatic activation/i })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /suspensión por mora|suspension on default/i })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", {
                    name: /monitoreo en tiempo real|real-time monitoring/i,
                })
            ).toBeVisible();
        });

        test("features render in a 4-column grid on desktop", async ({ page }) => {
            await expect(page.locator(".lg\\:grid-cols-4")).toBeVisible();
        });

        test("renders the navbar", async ({ page }) => {
            await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();
        });

        test("renders the footer", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });

        test("Products dropdown links to network automation page", async ({ page }) => {
            await page.goto("/");
            await page.waitForLoadState("domcontentloaded");
            const productsMenu = page.getByRole("button", { name: /producto|product/i });
            await productsMenu.click();
            const networkLink = page.getByRole("menuitem", { name: /red|network/i });
            await expect(networkLink).toBeVisible();
            await expect(networkLink).toHaveAttribute("href", "/network-automation");
        });
    });

    test.describe("Mobile (375px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });
            await page.goto("/network-automation");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title on mobile", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        });

        test("renders the CTA button on mobile", async ({ page }) => {
            await expect(
                page.getByRole("link", {
                    name: /probar automatización de red|try network automation/i,
                })
            ).toBeVisible();
        });

        test("renders feature cards on mobile", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /conexión api directa|direct api connection/i })
            ).toBeVisible();
        });

        test("renders footer on mobile", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });
    });

    test.describe("Tablet (768px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await page.goto("/network-automation");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders all sections on tablet", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(page.getByRole("img")).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /activación automática|automatic activation/i })
            ).toBeVisible();
        });
    });

    test.describe("Accessibility", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/network-automation");
            await page.waitForLoadState("domcontentloaded");
        });

        test("hero section has aria-labelledby pointing to h1", async ({ page }) => {
            await expect(
                page.locator('[aria-labelledby="network-automation-heading"]')
            ).toBeVisible();
            await expect(page.locator("#network-automation-heading")).toBeVisible();
        });

        test("screenshot image has descriptive alt text", async ({ page }) => {
            const alt = await page.getByRole("img").getAttribute("alt");
            expect(alt).toBeTruthy();
            expect(alt!.length).toBeGreaterThan(5);
        });

        test("feature icons are hidden from screen readers", async ({ page }) => {
            const count = await page.locator("[aria-hidden='true']").count();
            expect(count).toBeGreaterThan(0);
        });
    });
});
