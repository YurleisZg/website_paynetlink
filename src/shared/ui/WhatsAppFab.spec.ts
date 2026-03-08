import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/vue";
import WhatsAppFab from "./WhatsAppFab.vue";

describe("WhatsAppFab", () => {
    it("renders a link with the correct WhatsApp href", () => {
        render(WhatsAppFab);
        const link = screen.getByRole("link", { name: /chat on whatsapp/i });
        expect(link).toBeTruthy();
        expect(link.getAttribute("href")).toBe("https://wa.me/573016399323");
    });

    it("opens in a new tab", () => {
        render(WhatsAppFab);
        const link = screen.getByRole("link", { name: /chat on whatsapp/i });
        expect(link.getAttribute("target")).toBe("_blank");
        expect(link.getAttribute("rel")).toContain("noopener");
    });
});
