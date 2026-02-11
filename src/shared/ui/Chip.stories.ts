import type { Meta, StoryObj } from "@storybook/vue3";
import Chip from "./Chip.vue";

const meta: Meta<typeof Chip> = {
    component: Chip,
    tags: ["autodocs"],
    argTypes: {
        label: { control: "text" },
        active: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Inactive: Story = { args: { label: "All Plans" } };
export const Active: Story = { args: { label: "Popular", active: true } };
