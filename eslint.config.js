// eslint.config.js

// 1. Importer les dépendances nécessaires
// 'globals' est nécessaire pour gérer les environnements (browser, node)
import globals from "globals";
// 'eslint-recommended' est maintenant un module que l'on doit importer
import eslintConfigRecommended from "eslint/conf/eslint-recommended.js";

export default [
  // La configuration principale
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Équivaut à env: { browser: true }
        ...globals.node, // Équivaut à env: { node: true }
        ...globals.es2021, // Équivaut à env: { es2021: true }
      },
      // Option pour spécifier la version ECMAScript (2021 = 12)
      ecmaVersion: 12,
      sourceType: "module", // Si vous utilisez des imports/exports (recommandé)
    },

    ...eslintConfigRecommended, // Équivaut à 'extends: ['eslint:recommended']'

    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-console": "off",
    },

    ignores: ["dist/**", "node_modules/**", "webpack.config.js"],
  },
];
