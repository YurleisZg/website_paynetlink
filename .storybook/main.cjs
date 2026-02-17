const path = require("path");

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|ts|vue)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    framework: {
        name: "@storybook/vue3-vite",
        options: {
            docgen: "vue-component-meta",
        },
    },
    async viteFinal(config) {
        config.resolve = config.resolve ?? {};
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "../src"),
        };
        return config;
    },
};

module.exports = config;
