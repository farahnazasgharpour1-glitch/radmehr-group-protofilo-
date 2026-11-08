import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import html from "@html-eslint/eslint-plugin";
import globals from "globals";

export default defineConfig([
  {
    ignores: ["node_modules/**", ".lighthouseci/**", "coverage/**"],
  },
  {
    files: ["js/**/*.js"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: globals.browser,
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["index.html", "html/**/*.html"],
    plugins: {
      html,
    },
    extends: ["html/recommended"],
    language: "html/html",
    rules: {
      "html/no-duplicate-class": "error",
      "html/require-img-alt": "error",
    },
  },
]);
