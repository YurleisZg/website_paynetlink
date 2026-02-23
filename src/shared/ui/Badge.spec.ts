import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Badge from "./Badge.vue";

describe("Badge", () => {
    it("renders the label text", () => {
        render(Badge, { props: { label: "New" } });
        expect(screen.getByText("New")).toBeDefined();
    });
});
