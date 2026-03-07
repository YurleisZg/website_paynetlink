import type { Meta, StoryObj } from "@storybook/vue3";
import {
    Bell,
    Building2,
    Code,
    CreditCard,
    Database,
    FileText,
    Globe,
    HelpCircle,
    Info,
    Mail,
    PenLine,
    Router,
    Trophy,
    Users,
    Wifi,
} from "lucide-vue-next";
import Navbar from "./Navbar.vue";

const meta: Meta<typeof Navbar> = {
    title: "Widgets/Navigation/Navbar",
    component: Navbar,
    tags: ["autodocs"],
    argTypes: {
        links: {
            description: "Navigation links — supports plain links and dropdown menus",
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
            {
                label: "Products",
                dropdown: [
                    {
                        label: "Customer Management",
                        description: "Register and manage your clients",
                        href: "#clients",
                        icon: Users,
                    },
                    {
                        label: "Payments & Collections",
                        description: "Automate billing and payments",
                        href: "#billing",
                        icon: CreditCard,
                    },
                    {
                        label: "Network Automation",
                        description: "MikroTik integration",
                        href: "#network",
                        icon: Router,
                    },
                    {
                        label: "Notifications",
                        description: "WhatsApp, SMS and email",
                        href: "#notifications",
                        icon: Bell,
                    },
                    {
                        label: "Electronic Invoicing",
                        description: "DIAN integrated invoices",
                        href: "#invoicing",
                        icon: FileText,
                    },
                ],
            },
            {
                label: "Solutions",
                dropdown: [
                    {
                        label: "For small ISPs",
                        description: "Up to 100 clients",
                        href: "#small-isp",
                        icon: Building2,
                    },
                    {
                        label: "For medium ISPs",
                        description: "100 to 1,000 clients",
                        href: "#medium-isp",
                        icon: Database,
                    },
                    {
                        label: "For WISPs",
                        description: "Wireless networks",
                        href: "#wisps",
                        icon: Wifi,
                    },
                ],
            },
            { label: "Pricing", href: "#pricing" },
            {
                label: "Resources",
                dropdown: [
                    {
                        label: "Blog",
                        description: "Articles and guides for ISPs",
                        href: "#blog",
                        icon: PenLine,
                    },
                    {
                        label: "Help Center",
                        description: "Support and FAQs",
                        href: "#help",
                        icon: HelpCircle,
                    },
                    {
                        label: "API Documentation",
                        description: "Full technical reference",
                        href: "#api",
                        icon: Code,
                    },
                    {
                        label: "Success Stories",
                        description: "Successful ISP stories",
                        href: "#cases",
                        icon: Trophy,
                    },
                ],
            },
            {
                label: "Company",
                dropdown: [
                    {
                        label: "About us",
                        description: "Our mission and team",
                        href: "#about",
                        icon: Info,
                    },
                    {
                        label: "Contact",
                        description: "Get in touch with us",
                        href: "#contact",
                        icon: Mail,
                    },
                    {
                        label: "Partners",
                        description: "Partner program",
                        href: "#partners",
                        icon: Globe,
                    },
                ],
            },
        ],
    },
};

export const NoLinks: Story = {
    args: {
        links: [],
    },
};

export const MixedLinks: Story = {
    args: {
        links: [
            {
                label: "Products",
                dropdown: [
                    {
                        label: "Customer Management",
                        description: "Register and manage your clients",
                        href: "#clients",
                        icon: Users,
                    },
                    {
                        label: "Payments & Collections",
                        description: "Automate billing and payments",
                        href: "#billing",
                        icon: CreditCard,
                    },
                ],
            },
            { label: "Pricing", href: "#pricing" },
            { label: "Blog", href: "#blog" },
        ],
    },
};

export const WithSearchDemo: Story = {
    args: {
        links: [
            {
                label: "Products",
                dropdown: [
                    {
                        label: "Customer Management",
                        description: "Register and manage your clients",
                        href: "#clients",
                        icon: Users,
                    },
                    {
                        label: "Payments & Collections",
                        description: "Automate billing and payments",
                        href: "#billing",
                        icon: CreditCard,
                    },
                ],
            },
            { label: "Pricing", href: "#pricing" },
        ],
    },
    parameters: {
        docs: {
            description: {
                story:
                    "Hover over dropdown items to see the menu. Click the search icon to open the search overlay.\n\n" +
                    "Dropdown features:\n" +
                    "- Hover to open on desktop\n" +
                    "- Click button to toggle\n" +
                    "- Accordion expand on mobile\n" +
                    "- ESC key closes active dropdown\n" +
                    "- Smooth fade + slide animation\n" +
                    "- Full ARIA support (aria-expanded, aria-haspopup, role=menu)",
            },
        },
    },
};
