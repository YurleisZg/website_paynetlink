import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "./Button.vue";

const meta: Meta<typeof Button> = {
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "outline", "ghost", "white", "outline-white"],
        },
        type: { control: "select", options: ["button", "submit"] },
        disabled: { control: "boolean" },
        fullWidth: { control: "boolean" },
    },
    render: (args) => ({
        components: { Button },
        setup: () => ({ args }),
        template: '<Button v-bind="args">{{ args.label || "Button" }}</Button>',
    }),
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary", label: "Primary Button" } };
export const Outline: Story = { args: { variant: "outline", label: "Outline Button" } };
export const Ghost: Story = { args: { variant: "ghost", label: "Ghost Button" } };
export const White: Story = {
    args: { variant: "white", label: "White Button" },
    parameters: { backgrounds: { default: "dark" } },
};
export const OutlineWhite: Story = {
    args: { variant: "outline-white", label: "Outline White" },
    parameters: { backgrounds: { default: "dark" } },
};
export const Disabled: Story = { args: { variant: "primary", label: "Disabled", disabled: true } };
export const FullWidth: Story = {
    args: { variant: "primary", label: "Full Width", fullWidth: true },
};
