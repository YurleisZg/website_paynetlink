import type { Preview } from "@storybook/vue3";
import "../src/styles/index.css";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            source: {
                type: "code",
            },
        },
    },
};

export default preview;
