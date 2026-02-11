import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Step from "./Step.vue";

describe("Step", () => {
    it("renders number, title, and description", () => {
        render(Step, {
            props: { number: 1, title: "Sign Up", description: "Create your account" },
        });
        expect(screen.getByText("1")).toBeDefined();
        expect(screen.getByText("Sign Up")).toBeDefined();
        expect(screen.getByText("Create your account")).toBeDefined();
    });

    it("renders without description", () => {
        const { container } = render(Step, { props: { number: 2, title: "Configure" } });
        expect(container.querySelector("p")).toBeNull();
    });
});
