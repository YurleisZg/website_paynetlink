import type { Meta, StoryObj } from "@storybook/vue3";
import BaseCheckbox from "./BaseCheckbox.vue";

const meta: Meta<typeof BaseCheckbox> = {
    component: BaseCheckbox,
    tags: ["autodocs"],
    argTypes: {
        label: { control: "text" },
        modelValue: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof BaseCheckbox>;

export const Unchecked: Story = {
    args: { label: "Accept terms and conditions", modelValue: false },
};
export const Checked: Story = { args: { label: "Remember me", modelValue: true } };
