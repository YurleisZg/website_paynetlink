import type { Meta, StoryObj } from "@storybook/vue3";
import { Linkedin, Twitter, Github } from "lucide-vue-next";
import SocialIcon from "./SocialIcon.vue";

const meta: Meta<typeof SocialIcon> = {
    component: SocialIcon,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SocialIcon>;

export const LinkedinIcon: Story = {
    args: { icon: Linkedin, href: "https://linkedin.com", ariaLabel: "LinkedIn" },
};
export const TwitterIcon: Story = {
    args: { icon: Twitter, href: "https://twitter.com", ariaLabel: "Twitter" },
};
export const GithubIcon: Story = {
    args: { icon: Github, href: "https://github.com", ariaLabel: "GitHub" },
};
