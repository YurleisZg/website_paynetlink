import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Logo from "./Logo.vue";

describe("Logo", () => {
    it("renders the brand name", () => {
        render(Logo);
        expect(screen.getByText("PayNetLink")).toBeDefined();
    });

    it("applies size classes for sm", () => {
        const { container } = render(Logo, { props: { size: "sm" } });
        const text = container.querySelector("span");
        expect(text?.className).toContain("text-[15px]");
    });

    it("applies size classes for lg", () => {
        const { container } = render(Logo, { props: { size: "lg" } });
        const text = container.querySelector("span");
        expect(text?.className).toContain("text-3xl");
    });

    it("defaults to md size", () => {
        const { container } = render(Logo, { props: {} });
        const text = container.querySelector("span");
        expect(text?.className).toContain("text-[22px]");
    });
});
