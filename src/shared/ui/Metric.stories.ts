import type { Meta, StoryObj } from "@storybook/vue3";
import Metric from "./Metric.vue";

const meta: Meta<typeof Metric> = {
    component: Metric,
    tags: ["autodocs"],
    argTypes: {
        value: { control: "text" },
        label: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof Metric>;

export const Default: Story = { args: { value: "200+", label: "ISPs activos" } };
export const Large: Story = { args: { value: "99.9%", label: "Uptime" } };
