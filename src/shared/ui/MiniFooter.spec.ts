import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import MiniFooter from "./MiniFooter.vue";

describe("MiniFooter", () => {
    it("renders copyright text", () => {
        render(MiniFooter, {
            props: { copyright: "© 2025 PayNetLink" },
        });
        expect(screen.getByText("© 2025 PayNetLink")).toBeDefined();
    });

    it("renders links when provided", () => {
        render(MiniFooter, {
            props: {
                copyright: "© 2025",
                links: [
                    { label: "Terms", href: "/terms" },
                    { label: "Privacy", href: "/privacy" },
                ],
            },
        });
        expect(screen.getByText("Terms")).toBeDefined();
        expect(screen.getByText("Privacy")).toBeDefined();
    });
});
