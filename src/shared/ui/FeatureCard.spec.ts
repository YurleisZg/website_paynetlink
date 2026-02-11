import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import FeatureCard from "./FeatureCard.vue";

describe("FeatureCard", () => {
    it("renders title and description", () => {
        render(FeatureCard, {
            props: { title: "Client Management", description: "Manage all your clients." },
        });
        expect(screen.getByText("Client Management")).toBeDefined();
        expect(screen.getByText("Manage all your clients.")).toBeDefined();
    });

    it("renders link when linkText is provided", () => {
        render(FeatureCard, {
            props: {
                title: "Feature",
                description: "Desc",
                linkText: "Learn more →",
                linkHref: "/feature",
            },
        });
        const link = screen.getByText("Learn more →");
        expect(link.closest("a")?.getAttribute("href")).toBe("/feature");
    });

    it("does not render link when linkText is empty", () => {
        const { container } = render(FeatureCard, {
            props: { title: "Feature", description: "Desc" },
        });
        expect(container.querySelector("a")).toBeNull();
    });
});
