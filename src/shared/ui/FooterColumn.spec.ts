import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import FooterColumn from "./FooterColumn.vue";

describe("FooterColumn", () => {
    it("renders title and links", () => {
        render(FooterColumn, {
            props: {
                title: "Company",
                links: [
                    { label: "About", href: "/about" },
                    { label: "Contact", href: "/contact" },
                ],
            },
        });
        expect(screen.getByText("Company")).toBeDefined();
        expect(screen.getByText("About")).toBeDefined();
        expect(screen.getByText("Contact")).toBeDefined();
    });

    it("renders correct hrefs", () => {
        const { container } = render(FooterColumn, {
            props: {
                title: "Product",
                links: [{ label: "Pricing", href: "/pricing" }],
            },
        });
        const link = container.querySelector("a");
        expect(link?.getAttribute("href")).toBe("/pricing");
    });
});
