import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import PricingCard from "./PricingCard.vue";

describe("PricingCard", () => {
    const defaultProps = {
        planName: "Basic",
        price: "$29.900",
        features: ["10 clients", "1 router", "Email support"],
    };

    it("renders plan name and price", () => {
        render(PricingCard, { props: defaultProps });
        expect(screen.getByText("Basic")).toBeDefined();
        expect(screen.getByText("$29.900")).toBeDefined();
    });

    it("renders all features", () => {
        render(PricingCard, { props: defaultProps });
        expect(screen.getByText("10 clients")).toBeDefined();
        expect(screen.getByText("1 router")).toBeDefined();
        expect(screen.getByText("Email support")).toBeDefined();
    });

    it("renders button with default label", () => {
        render(PricingCard, { props: defaultProps });
        expect(screen.getByText("Get Started")).toBeDefined();
    });

    it("renders custom button label", () => {
        render(PricingCard, { props: { ...defaultProps, buttonLabel: "Subscribe" } });
        expect(screen.getByText("Subscribe")).toBeDefined();
    });

    it("shows badge when featured", () => {
        render(PricingCard, { props: { ...defaultProps, featured: true } });
        expect(screen.getByText("Más popular")).toBeDefined();
    });

    it("does not show badge when not featured", () => {
        const { container } = render(PricingCard, { props: defaultProps });
        expect(container.textContent).not.toContain("Más popular");
    });

    it("applies featured styles", () => {
        const { container } = render(PricingCard, { props: { ...defaultProps, featured: true } });
        expect(container.firstElementChild?.className).toContain("border-primary");
    });
});
