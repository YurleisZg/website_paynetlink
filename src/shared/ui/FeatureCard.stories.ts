import type { Meta, StoryObj } from "@storybook/vue3";
import { Users, CreditCard, Network } from "lucide-vue-next";
import FeatureCard from "./FeatureCard.vue";

const meta: Meta<typeof FeatureCard> = {
    component: FeatureCard,
    tags: ["autodocs"],
    argTypes: {
        title: { control: "text" },
        description: { control: "text" },
        linkText: { control: "text" },
        linkHref: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof FeatureCard>;

export const Default: Story = {
    args: {
        title: "Client Management",
        description: "Manage your clients efficiently with automated tools and real-time tracking.",
        linkText: "Learn more →",
        linkHref: "#",
        icon: Users,
    },
};
export const Billing: Story = {
    args: {
        title: "Automated Billing",
        description: "Set up recurring billing and never miss a payment cycle again.",
        linkText: "See how →",
        icon: CreditCard,
    },
};
export const NoLink: Story = {
    args: {
        title: "Network Control",
        description: "Full control over your network infrastructure from a single dashboard.",
        icon: Network,
    },
};
