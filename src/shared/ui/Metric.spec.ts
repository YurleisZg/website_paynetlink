import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Metric from "./Metric.vue";

describe("Metric", () => {
    it("renders value and label", () => {
        render(Metric, { props: { value: "200+", label: "Clients" } });
        expect(screen.getByText("200+")).toBeDefined();
        expect(screen.getByText("Clients")).toBeDefined();
    });
});
