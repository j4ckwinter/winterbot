import { test, expect } from "@playwright/test";

for (const width of [320, 390, 1440]) {
  test(`arrival shows an approachable workshop at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("/");
    const workshop = page.getByRole("button", {
      name: "Walk to The Workshop",
      exact: true,
    });
    await expect(workshop).toBeEnabled();
    await expect(workshop.locator("span")).toBeVisible();
    await expect
      .poll(async () => {
        const sign = await workshop.boundingBox();
        const world = await page.locator(".world").boundingBox();
        return (
          sign!.x >= world!.x &&
          sign!.x + sign!.width <= world!.x + world!.width &&
          sign!.y >= world!.y
        );
      })
      .toBe(true);
    await expect(
      page.getByRole("button", { name: "Enter The Workshop" }),
    ).toBeEnabled();
    await page.getByRole("group", { name: /^Town map/ }).focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".scene-layer")).toHaveAttribute(
      "data-scene",
      "workshop",
    );
  });
}
