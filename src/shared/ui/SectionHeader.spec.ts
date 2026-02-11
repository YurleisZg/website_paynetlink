import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import SectionHeader from "./SectionHeader.vue";

describe("SectionHeader", () => {
    it("renders title", () => {
        render(SectionHeader, { props: { title: "Our Features" } });
        expect(screen.getByText("Our Features")).toBeDefined();
    });

    it("renders subtitle when provided", () => {
        render(SectionHeader, {
            props: { title: "Features", subtitle: "Everything you need" },
        });
        expect(screen.getByText("Everything you need")).toBeDefined();
    });

    it("does not render subtitle when not provided", () => {
        const { container } = render(SectionHeader, { props: { title: "Title" } });
        expect(container.querySelector("p")).toBeNull();
    });
});
