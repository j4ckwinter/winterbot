import { test, expect } from "@playwright/test";

test.describe("Winter Town case study without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  for (const width of [320, 1280]) {
    test(`engineering story remains readable at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/work/winter-town");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "A portfolio you can explore",
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://winterbyte.vercel.app/work/winter-town",
      );
      await expect(
        page.getByRole("heading", { name: "Keep movement state together" }),
      ).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
      await page
        .getByRole("link", { name: "Read the KTO case study ↗" })
        .click();
      await expect(page).toHaveURL(/\/work\/kto\/?$/);
    });
  }
});
