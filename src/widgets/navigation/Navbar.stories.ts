import type { Meta, StoryObj } from "@storybook/vue3";
import Navbar from "./Navbar.vue";

const meta: Meta<typeof Navbar> = {
    title: "Widgets/Navigation/Navbar",
    component: Navbar,
    tags: ["autodocs"],
    argTypes: {
        links: {
            description: "Navigation links to display in the navbar",
            control: "object",
        },
    },
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        links: [
            { label: "Productos", href: "#productos" },
            { label: "Soluciones", href: "#soluciones" },
            { label: "Precios", href: "#pricing" },
            { label: "Recursos", href: "#recursos" },
            { label: "Empresa", href: "#empresa" },
        ],
    },
};

export const WithFewLinks: Story = {
    args: {
        links: [
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
        ],
    },
};

export const WithManyLinks: Story = {
    args: {
        links: [
            { label: "Products", href: "#products" },
            { label: "Solutions", href: "#solutions" },
            { label: "Pricing", href: "#pricing" },
            { label: "Resources", href: "#resources" },
            { label: "Company", href: "#company" },
            { label: "Blog", href: "#blog" },
            { label: "Support", href: "#support" },
            { label: "Contact", href: "#contact" },
        ],
    },
};

export const NoLinks: Story = {
    args: {
        links: [],
    },
};

export const WithSearchDemo: Story = {
    args: {
        links: [
            { label: "Productos", href: "#productos" },
            { label: "Soluciones", href: "#soluciones" },
            { label: "Precios", href: "#pricing" },
            { label: "Recursos", href: "#recursos" },
        ],
    },
    parameters: {
        docs: {
            description: {
                story:
                    "Click the search icon to open the beautiful search overlay. Features include:\n\n" +
                    "- Auto-focus on input when opened\n" +
                    "- Press ESC to close\n" +
                    "- Click outside to close\n" +
                    "- Press Enter to submit search\n" +
                    "- Click X to clear query\n" +
                    "- Focus returns to button on close\n" +
                    "- Smooth animations\n" +
                    "- Prevents body scroll\n" +
                    "- Emits search event on submission\n\n" +
                    "Check the Actions panel to see search events.",
            },
        },
    },
};
