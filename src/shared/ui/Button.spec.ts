import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import Button from "./Button.vue";

// Create mock router for testing RouterLink
const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", name: "home", component: { template: "<div>Home</div>" } },
        { path: "/login", name: "login", component: { template: "<div>Login</div>" } },
    ],
});

describe("Button", () => {
    describe("Basic button functionality", () => {
        it("renders slot content", () => {
            render(Button, { slots: { default: "Click me" } });
            expect(screen.getByText("Click me")).toBeDefined();
        });

        it("renders as disabled", () => {
            render(Button, { props: { disabled: true }, slots: { default: "Disabled" } });
            expect(screen.getByRole("button")).toHaveProperty("disabled", true);
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

    describe("Router navigation", () => {
        it("renders as RouterLink when 'to' prop provided", () => {
            render(Button, {
                props: { to: "/login" },
                slots: { default: "Go to login" },
                global: { plugins: [router] },
            });
            const link = screen.getByRole("link");
            expect(link).toBeDefined();
            expect(link.getAttribute("href")).toBe("/login");
        });

        it("applies disabled state to RouterLink", () => {
            render(Button, {
                props: { to: "/login", disabled: true },
                slots: { default: "Disabled Link" },
                global: { plugins: [router] },
            });
            const link = screen.getByRole("link");
            expect(link.getAttribute("aria-disabled")).toBe("true");
        });

        it("accepts route object with name for 'to' prop", () => {
            render(Button, {
                props: { to: { name: "home" } },
                slots: { default: "Home" },
                global: { plugins: [router] },
            });
            const link = screen.getByRole("link");
            expect(link).toBeDefined();
        });
    });

    describe("External links", () => {
        it("renders as anchor when 'href' prop provided", () => {
            render(Button, {
                props: { href: "https://example.com" },
                slots: { default: "External Link" },
            });
            const link = screen.getByRole("link");
            expect(link.tagName).toBe("A");
            expect(link.getAttribute("href")).toBe("https://example.com");
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
            const link = screen.getByRole("link");
            expect(link.getAttribute("rel")).toBe("nofollow");
        });
    });

    describe("Backward compatibility", () => {
        it("still renders as button when no navigation props", () => {
            render(Button, { slots: { default: "Regular Button" } });
            const btn = screen.getByRole("button");
            expect(btn.tagName).toBe("BUTTON");
        });

        it("prefers 'to' over 'href' when both provided", () => {
            render(Button, {
                props: { to: "/login", href: "https://example.com" },
                slots: { default: "Link" },
                global: { plugins: [router] },
            });
            const link = screen.getByRole("link");
            expect(link.getAttribute("href")).toBe("/login");
        });
    });
});
