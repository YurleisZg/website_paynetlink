import type { Meta, StoryObj } from "@storybook/vue3";
import { Globe, Github } from "lucide-vue-next";
import SocialLoginButton from "./SocialLoginButton.vue";

const meta: Meta<typeof SocialLoginButton> = {
    component: SocialLoginButton,
    tags: ["autodocs"],
    argTypes: { label: { control: "text" } },
};

export default meta;
type Story = StoryObj<typeof SocialLoginButton>;

export const Google: Story = { args: { label: "Google", icon: Globe } };
export const GitHub: Story = { args: { label: "GitHub", icon: Github } };
