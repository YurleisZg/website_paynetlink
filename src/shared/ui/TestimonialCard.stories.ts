import type { Meta, StoryObj } from "@storybook/vue3";
import TestimonialCard from "./TestimonialCard.vue";

const meta: Meta<typeof TestimonialCard> = {
    component: TestimonialCard,
    tags: ["autodocs"],
    argTypes: {
        quote: { control: "text" },
        authorName: { control: "text" },
        authorRole: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof TestimonialCard>;

export const Default: Story = {
    args: {
        quote: "PayNetLink transformed how we manage our ISP. Billing is now fully automated.",
        authorName: "Carlos Méndez",
        authorRole: "CEO, NetColombia",
    },
};
export const Long: Story = {
    args: {
        quote: "We reduced our operational costs by 40% after switching to PayNetLink. The MikroTik integration alone saved us hours every week.",
        authorName: "Ana García",
        authorRole: "CTO, FibraNet",
    },
};
