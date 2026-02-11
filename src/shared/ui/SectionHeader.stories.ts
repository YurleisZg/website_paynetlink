import type { Meta, StoryObj } from "@storybook/vue3";
import SectionHeader from "./SectionHeader.vue";

const meta: Meta<typeof SectionHeader> = {
    component: SectionHeader,
    tags: ["autodocs"],
    argTypes: {
        title: { control: "text" },
        subtitle: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
    args: {
        title: "Everything You Need to Run Your ISP",
        subtitle: "Powerful tools to manage customers, billing, and network infrastructure.",
    },
};
export const TitleOnly: Story = {
    args: { title: "Our Pricing Plans" },
};
