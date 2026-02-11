import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import IntegrationCard from "./IntegrationCard.vue";

describe("IntegrationCard", () => {
    it("renders the label", () => {
        render(IntegrationCard, { props: { label: "MikroTik" } });
        expect(screen.getByText("MikroTik")).toBeDefined();
    });
});
