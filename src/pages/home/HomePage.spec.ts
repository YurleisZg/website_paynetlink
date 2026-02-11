import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import HomePage from "./HomePage.vue";

describe("HomePage", () => {
    it("renders welcome message", () => {
        render(HomePage);
        expect(screen.getByText(/Welcome to PayNetLink/i)).toBeDefined();
    });
});
