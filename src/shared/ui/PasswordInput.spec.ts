import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import PasswordInput from "./PasswordInput.vue";

describe("PasswordInput", () => {
    it("renders visibility toggle button", () => {
        render(PasswordInput);
        expect(screen.getByRole("button", { name: /Show password|Hide password/i })).toBeDefined();
    });

    it("starts with password hidden", () => {
        const { container } = render(PasswordInput, { props: { id: "pw" } });
        expect((container.querySelector("input") as HTMLInputElement).type).toBe("password");
    });

    it("toggles input type between password and text on click", async () => {
        const { container } = render(PasswordInput, { props: { id: "pw" } });
        const input = container.querySelector("input") as HTMLInputElement;
        const btn = screen.getByRole("button");
        await fireEvent.click(btn);
        expect(input.type).toBe("text");
        await fireEvent.click(btn);
        expect(input.type).toBe("password");
    });

    it("displays initial modelValue", () => {
        const { container } = render(PasswordInput, {
            props: { modelValue: "initial-password", id: "pw" },
        });
        expect((container.querySelector("input") as HTMLInputElement).value).toBe(
            "initial-password"
        );
    });

    it("emits update:modelValue with new value on input", async () => {
        const { emitted, container } = render(PasswordInput, { props: { id: "pw" } });
        await fireEvent.update(
            container.querySelector("input") as HTMLInputElement,
            "new-password"
        );
        const events = emitted()["update:modelValue"];
        expect(events?.[events.length - 1]).toEqual(["new-password"]);
    });

    it("associates label with input via id", () => {
        render(PasswordInput, { props: { id: "pw-field", label: "Password" } });
        expect(screen.getByLabelText("Password").id).toBe("pw-field");
    });

    it("disables input when disabled prop is true", () => {
        const { container } = render(PasswordInput, { props: { disabled: true, id: "pw" } });
        expect((container.querySelector("input") as HTMLInputElement).disabled).toBe(true);
    });
});
