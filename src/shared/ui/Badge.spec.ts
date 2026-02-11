import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Badge from "./Badge.vue";

describe("Badge", () => {
    it("renders the label text", () => {
        render(Badge, { props: { label: "New" } });
        expect(screen.getByText("New")).toBeDefined();
    });

    it("has rounded-full class for pill shape", () => {
        const { container } = render(Badge, { props: { label: "Beta" } });
        expect(container.firstElementChild?.className).toContain("rounded-full");
    });
});
