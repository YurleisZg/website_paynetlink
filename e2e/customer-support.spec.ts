import { test, expect } from "@playwright/test";

/**
 * E2E tests for the Customer Support page (/customer-support)
 * Tests hero, search, category cards, how-it-works, contact form, CTA, and responsive behavior
 */
test.describe("Customer Support Page", () => {
    test.describe("Desktop (1440px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/customer-support");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 1 });
            await expect(heading).toBeVisible();
            await expect(heading).toContainText(/cómo podemos ayudarte|how can we help/i);
        });

        test("hero section has primary background", async ({ page }) => {
            const hero = page.locator('[aria-labelledby="support-heading"]');
            await expect(hero).toBeVisible();
            const className = await hero.getAttribute("class");
            expect(className).toContain("bg-primary");
        });

        test("renders the search input", async ({ page }) => {
            await expect(page.getByRole("searchbox")).toBeVisible();
        });

        test("search input accepts typing", async ({ page }) => {
            const searchInput = page.getByRole("searchbox");
            await searchInput.fill("MikroTik");
            await expect(searchInput).toHaveValue("MikroTik");
        });

        test("renders the resources section heading", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /explora nuestros recursos|explore our help resources/i,
                })
            ).toBeVisible();
        });

        test("renders all 6 category cards", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 3 })).toHaveCount(6);
        });

        test("renders getting started category card", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /guías de inicio|getting started/i })
            ).toBeVisible();
        });

        test("renders billing and payments category card", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /facturación y pagos|billing and payments/i })
            ).toBeVisible();
        });

        test("renders network and mikrotik category card", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /red y mikrotik|network and mikrotik/i })
            ).toBeVisible();
        });

        test("renders contact support category card linking to /contact", async ({ page }) => {
            const contactCard = page.getByRole("link").filter({
                has: page.getByRole("heading", { name: /contactar soporte|contact support/i }),
            });
            await expect(contactCard).toHaveAttribute("href", "/contact");
        });

        test("category cards render in a 3-column grid on desktop", async ({ page }) => {
            await expect(page.locator(".lg\\:grid-cols-3")).toBeVisible();
        });

        test("renders the how it works heading", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /cómo funciona nuestro soporte|how does our support work/i,
                })
            ).toBeVisible();
        });

        test("renders all 3 how-it-works steps", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /busca tu duda|search your question/i })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", {
                    name: /explora las categorías|explore the categories/i,
                })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /contacta al equipo|contact the team/i })
            ).toBeVisible();
        });

        test("renders the how-it-works steps in a 3-column grid on desktop", async ({ page }) => {
            await expect(page.locator(".sm\\:grid-cols-3")).toBeVisible();
        });

        test("renders the direct help section heading", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /necesitas ayuda directa|need direct help/i,
                })
            ).toBeVisible();
        });

        test("renders the contact form heading", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /envíanos un mensaje|send us a message/i })
            ).toBeVisible();
        });

        test("renders all contact form fields", async ({ page }) => {
            await expect(page.getByLabel(/^nombre$|^first name$/i)).toBeVisible();
            await expect(page.getByLabel(/^apellido$|^last name$/i)).toBeVisible();
            await expect(page.getByLabel(/correo electrónico|email/i)).toBeVisible();
            await expect(page.getByLabel(/^asunto$|^subject$/i)).toBeVisible();
            await expect(page.getByLabel(/^mensaje$|^message$/i)).toBeVisible();
        });

        test("renders the form submit button", async ({ page }) => {
            await expect(
                page.getByRole("button", { name: /enviar mensaje|send message/i })
            ).toBeVisible();
        });

        test("renders contact info with hours and email", async ({ page }) => {
            await expect(page.getByText(/8:00 AM/i)).toBeVisible();
            await expect(page.getByText(/soporte@paynetlink\.com/i)).toBeVisible();
        });

        test("renders the CTA section heading", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /aún tienes dudas|still have questions/i })
            ).toBeVisible();
        });

        test("CTA open ticket button links to /contact", async ({ page }) => {
            const ticketLink = page.getByRole("link", {
                name: /abrir ticket de soporte|open support ticket/i,
            });
            await expect(ticketLink).toHaveAttribute("href", "/contact");
        });

        test("renders the navbar", async ({ page }) => {
            await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();
        });

        test("renders the footer", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });

        test("Help Center nav link points to /customer-support", async ({ page }) => {
            await page.goto("/");
            await page.waitForLoadState("domcontentloaded");
            const resourcesMenu = page.getByRole("button", { name: /recursos|resources/i });
            await resourcesMenu.click();
            const helpLink = page.getByRole("menuitem", { name: /help center|centro de ayuda/i });
            await expect(helpLink).toBeVisible();
            await expect(helpLink).toHaveAttribute("href", "/customer-support");
        });
    });

    test.describe("Mobile (375px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 812 });
            await page.goto("/customer-support");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title on mobile", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        });

        test("renders search input on mobile", async ({ page }) => {
            await expect(page.getByRole("searchbox")).toBeVisible();
        });

        test("renders category cards on mobile", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /guías de inicio|getting started/i })
            ).toBeVisible();
        });

        test("renders contact form on mobile", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /envíanos un mensaje|send us a message/i })
            ).toBeVisible();
        });

        test("renders footer on mobile", async ({ page }) => {
            await expect(page.getByRole("contentinfo")).toBeVisible();
        });
    });

    test.describe("Tablet (768px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await page.goto("/customer-support");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders all sections on tablet", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /facturación y pagos|billing and payments/i })
            ).toBeVisible();
            await expect(
                page.getByRole("heading", { name: /cómo funciona|how does our support/i })
            ).toBeVisible();
        });
    });

    test.describe("Accessibility", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/customer-support");
            await page.waitForLoadState("domcontentloaded");
        });

        test("hero section has aria-labelledby pointing to h1", async ({ page }) => {
            await expect(page.locator('[aria-labelledby="support-heading"]')).toBeVisible();
            await expect(page.locator("#support-heading")).toBeVisible();
        });

        test("resources section has aria-labelledby", async ({ page }) => {
            await expect(page.locator('[aria-labelledby="resources-heading"]')).toBeVisible();
        });

        test("how it works section has aria-labelledby", async ({ page }) => {
            await expect(page.locator('[aria-labelledby="how-it-works-heading"]')).toBeVisible();
        });

        test("search input has an accessible label", async ({ page }) => {
            const search = page.getByRole("searchbox");
            const ariaLabel = await search.getAttribute("aria-label");
            expect(ariaLabel).toBeTruthy();
        });

        test("category icons are hidden from screen readers", async ({ page }) => {
            const hiddenIcons = page.locator("[aria-hidden='true']");
            await expect(hiddenIcons.first()).toBeAttached();
        });
    });
});
