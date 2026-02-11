import type { Meta, StoryObj } from "@storybook/vue3";
import NavLink from "./NavLink.vue";

const meta: Meta<typeof NavLink> = {
    component: NavLink,
    tags: ["autodocs"],
    argTypes: {
        label: { control: "text" },
        href: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof NavLink>;

export const Default: Story = { args: { label: "Products", href: "/products" } };
export const Pricing: Story = { args: { label: "Pricing", href: "/pricing" } };
