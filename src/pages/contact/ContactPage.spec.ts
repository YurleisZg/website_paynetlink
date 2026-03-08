import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import ContactPage from "./ContactPage.vue";

vi.mock("@/widgets/navigation", () => ({
    Navbar: { name: "Navbar", template: "<nav data-testid='navbar'></nav>" },
}));

const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", name: "home", component: { template: "<div>Home</div>" } }],
});

const renderPage = () => render(ContactPage, { global: { plugins: [router] } });

describe("ContactPage", () => {
    describe("Form Fields", () => {
        it("renders all required form fields with accessible labels", () => {
            renderPage();
            expect(screen.getByLabelText(/nombre completo|full name/i)).toBeDefined();
            expect(screen.getAllByLabelText(/email/i).length).toBeGreaterThan(0);
            expect(screen.getByLabelText(/mensaje|message/i)).toBeDefined();
            expect(
                screen.getByRole("button", {
                    name: /enviar mensaje|send message|submit contact form/i,
                })
            ).toBeDefined();
        });

        it("email input has type email", () => {
            renderPage();
            const inputs = screen.getAllByLabelText(/email/i) as HTMLInputElement[];
            const emailInput = inputs.find((el) => el.type === "email");
            expect(emailInput).toBeDefined();
        });
    });

    describe("Form Interaction", () => {
        it("updates full name on input", async () => {
            renderPage();
            const input = screen.getByLabelText(/nombre completo|full name/i) as HTMLInputElement;
            await fireEvent.input(input, { target: { value: "John Doe" } });
            expect(input.value).toBe("John Doe");
        });

        it("updates email on input", async () => {
            renderPage();
            const inputs = screen.getAllByLabelText(/email/i) as HTMLInputElement[];
            const emailInput = inputs.find((el) => el.type === "email");
            if (emailInput) {
                await fireEvent.input(emailInput, { target: { value: "john@example.com" } });
                expect(emailInput.value).toBe("john@example.com");
            }
        });
    });

    describe("Accessibility", () => {
        it("submit button has aria-label", () => {
            renderPage();
            expect(screen.getByLabelText(/submit contact form/i)).toBeDefined();
        });
    });
});
