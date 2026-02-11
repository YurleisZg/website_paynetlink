import type { Meta, StoryObj } from "@storybook/vue3";
import Badge from "./Badge.vue";

const meta: Meta<typeof Badge> = {
    component: Badge,
    tags: ["autodocs"],
    argTypes: { label: { control: "text" } },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { label: "New Feature" } };
export const Short: Story = { args: { label: "Beta" } };
