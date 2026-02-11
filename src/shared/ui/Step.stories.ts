import type { Meta, StoryObj } from "@storybook/vue3";
import Step from "./Step.vue";

const meta: Meta<typeof Step> = {
    component: Step,
    tags: ["autodocs"],
    argTypes: {
        number: { control: "number" },
        title: { control: "text" },
        description: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof Step>;

export const First: Story = {
    args: { number: 1, title: "Sign Up", description: "Create your account in minutes." },
};
export const Second: Story = {
    args: { number: 2, title: "Configure", description: "Set up your network and plans." },
};
export const Third: Story = {
    args: { number: 3, title: "Launch", description: "Start managing your ISP." },
};
