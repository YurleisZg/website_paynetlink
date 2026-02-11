import type { Meta, StoryObj } from "@storybook/vue3";
import FeatureCheckItem from "./FeatureCheckItem.vue";

const meta: Meta<typeof FeatureCheckItem> = {
    component: FeatureCheckItem,
    tags: ["autodocs"],
    argTypes: { label: { control: "text" } },
};

export default meta;
type Story = StoryObj<typeof FeatureCheckItem>;

export const Default: Story = { args: { label: "Unlimited bandwidth" } };
export const Long: Story = { args: { label: "Automated billing and payment collection" } };
