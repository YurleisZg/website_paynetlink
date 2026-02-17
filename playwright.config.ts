import { defineConfig, devices } from "@playwright/test";

/**
 * Configuración de Playwright para tests E2E.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    // Aumentar workers en CI para paralelización
    workers: process.env.CI ? 4 : undefined,
    reporter: "html",
    use: {
        baseURL: "http://localhost:5173",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    projects: [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        // Solo ejecutar Firefox y WebKit localmente, no en CI
        ...(!process.env.CI
            ? [
                  { name: "firefox", use: { ...devices["Desktop Firefox"] } },
                  { name: "webkit", use: { ...devices["Desktop Safari"] } },
              ]
            : []),
    ],
    webServer: {
        command: "pnpm run dev",
        url: "http://localhost:5173",
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
});
