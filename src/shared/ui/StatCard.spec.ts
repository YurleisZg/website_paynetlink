import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import StatCard from "./StatCard.vue";

describe("StatCard", () => {
    it("renders label and value", () => {
        render(StatCard, { props: { label: "Customers", value: "1,247" } });
        expect(screen.getByText("Customers")).toBeDefined();
        expect(screen.getByText("1,247")).toBeDefined();
    });

    it("renders change text when provided", () => {
        render(StatCard, {
            props: { label: "Revenue", value: "$5,000", change: "↑ 12.3% this month" },
        });
        expect(screen.getByText("↑ 12.3% this month")).toBeDefined();
    });
});
