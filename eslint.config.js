import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import vueParser from "vue-eslint-parser";

export default [
    {
        ignores: [
            "dist/**",
            "node_modules/**",
            "**/coverage/**",
            "*.config.js",
            "*.config.cjs",
            ".storybook/**",
        ],
    },
    js.configs.recommended,
    ...pluginVue.configs["flat/recommended"],
    ...tseslint.configs.recommended,
    prettierConfig,
    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                parser: tseslint.parser,
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        rules: {
            "vue/multi-word-component-names": "off",
        },
    },
    {
        files: ["**/*.{js,ts}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
            },
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
    },
];
