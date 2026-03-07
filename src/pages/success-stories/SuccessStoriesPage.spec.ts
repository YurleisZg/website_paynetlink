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
    it("renders the page title heading", () => {
        renderPage();
        expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    });

    it("renders the page subtitle", () => {
        renderPage();
        expect(screen.getByText(/ISPs que transformaron|ISPs that transformed/i)).toBeTruthy();
    });

    it("renders 3 story headings", () => {
        renderPage();
        const headings = screen.getAllByRole("heading", { level: 2 });
        // 3 story headings + 1 CTA heading
        expect(headings.length).toBe(4);
    });

    it("renders FibraNet story", () => {
        renderPage();
        expect(screen.getByRole("heading", { name: /fibranet/i })).toBeTruthy();
    });

    it("renders NetPro story", () => {
        renderPage();
        expect(screen.getByRole("heading", { name: /netpro/i })).toBeTruthy();
    });

    it("renders ConnectMax story", () => {
        renderPage();
        expect(screen.getByRole("heading", { name: /connectmax/i })).toBeTruthy();
    });

    it("renders story badges", () => {
        renderPage();
        expect(screen.getByText(/ISP Residencial|Residential ISP/i)).toBeTruthy();
        expect(screen.getAllByText(/ISP Empresarial|Enterprise ISP/i).length).toBeGreaterThan(0);
    });

    it("renders metrics for FibraNet story", () => {
        renderPage();
        expect(screen.getByText("45%")).toBeTruthy();
        expect(screen.getByText("5,000+")).toBeTruthy();
    });

    it("renders images for stories with images", () => {
        renderPage();
        const images = screen.getAllByRole("img");
        expect(images.length).toBe(2);
    });

    it("renders the CTA section heading", () => {
        renderPage();
        expect(
            screen.getByRole("heading", { name: /próximo caso de éxito|next success story/i })
        ).toBeTruthy();
    });

    it("renders the CTA button", () => {
        renderPage();
        expect(
            screen.getByRole("link", { name: /comenzar prueba gratis|start free trial/i })
        ).toBeTruthy();
    });

    it("hero section is labelled by the page heading", () => {
        renderPage();
        expect(document.querySelector("[aria-labelledby='success-stories-heading']")).toBeTruthy();
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
