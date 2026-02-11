import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import BaseInput from "./BaseInput.vue";

describe("BaseInput", () => {
    it("renders without label", () => {
        const { container } = render(BaseInput);
        expect(container.querySelector("label")).toBeNull();
    });

    it("renders label when provided", () => {
        render(BaseInput, { props: { label: "Email" } });
        expect(screen.getByText("Email")).toBeDefined();
    });

    it("renders placeholder", () => {
        render(BaseInput, { props: { placeholder: "Enter email" } });
        expect(screen.getByPlaceholderText("Enter email")).toBeDefined();
    });

    it("emits update:modelValue on input", async () => {
        const { emitted } = render(BaseInput, { props: { modelValue: "" } });
        const input = screen.getByRole("textbox");
        await fireEvent.update(input, "test@email.com");
        expect(emitted()["update:modelValue"]).toBeDefined();
    });

    it("renders with given value", () => {
        render(BaseInput, { props: { modelValue: "hello" } });
        const input = screen.getByRole("textbox") as HTMLInputElement;
        expect(input.value).toBe("hello");
    });

    it("associates label with input via id", () => {
        render(BaseInput, { props: { label: "Name", id: "name-input" } });
        const label = screen.getByText("Name");
        expect(label.getAttribute("for")).toBe("name-input");
    });
});
