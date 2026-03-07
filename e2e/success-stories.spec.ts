import { test, expect } from "@playwright/test";

/**
 * E2E tests for the Success Stories page (/success-stories)
 * Tests layout, story cards, metrics, CTA section, and responsive behavior
 */
test.describe("Success Stories Page", () => {
    test.describe("Desktop (1440px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/success-stories");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 1 });
            await expect(heading).toBeVisible();
            await expect(heading).toContainText(/casos de éxito|success stories/i);
        });

        test("renders the page subtitle", async ({ page }) => {
            await expect(
                page.getByText(/ISPs que transformaron|ISPs that transformed/i)
            ).toBeVisible();
        });

        test("hero section has a surface background", async ({ page }) => {
            const hero = page.locator('[aria-labelledby="success-stories-heading"]');
            await expect(hero).toBeVisible();
            const className = await hero.getAttribute("class");
            expect(className).toContain("bg-surface");
        });

        test("renders FibraNet story with heading and metrics", async ({ page }) => {
            await expect(page.getByRole("heading", { name: /fibranet/i })).toBeVisible();
            await expect(page.getByText("45%")).toBeVisible();
            await expect(page.getByText("5,000+")).toBeVisible();
        });

        test("renders NetPro story", async ({ page }) => {
            await expect(page.getByRole("heading", { name: /netpro/i })).toBeVisible();
            await expect(page.getByText("90%")).toBeVisible();
        });

        test("renders ConnectMax story", async ({ page }) => {
            await expect(page.getByRole("heading", { name: /connectmax/i })).toBeVisible();
            await expect(page.getByText("275%")).toBeVisible();
        });

        test("renders two story images", async ({ page }) => {
            const images = page.getByRole("img");
            await expect(images).toHaveCount(2);
        });

        test("first story image is positioned on the left", async ({ page }) => {
            const firstStory = page.locator("article").first();
            const className = await firstStory.getAttribute("class");
            expect(className).toContain("lg:flex-row");
        });

        test("third story image is positioned on the right", async ({ page }) => {
            const thirdStory = page.locator("article").nth(2);
            const className = await thirdStory.getAttribute("class");
            expect(className).toContain("lg:flex-row-reverse");
        });

        test("renders story badges", async ({ page }) => {
            await expect(page.getByText(/ISP Residencial|Residential ISP/i)).toBeVisible();
        });

        test("renders the CTA section with blue background", async ({ page }) => {
            const cta = page.locator('[aria-labelledby="cta-heading"]');
            await expect(cta).toBeVisible();
            const className = await cta.getAttribute("class");
            expect(className).toContain("bg-primary");
        });

        test("renders the CTA heading", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /próximo caso de éxito|next success story/i })
            ).toBeVisible();
        });

        test("renders the CTA button linking to demo", async ({ page }) => {
            const ctaButton = page.getByRole("link", {
                name: /comenzar prueba gratis|start free trial/i,
            });
            await expect(ctaButton).toBeVisible();
            await expect(ctaButton).toHaveAttribute("href", "/demo");
        });

        test("renders the navbar", async ({ page }) => {
            await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();
        });

        test("renders the footer", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });
    });

    test.describe("Mobile (375px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });
            await page.goto("/success-stories");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title on mobile", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        });

        test("renders all story headings on mobile", async ({ page }) => {
            await expect(page.getByRole("heading", { name: /fibranet/i })).toBeVisible();
            await expect(page.getByRole("heading", { name: /netpro/i })).toBeVisible();
            await expect(page.getByRole("heading", { name: /connectmax/i })).toBeVisible();
        });

        test("renders the CTA section on mobile", async ({ page }) => {
            const cta = page.locator('[aria-labelledby="cta-heading"]');
            await expect(cta).toBeVisible();
        });

        test("renders footer on mobile", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });
    });

    test.describe("Tablet (768px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await page.goto("/success-stories");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders all content on tablet", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(page.getByRole("heading", { name: /fibranet/i })).toBeVisible();
            await expect(page.getByRole("heading", { name: /connectmax/i })).toBeVisible();
        });
    });

    test.describe("Accessibility", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/success-stories");
            await page.waitForLoadState("domcontentloaded");
        });

        test("hero section has aria-labelledby pointing to h1", async ({ page }) => {
            await expect(page.locator('[aria-labelledby="success-stories-heading"]')).toBeVisible();
            await expect(page.locator("#success-stories-heading")).toBeVisible();
        });

        test("CTA section has aria-labelledby pointing to its heading", async ({ page }) => {
            await expect(page.locator('[aria-labelledby="cta-heading"]')).toBeVisible();
            await expect(page.locator("#cta-heading")).toBeVisible();
        });

        test("story articles have accessible labels", async ({ page }) => {
            const articles = page.locator("article[aria-label]");
            await expect(articles).toHaveCount(3);
        });

        test("story images have descriptive alt text", async ({ page }) => {
            const images = page.getByRole("img");
            const count = await images.count();
            for (let i = 0; i < count; i++) {
                const alt = await images.nth(i).getAttribute("alt");
                expect(alt).toBeTruthy();
                expect(alt!.length).toBeGreaterThan(5);
            }
        });
    });
});
