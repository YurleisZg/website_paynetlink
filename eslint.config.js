import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
    { ignores: ["dist/**", "node_modules/**", "**/coverage/**", "*.config.js"] },
    js.configs.recommended,
    ...pluginVue.configs["flat/recommended"],
    ...tseslint.configs.recommended,
    prettierConfig,
    {
        files: ["**/*.{js,ts,vue}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                extraFileExtensions: [".vue"],
            },
        },
        rules: {
            "vue/multi-word-component-names": "off",
        },
    },
];
