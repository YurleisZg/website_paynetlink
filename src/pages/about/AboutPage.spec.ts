import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import AboutPage from "./AboutPage.vue";

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

const renderPage = () => render(AboutPage, { global: { plugins: [router] } });

describe("AboutPage", () => {
    it("renders the page title heading", () => {
        renderPage();
        expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    });

    it("renders the mission label", () => {
        renderPage();
        expect(screen.getByText(/misión|mission/i)).toBeTruthy();
    });

    it("renders the mission heading", () => {
        renderPage();
        expect(screen.getByRole("heading", { level: 2, name: /democratiz/i })).toBeTruthy();
    });

    it("renders the about image with correct src", () => {
        renderPage();
        const img = screen.getByRole("img");
        expect(img.getAttribute("src")).toContain("about.png");
    });

    it("renders the values section heading", () => {
        renderPage();
        expect(screen.getByRole("heading", { name: /valores|values/i })).toBeTruthy();
    });

    it("renders all three value card titles", () => {
        renderPage();
        expect(screen.getByText(/pasión|passion/i)).toBeTruthy();
        expect(screen.getByText(/confianza|trust/i)).toBeTruthy();
        expect(screen.getByText(/innovación|innovation/i)).toBeTruthy();
    });

    it("renders the navbar", () => {
        renderPage();
        expect(screen.getByTestId("navbar")).toBeTruthy();
    });

    it("renders the footer", () => {
        renderPage();
        expect(screen.getByTestId("footer")).toBeTruthy();
    });

    it("hero section is labelled by the page heading", () => {
        renderPage();
        const hero = document.querySelector("[aria-labelledby='about-heading']");
        expect(hero).toBeTruthy();
    });

    it("values section is labelled by values heading", () => {
        renderPage();
        const section = document.querySelector("[aria-labelledby='values-heading']");
        expect(section).toBeTruthy();
    });
});
