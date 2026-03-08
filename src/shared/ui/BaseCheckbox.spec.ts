import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import BaseCheckbox from "./BaseCheckbox.vue";

describe("BaseCheckbox", () => {
    it("renders as checked when modelValue is true", () => {
        render(BaseCheckbox, { props: { modelValue: true, label: "Check" } });
        const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
    });

    it("emits update:modelValue on change", async () => {
        const { emitted } = render(BaseCheckbox, { props: { modelValue: false, label: "Check" } });
        await fireEvent.click(screen.getByRole("checkbox"));
        expect(emitted()["update:modelValue"]).toBeDefined();
    });
});
