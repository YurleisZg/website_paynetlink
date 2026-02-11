import type { Meta, StoryObj } from "@storybook/vue3";
import StatCard from "./StatCard.vue";

const meta: Meta<typeof StatCard> = {
    component: StatCard,
    tags: ["autodocs"],
    argTypes: {
        label: { control: "text" },
        value: { control: "text" },
        change: { control: "text" },
        changeType: { control: "select", options: ["positive", "negative"] },
    },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Positive: Story = {
    args: { label: "Customers", value: "1,247", change: "↑ 12.3% this month" },
};
export const Negative: Story = {
    args: { label: "Churn", value: "2.1%", change: "↓ 0.5% this month", changeType: "negative" },
};
export const NoChange: Story = {
    args: { label: "Active Plans", value: "45" },
};
