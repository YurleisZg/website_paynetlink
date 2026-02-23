import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/vue";
import HomePage from "./HomePage.vue";

// Mock all widget components
vi.mock("@/widgets/cta", () => ({
    CTASection: { name: "CTASection", template: "<div data-testid='cta-section'></div>" },
}));

vi.mock("@/widgets/features", () => ({
    FeatureHighlights: {
        name: "FeatureHighlights",
        template: "<div data-testid='feature-highlights'></div>",
    },
    FeaturesSection: {
        name: "FeaturesSection",
        template: "<div data-testid='features-section'></div>",
    },
}));

vi.mock("@/widgets/footer", () => ({
    Footer: { name: "Footer", template: "<div data-testid='footer'></div>" },
}));

vi.mock("@/widgets/hero", () => ({
    HeroSection: { name: "HeroSection", template: "<div data-testid='hero-section'></div>" },
}));

vi.mock("@/widgets/how-it-works", () => ({
    HowItWorks: { name: "HowItWorks", template: "<div data-testid='how-it-works'></div>" },
}));

vi.mock("@/widgets/integrations", () => ({
    IntegrationsSection: {
        name: "IntegrationsSection",
        template: "<div data-testid='integrations-section'></div>",
    },
}));

vi.mock("@/widgets/navigation", () => ({
    Navbar: { name: "Navbar", template: "<div data-testid='navbar'></div>" },
}));

vi.mock("@/widgets/pricing", () => ({
    PricingSection: {
        name: "PricingSection",
        template: "<div data-testid='pricing-section'></div>",
    },
}));

vi.mock("@/widgets/social-proof", () => ({
    SocialProof: { name: "SocialProof", template: "<div data-testid='social-proof'></div>" },
}));

vi.mock("@/widgets/testimonials", () => ({
    TestimonialsSection: {
        name: "TestimonialsSection",
        template: "<div data-testid='testimonials-section'></div>",
    },
}));

describe("HomePage", () => {
    beforeEach(() => {
        // Mock IntersectionObserver
        globalThis.IntersectionObserver = vi.fn().mockImplementation(() => {
            return {
                observe: vi.fn(),
                unobserve: vi.fn(),
                disconnect: vi.fn(),
            };
        }) as unknown as typeof IntersectionObserver;
    });

    describe("Basic Rendering", () => {
        it("renders all main sections", () => {
            const { container } = render(HomePage);

            expect(container.querySelector('[data-testid="navbar"]')).toBeDefined();
            expect(container.querySelector('[data-testid="hero-section"]')).toBeDefined();
            expect(container.querySelector('[data-testid="social-proof"]')).toBeDefined();
            expect(container.querySelector('[data-testid="features-section"]')).toBeDefined();
            expect(container.querySelector('[data-testid="feature-highlights"]')).toBeDefined();
            expect(container.querySelector('[data-testid="how-it-works"]')).toBeDefined();
            expect(container.querySelector('[data-testid="pricing-section"]')).toBeDefined();
            expect(container.querySelector('[data-testid="testimonials-section"]')).toBeDefined();
            expect(container.querySelector('[data-testid="integrations-section"]')).toBeDefined();
            expect(container.querySelector('[data-testid="cta-section"]')).toBeDefined();
            expect(container.querySelector('[data-testid="footer"]')).toBeDefined();
        });
    });

    describe("Component Layout Order", () => {
        it("renders components in correct order", () => {
            const { container } = render(HomePage);
            const sections = Array.from(container.querySelectorAll("[data-testid]")).map((el) =>
                el.getAttribute("data-testid")
            );

            expect(sections).toEqual([
                "navbar",
                "hero-section",
                "social-proof",
                "features-section",
                "feature-highlights",
                "how-it-works",
                "pricing-section",
                "testimonials-section",
                "integrations-section",
                "cta-section",
                "footer",
            ]);
        });
    });

    describe("Scroll Animations", () => {
        it("initializes IntersectionObserver on mount", () => {
            render(HomePage);
            expect(globalThis.IntersectionObserver).toHaveBeenCalled();
        });
    });
});
