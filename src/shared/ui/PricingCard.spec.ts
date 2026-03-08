import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import PricingCard from "./PricingCard.vue";

describe("PricingCard", () => {
    const defaultProps = {
        planName: "Basic",
        price: "$29.900",
        features: ["10 clients", "1 router", "Email support"],
    };

    it("shows badge when featured", () => {
        render(PricingCard, { props: { ...defaultProps, featured: true } });
        expect(screen.getByText("Más popular")).toBeDefined();
    });

    it("does not show badge when not featured", () => {
        const { container } = render(PricingCard, { props: defaultProps });
        expect(container.textContent).not.toContain("Más popular");
    });
});
