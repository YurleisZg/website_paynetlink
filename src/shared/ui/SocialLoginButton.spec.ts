import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import SocialLoginButton from "./SocialLoginButton.vue";

describe("SocialLoginButton", () => {
    it("renders the label", () => {
        render(SocialLoginButton, { props: { label: "Google" } });
        expect(screen.getByText("Google")).toBeDefined();
    });

    it("emits click event", async () => {
        const { emitted } = render(SocialLoginButton, { props: { label: "Google" } });
        await fireEvent.click(screen.getByRole("button"));
        expect(emitted()).toHaveProperty("click");
    });
});
