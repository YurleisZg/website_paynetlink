import type { Meta, StoryObj } from "@storybook/vue3";
import PricingCard from "./PricingCard.vue";

const meta: Meta<typeof PricingCard> = {
    component: PricingCard,
    tags: ["autodocs"],
    argTypes: {
        planName: { control: "text" },
        price: { control: "text" },
        period: { control: "text" },
        buttonLabel: { control: "text" },
        featured: { control: "boolean" },
        badgeLabel: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof PricingCard>;

export const Basic: Story = {
    args: {
        planName: "Starter",
        price: "$29.900",
        features: ["Up to 50 clients", "1 MikroTik router", "Email support", "Basic reports"],
    },
};
export const Featured: Story = {
    args: {
        planName: "Professional",
        price: "$79.900",
        featured: true,
        badgeLabel: "Más popular",
        features: [
            "Up to 500 clients",
            "10 MikroTik routers",
            "Priority support",
            "Advanced reports",
            "API access",
        ],
        buttonLabel: "Get Started",
    },
};
export const Enterprise: Story = {
    args: {
        planName: "Enterprise",
        price: "$149.900",
        features: [
            "Unlimited clients",
            "Unlimited routers",
            "24/7 support",
            "Custom reports",
            "API access",
            "SLA guarantee",
        ],
        buttonLabel: "Contact Sales",
    },
};
