import type { Meta, StoryObj } from "@storybook/vue3";
import FooterColumn from "./FooterColumn.vue";

const meta: Meta<typeof FooterColumn> = {
    component: FooterColumn,
    tags: ["autodocs"],
    parameters: { backgrounds: { default: "dark" } },
};

export default meta;
type Story = StoryObj<typeof FooterColumn>;

export const Default: Story = {
    args: {
        title: "Product",
        links: [
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
            { label: "Integrations", href: "/integrations" },
        ],
    },
};
