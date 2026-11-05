import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.unit.spec.ts",
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "list",
});
