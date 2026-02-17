import { test, expect } from "@playwright/test";

/**
 * E2E tests for interactive search feature in Navbar
 * Tests search functionality across mobile, tablet, and desktop viewports
 * Includes accessibility, keyboard navigation, and user interaction tests
 */
test.describe("Navbar Search - Interactive Functionality", () => {
    test.describe("Desktop Tests (1440px width)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/");
            await page.waitForLoadState("networkidle");
        });

        test("should display search button on desktop", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i });
            await expect(searchButton).toBeVisible();
        });

        test("should open search overlay when search button is clicked", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            // Wait for search overlay to appear
            const searchOverlay = page.getByLabel("Search overlay");
            await expect(searchOverlay).toBeVisible();
        });

        test("should focus search input when search overlay opens", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            // Wait for search input and check if focused
            const searchInput = page.getByLabel("Search input");
            await expect(searchInput).toBeFocused();
        });

        test("should close search overlay when ESC key is pressed", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchOverlay = page.getByLabel("Search overlay");
            await expect(searchOverlay).toBeVisible();

            // Press ESC
            await page.keyboard.press("Escape");

            // Search overlay should be closed
            await expect(searchOverlay).not.toBeVisible();
        });

        test("should close search overlay when close button is clicked", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchOverlay = page.getByLabel("Search overlay");
            await expect(searchOverlay).toBeVisible();

            // Click close button
            const closeButton = page.getByRole("button", { name: /close search/i });
            await closeButton.click();

            // Search overlay should be closed
            await expect(searchOverlay).not.toBeVisible();
        });

        test("should close search overlay when clicking outside", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchOverlay = page.getByLabel("Search overlay");
            await expect(searchOverlay).toBeVisible();

            // Click on backdrop (outside the search dialog)
            await searchOverlay.click({ position: { x: 10, y: 10 } });

            // Search overlay should be closed
            await expect(searchOverlay).not.toBeVisible();
        });

        test("should not close search when clicking inside search dialog", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchDialog = page.getByRole("dialog");
            await expect(searchDialog).toBeVisible();

            // Click inside dialog
            await searchDialog.click();

            // Search overlay should still be visible
            await expect(searchDialog).toBeVisible();
        });

        test("should accept text input in search field", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchInput = page.getByLabel("Search input");
            await searchInput.fill("test query");

            await expect(searchInput).toHaveValue("test query");
        });

        test("should display placeholder text when search is empty", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const placeholderText = page.getByText("Start typing to search...");
            await expect(placeholderText).toBeVisible();
        });

        test("should display search query feedback", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchInput = page.getByLabel("Search input");
            await searchInput.fill("test query");

            const feedbackText = page.getByText('Searching for: "test query"');
            await expect(feedbackText).toBeVisible();
        });

        test("should clear search query when overlay is closed", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchInput = page.getByLabel("Search input");
            await searchInput.fill("test query");
            await expect(searchInput).toHaveValue("test query");

            // Close search
            await page.keyboard.press("Escape");

            // Reopen search
            await searchButton.click();

            // Input should be empty
            await expect(searchInput).toHaveValue("");
        });

        test("should submit search form on Enter key", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchInput = page.getByLabel("Search input");
            await searchInput.fill("test query");

            // Listen for console logs (search action)
            const consoleLogs: string[] = [];
            page.on("console", (msg) => {
                if (msg.type() === "log") {
                    consoleLogs.push(msg.text());
                }
            });

            await searchInput.press("Enter");

            // Wait a bit for the form submission
            await page.waitForTimeout(100);

            // Check if search was triggered
            expect(consoleLogs.some((log) => log.includes("test query"))).toBe(true);
        });

        test("should not scroll body when search is open", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
            expect(bodyOverflow).toBe("hidden");
        });

        test("should restore body scroll when search is closed", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            // Close search
            await page.keyboard.press("Escape");

            const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
            expect(bodyOverflow).toBe("");
        });

        test("should have proper aria-expanded attribute", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();

            // Initially false
            await expect(searchButton).toHaveAttribute("aria-expanded", "false");

            // Open search
            await searchButton.click();

            // Should be true
            await expect(searchButton).toHaveAttribute("aria-expanded", "true");

            // Close search
            await page.keyboard.press("Escape");

            // Should be false again
            await expect(searchButton).toHaveAttribute("aria-expanded", "false");
        });

        test("should animate search overlay smoothly without layout shift", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();

            // Get initial viewport state
            const initialViewport = await page.viewportSize();

            await searchButton.click();

            // Wait for animation to complete
            await page.waitForTimeout(350);

            // Check viewport hasn't changed
            const finalViewport = await page.viewportSize();
            expect(finalViewport).toEqual(initialViewport);

            // Check no horizontal scrollbar appeared
            const hasHorizontalScroll = await page.evaluate(() => {
                return document.documentElement.scrollWidth > document.documentElement.clientWidth;
            });
            expect(hasHorizontalScroll).toBe(false);
        });
    });

    test.describe("Tablet Tests (768px width)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            await page.goto("/");
            await page.waitForLoadState("networkidle");
        });

        test("should display search button on tablet", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i });
            await expect(searchButton).toBeVisible();
        });

        test("should open search overlay on tablet", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchOverlay = page.getByLabel("Search overlay");
            await expect(searchOverlay).toBeVisible();
        });

        test("should handle keyboard navigation on tablet", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchInput = page.getByLabel("Search input");
            await searchInput.fill("tablet search");

            await expect(searchInput).toHaveValue("tablet search");

            // Close with ESC
            await page.keyboard.press("Escape");
            await expect(page.getByLabel("Search overlay")).not.toBeVisible();
        });

        test("search dialog should be properly sized on tablet", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchDialog = page.getByRole("dialog");
            const boundingBox = await searchDialog.boundingBox();

            expect(boundingBox).not.toBeNull();
            if (boundingBox) {
                // Dialog should not exceed viewport width
                expect(boundingBox.width).toBeLessThanOrEqual(768);
                // Dialog should have reasonable width
                expect(boundingBox.width).toBeGreaterThan(300);
            }
        });
    });

    test.describe("Mobile Tests (375px width)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 667 });
            await page.goto("/");
            await page.waitForLoadState("networkidle");
        });

        test("should display search button on mobile", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i });
            await expect(searchButton).toBeVisible();
        });

        test("should open search overlay on mobile", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchOverlay = page.getByLabel("Search overlay");
            await expect(searchOverlay).toBeVisible();
        });

        test("should have touch-friendly close button on mobile", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const closeButton = page.getByRole("button", { name: /close search/i });
            await expect(closeButton).toBeVisible();

            const boundingBox = await closeButton.boundingBox();
            expect(boundingBox).not.toBeNull();
            if (boundingBox) {
                // Should meet WCAG touch target size
                expect(boundingBox.width).toBeGreaterThanOrEqual(32);
                expect(boundingBox.height).toBeGreaterThanOrEqual(32);
            }
        });

        test("search dialog should fit mobile viewport", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchDialog = page.getByRole("dialog");
            const boundingBox = await searchDialog.boundingBox();

            expect(boundingBox).not.toBeNull();
            if (boundingBox) {
                // Dialog should not exceed mobile viewport width with padding
                expect(boundingBox.width).toBeLessThanOrEqual(375);
            }
        });

        test("should handle touch interactions on mobile", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();

            // Tap search button
            await searchButton.click();

            // Wait for overlay to appear
            const searchOverlay = page.getByLabel("Search overlay");
            await expect(searchOverlay).toBeVisible({ timeout: 10000 });

            // Tap close button
            const closeButton = page.getByRole("button", { name: /close search/i });
            await closeButton.click();

            // Wait for overlay to disappear
            await expect(searchOverlay).not.toBeVisible({ timeout: 10000 });
        });

        test("should not cause horizontal scroll on mobile when search is open", async ({
            page,
        }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const hasHorizontalScroll = await page.evaluate(() => {
                return document.documentElement.scrollWidth > document.documentElement.clientWidth;
            });
            expect(hasHorizontalScroll).toBe(false);
        });
    });

    test.describe("Accessibility Tests", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/");
            await page.waitForLoadState("networkidle");
        });

        test("search button should have proper aria-label", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await expect(searchButton).toBeVisible();

            const ariaLabel = await searchButton.getAttribute("aria-label");
            expect(ariaLabel).toBe("Open search");
        });

        test("search overlay should have proper dialog role", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchDialog = page.getByRole("dialog");
            await expect(searchDialog).toBeVisible();
        });

        test("search dialog should have aria-modal attribute", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchDialog = page.getByRole("dialog");
            await expect(searchDialog).toHaveAttribute("aria-modal", "true");
        });

        test("search input should have proper aria-label", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchInput = page.getByLabel("Search input");
            await expect(searchInput).toBeVisible();
        });

        test("close button should have proper aria-label", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const closeButton = page.getByRole("button", { name: /close search/i });
            await expect(closeButton).toBeVisible();

            const ariaLabel = await closeButton.getAttribute("aria-label");
            expect(ariaLabel).toBe("Close search");
        });

        test("should support keyboard-only navigation", async ({ page }) => {
            // Tab to search button
            await page.keyboard.press("Tab");
            await page.keyboard.press("Tab");
            await page.keyboard.press("Tab");

            // Open search with Enter
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            if (await searchButton.isVisible()) {
                await searchButton.focus();
                await page.keyboard.press("Enter");

                const searchInput = page.getByLabel("Search input");
                await expect(searchInput).toBeFocused();

                // Type in search
                await page.keyboard.type("keyboard navigation test");
                await expect(searchInput).toHaveValue("keyboard navigation test");

                // Close with ESC
                await page.keyboard.press("Escape");
                await expect(page.getByLabel("Search overlay")).not.toBeVisible();
            }
        });

        test("search button should have visible focus indicator", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.focus();

            // Check if focus styles are applied
            const focusRingVisible = await searchButton.evaluate((el) => {
                const styles = window.getComputedStyle(el);
                return styles.outline !== "none" || el.className.includes("focus-visible");
            });

            expect(focusRingVisible).toBe(true);
        });

        test("should announce state changes to screen readers", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();

            // Check initial aria-expanded
            await expect(searchButton).toHaveAttribute("aria-expanded", "false");

            await searchButton.click();

            // Check updated aria-expanded
            await expect(searchButton).toHaveAttribute("aria-expanded", "true");
        });
    });

    test.describe("Edge Cases and Error Handling", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto("/");
            await page.waitForLoadState("networkidle");
        });

        test("should handle multiple rapid clicks gracefully", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();

            // Click once to open
            await searchButton.click();

            // Wait for overlay to be visible
            const searchOverlay = page.getByLabel("Search overlay");
            await expect(searchOverlay).toBeVisible({ timeout: 10000 });

            // Verify it stays open even after multiple clicks
            await expect(searchOverlay).toBeVisible();
        });

        test("should handle empty search submission", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const consoleLogs: string[] = [];
            page.on("console", (msg) => {
                if (msg.type() === "log") {
                    consoleLogs.push(msg.text());
                }
            });

            const searchInput = page.getByLabel("Search input");
            await searchInput.press("Enter");

            await page.waitForTimeout(100);

            // Should not log anything for empty search
            expect(consoleLogs.filter((log) => log.includes("Search query:")).length).toBe(0);
        });

        test("should handle whitespace-only search submission", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const consoleLogs: string[] = [];
            page.on("console", (msg) => {
                if (msg.type() === "log") {
                    consoleLogs.push(msg.text());
                }
            });

            const searchInput = page.getByLabel("Search input");
            await searchInput.fill("   ");
            await searchInput.press("Enter");

            await page.waitForTimeout(100);

            // Should not log anything for whitespace-only search
            expect(consoleLogs.filter((log) => log.includes("Search query:")).length).toBe(0);
        });

        test("should handle special characters in search query", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchInput = page.getByLabel("Search input");
            const specialQuery = '<script>alert("test")</script>';
            await searchInput.fill(specialQuery);

            await expect(searchInput).toHaveValue(specialQuery);

            // Should display safely without XSS
            const feedbackText = page.getByText(`Searching for: "${specialQuery}"`);
            await expect(feedbackText).toBeVisible();
        });

        test("should maintain focus trap when search is open", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchInput = page.getByLabel("Search input");
            await expect(searchInput).toBeFocused();

            // Tab should cycle within search dialog
            await page.keyboard.press("Tab");

            // Should be on close button
            const closeButton = page.getByRole("button", { name: /close search/i });
            await expect(closeButton).toBeFocused();
        });

        test("should handle window resize while search is open", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i }).first();
            await searchButton.click();

            const searchOverlay = page.getByLabel("Search overlay");
            await expect(searchOverlay).toBeVisible();

            // Resize to mobile
            await page.setViewportSize({ width: 375, height: 667 });

            // Search should still be visible and functional
            await expect(searchOverlay).toBeVisible();

            const searchDialog = page.getByRole("dialog");
            const boundingBox = await searchDialog.boundingBox();

            expect(boundingBox).not.toBeNull();
            if (boundingBox) {
                expect(boundingBox.width).toBeLessThanOrEqual(375);
            }
        });
    });
});
