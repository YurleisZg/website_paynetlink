import { test, expect } from "@playwright/test";

test.describe("PayNetLink Landing Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test.describe("Navbar", () => {
        test("should display logo", async ({ page }) => {
            const logo = page.locator("nav").getByRole("img", { name: /paynetlink/i });
            await expect(logo).toBeVisible();
        });

        test("should display navigation links", async ({ page }) => {
            const nav = page.locator("nav");
            await expect(nav.getByRole("link", { name: /productos/i })).toBeVisible();
            await expect(nav.getByRole("link", { name: /soluciones/i })).toBeVisible();
            await expect(nav.getByRole("link", { name: /precios/i })).toBeVisible();
            await expect(nav.getByRole("link", { name: /recursos/i })).toBeVisible();
            await expect(nav.getByRole("link", { name: /empresa/i })).toBeVisible();
        });

        test("should display search icon", async ({ page }) => {
            const searchButton = page.getByRole("button", { name: /open search/i });
            await expect(searchButton).toBeVisible();
        });

        test("should display login button", async ({ page }) => {
            const nav = page.locator("nav");
            await expect(nav.getByRole("link", { name: /iniciar sesión/i })).toBeVisible();
        });

        test("should display CTA button", async ({ page }) => {
            const nav = page.locator("nav");
            const ctaButton = nav.getByRole("link", { name: /prueba gratis/i });
            await expect(ctaButton).toBeVisible();
            await expect(ctaButton).toHaveCSS("background-color", "rgb(26, 86, 219)"); // #1A56DB
        });
    });

    test.describe("Hero Section", () => {
        test("should display hero title", async ({ page }) => {
            const title = page.getByRole("heading", {
                name: /gestiona tu isp desde un solo lugar/i,
            });
            await expect(title).toBeVisible();
            await expect(title).toContainText("Cobra mejor, opera más rápido");
        });

        test("should display hero subtitle", async ({ page }) => {
            const subtitle = page.getByText(/paynetlink automatiza la gestión de clientes/i);
            await expect(subtitle).toBeVisible();
        });

        test("should display badge", async ({ page }) => {
            const badge = page.locator('[data-testid="hero-badge"]');
            await expect(badge).toBeVisible();
        });

        test("should display CTA buttons", async ({ page }) => {
            const hero = page.locator('[data-testid="hero-section"]');
            await expect(
                hero.getByRole("link", { name: /comenzar prueba gratuita/i })
            ).toBeVisible();
            await expect(hero.getByRole("link", { name: /ver demo/i })).toBeVisible();
        });

        test("should display small text below buttons", async ({ page }) => {
            await expect(
                page.getByText(/sin tarjeta de crédito.*configuración en 10 minutos/i)
            ).toBeVisible();
        });

        test("should display dashboard mockup", async ({ page }) => {
            const mockup = page.locator('[data-testid="hero-dashboard-mockup"]');
            await expect(mockup).toBeVisible();
            // Verify mockup has shadow
            const boxShadow = await mockup.evaluate((el) => window.getComputedStyle(el).boxShadow);
            expect(boxShadow).not.toBe("none");
        });
    });

    test.describe("Social Proof Section", () => {
        test("should display trust text", async ({ page }) => {
            await expect(
                page.getByText(/más de 200 proveedores de internet confían/i)
            ).toBeVisible();
        });

        test("should display company logos", async ({ page }) => {
            const socialProof = page.locator('[data-testid="social-proof"]');
            const logos = [
                "FibraNet",
                "NetSpeed",
                "ConectaISP",
                "WiFiMax",
                "RedCo",
                "TelcoFibra",
                "NetPro",
            ];

            for (const logo of logos) {
                await expect(socialProof.getByText(logo).first()).toBeVisible();
            }
        });

        test("should display metrics", async ({ page }) => {
            const socialProof = page.locator('[data-testid="social-proof"]');
            // 200+ ISPs
            await expect(socialProof.getByText(/200\+/)).toBeVisible();
            await expect(socialProof.getByText(/isps/i).first()).toBeVisible();

            // $10,000+ payments
            await expect(socialProof.getByText(/\$10,000\+/)).toBeVisible();
            await expect(socialProof.getByText(/pagos gestionados/i)).toBeVisible();

            // 99.9% uptime
            await expect(socialProof.getByText(/99\.9%/)).toBeVisible();
            await expect(socialProof.getByText(/uptime/i)).toBeVisible();

            // $20+ revenue
            await expect(socialProof.getByText(/\$20\+/)).toBeVisible();
            await expect(socialProof.getByText(/recaudado/i)).toBeVisible();
        });

        test("should have light gray background", async ({ page }) => {
            const section = page.locator('[data-testid="social-proof"]');
            await expect(section).toHaveCSS("background-color", "rgb(245, 245, 245)"); // #F5F5F5
        });
    });

    test.describe("Features Section", () => {
        test("should display section title", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /todo lo que tu isp necesita en una sola plataforma/i,
                })
            ).toBeVisible();
        });

        test("should display section subtitle", async ({ page }) => {
            await expect(
                page.getByText(/desde el registro del cliente hasta el cobro automático/i)
            ).toBeVisible();
        });

        test("should display 6 feature cards", async ({ page }) => {
            const featureCards = page.locator('[data-testid="feature-card"]');
            await expect(featureCards).toHaveCount(6);
        });

        test("should display feature cards with icons and content", async ({ page }) => {
            const features = [
                "Gestión de Clientes",
                "Pagos Recurrentes",
                "Automatización de Red",
                "Notificaciones Automáticas",
                "Facturación Electrónica",
                "Reportes y Analítica",
            ];

            for (const feature of features) {
                await expect(page.getByRole("heading", { name: feature })).toBeVisible();
            }
        });

        test("feature cards should have border", async ({ page }) => {
            const firstCard = page.locator('[data-testid="feature-card"]').first();
            const borderWidth = await firstCard.evaluate(
                (el) => window.getComputedStyle(el).borderWidth
            );
            expect(borderWidth).toBe("1px");
        });
    });

    test.describe("Feature Highlights", () => {
        test("should display 3 highlight sections", async ({ page }) => {
            const highlights = page.locator('[data-testid="feature-highlight"]');
            await expect(highlights).toHaveCount(3);
        });

        test("first highlight should have image on left", async ({ page }) => {
            const firstHighlight = page.locator('[data-testid="feature-highlight"]').first();
            const content = firstHighlight.locator('[data-testid="highlight-content"]');

            // Check that content is visible
            await expect(content).toBeVisible();
            // Check that highlight has rounded corners
            const borderRadius = await firstHighlight.evaluate((el) => {
                const imageDiv = el.querySelector(".rounded-xl");
                return imageDiv ? window.getComputedStyle(imageDiv).borderRadius : "";
            });
            expect(borderRadius).toContain("12px");
        });

        test("second highlight should have image on right", async ({ page }) => {
            const secondHighlight = page.locator('[data-testid="feature-highlight"]').nth(1);
            const content = secondHighlight.locator('[data-testid="highlight-content"]');
            await expect(content).toBeVisible();
        });

        test("highlights should have rounded images with border", async ({ page }) => {
            const firstHighlight = page.locator('[data-testid="feature-highlight"]').first();
            const borderRadius = await firstHighlight.evaluate((el) => {
                const imageDiv = el.querySelector(".rounded-xl");
                return imageDiv ? window.getComputedStyle(imageDiv).borderRadius : "";
            });
            expect(borderRadius).toContain("12px");
        });
    });

    test.describe("How It Works Section", () => {
        test("should display section title", async ({ page }) => {
            await expect(page.getByRole("heading", { name: /empieza en 3 pasos/i })).toBeVisible();
        });

        test("should display 3 steps", async ({ page }) => {
            const steps = page.locator('[data-testid="step"]');
            await expect(steps).toHaveCount(3);
        });

        test("should display step numbers", async ({ page }) => {
            const steps = page.locator('[data-testid="step"]');
            await expect(steps.first()).toContainText("1");
            await expect(steps.nth(1)).toContainText("2");
            await expect(steps.nth(2)).toContainText("3");
        });

        test("should display step titles", async ({ page }) => {
            await expect(page.getByText(/crea tu cuenta/i)).toBeVisible();
            await expect(page.getByText(/conecta tu red/i)).toBeVisible();
            await expect(page.getByText(/automatiza y crece/i)).toBeVisible();
        });

        test("should display CTA button", async ({ page }) => {
            const cta = page.getByRole("link", { name: /comenzar ahora.*es gratis/i });
            await expect(cta).toBeVisible();
            await expect(cta).toHaveCSS("background-color", "rgb(26, 86, 219)"); // #1A56DB
        });
    });

    test.describe("Pricing Section", () => {
        test("should display section title", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /planes que crecen contigo/i })
            ).toBeVisible();
        });

        test("should display section subtitle", async ({ page }) => {
            await expect(
                page.getByText(/sin contratos de permanencia.*cambia o cancela/i)
            ).toBeVisible();
        });

        test("should display 3 pricing cards", async ({ page }) => {
            const pricing = page.locator('[data-testid="pricing-section"]');
            const pricingCards = pricing.locator(
                '[data-testid="pricing-card"], [data-testid="pricing-card-featured"]'
            );
            await expect(pricingCards).toHaveCount(3);
        });

        test("should display plan names", async ({ page }) => {
            const pricing = page.locator('[data-testid="pricing-section"]');
            await expect(pricing.getByRole("heading", { name: /^gratis$/i })).toBeVisible();
            await expect(pricing.getByRole("heading", { name: /^profesional$/i })).toBeVisible();
            await expect(pricing.getByRole("heading", { name: /^empresa$/i })).toBeVisible();
        });

        test("middle plan should be featured", async ({ page }) => {
            const featuredCard = page.locator('[data-testid="pricing-card-featured"]');
            await expect(featuredCard).toBeVisible();
            await expect(featuredCard).toHaveCSS("border-color", "rgb(26, 86, 219)"); // #1A56DB
        });

        test("should display pricing amounts", async ({ page }) => {
            await expect(page.getByText(/\$0/)).toBeVisible();
            await expect(page.getByText(/\$49,900/)).toBeVisible();
            await expect(page.getByText(/personalizado/i)).toBeVisible();
        });

        test("should have light gray background", async ({ page }) => {
            const section = page.locator('[data-testid="pricing-section"]');
            await expect(section).toHaveCSS("background-color", "rgb(245, 245, 245)"); // #F5F5F5
        });
    });

    test.describe("Testimonials Section", () => {
        test("should display section title", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /isps que ya confían en paynetlink/i })
            ).toBeVisible();
        });

        test("should display 3 testimonial cards", async ({ page }) => {
            const testimonials = page.locator('[data-testid="testimonial-card"]');
            await expect(testimonials).toHaveCount(3);
        });

        test("testimonial cards should have rounded corners", async ({ page }) => {
            const firstCard = page.locator('[data-testid="testimonial-card"]').first();
            const borderRadius = await firstCard.evaluate(
                (el) => window.getComputedStyle(el).borderRadius
            );
            expect(borderRadius).toBe("8px");
        });
    });

    test.describe("Integrations Section", () => {
        test("should display section title", async ({ page }) => {
            await expect(
                page.getByRole("heading", {
                    name: /se integra con las herramientas que ya usas/i,
                })
            ).toBeVisible();
        });

        test("should display 9 integration cards", async ({ page }) => {
            const integrations = page.locator('[data-testid="integration-card"]');
            await expect(integrations).toHaveCount(9);
        });

        test("should display integration note", async ({ page }) => {
            await expect(
                page.getByText(/no encuentras tu integración.*api abierta/i)
            ).toBeVisible();
        });

        test("integration cards should be square", async ({ page }) => {
            const firstCard = page.locator('[data-testid="integration-card"]').first();
            const width = await firstCard.evaluate((el) => el.offsetWidth);
            const height = await firstCard.evaluate((el) => el.offsetHeight);
            expect(width).toBeGreaterThan(100);
            expect(height).toBeGreaterThan(90);
        });

        test("should have light gray background", async ({ page }) => {
            const section = page.locator('[data-testid="integrations-section"]');
            await expect(section).toHaveCSS("background-color", "rgb(245, 245, 245)"); // #F5F5F5
        });
    });

    test.describe("CTA Final Section", () => {
        test("should display CTA title", async ({ page }) => {
            await expect(
                page.getByRole("heading", { name: /lleva tu isp al siguiente nivel/i })
            ).toBeVisible();
        });

        test("should display CTA subtitle", async ({ page }) => {
            await expect(
                page.getByText(/únete a cientos de proveedores que ya optimizan/i)
            ).toBeVisible();
        });

        test("should display two CTA buttons", async ({ page }) => {
            const links = page.locator('[data-testid="cta-final"] a[href]');
            await expect(links).toHaveCount(2);
        });

        test("should have blue background", async ({ page }) => {
            const section = page.locator('[data-testid="cta-final"]');
            await expect(section).toHaveCSS("background-color", "rgb(26, 86, 219)"); // #1A56DB
        });

        test("text should be white", async ({ page }) => {
            const title = page
                .locator('[data-testid="cta-final"]')
                .getByRole("heading", { name: /lleva tu isp/i });
            await expect(title).toHaveCSS("color", "rgb(255, 255, 255)");
        });
    });

    test.describe("Footer", () => {
        test("should display footer with 4 columns", async ({ page }) => {
            const columns = page.locator('[data-testid="footer-column"]');
            await expect(columns).toHaveCount(4);
        });

        test("should display brand column with logo", async ({ page }) => {
            const logo = page.locator('[data-testid="footer-logo"]');
            await expect(logo).toBeVisible();
        });

        test("should display copyright text", async ({ page }) => {
            await expect(
                page.getByText(/© \d{4} PayNetLink.*Todos los derechos reservados/i)
            ).toBeVisible();
        });

        test("should display made with love text", async ({ page }) => {
            await expect(
                page.getByText(/hecho con amor para isps de latinoamérica/i)
            ).toBeVisible();
        });

        test("should have dark background", async ({ page }) => {
            const footer = page.locator("footer");
            await expect(footer).toHaveCSS("background-color", "rgb(31, 31, 31)"); // #1F1F1F
        });

        test("should display footer divider", async ({ page }) => {
            const divider = page.locator('[data-testid="footer-divider"]');
            await expect(divider).toBeVisible();
        });
    });

    test.describe("Layout and Spacing", () => {
        test("page should have full width container", async ({ page }) => {
            const mainContainer = page.locator("main").first();
            const width = await mainContainer.evaluate((el) => el.offsetWidth);
            expect(width).toBeGreaterThan(1200);
        });

        test("sections should have consistent padding", async ({ page }) => {
            const hero = page.locator('[data-testid="hero-section"]');
            const heroPadding = await hero.evaluate((el) => window.getComputedStyle(el).padding);
            expect(heroPadding).toContain("80px");
        });

        test("navbar should be sticky at top", async ({ page }) => {
            const navbar = page.locator("nav");
            await expect(navbar).toHaveCSS("position", "sticky");
            await expect(navbar).toHaveCSS("top", "0px");
        });
    });

    test.describe("Responsive Design", () => {
        test("should be mobile responsive", async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 667 });
            await expect(page.getByRole("heading", { name: /gestiona tu isp/i })).toBeVisible();
        });

        test("navbar should collapse on mobile", async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 667 });
            const mobileMenu = page.getByRole("button", { name: /toggle menu/i });
            await expect(mobileMenu).toBeVisible();
        });

        test("should adapt grid layout on tablet", async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 });
            const featureCards = page.locator('[data-testid="feature-card"]');
            await expect(featureCards).toHaveCount(6);
        });
    });

    test.describe("Interactions", () => {
        test("CTA buttons should be clickable", async ({ page }) => {
            const hero = page.locator('[data-testid="hero-section"]');
            const ctaButton = hero.getByRole("link", { name: /comenzar prueba gratuita/i });
            await expect(ctaButton).toBeVisible();
            await ctaButton.click();

            // Wait for navigation to register page
            await page.waitForURL("/register");
            expect(page.url()).toContain("/register");
        });

        test("navigation links should be clickable", async ({ page }) => {
            const nav = page.locator("nav");
            const pricingLink = nav.getByRole("link", { name: /precios/i });
            await pricingLink.click();
            await expect(page).toHaveURL(/.*#pricing/);
        });

        test("buttons should have hover state", async ({ page }) => {
            const nav = page.locator("nav");
            const button = nav.getByRole("link", { name: /prueba gratis/i });
            await button.hover();
            // Should change appearance on hover
            const bgColor = await button.evaluate(
                (el) => window.getComputedStyle(el).backgroundColor
            );
            expect(bgColor).toBeTruthy();
        });
    });
});
