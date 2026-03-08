import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import SuccessStoriesPage from "./SuccessStoriesPage.vue";

vi.mock("@/widgets/navigation", () => ({
    Navbar: { name: "Navbar", template: "<nav data-testid='navbar'></nav>" },
}));

vi.mock("@/widgets/footer", () => ({
    Footer: { name: "Footer", template: "<footer data-testid='footer'></footer>" },
}));

const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", name: "home", component: { template: "<div>Home</div>" } }],
});

const renderPage = () => render(SuccessStoriesPage, { global: { plugins: [router] } });

describe("SuccessStoriesPage", () => {
    it("renders the CTA button", () => {
        renderPage();
        expect(
            screen.getByRole("link", { name: /comenzar prueba gratis|start free trial/i })
        ).toBeTruthy();
    });
});
