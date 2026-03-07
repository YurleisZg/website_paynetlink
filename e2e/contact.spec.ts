import { test, expect } from "@playwright/test";

/**
 * E2E tests for the Contact page (/contact)
 * Tests layout, form interaction, and responsive behavior across viewports
 */
test.describe("Contact Page", () => {
    test.describe("Desktop (1440px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/contact");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders the page title", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 1 });
            await expect(heading).toBeVisible();
            await expect(heading).toContainText(/contacto|contact/i);
        });

        test("renders the subtitle", async ({ page }) => {
            const subtitle = page.getByText(/estamos aquí para ayudarte|we are here to help/i);
            await expect(subtitle).toBeVisible();
        });

        test("hero section has a distinct background", async ({ page }) => {
            const hero = page.locator('section[aria-labelledby="contact-heading"]');
            await expect(hero).toBeVisible();

            // Hero should have a surface/gray background class
            const className = await hero.getAttribute("class");
            expect(className).toContain("bg-surface");
        });

        test("renders the navbar", async ({ page }) => {
            const nav = page.getByRole("navigation", { name: /main navigation/i });
            await expect(nav).toBeVisible();
        });

        test("renders Email contact item", async ({ page }) => {
            await expect(page.getByText(/email/i).first()).toBeVisible();
            await expect(page.getByText(/paynetlink\.com/i).first()).toBeVisible();
        });

        test("renders Phone contact item", async ({ page }) => {
            await expect(page.getByText(/teléfono|phone/i)).toBeVisible();
            await expect(page.getByText(/\+57/)).toBeVisible();
        });

        test("renders Office contact item", async ({ page }) => {
            await expect(page.getByText(/oficina|office/i)).toBeVisible();
            await expect(page.getByText(/bogot/i)).toBeVisible();
        });

        test("contact info icons are visible", async ({ page }) => {
            // The left column info icons are SVGs inside blue containers
            const iconContainers = page.locator(
                '[aria-label="Contact information"] .bg-primary-light'
            );
            const count = await iconContainers.count();
            expect(count).toBe(3);
        });

        test("renders the form card with title", async ({ page }) => {
            const formTitle = page.getByRole("heading", { level: 2 });
            await expect(formTitle).toBeVisible();
            await expect(formTitle).toContainText(/envianos un mensaje|send us a message/i);
        });

        test("renders full name input", async ({ page }) => {
            const input = page.getByLabel(/nombre completo|full name/i);
            await expect(input).toBeVisible();
        });

        test("renders email input", async ({ page }) => {
            const emailInputs = page.locator('input[type="email"]');
            await expect(emailInputs.first()).toBeVisible();
        });

        test("renders message textarea", async ({ page }) => {
            const textarea = page.locator("textarea");
            await expect(textarea).toBeVisible();
        });

        test("renders submit button", async ({ page }) => {
            const submitBtn = page.getByRole("button", { name: /enviar mensaje|send message/i });
            await expect(submitBtn).toBeVisible();
        });

        test("layout uses two-column on desktop", async ({ page }) => {
            const leftColumn = page.locator('[aria-label="Contact information"]');
            const formCard = page.locator('[aria-label="Contact form"]');

            const leftBox = await leftColumn.boundingBox();
            const formBox = await formCard.boundingBox();

            expect(leftBox).not.toBeNull();
            expect(formBox).not.toBeNull();

            if (leftBox && formBox) {
                // On desktop both columns should be side by side (same vertical start approx)
                expect(Math.abs(leftBox.y - formBox.y)).toBeLessThan(50);
                // Left column should be to the left of the form
                expect(leftBox.x).toBeLessThan(formBox.x);
            }
        });

        test("form card has a visible border", async ({ page }) => {
            const formCard = page.locator('[aria-label="Contact form"]').locator("..");
            const className = await formCard.getAttribute("class");
            expect(className).toContain("border");
        });
    });

    test.describe("Form Interaction", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/contact");
            await page.waitForLoadState("domcontentloaded");
        });

        test("user can type a full name", async ({ page }) => {
            const input = page.getByLabel(/nombre completo|full name/i);
            await input.fill("John Doe");
            await expect(input).toHaveValue("John Doe");
        });

        test("user can type an email", async ({ page }) => {
            const emailInput = page.locator('input[type="email"]').first();
            await emailInput.fill("john@example.com");
            await expect(emailInput).toHaveValue("john@example.com");
        });

        test("user can type a message", async ({ page }) => {
            const textarea = page.locator("textarea");
            await textarea.fill("I need help with my ISP");
            await expect(textarea).toHaveValue("I need help with my ISP");
        });

        test("full name input has placeholder text", async ({ page }) => {
            const input = page.getByLabel(/nombre completo|full name/i);
            const placeholder = await input.getAttribute("placeholder");
            expect(placeholder).toMatch(/tu nombre|your name/i);
        });

        test("message textarea has placeholder text", async ({ page }) => {
            const textarea = page.locator("textarea");
            const placeholder = await textarea.getAttribute("placeholder");
            expect(placeholder).toMatch(/en qué podemos ayudarte|how can we help/i);
        });

        test("form submits correctly", async ({ page }) => {
            const consoleLogs: string[] = [];
            page.on("console", (msg) => {
                if (msg.type() === "log") consoleLogs.push(msg.text());
            });

            await page.getByLabel(/nombre completo|full name/i).fill("Jane Doe");
            await page.locator('input[type="email"]').first().fill("jane@example.com");
            await page.locator("textarea").fill("Hello from e2e test");

            const submitBtn = page.getByRole("button", { name: /enviar mensaje|send message/i });
            await submitBtn.click();

            await page.waitForTimeout(100);
            expect(consoleLogs.some((log) => log.includes("Contact form submitted:"))).toBe(true);
        });

        test("submit button is full width", async ({ page }) => {
            const submitBtn = page.getByRole("button", { name: /enviar mensaje|send message/i });
            const formCard = page.locator("form");

            const btnBox = await submitBtn.boundingBox();
            const formBox = await formCard.boundingBox();

            expect(btnBox).not.toBeNull();
            expect(formBox).not.toBeNull();

            if (btnBox && formBox) {
                // Button should span close to the full form width (within padding)
                expect(btnBox.width).toBeGreaterThan(formBox.width * 0.8);
            }
        });
    });

    test.describe("Mobile (375px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 667 });
            await page.goto("/contact");
            await page.waitForLoadState("domcontentloaded");
        });

        test("page title is visible on mobile", async ({ page }) => {
            const heading = page.getByRole("heading", { level: 1 });
            await expect(heading).toBeVisible();
        });

        test("contact info items are stacked vertically on mobile", async ({ page }) => {
            const leftColumn = page.locator('[aria-label="Contact information"]');
            const formCard = page.locator('[aria-label="Contact form"]');

            const leftBox = await leftColumn.boundingBox();
            const formBox = await formCard.boundingBox();

            expect(leftBox).not.toBeNull();
            expect(formBox).not.toBeNull();

            if (leftBox && formBox) {
                // On mobile, contact info should be above the form
                expect(leftBox.y).toBeLessThan(formBox.y);
            }
        });

        test("form fields are visible and usable on mobile", async ({ page }) => {
            await expect(page.getByLabel(/nombre completo|full name/i)).toBeVisible();
            await expect(page.locator('input[type="email"]').first()).toBeVisible();
            await expect(page.locator("textarea")).toBeVisible();
            await expect(
                page.getByRole("button", { name: /enviar mensaje|send message/i })
            ).toBeVisible();
        });

        test("no horizontal overflow on mobile", async ({ page }) => {
            const hasHorizontalScroll = await page.evaluate(() => {
                return document.documentElement.scrollWidth > document.documentElement.clientWidth;
            });
            expect(hasHorizontalScroll).toBe(false);
        });

        test("submit button meets touch target size", async ({ page }) => {
            const submitBtn = page.getByRole("button", { name: /enviar mensaje|send message/i });
            const box = await submitBtn.boundingBox();
            expect(box).not.toBeNull();
            if (box) {
                expect(box.height).toBeGreaterThanOrEqual(44);
            }
        });
    });

    test.describe("Tablet (768px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await page.goto("/contact");
            await page.waitForLoadState("domcontentloaded");
        });

        test("page renders correctly on tablet", async ({ page }) => {
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(
                page.getByRole("button", { name: /enviar mensaje|send message/i })
            ).toBeVisible();
        });

        test("no horizontal overflow on tablet", async ({ page }) => {
            const hasHorizontalScroll = await page.evaluate(() => {
                return document.documentElement.scrollWidth > document.documentElement.clientWidth;
            });
            expect(hasHorizontalScroll).toBe(false);
        });
    });

    test.describe("Accessibility", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/contact");
            await page.waitForLoadState("domcontentloaded");
        });

        test("page heading has proper hierarchy (h1 then h2)", async ({ page }) => {
            const h1 = page.getByRole("heading", { level: 1 });
            const h2 = page.getByRole("heading", { level: 2 });
            await expect(h1).toBeVisible();
            await expect(h2).toBeVisible();
        });

        test("form inputs have associated labels", async ({ page }) => {
            const fullNameInput = page.getByLabel(/nombre completo|full name/i);
            await expect(fullNameInput).toBeVisible();
        });

        test("submit button has visible text", async ({ page }) => {
            const submitBtn = page.getByRole("button", { name: /enviar mensaje|send message/i });
            await expect(submitBtn).toBeVisible();
        });
    });
});
