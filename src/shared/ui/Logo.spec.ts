import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Logo from "./Logo.vue";

describe("Logo", () => {
    it("renders the brand name", () => {
        render(Logo);
        expect(screen.getByText("PayNetLink")).toBeDefined();
    });
});
