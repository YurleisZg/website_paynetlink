import type { Meta, StoryObj } from "@storybook/vue3";
import CTASection from "./CTASection.vue";

const meta: Meta<typeof CTASection> = {
    component: CTASection,
    tags: ["autodocs"],
    argTypes: {
        title: { control: "text" },
        subtitle: { control: "text" },
        primaryAction: { control: "text" },
        secondaryAction: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof CTASection>;

export const Default: Story = {
    args: {
        title: "Ready to Simplify Your ISP?",
        subtitle: "Join hundreds of ISPs already using PayNetLink.",
        primaryAction: "Start Free Trial",
        secondaryAction: "Schedule Demo",
    },
};
export const PrimaryOnly: Story = {
    args: {
        title: "Get Started Today",
        primaryAction: "Sign Up Free",
    },
};
