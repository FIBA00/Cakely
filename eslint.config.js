import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  { ignores: ["dist/**", "node_modules/**", "client/public/**"] },
  js.configs.recommended,
  {
    files: ["client/src/**/*.{js,jsx}", "e2e/**/*.js"],
    languageOptions: { globals: { ...globals.browser, ...globals.node }, parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { "react-hooks": reactHooks },
    rules: { ...reactHooks.configs.recommended.rules, "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }] },
  },
];
