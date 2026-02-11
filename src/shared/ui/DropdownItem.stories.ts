import type { Meta, StoryObj } from "@storybook/vue3";
import { Users, CreditCard, Settings } from "lucide-vue-next";
import DropdownItem from "./DropdownItem.vue";

const meta: Meta<typeof DropdownItem> = {
    component: DropdownItem,
    tags: ["autodocs"],
    argTypes: {
        title: { control: "text" },
        description: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof DropdownItem>;

export const Default: Story = {
    args: { title: "Customers", description: "Manage all customers", icon: Users },
};
export const Billing: Story = {
    args: { title: "Billing", description: "Invoices and payments", icon: CreditCard },
};
export const NoDescription: Story = {
    args: { title: "Settings", icon: Settings },
};
