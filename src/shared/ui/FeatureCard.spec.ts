import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import FeatureCard from "./FeatureCard.vue";

describe("FeatureCard", () => {
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
});
