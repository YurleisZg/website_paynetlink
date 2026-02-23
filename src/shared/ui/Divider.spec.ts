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
});
