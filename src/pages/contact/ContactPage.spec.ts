import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/vue";
import { createRouter, createMemoryHistory } from "vue-router";
import ContactPage from "./ContactPage.vue";

vi.mock("@/widgets/navigation", () => ({
    Navbar: { name: "Navbar", template: "<nav data-testid='navbar'></nav>" },
}));

const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", name: "home", component: { template: "<div>Home</div>" } }],
});

const renderPage = () => {
    return render(ContactPage, {
        global: { plugins: [router] },
    });
};

describe("ContactPage", () => {
    describe("Rendering", () => {
        it("renders the page title", () => {
            renderPage();
            expect(
                screen.getByRole("heading", { name: /contacto|contact/i, level: 1 })
            ).toBeDefined();
        });

        it("renders the page subtitle", () => {
            renderPage();
            expect(
                screen.getByText(/estamos aquí para ayudarte|we are here to help/i)
            ).toBeDefined();
        });

        it("renders the navbar", () => {
            renderPage();
            expect(screen.getByTestId("navbar")).toBeDefined();
        });

        it("renders the email contact item", () => {
            renderPage();
            expect(screen.getAllByText(/email/i).length).toBeGreaterThan(0);
        });

        it("renders the phone contact item label", () => {
            renderPage();
            expect(screen.getByText(/teléfono|phone/i)).toBeDefined();
        });

        it("renders the office contact item label", () => {
            renderPage();
            expect(screen.getAllByText(/oficina|office/i).length).toBeGreaterThan(0);
        });

        it("renders the contact address value", () => {
            renderPage();
            expect(screen.getAllByText(/cartagena|bogot/i).length).toBeGreaterThan(0);
        });

        it("renders the form title", () => {
            renderPage();
            expect(
                screen.getByRole("heading", { name: /envianos un mensaje|send us a message/i })
            ).toBeDefined();
        });

        it("renders the form", () => {
            renderPage();
            expect(screen.getByRole("form", { name: /contact form/i })).toBeDefined();
        });
    });

    describe("Form Fields", () => {
        it("renders the full name input", () => {
            renderPage();
            const input = screen.getByLabelText(/nombre completo|full name/i);
            expect(input).toBeDefined();
        });

        it("renders the email input", () => {
            renderPage();
            const inputs = screen.getAllByLabelText(/email/i);
            expect(inputs.length).toBeGreaterThan(0);
        });

        it("renders the message textarea", () => {
            renderPage();
            const textarea = screen.getByLabelText(/mensaje|message/i);
            expect(textarea).toBeDefined();
        });

        it("renders the submit button", () => {
            renderPage();
            expect(
                screen.getByRole("button", {
                    name: /enviar mensaje|send message|submit contact form/i,
                })
            ).toBeDefined();
        });

        it("full name input has correct type", () => {
            renderPage();
            const input = screen.getByLabelText(/nombre completo|full name/i) as HTMLInputElement;
            expect(input.type).toBe("text");
        });

        it("email input has correct type", () => {
            renderPage();
            // Get the email input (type=email) by using the label
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

        it("submits the form on button click", async () => {
            const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
            const { container } = renderPage();

            const form = container.querySelector("form");
            expect(form).not.toBeNull();

            if (form) {
                await fireEvent.submit(form);
            }

            await waitFor(() => {
                expect(consoleSpy).toHaveBeenCalledWith(
                    "Contact form submitted:",
                    expect.any(Object)
                );
            });

            consoleSpy.mockRestore();
        });
    });

    describe("Accessibility", () => {
        it("hero section has aria-labelledby pointing to the heading", () => {
            const { container } = renderPage();
            const section = container.querySelector('section[aria-labelledby="contact-heading"]');
            expect(section).not.toBeNull();
        });

        it("contact information region has aria-label", () => {
            const { container } = renderPage();
            const region = container.querySelector('[aria-label="Contact information"]');
            expect(region).not.toBeNull();
        });

        it("submit button has aria-label", () => {
            renderPage();
            const btn = screen.getByLabelText(/submit contact form/i);
            expect(btn).toBeDefined();
        });
    });
});
