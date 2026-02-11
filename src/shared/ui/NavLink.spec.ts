import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import NavLink from "./NavLink.vue";

describe("NavLink", () => {
    it("renders the label text as anchor", () => {
        render(NavLink, { props: { label: "Home", href: "/" } });
        expect(screen.getByText("Home")).toBeDefined();
    });

    it('renders href link when no "to" prop', () => {
        render(NavLink, { props: { label: "About", href: "/about" } });
        const link = screen.getByText("About");
        expect(link.closest("a")?.getAttribute("href")).toBe("/about");
    });
});
