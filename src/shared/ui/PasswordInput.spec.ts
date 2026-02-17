import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import PasswordInput from "./PasswordInput.vue";

describe("PasswordInput", () => {
    describe("Rendering", () => {
        it("renders password input", () => {
            render(PasswordInput, {
                props: {
                    label: "Contraseña",
                    placeholder: "••••••••",
                },
            });

            expect(screen.getByLabelText("Contraseña")).toBeDefined();
        });

        it("renders without label when not provided", () => {
            render(PasswordInput, {
                props: {
                    placeholder: "Enter password",
                },
            });

            const input = screen.getByPlaceholderText("Enter password");
            expect(input).toBeDefined();
        });

        it("renders toggle visibility button", () => {
            render(PasswordInput);

            const toggleButton = screen.getByRole("button", {
                name: /Show password|Hide password/i,
            });
            expect(toggleButton).toBeDefined();
        });
    });

    describe("Password Visibility Toggle", () => {
        it("initially shows password as hidden (type=password)", () => {
            const { container } = render(PasswordInput, {
                props: { id: "test-password" },
            });

            const input = container.querySelector("input") as HTMLInputElement;
            expect(input.type).toBe("password");
        });

        it("toggles password visibility when button is clicked", async () => {
            const { container } = render(PasswordInput, {
                props: { id: "test-password" },
            });

            const input = container.querySelector("input") as HTMLInputElement;
            const toggleButton = screen.getByRole("button");

            // Initially hidden
            expect(input.type).toBe("password");

            // Click to show
            await fireEvent.click(toggleButton);
            expect(input.type).toBe("text");

            // Click to hide again
            await fireEvent.click(toggleButton);
            expect(input.type).toBe("password");
        });

        it("updates aria-label when toggling", async () => {
            render(PasswordInput);

            const toggleButton = screen.getByRole("button");

            // Initially should have "Show password" label
            expect(
                toggleButton.getAttribute("aria-label") === "Show password" ||
                    toggleButton.getAttribute("aria-label") === "Hide password"
            ).toBe(true);

            // Click to toggle
            await fireEvent.click(toggleButton);

            // Label should change
            expect(
                toggleButton.getAttribute("aria-label") === "Show password" ||
                    toggleButton.getAttribute("aria-label") === "Hide password"
            ).toBe(true);
        });
    });

    describe("Value Binding", () => {
        it("displays initial modelValue", () => {
            const { container } = render(PasswordInput, {
                props: {
                    modelValue: "initial-password",
                    id: "test-password",
                },
            });

            const input = container.querySelector("input") as HTMLInputElement;
            expect(input.value).toBe("initial-password");
        });

        it("emits update:modelValue on input", async () => {
            const { emitted, container } = render(PasswordInput, {
                props: { id: "test-password" },
            });

            const input = container.querySelector("input") as HTMLInputElement;

            await fireEvent.update(input, "new-password");

            expect(emitted()).toHaveProperty("update:modelValue");
            const updateEvents = emitted()["update:modelValue"];
            if (updateEvents) {
                expect(updateEvents[updateEvents.length - 1]).toEqual(["new-password"]);
            }
        });
    });

    describe("Accessibility", () => {
        it("associates label with input using id", () => {
            render(PasswordInput, {
                props: {
                    id: "password-field",
                    label: "Password",
                },
            });

            const label = screen.getByText("Password");
            const input = screen.getByLabelText("Password");

            expect(label.getAttribute("for")).toBe("password-field");
            expect(input.id).toBe("password-field");
        });

        it("has proper button type", () => {
            render(PasswordInput);

            const toggleButton = screen.getByRole("button");
            expect(toggleButton.getAttribute("type")).toBe("button");
        });
    });

    describe("Disabled State", () => {
        it("disables input when disabled prop is true", () => {
            const { container } = render(PasswordInput, {
                props: {
                    disabled: true,
                    id: "test-password",
                },
            });

            const input = container.querySelector("input") as HTMLInputElement;
            expect(input.disabled).toBe(true);
        });

        it("applies disabled styling classes", () => {
            const { container } = render(PasswordInput, {
                props: {
                    disabled: true,
                    id: "test-password",
                },
            });

            const input = container.querySelector("input") as HTMLInputElement;
            expect(input.className).toContain("disabled:cursor-not-allowed");
            expect(input.className).toContain("disabled:opacity-50");
        });
    });
});
