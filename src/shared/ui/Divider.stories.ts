import type { Meta, StoryObj } from "@storybook/vue3";
import Divider from "./Divider.vue";

const meta: Meta<typeof Divider> = {
    component: Divider,
    tags: ["autodocs"],
    argTypes: { label: { control: "text" } },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Plain: Story = { args: {} };
export const WithLabel: Story = { args: { label: "o continúa con" } };
