import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import Button from "./Button.vue";

describe("Button", () => {
    it("renders slot content", () => {
        render(Button, { slots: { default: "Click me" } });
        expect(screen.getByText("Click me")).toBeDefined();
    });

    it("applies primary variant by default", () => {
        render(Button, { slots: { default: "Primary" } });
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("bg-primary");
    });

    it("applies outline variant classes", () => {
        render(Button, { props: { variant: "outline" }, slots: { default: "Outline" } });
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("border");
    });

    it("applies ghost variant classes", () => {
        render(Button, { props: { variant: "ghost" }, slots: { default: "Ghost" } });
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("text-primary");
        expect(btn.className.split(" ")).not.toContain("bg-primary");
    });

    it("renders as disabled", () => {
        render(Button, { props: { disabled: true }, slots: { default: "Disabled" } });
        expect(screen.getByRole("button")).toHaveProperty("disabled", true);
    });

    it("applies full width class", () => {
        render(Button, { props: { fullWidth: true }, slots: { default: "Full" } });
        expect(screen.getByRole("button").className).toContain("w-full");
    });

    it("defaults to button type", () => {
        render(Button, { slots: { default: "Btn" } });
        expect(screen.getByRole("button").getAttribute("type")).toBe("button");
    });

    it("accepts submit type", () => {
        render(Button, { props: { type: "submit" }, slots: { default: "Submit" } });
        expect(screen.getByRole("button").getAttribute("type")).toBe("submit");
    });

    it("emits click event", async () => {
        const { emitted } = render(Button, { slots: { default: "Click" } });
        await fireEvent.click(screen.getByRole("button"));
        expect(emitted()).toHaveProperty("click");
    });
});
