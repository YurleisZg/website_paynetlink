import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import vueParser from "vue-eslint-parser";
import boundaries from "eslint-plugin-boundaries";

export default [
    {
        ignores: [
            "dist/**",
            "node_modules/**",
            "**/coverage/**",
            "*.config.js",
            "*.config.cjs",
            ".storybook/**",
            "playwright-report/**",
            "test-results/**",
        ],
    },
    js.configs.recommended,
    ...pluginVue.configs["flat/recommended"],
    ...tseslint.configs.recommended,
    prettierConfig,
    {
        plugins: {
            boundaries,
        },
        settings: {
            "boundaries/elements": [
                { type: "shared", pattern: "src/shared/*" },
                { type: "entities", pattern: "src/entities/*" },
                { type: "features", pattern: "src/features/*" },
                { type: "widgets", pattern: "src/widgets/*" },
                { type: "pages", pattern: "src/pages/*" },
                { type: "app", pattern: "src/app/*" },
            ],
        },
        rules: {
            "boundaries/element-types": [
                "error",
                {
                    default: "disallow",
                    rules: [
                        { from: ["shared"], allow: ["shared"] },
                        { from: ["entities"], allow: ["shared", "entities"] },
                        { from: ["features"], allow: ["shared", "entities"] },
                        {
                            from: ["widgets"],
                            allow: ["shared", "entities", "features"],
                        },
                        {
                            from: ["pages"],
                            allow: ["shared", "entities", "features", "widgets"],
                        },
                        {
                            from: ["app"],
                            allow: ["shared", "entities", "features", "widgets", "pages"],
                        },
                    ],
                },
            ],
        },
    },
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
