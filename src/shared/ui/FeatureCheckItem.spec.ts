import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import FeatureCheckItem from "./FeatureCheckItem.vue";

describe("FeatureCheckItem", () => {
    it("renders the feature text", () => {
        render(FeatureCheckItem, { props: { label: "Unlimited bandwidth" } });
        expect(screen.getByText("Unlimited bandwidth")).toBeDefined();
    });
});
