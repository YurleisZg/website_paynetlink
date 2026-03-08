import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import CTASection from "./CTASection.vue";

describe("CTASection", () => {
    it("emits primaryClick when primary button is clicked", async () => {
        const { emitted } = render(CTASection, {
            props: { title: "CTA", primaryAction: "Go" },
        });
        await fireEvent.click(screen.getByText("Go"));
        expect(emitted()).toHaveProperty("primaryClick");
    });
});
