import { test, expect } from "@playwright/test";

/**
 * E2E tests for the Plans and Prices page (/plans-and-prices)
 * Tests layout, pricing cards, billing toggle, FAQ accordion, CTA, and responsive behavior
 */
test.describe("Plans and Prices Page", () => {
    test.describe("Desktop (1440px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/plans-and-prices");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 1 });
            await expect(heading).toBeVisible();
            await expect(heading).toContainText(/elige el plan|choose the perfect plan/i);
        });

        test("renders the badge", async ({ page }) => {
            await expect(
                page.getByText(/planes y precios|plans and prices/i).first()
            ).toBeVisible();
        });

        test("hero section has a surface background", async ({ page }) => {
            const hero = page.locator('[aria-labelledby="plans-heading"]');
            await expect(hero).toBeVisible();
            const className = await hero.getAttribute("class");
            expect(className).toContain("bg-surface");
        });

        test("renders monthly billing toggle selected by default", async ({ page }) => {
            const monthly = page.getByRole("button", { name: /mensual|monthly/i });
            await expect(monthly).toBeVisible();
            await expect(monthly).toHaveAttribute("aria-pressed", "true");
        });

        test("renders annual billing toggle", async ({ page }) => {
            const annual = page.getByRole("button", { name: /anual.*20|annual.*20/i });
            await expect(annual).toBeVisible();
            await expect(annual).toHaveAttribute("aria-pressed", "false");
        });

        test("switches to annual billing on toggle click", async ({ page }) => {
            const annual = page.getByRole("button", { name: /anual.*20|annual.*20/i });
            await annual.click();
            await expect(annual).toHaveAttribute("aria-pressed", "true");
        });

        test("renders monthly prices by default", async ({ page }) => {
            await expect(page.getByText("$89.900")).toBeVisible();
            await expect(page.getByText("$189.900")).toBeVisible();
            await expect(page.getByText("$349.900")).toBeVisible();
        });

        test("renders annual prices after toggling", async ({ page }) => {
            await page.getByRole("button", { name: /anual.*20|annual.*20/i }).click();
            await expect(page.getByText("$71.920")).toBeVisible();
            await expect(page.getByText("$151.920")).toBeVisible();
            await expect(page.getByText("$279.920")).toBeVisible();
        });

        test("renders all 3 plan names", async ({ page }) => {
            await expect(page.getByRole("heading", { name: /^starter$/i })).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /^profesional$|^professional$/i })
            ).toBeVisible();
            await expect(page.getByRole("heading", { name: /^enterprise$/i })).toBeVisible();
        });

        test("renders the most popular badge on the professional plan", async ({ page }) => {
            await expect(page.getByText(/más popular|most popular/i)).toBeVisible();
        });

        test("pricing cards render in a 3-column grid on desktop", async ({ page }) => {
            await expect(page.locator(".lg\\:grid-cols-3")).toBeVisible();
        });

        test("starter plan CTA links to /register", async ({ page }) => {
            const starterCard = page.locator("div.flex.flex-col.rounded-xl").first();
            const cta = starterCard.getByRole("link", { name: /empezar ahora|get started/i });
            await expect(cta).toHaveAttribute("href", "/register");
        });

        test("enterprise plan CTA links to /contact", async ({ page }) => {
            const contactLinks = page.getByRole("link", {
                name: /contactar ventas|contact sales/i,
            });
            // At least one contact sales link (Enterprise card)
            await expect(contactLinks.first()).toHaveAttribute("href", "/contact");
        });

        test("renders the FAQ section heading", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /preguntas frecuentes|frequently asked questions/i,
                })
            ).toBeVisible();
        });

        test("renders all 5 FAQ accordion items", async ({ page }) => {
            const faqButtons = page.locator("[aria-expanded]");
            await expect(faqButtons).toHaveCount(5);
        });

        test("first FAQ item is expanded by default", async ({ page }) => {
            const firstFaqButton = page.locator("[aria-expanded]").first();
            await expect(firstFaqButton).toHaveAttribute("aria-expanded", "true");
        });

        test("clicking a closed FAQ item opens it", async ({ page }) => {
            const secondFaq = page.locator("[aria-expanded]").nth(1);
            await expect(secondFaq).toHaveAttribute("aria-expanded", "false");
            await secondFaq.click();
            await expect(secondFaq).toHaveAttribute("aria-expanded", "true");
        });

        test("renders the CTA section title", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /listo para llevar|ready to take/i })
            ).toBeVisible();
        });

        test("CTA start trial button links to /register", async ({ page }) => {
            await expect(
                page.getByRole("link", { name: /empezar prueba gratis|start free trial/i })
            ).toHaveAttribute("href", "/register");
        });

        test("renders the navbar", async ({ page }) => {
            await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();
        });

        test("renders the footer", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });

        test("Pricing nav link points to /plans-and-prices", async ({ page }) => {
            await page.goto("/");
            await page.waitForLoadState("domcontentloaded");
            const pricingLink = page.getByRole("link", { name: /^precios$|^pricing$/i });
            await expect(pricingLink).toHaveAttribute("href", "/plans-and-prices");
        });
    });

    test.describe("Mobile (375px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });
            await page.goto("/plans-and-prices");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title on mobile", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        });

        test("renders the billing toggle on mobile", async ({ page }) => {
            await expect(page.getByRole("button", { name: /mensual|monthly/i })).toBeVisible();
        });

        test("renders all 3 plan cards on mobile", async ({ page }) => {
            await expect(page.getByRole("heading", { name: /^starter$/i })).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /^profesional$|^professional$/i })
            ).toBeVisible();
            await expect(page.getByRole("heading", { name: /^enterprise$/i })).toBeVisible();
        });

        test("renders FAQ section on mobile", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /preguntas frecuentes|frequently asked questions/i,
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
            await page.goto("/plans-and-prices");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders all sections on tablet", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(page.getByRole("heading", { name: /^starter$/i })).toBeVisible();
            await expect(
                page.getByRole("heading", {
                    name: /preguntas frecuentes|frequently asked questions/i,
                })
            ).toBeVisible();
        });
    });

    test.describe("Accessibility", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/plans-and-prices");
            await page.waitForLoadState("domcontentloaded");
        });

        test("hero section has aria-labelledby pointing to h1", async ({ page }) => {
            await expect(page.locator('[aria-labelledby="plans-heading"]')).toBeVisible();
            await expect(page.locator("#plans-heading")).toBeVisible();
        });

        test("billing toggle buttons have aria-pressed attributes", async ({ page }) => {
            const pressable = page.locator("[aria-pressed]");
            await expect(pressable).toHaveCount(2);
        });

        test("FAQ buttons have aria-expanded and aria-controls attributes", async ({ page }) => {
            const faqButtons = page.locator("[aria-expanded][aria-controls]");
            await expect(faqButtons).toHaveCount(5);
        });

        test("FAQ answer panels have corresponding ids", async ({ page }) => {
            const firstButton = page.locator("[aria-expanded]").first();
            const controlsId = await firstButton.getAttribute("aria-controls");
            expect(controlsId).toBeTruthy();
            await expect(page.locator(`#${controlsId}`)).toBeAttached();
        });
    });
});
