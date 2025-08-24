
/*global someFunction, a*/
const js = require("@eslint/js");
const globals = require("globals");

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // ✅ Ajout ici
      },
    },
    rules: {
      "no-unused-vars": "off",
    },
  },
];
