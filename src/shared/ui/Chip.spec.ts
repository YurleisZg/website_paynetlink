import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Chip from "./Chip.vue";

describe("Chip", () => {
    it("renders the label text", () => {
        render(Chip, { props: { label: "All" } });
        expect(screen.getByText("All")).toBeDefined();
    });

    it("applies inactive styles by default", () => {
        const { container } = render(Chip, { props: { label: "Tag" } });
        expect(container.firstElementChild?.className).toContain("bg-surface");
    });

    it("applies active styles when active", () => {
        const { container } = render(Chip, { props: { label: "Tag", active: true } });
        expect(container.firstElementChild?.className).toContain("bg-primary");
        expect(container.firstElementChild?.className).toContain("text-white");
    });
});
