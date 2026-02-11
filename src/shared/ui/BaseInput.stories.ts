import type { Meta, StoryObj } from "@storybook/vue3";
import BaseInput from "./BaseInput.vue";

const meta: Meta<typeof BaseInput> = {
    component: BaseInput,
    tags: ["autodocs"],
    argTypes: {
        label: { control: "text" },
        placeholder: { control: "text" },
        type: { control: "select", options: ["text", "email", "password", "number"] },
        disabled: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof BaseInput>;

export const Default: Story = {
    args: { label: "Email", placeholder: "you@example.com" },
};
export const WithoutLabel: Story = {
    args: { placeholder: "Search..." },
};
export const Password: Story = {
    args: { label: "Password", type: "password", placeholder: "••••••••" },
};
export const Disabled: Story = {
    args: { label: "Disabled", placeholder: "Cannot edit", disabled: true },
};
