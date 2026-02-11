import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import CTASection from "./CTASection.vue";

describe("CTASection", () => {
    it("renders title and primary action", () => {
        render(CTASection, {
            props: { title: "Get Started", primaryAction: "Sign Up Free" },
        });
        expect(screen.getByText("Get Started")).toBeDefined();
        expect(screen.getByText("Sign Up Free")).toBeDefined();
    });

    it("renders subtitle when provided", () => {
        render(CTASection, {
            props: {
                title: "CTA",
                subtitle: "Join thousands of ISPs",
                primaryAction: "Start",
            },
        });
        expect(screen.getByText("Join thousands of ISPs")).toBeDefined();
    });

    it("renders secondary action when provided", () => {
        render(CTASection, {
            props: {
                title: "CTA",
                primaryAction: "Start",
                secondaryAction: "Learn More",
            },
        });
        expect(screen.getByText("Learn More")).toBeDefined();
    });

    it("emits primaryClick", async () => {
        const { emitted } = render(CTASection, {
            props: { title: "CTA", primaryAction: "Go" },
        });
        await fireEvent.click(screen.getByText("Go"));
        expect(emitted()).toHaveProperty("primaryClick");
    });
});
