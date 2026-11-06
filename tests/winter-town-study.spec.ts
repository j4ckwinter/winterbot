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
      await expect(page.getByText(/historical local baseline/)).toBeVisible();
      await expect(
        page.getByText(/Enable JavaScript to try the route inspector/),
      ).toBeVisible();
      await page
        .getByRole("link", { name: "Read the KTO case study ↗" })
        .click();
      await expect(page).toHaveURL(/\/work\/kto\/?$/);
    });
  }
});

test("case study route inspector uses the real collision rules", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/work/winter-town");
  const inspector = page.getByRole("region", { name: "Town route inspector" });
  await inspector.getByRole("button", { name: "Inside the pond" }).click();
  await expect(inspector.getByRole("status")).toHaveText(
    "No route: the destination is blocked.",
  );
  await inspector.getByRole("button", { name: "Across the bridge" }).focus();
  await page.keyboard.press("Enter");
  await expect(inspector.getByRole("status")).toContainText("Route found");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    320,
  );
});

test.describe("case study discovery without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("portfolio keeps KTO featured and links to Winter Town engineering", async ({
    page,
  }) => {
    await page.goto("/portfolio");
    await expect(
      page
        .getByRole("complementary", { name: "Featured work" })
        .getByRole("link"),
    ).toHaveAttribute("href", "/work/kto");
    await page
      .locator("#winterbot")
      .getByRole("link", { name: "How I built Winter Town" })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "A portfolio you can explore",
    );
    await page.getByRole("link", { name: "← Projects", exact: true }).click();
    await expect(page).toHaveURL(/\/portfolio#projects$/);
  });
});

test("workshop links the engineering story to the correct project", async ({
  page,
}) => {
  await page.goto("/#projects/winterbot");
  await page.getByRole("link", { name: "How I built Winter Town" }).click();
  await expect(page).toHaveURL(/\/work\/winter-town\/?$/);
  await page.goto("/#projects/brain-cache");
  await expect(
    page.getByRole("link", { name: "How I built Winter Town" }),
  ).toHaveCount(0);
});
