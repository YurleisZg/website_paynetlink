import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import Button from "./Button.vue";

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", name: "home", component: { template: "<div>Home</div>" } },
        { path: "/login", name: "login", component: { template: "<div>Login</div>" } },
    ],
});

describe("Button", () => {
    it("renders as disabled", () => {
        render(Button, { props: { disabled: true }, slots: { default: "Disabled" } });
        expect(screen.getByRole("button")).toHaveProperty("disabled", true);
    });

    it("emits click event", async () => {
        const { emitted } = render(Button, { slots: { default: "Click" } });
        await fireEvent.click(screen.getByRole("button"));
        expect(emitted()).toHaveProperty("click");
    });

    describe("Router navigation", () => {
        it("renders as link with correct href when 'to' prop provided", () => {
            render(Button, {
                props: { to: "/login" },
                slots: { default: "Go to login" },
                global: { plugins: [router] },
            });
            expect(screen.getByRole("link").getAttribute("href")).toBe("/login");
        });

        it("applies aria-disabled to RouterLink when disabled", () => {
            render(Button, {
                props: { to: "/login", disabled: true },
                slots: { default: "Disabled Link" },
                global: { plugins: [router] },
            });
            expect(screen.getByRole("link").getAttribute("aria-disabled")).toBe("true");
        });

        it("prefers 'to' over 'href' when both provided", () => {
            render(Button, {
                props: { to: "/login", href: "https://example.com" },
                slots: { default: "Link" },
                global: { plugins: [router] },
            });
            expect(screen.getByRole("link").getAttribute("href")).toBe("/login");
        });
    });

    describe("External links", () => {
        it("renders with correct href when 'href' prop provided", () => {
            render(Button, {
                props: { href: "https://example.com" },
                slots: { default: "External Link" },
            });
            expect(screen.getByRole("link").getAttribute("href")).toBe("https://example.com");
        });

        it("adds rel='noopener noreferrer' for target='_blank'", () => {
            render(Button, {
                props: { href: "https://example.com", target: "_blank" },
                slots: { default: "New Tab" },
            });
            const link = screen.getByRole("link");
            expect(link.getAttribute("target")).toBe("_blank");
            expect(link.getAttribute("rel")).toBe("noopener noreferrer");
        });

        it("respects custom rel attribute with target='_blank'", () => {
            render(Button, {
                props: { href: "https://example.com", target: "_blank", rel: "nofollow" },
                slots: { default: "Custom Rel" },
            });
            expect(screen.getByRole("link").getAttribute("rel")).toBe("nofollow");
        });
    });
});
