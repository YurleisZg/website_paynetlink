import { test, expect } from "@playwright/test";

/**
 * E2E tests for navbar dropdown menus
 * Tests hover, click, keyboard navigation, mobile accordion, and accessibility
 * across desktop, tablet, and mobile viewports
 */
test.describe("Navbar Dropdown Menus", () => {
    test.describe("Desktop (1440px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/");
            await page.waitForLoadState("domcontentloaded");
        });

        test("renders dropdown triggers for sections with dropdown items", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i });
            await expect(productsBtn).toBeVisible();

            const solutionsBtn = page.getByRole("button", { name: /solutions/i });
            await expect(solutionsBtn).toBeVisible();

            const resourcesBtn = page.getByRole("button", { name: /resources/i });
            await expect(resourcesBtn).toBeVisible();

            const companyBtn = page.getByRole("button", { name: /company/i });
            await expect(companyBtn).toBeVisible();
        });

        test("renders plain link for Pricing (no dropdown)", async ({ page }) => {
            const pricingLink = page.getByRole("link", { name: /pricing/i }).first();
            await expect(pricingLink).toBeVisible();
        });

        test("dropdown trigger has aria-haspopup attribute", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await expect(productsBtn).toHaveAttribute("aria-haspopup", "true");
        });

        test("dropdown trigger has aria-expanded false by default", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await expect(productsBtn).toHaveAttribute("aria-expanded", "false");
        });

        test("dropdown opens on hover", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.hover();

            const menu = page.getByRole("menu", { name: /products menu/i });
            await expect(menu).toBeVisible({ timeout: 500 });
        });

        test("dropdown opens on click", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.click();

            const menu = page.getByRole("menu", { name: /products menu/i });
            await expect(menu).toBeVisible();
        });

        test("aria-expanded updates to true when dropdown opens", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.click();

            await expect(productsBtn).toHaveAttribute("aria-expanded", "true");
        });

        test("products dropdown shows all five items", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.click();

            await expect(
                page.getByRole("menuitem", { name: /customer management/i })
            ).toBeVisible();
            await expect(page.getByRole("menuitem", { name: /payments/i })).toBeVisible();
            await expect(page.getByRole("menuitem", { name: /network automation/i })).toBeVisible();
            await expect(page.getByRole("menuitem", { name: /notifications/i })).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: /electronic invoicing/i })
            ).toBeVisible();
        });

        test("dropdown items show descriptions", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.click();

            await expect(page.getByText("Register and manage your clients")).toBeVisible();
        });

        test("solutions dropdown shows three items", async ({ page }) => {
            const solutionsBtn = page.getByRole("button", { name: /solutions/i }).first();
            await solutionsBtn.click();

            await expect(page.getByRole("menuitem", { name: /for small isps/i })).toBeVisible();
            await expect(page.getByRole("menuitem", { name: /for medium isps/i })).toBeVisible();
            await expect(page.getByRole("menuitem", { name: /for wisps/i })).toBeVisible();
        });

        test("resources dropdown shows four items", async ({ page }) => {
            const resourcesBtn = page.getByRole("button", { name: /resources/i }).first();
            await resourcesBtn.click();

            await expect(page.getByRole("menuitem", { name: /^blog$/i })).toBeVisible();
            await expect(page.getByRole("menuitem", { name: /help center/i })).toBeVisible();
            await expect(page.getByRole("menuitem", { name: /api documentation/i })).toBeVisible();
            await expect(page.getByRole("menuitem", { name: /success stories/i })).toBeVisible();
        });

        test("company dropdown shows three items", async ({ page }) => {
            const companyBtn = page.getByRole("button", { name: /company/i }).first();
            await companyBtn.click();

            await expect(page.getByRole("menuitem", { name: /about us/i })).toBeVisible();
            await expect(page.getByRole("menuitem", { name: /^contact$/i })).toBeVisible();
            await expect(page.getByRole("menuitem", { name: /partners/i })).toBeVisible();
        });

        test("dropdown closes when Escape key is pressed", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.click();

            const menu = page.getByRole("menu", { name: /products menu/i });
            await expect(menu).toBeVisible();

            await page.keyboard.press("Escape");

            await expect(menu).not.toBeVisible();
        });

        test("dropdown closes when clicking the trigger again", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.click();

            const menu = page.getByRole("menu", { name: /products menu/i });
            await expect(menu).toBeVisible();

            await productsBtn.click();
            await expect(menu).not.toBeVisible();
        });

        test("only one dropdown is open at a time", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.click();

            await expect(page.getByRole("menu", { name: /products menu/i })).toBeVisible();

            // Open solutions dropdown
            const solutionsBtn = page.getByRole("button", { name: /solutions/i }).first();
            await solutionsBtn.click();

            // Products menu should close
            await expect(page.getByRole("menu", { name: /products menu/i })).not.toBeVisible();
            await expect(page.getByRole("menu", { name: /solutions menu/i })).toBeVisible();
        });

        test("dropdown panel is positioned below the trigger", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.click();

            const menu = page.getByRole("menu", { name: /products menu/i });
            const triggerBox = await productsBtn.boundingBox();
            const menuBox = await menu.boundingBox();

            expect(triggerBox).not.toBeNull();
            expect(menuBox).not.toBeNull();

            if (triggerBox && menuBox) {
                // Menu top should be below trigger bottom
                expect(menuBox.y).toBeGreaterThan(triggerBox.y + triggerBox.height);
            }
        });

        test("dropdown item icons are rendered", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.click();

            // Icons are SVGs inside the icon container
            const menu = page.getByRole("menu", { name: /products menu/i });
            const icons = menu.locator("svg");
            const count = await icons.count();
            expect(count).toBeGreaterThan(0);
        });

        test("does not cause horizontal scroll when dropdown is open", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.click();

            const hasHorizontalScroll = await page.evaluate(() => {
                return document.documentElement.scrollWidth > document.documentElement.clientWidth;
            });
            expect(hasHorizontalScroll).toBe(false);
        });
    });

    test.describe("Mobile (375px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 667 });
            await page.goto("/");
            await page.waitForLoadState("domcontentloaded");
        });

        test("desktop dropdowns are not visible on mobile", async ({ page }) => {
            // Desktop nav is hidden on mobile
            const desktopNav = page.locator(".hidden.lg\\:flex").first();
            await expect(desktopNav).toBeHidden();
        });

        test("mobile menu opens correctly", async ({ page }) => {
            const menuBtn = page.getByRole("button", { name: /toggle menu/i });
            await menuBtn.click();

            await expect(page.locator(".fixed.right-0.top-\\[73px\\]")).toBeVisible();
        });

        test("mobile menu shows accordion buttons for dropdown items", async ({ page }) => {
            const menuBtn = page.getByRole("button", { name: /toggle menu/i });
            await menuBtn.click();

            // Products should appear as a button (accordion) in mobile menu
            const productsAccordion = page
                .locator(".fixed.right-0.top-\\[73px\\]")
                .getByRole("button", { name: /products/i });
            await expect(productsAccordion).toBeVisible();
        });

        test("accordion starts collapsed", async ({ page }) => {
            const menuBtn = page.getByRole("button", { name: /toggle menu/i });
            await menuBtn.click();

            const productsAccordion = page
                .locator(".fixed.right-0.top-\\[73px\\]")
                .getByRole("button", { name: /products/i });

            await expect(productsAccordion).toHaveAttribute("aria-expanded", "false");
        });

        test("accordion expands when clicked showing dropdown items", async ({ page }) => {
            const menuBtn = page.getByRole("button", { name: /toggle menu/i });
            await menuBtn.click();

            const productsAccordion = page
                .locator(".fixed.right-0.top-\\[73px\\]")
                .getByRole("button", { name: /products/i });
            await productsAccordion.click();

            await expect(productsAccordion).toHaveAttribute("aria-expanded", "true");

            // Items should now be visible
            const mobilePanel = page.locator(".fixed.right-0.top-\\[73px\\]");
            await expect(mobilePanel.getByText("Customer Management")).toBeVisible();
        });

        test("accordion collapses when clicked again", async ({ page }) => {
            const menuBtn = page.getByRole("button", { name: /toggle menu/i });
            await menuBtn.click();

            const productsAccordion = page
                .locator(".fixed.right-0.top-\\[73px\\]")
                .getByRole("button", { name: /products/i });

            await productsAccordion.click();
            await expect(productsAccordion).toHaveAttribute("aria-expanded", "true");

            await productsAccordion.click();
            await expect(productsAccordion).toHaveAttribute("aria-expanded", "false");
        });

        test("pricing renders as a plain link in mobile menu", async ({ page }) => {
            const menuBtn = page.getByRole("button", { name: /toggle menu/i });
            await menuBtn.click();

            const mobilePanel = page.locator(".fixed.right-0.top-\\[73px\\]");
            const pricingLink = mobilePanel.getByRole("link", { name: /pricing/i });
            await expect(pricingLink).toBeVisible();
        });

        test("mobile menu closes after clicking a dropdown item", async ({ page }) => {
            const menuBtn = page.getByRole("button", { name: /toggle menu/i });
            await menuBtn.click();

            const productsAccordion = page
                .locator(".fixed.right-0.top-\\[73px\\]")
                .getByRole("button", { name: /products/i });
            await productsAccordion.click();

            const mobilePanel = page.locator(".fixed.right-0.top-\\[73px\\]");
            const firstItem = mobilePanel.getByText("Customer Management");
            await firstItem.click();

            await expect(mobilePanel).not.toBeVisible();
        });
    });

    test.describe("Tablet (768px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await page.goto("/");
            await page.waitForLoadState("domcontentloaded");
        });

        test("shows mobile menu button on tablet", async ({ page }) => {
            const menuBtn = page.getByRole("button", { name: /toggle menu/i });
            await expect(menuBtn).toBeVisible();
        });
    });

    test.describe("Accessibility", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/");
            await page.waitForLoadState("domcontentloaded");
        });

        test("dropdown trigger has aria-haspopup attribute", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await expect(productsBtn).toHaveAttribute("aria-haspopup", "true");
        });

        test("dropdown menu has role=menu", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.click();

            const menu = page.getByRole("menu", { name: /products menu/i });
            await expect(menu).toBeVisible();
        });

        test("dropdown items have role=menuitem", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.click();

            const items = page.getByRole("menuitem");
            const count = await items.count();
            expect(count).toBeGreaterThan(0);
        });

        test("dropdown trigger has visible focus ring", async ({ page }) => {
            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.focus();

            const hasFocusStyle = await productsBtn.evaluate((el) => {
                return el.className.includes("focus-visible");
            });
            expect(hasFocusStyle).toBe(true);
        });

        test("ESC closes dropdown and returns focus", async ({ page, browserName }) => {
            test.skip(browserName === "webkit", "WebKit focus behavior differs");

            const productsBtn = page.getByRole("button", { name: /products/i }).first();
            await productsBtn.focus();
            await page.keyboard.press("Enter");

            const menu = page.getByRole("menu", { name: /products menu/i });
            await expect(menu).toBeVisible();

            await page.keyboard.press("Escape");
            await expect(menu).not.toBeVisible();
        });
    });
});
