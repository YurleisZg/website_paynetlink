import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Divider from "./Divider.vue";

describe("Divider", () => {
    it("renders without label", () => {
        const { container } = render(Divider);
        expect(container.querySelector("span")).toBeNull();
    });

    it("renders with label text", () => {
        render(Divider, { props: { label: "or continue with" } });
        expect(screen.getByText("or continue with")).toBeDefined();
    });

    it("renders two lines when label is present", () => {
        const { container } = render(Divider, { props: { label: "or" } });
        const lines = container.querySelectorAll(".bg-divider");
        expect(lines.length).toBe(2);
    });

    it("renders one line when no label", () => {
        const { container } = render(Divider);
        const lines = container.querySelectorAll(".bg-divider");
        expect(lines.length).toBe(1);
    });
});
