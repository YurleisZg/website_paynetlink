import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import PrivacyPage from "./PrivacyPage.vue";

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

const renderPage = () => render(PrivacyPage, { global: { plugins: [router] } });

describe("PrivacyPage", () => {
    it("renders the page title heading", () => {
        renderPage();
        expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    });

    it("renders the last updated date", () => {
        renderPage();
        expect(screen.getByText(/última actualización|last updated/i)).toBeTruthy();
    });

    it("renders the information collected section", () => {
        renderPage();
        expect(
            screen.getByRole("heading", {
                name: /información que recopilamos|information we collect/i,
            })
        ).toBeTruthy();
    });

    it("renders the use of information section", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /uso de la información|use of information/i })
        ).toBeTruthy();
    });

    it("renders the data security section", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /seguridad de los datos|data security/i })
        ).toBeTruthy();
    });

    it("renders the user rights section", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /derechos del usuario|user rights/i })
        ).toBeTruthy();
    });

    it("renders all 8 sections", () => {
        renderPage();
        const headings = screen.getAllByRole("heading", { level: 2 });
        expect(headings.length).toBe(8);
    });

    it("hero section is labelled by the page heading", () => {
        renderPage();
        const hero = document.querySelector("[aria-labelledby='privacy-heading']");
        expect(hero).toBeTruthy();
    });

    it("renders the navbar", () => {
        renderPage();
        expect(screen.getByTestId("navbar")).toBeTruthy();
    });

    it("renders the footer", () => {
        renderPage();
        expect(screen.getByTestId("footer")).toBeTruthy();
    });
});
