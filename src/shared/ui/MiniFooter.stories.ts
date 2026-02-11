import type { Meta, StoryObj } from "@storybook/vue3";
import MiniFooter from "./MiniFooter.vue";

const meta: Meta<typeof MiniFooter> = {
    component: MiniFooter,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MiniFooter>;

export const Default: Story = {
    args: {
        copyright: "© 2025 PayNetLink. Todos los derechos reservados.",
        links: [
            { label: "Términos", href: "/terms" },
            { label: "Privacidad", href: "/privacy" },
        ],
    },
};
export const NoLinks: Story = {
    args: { copyright: "© 2025 PayNetLink." },
};
