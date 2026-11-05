import { test, expect } from "@playwright/test";

for (const width of [320, 1440]) {
  test(`trainer card opens details without moving at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open trainer card" });
    await expect(trigger).toBeEnabled();
    const buttonBounds = await trigger.boundingBox();
    const toolbarBounds = await page.locator(".world-toolbar").boundingBox();
    expect(buttonBounds!.x).toBeGreaterThanOrEqual(toolbarBounds!.x);
    expect(buttonBounds!.x + buttonBounds!.width).toBeLessThanOrEqual(
      toolbarBounds!.x + toolbarBounds!.width,
    );
    await trigger.click();
    await expect(page).toHaveURL(/#profile$/);
    await expect(
      page.getByRole("heading", { name: "Trainer card", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Email Jack" }),
    ).toHaveAttribute("href", "mailto:jackwinter.10@outlook.com");
    await expect(page.getByText("0 / 4 places explored")).toBeAttached();
    await page
      .getByRole("navigation", { name: "Trainer card sections" })
      .getByRole("button", { name: "Experience" })
      .click();
    await expect(page).toHaveURL(/#experience$/);
    await expect(page.locator("#place-title")).toBeFocused();
    await expect(page.locator(".scene-layer")).toHaveAttribute(
      "data-scene",
      "town",
    );
    await page.goBack();
    await expect(
      page.getByRole("heading", { name: "Trainer card", exact: true }),
    ).toBeVisible();
    await expect(page.locator("#place-title")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
  });
}

test("trainer card deep link survives reload", async ({ page }) => {
  await page.goto("/#profile");
  await expect(
    page.getByRole("heading", { name: "Trainer card", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Trainer card", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Read the full portfolio" }),
  ).toHaveAttribute("href", "/portfolio");
});
