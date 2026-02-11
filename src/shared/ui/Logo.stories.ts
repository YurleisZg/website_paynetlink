import type { Meta, StoryObj } from "@storybook/vue3";
import Logo from "./Logo.vue";

const meta: Meta<typeof Logo> = {
    component: Logo,
    tags: ["autodocs"],
    argTypes: {
        size: { control: "select", options: ["sm", "md", "lg"] },
    },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Small: Story = { args: { size: "sm" } };
export const Medium: Story = { args: { size: "md" } };
export const Large: Story = { args: { size: "lg" } };
