import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import BlogCard from "./BlogCard.vue";

describe("BlogCard", () => {
    const defaultProps = {
        tag: "UPDATES",
        title: "New Feature Release",
        description: "We just released a new feature.",
        date: "15 Jan 2025",
        readTime: "5 min read",
    };

    it("renders all text content", () => {
        render(BlogCard, { props: defaultProps });
        expect(screen.getByText("UPDATES")).toBeDefined();
        expect(screen.getByText("New Feature Release")).toBeDefined();
        expect(screen.getByText("We just released a new feature.")).toBeDefined();
        expect(screen.getByText("15 Jan 2025")).toBeDefined();
        expect(screen.getByText("5 min read")).toBeDefined();
    });

    it("renders image when imageUrl is provided", () => {
        const { container } = render(BlogCard, {
            props: { ...defaultProps, imageUrl: "/img/blog.jpg" },
        });
        const img = container.querySelector("img");
        expect(img).not.toBeNull();
        expect(img?.getAttribute("src")).toBe("/img/blog.jpg");
    });

    it("does not render image when imageUrl is not provided", () => {
        const { container } = render(BlogCard, { props: defaultProps });
        expect(container.querySelector("img")).toBeNull();
    });
});
