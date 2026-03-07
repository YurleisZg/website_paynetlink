import { test, expect } from "@playwright/test";

/**
 * E2E tests for the Notifications page (/notifications)
 * Tests layout, hero, screenshot, feature grid, channels grid, CTA, and responsive behavior
 */
test.describe("Notifications Page", () => {
    test.describe("Desktop (1440px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/notifications");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 1 });
            await expect(heading).toBeVisible();
            await expect(heading).toContainText(/mantén informados|keep your clients informed/i);
        });

        test("renders the badge chip", async ({ page }) => {
            await expect(page.getByText(/^notificaciones$|^notifications$/i).first()).toBeVisible();
        });

        test("hero section has a primary-light background", async ({ page }) => {
            const hero = page.locator('[aria-labelledby="notifications-heading"]');
            await expect(hero).toBeVisible();
            const className = await hero.getAttribute("class");
            expect(className).toContain("bg-primary-light");
        });

        test("renders the CTA button linking to /register", async ({ page }) => {
            const cta = page.getByRole("link", {
                name: /configurar notificaciones|configure notifications/i,
            });
            await expect(cta).toBeVisible();
            await expect(cta).toHaveAttribute("href", "/register");
        });

        test("renders the screenshot image", async ({ page }) => {
            await expect(page.getByRole("img")).toBeVisible();
        });

        test("renders all 4 feature headings", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /multicanal integrado|integrated multichannel/i })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /alertas automáticas|automatic alerts/i })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", {
                    name: /plantillas personalizables|customizable templates/i,
                })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /reportes de entrega|delivery reports/i })
            ).toBeVisible();
        });

        test("features render in a 4-column grid on desktop", async ({ page }) => {
            await expect(page.locator(".lg\\:grid-cols-4").first()).toBeVisible();
        });

        test("renders the channels section heading", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /canales de notificación disponibles|available notification channels/i,
                })
            ).toBeVisible();
        });

        test("renders all 4 channel cards", async ({ page }) => {
            await expect(page.getByRole("heading", { name: /^sms$/i })).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /correo electrónico|email/i })
            ).toBeVisible();
            await expect(page.getByRole("heading", { name: /whatsapp/i })).toBeVisible();
            await expect(page.getByRole("heading", { name: /push notifications/i })).toBeVisible();
        });

        test("channels render in a 4-column grid on desktop", async ({ page }) => {
            await expect(page.locator(".lg\\:grid-cols-4").nth(1)).toBeVisible();
        });

        test("renders the bottom CTA section", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /automatiza la comunicación|automate communication/i,
                })
            ).toBeVisible();
        });

        test("CTA section activate button links to /register", async ({ page }) => {
            const activateLink = page.getByRole("link", {
                name: /activar notificaciones|activate notifications/i,
            });
            await expect(activateLink).toBeVisible();
            await expect(activateLink).toHaveAttribute("href", "/register");
        });

        test("CTA section talk to sales button links to /contact", async ({ page }) => {
            const salesLink = page.getByRole("link", {
                name: /hablar con ventas|talk to sales/i,
            });
            await expect(salesLink).toBeVisible();
            await expect(salesLink).toHaveAttribute("href", "/contact");
        });

        test("renders the navbar", async ({ page }) => {
            await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();
        });

        test("renders the footer", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });

        test("Products dropdown links to notifications page", async ({ page }) => {
            await page.goto("/");
            await page.waitForLoadState("domcontentloaded");
            const productsMenu = page.getByRole("button", { name: /producto|product/i });
            await productsMenu.click();
            const notificationsLink = page.getByRole("menuitem", {
                name: /notificaciones|notifications/i,
            });
            await expect(notificationsLink).toBeVisible();
            await expect(notificationsLink).toHaveAttribute("href", "/notifications");
        });
    });

    test.describe("Mobile (375px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });
            await page.goto("/notifications");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title on mobile", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        });

        test("renders the CTA button on mobile", async ({ page }) => {
            await expect(
                page.getByRole("link", {
                    name: /configurar notificaciones|configure notifications/i,
                })
            ).toBeVisible();
        });

        test("renders feature cards on mobile", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /multicanal integrado|integrated multichannel/i })
            ).toBeVisible();
        });

        test("renders channel cards on mobile", async ({ page }) => {
            await expect(page.getByRole("heading", { name: /^sms$/i })).toBeVisible();
        });

        test("renders footer on mobile", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });
    });

    test.describe("Tablet (768px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await page.goto("/notifications");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders all sections on tablet", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(page.getByRole("img")).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /alertas automáticas|automatic alerts/i })
            ).toBeVisible();
            await expect(page.getByRole("heading", { name: /whatsapp/i })).toBeVisible();
        });
    });

    test.describe("Accessibility", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/notifications");
            await page.waitForLoadState("domcontentloaded");
        });

        test("hero section has aria-labelledby pointing to h1", async ({ page }) => {
            await expect(page.locator('[aria-labelledby="notifications-heading"]')).toBeVisible();
            await expect(page.locator("#notifications-heading")).toBeVisible();
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

        test("channels section has aria-labelledby", async ({ page }) => {
            await expect(
                page.locator('[aria-labelledby="notifications-channels-heading"]')
            ).toBeVisible();
        });
    });
});
