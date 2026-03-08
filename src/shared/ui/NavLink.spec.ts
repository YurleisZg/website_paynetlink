import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import NavLink from "./NavLink.vue";

describe("NavLink", () => {
    it("renders href as anchor href", () => {
        render(NavLink, { props: { label: "About", href: "/about" } });
        expect(screen.getByText("About").closest("a")?.getAttribute("href")).toBe("/about");
    });
});
