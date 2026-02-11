import type { Meta, StoryObj } from "@storybook/vue3";
import BlogCard from "./BlogCard.vue";

const meta: Meta<typeof BlogCard> = {
    component: BlogCard,
    tags: ["autodocs"],
    argTypes: {
        tag: { control: "text" },
        title: { control: "text" },
        description: { control: "text" },
        date: { control: "text" },
        readTime: { control: "text" },
        imageUrl: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof BlogCard>;

export const Default: Story = {
    args: {
        tag: "UPDATES",
        title: "Introducing Automated MikroTik Configuration",
        description: "Learn how our new integration simplifies router management.",
        date: "15 Jan 2025",
        readTime: "5 min read",
    },
};
export const WithImage: Story = {
    args: {
        tag: "TUTORIAL",
        title: "Getting Started with PayNetLink",
        description: "A step-by-step guide to setting up your ISP management platform.",
        date: "10 Feb 2025",
        readTime: "8 min read",
        imageUrl: "https://placehold.co/380x180/E0E0E0/666?text=Blog+Image",
    },
};
