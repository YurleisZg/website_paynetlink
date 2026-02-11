import { describe, it, expect } from "vitest";
import { render } from "@testing-library/vue";
import SocialIcon from "./SocialIcon.vue";

describe("SocialIcon", () => {
    it("renders as a link when href is provided", () => {
        const { container } = render(SocialIcon, {
            props: { href: "https://linkedin.com", ariaLabel: "LinkedIn" },
        });
        const link = container.querySelector("a");
        expect(link).not.toBeNull();
        expect(link?.getAttribute("href")).toBe("https://linkedin.com");
        expect(link?.getAttribute("target")).toBe("_blank");
    });

    it("renders as span when no href", () => {
        const { container } = render(SocialIcon);
        expect(container.querySelector("span")).not.toBeNull();
        expect(container.querySelector("a")).toBeNull();
    });
});
