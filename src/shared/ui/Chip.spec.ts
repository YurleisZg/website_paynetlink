import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Chip from "./Chip.vue";

describe("Chip", () => {
    it("renders the label text", () => {
        render(Chip, { props: { label: "All" } });
        expect(screen.getByText("All")).toBeDefined();
    });
});
