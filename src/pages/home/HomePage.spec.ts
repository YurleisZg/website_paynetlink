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
    let observerCallback: IntersectionObserverCallback;
    let observeElements: Element[] = [];

    beforeEach(() => {
        observeElements = [];

        // Mock IntersectionObserver
        globalThis.IntersectionObserver = vi.fn().mockImplementation((callback) => {
            observerCallback = callback;
            return {
                observe: vi.fn((element: Element) => {
                    observeElements.push(element);
                }),
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

        it("adds fade-in animation when element becomes visible", () => {
            const { container } = render(HomePage);

            const mockElement = document.createElement("div");
            container.appendChild(mockElement);

            const mockEntry = {
                target: mockElement,
                isIntersecting: true,
                intersectionRatio: 0.5,
                boundingClientRect: {} as DOMRectReadOnly,
                intersectionRect: {} as DOMRectReadOnly,
                rootBounds: null,
                time: Date.now(),
            } as IntersectionObserverEntry;

            if (observerCallback) {
                observerCallback([mockEntry], {} as IntersectionObserver);
            }

            expect(mockElement.classList.contains("animate-fade-in")).toBe(true);
        });

        it("does not animate elements that are not visible", () => {
            const { container } = render(HomePage);

            const mockElement = document.createElement("div");
            container.appendChild(mockElement);

            const mockEntry = {
                target: mockElement,
                isIntersecting: false,
                intersectionRatio: 0,
                boundingClientRect: {} as DOMRectReadOnly,
                intersectionRect: {} as DOMRectReadOnly,
                rootBounds: null,
                time: Date.now(),
            } as IntersectionObserverEntry;

            if (observerCallback) {
                observerCallback([mockEntry], {} as IntersectionObserver);
            }

            expect(mockElement.classList.contains("animate-fade-in")).toBe(false);
        });
    });
});
