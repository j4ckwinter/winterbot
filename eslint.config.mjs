import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  {
    files: ["**/*.{js,mjs,ts,tsx,astro}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["*.{js,mjs,ts}", "tests/**/*.ts"],
    languageOptions: { globals: globals.node },
  },
  ...astro.configs["flat/recommended"],
  {
    files: ["**/*.astro"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  prettier,
);
