import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import TestimonialCard from "./TestimonialCard.vue";

describe("TestimonialCard", () => {
    it("renders quote, author name, and role", () => {
        render(TestimonialCard, {
            props: {
                quote: "Great platform!",
                authorName: "John Doe",
                authorRole: "CEO, TechCo",
            },
        });
        expect(screen.getByText(/Great platform!/)).toBeDefined();
        expect(screen.getByText("John Doe")).toBeDefined();
        expect(screen.getByText("CEO, TechCo")).toBeDefined();
    });
});
