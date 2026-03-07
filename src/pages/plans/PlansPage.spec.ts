import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import PlansPage from "./PlansPage.vue";

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

const renderPage = () => render(PlansPage, { global: { plugins: [router] } });

describe("PlansPage", () => {
    it("renders the page title heading", () => {
        renderPage();
        expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    });

    it("renders the badge", () => {
        renderPage();
        const badges = screen.getAllByText(/planes y precios|plans and prices/i);
        expect(badges.length).toBeGreaterThan(0);
    });

    it("renders the billing toggle with monthly and annual buttons", () => {
        renderPage();
        // The billing toggle buttons have aria-pressed; FAQ buttons do not
        const pressableButtons = screen
            .getAllByRole("button")
            .filter((b) => b.hasAttribute("aria-pressed"));
        expect(pressableButtons.length).toBe(2);
    });

    it("monthly is selected by default", () => {
        renderPage();
        const monthly = screen
            .getAllByRole("button")
            .find(
                (b) => b.hasAttribute("aria-pressed") && b.getAttribute("aria-pressed") === "true"
            );
        expect(monthly).toBeTruthy();
        expect(monthly!.textContent).toMatch(/mensual|monthly/i);
    });

    it("switches to annual billing on toggle click", async () => {
        renderPage();
        const annualBtn = screen
            .getAllByRole("button")
            .find(
                (b) => b.hasAttribute("aria-pressed") && /anual|annual/i.test(b.textContent ?? "")
            );
        expect(annualBtn).toBeTruthy();
        await fireEvent.click(annualBtn!);
        expect(annualBtn!.getAttribute("aria-pressed")).toBe("true");
    });

    it("renders all 3 plan names", () => {
        renderPage();
        expect(screen.getByRole("heading", { name: /^starter$/i })).toBeTruthy();
        expect(screen.getByRole("heading", { name: /^profesional$|^professional$/i })).toBeTruthy();
        expect(screen.getByRole("heading", { name: /^enterprise$/i })).toBeTruthy();
    });

    it("renders the most popular badge on the professional plan", () => {
        renderPage();
        expect(screen.getByText(/más popular|most popular/i)).toBeTruthy();
    });

    it("renders monthly prices by default", () => {
        renderPage();
        expect(screen.getByText("$89.900")).toBeTruthy();
        expect(screen.getByText("$189.900")).toBeTruthy();
        expect(screen.getByText("$349.900")).toBeTruthy();
    });

    it("renders annual prices after toggling", async () => {
        renderPage();
        const annualBtn = screen
            .getAllByRole("button")
            .find(
                (b) => b.hasAttribute("aria-pressed") && /anual|annual/i.test(b.textContent ?? "")
            );
        await fireEvent.click(annualBtn!);
        expect(screen.getByText("$71.920")).toBeTruthy();
        expect(screen.getByText("$151.920")).toBeTruthy();
        expect(screen.getByText("$279.920")).toBeTruthy();
    });

    it("renders the FAQ section heading", () => {
        renderPage();
        expect(
            screen.getByRole("heading", {
                name: /preguntas frecuentes|frequently asked questions/i,
            })
        ).toBeTruthy();
    });

    it("renders all 5 FAQ questions", () => {
        renderPage();
        // FAQ items are buttons; check via aria-expanded attribute
        const faqButtons = screen
            .getAllByRole("button")
            .filter((b) => b.hasAttribute("aria-expanded"));
        expect(faqButtons.length).toBe(5);
    });

    it("first FAQ item is open by default", () => {
        renderPage();
        const firstButton = screen.getByRole("button", { name: /cambiar de plan|change.*plan/i });
        expect(firstButton.getAttribute("aria-expanded")).toBe("true");
    });

    it("toggles a FAQ item open on click", async () => {
        renderPage();
        const freeTrialButton = screen.getByRole("button", { name: /prueba gratis|free trial/i });
        expect(freeTrialButton.getAttribute("aria-expanded")).toBe("false");
        await fireEvent.click(freeTrialButton);
        expect(freeTrialButton.getAttribute("aria-expanded")).toBe("true");
    });

    it("renders the CTA section with a start trial link pointing to /register", () => {
        renderPage();
        const trial = screen.getByRole("link", {
            name: /empezar prueba gratis|start free trial/i,
        });
        expect(trial.getAttribute("href")).toBe("/register");
    });

    it("renders the CTA section contact sales link pointing to /contact", () => {
        renderPage();
        // Multiple "contact sales" links exist (Enterprise card + CTA); confirm at least one targets /contact
        const salesLinks = screen
            .getAllByRole("link")
            .filter((l) => /contactar ventas|contact sales/i.test(l.textContent ?? ""));
        expect(salesLinks.some((l) => l.getAttribute("href") === "/contact")).toBe(true);
    });

    it("hero section is labelled by the page heading", () => {
        renderPage();
        expect(document.querySelector("[aria-labelledby='plans-heading']")).toBeTruthy();
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
