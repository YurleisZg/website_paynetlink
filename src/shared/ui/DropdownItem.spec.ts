import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import DropdownItem from "./DropdownItem.vue";

describe("DropdownItem", () => {
    it("renders title", () => {
        render(DropdownItem, { props: { title: "Customers" } });
        expect(screen.getByText("Customers")).toBeDefined();
    });

    it("renders description when provided", () => {
        render(DropdownItem, {
            props: { title: "Users", description: "Manage all users" },
        });
        expect(screen.getByText("Manage all users")).toBeDefined();
    });

    it("does not render description when not provided", () => {
        const { container } = render(DropdownItem, { props: { title: "Users" } });
        const spans = container.querySelectorAll("span");
        expect(spans.length).toBe(1);
    });
});
