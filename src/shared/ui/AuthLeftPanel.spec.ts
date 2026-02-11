import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import AuthLeftPanel from "./AuthLeftPanel.vue";

describe("AuthLeftPanel", () => {
    it("renders title and description", () => {
        render(AuthLeftPanel, {
            props: {
                title: "Simplifica tu ISP.",
                description: "Accede a tu panel de control.",
            },
        });
        expect(screen.getByText("Simplifica tu ISP.")).toBeDefined();
        expect(screen.getByText("Accede a tu panel de control.")).toBeDefined();
    });

    it("renders the PayNetLink brand name", () => {
        render(AuthLeftPanel, {
            props: { title: "Title", description: "Desc" },
        });
        expect(screen.getByText("PayNetLink")).toBeDefined();
    });
});
