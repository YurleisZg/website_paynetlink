import type { Meta, StoryObj } from "@storybook/vue3";
import { Router, Wifi, Server } from "lucide-vue-next";
import IntegrationCard from "./IntegrationCard.vue";

const meta: Meta<typeof IntegrationCard> = {
    component: IntegrationCard,
    tags: ["autodocs"],
    argTypes: { label: { control: "text" } },
};

export default meta;
type Story = StoryObj<typeof IntegrationCard>;

export const MikroTik: Story = { args: { label: "MikroTik", icon: Router } };
export const WiFi: Story = { args: { label: "WiFi", icon: Wifi } };
export const ServerIcon: Story = { args: { label: "Server", icon: Server } };
