import { describe, it, expect } from "vitest";
import { render } from "@testing-library/vue";
import FooterColumn from "./FooterColumn.vue";

describe("FooterColumn", () => {
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
