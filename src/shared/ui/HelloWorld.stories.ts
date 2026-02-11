import type { Meta, StoryObj } from "@storybook/vue3";
import HelloWorld from "./HelloWorld.vue";

const meta: Meta<typeof HelloWorld> = {
    component: HelloWorld,
    tags: ["autodocs"],
    argTypes: {
        msg: {
            control: "text",
            description: "Welcome message",
        },
    },
};

export default meta;

type Story = StoryObj<typeof HelloWorld>;

export const Default: Story = {
    args: {
        msg: "Welcome to PayNetLink",
    },
};

export const CustomMessage: Story = {
    args: {
        msg: "Hello from Storybook",
    },
};
