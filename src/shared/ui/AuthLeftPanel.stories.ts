import type { Meta, StoryObj } from "@storybook/vue3";
import AuthLeftPanel from "./AuthLeftPanel.vue";

const meta: Meta<typeof AuthLeftPanel> = {
    component: AuthLeftPanel,
    tags: ["autodocs"],
    argTypes: {
        title: { control: "text" },
        description: { control: "text" },
    },
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof AuthLeftPanel>;

export const Login: Story = {
    args: {
        title: "Simplifica tu ISP.\nAutomatiza, cobra y crece.",
        description:
            "Accede a tu panel de control para gestionar clientes, pagos, red y comunicaciones desde un solo lugar.",
    },
};
export const Register: Story = {
    args: {
        title: "Empieza gratis.\nCrea tu cuenta hoy.",
        description: "Únete a cientos de ISPs que ya automatizan su operación con PayNetLink.",
    },
};
