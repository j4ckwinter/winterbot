import { test, expect } from "@playwright/test";

test.use({ hasTouch: true });

for (const width of [320, 390, 1280]) {
  test(`room toolbar keeps controls in place at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    if (width <= 760) {
      await page
        .getByRole("button", { name: "Walk controls", exact: true })
        .tap();
    }
    const portrait = await page.locator(".trainer-button").boundingBox();
    const geometry = () =>
      page.locator(".world-toolbar").evaluate((el) => ({
        height: el.getBoundingClientRect().height,
        toolbarActionsY: document
          .querySelector(".toolbar-actions")!
          .getBoundingClientRect().y,
      }));
    const town = await geometry();
    for (const name of [
      "The Workshop",
      "Jack’s House",
      "Winter Station",
      "The Post Office",
    ]) {
      if (width > 760) {
        await page.getByRole("button", { name: "Map", exact: true }).click();
      }
      await page
        .getByRole("button", { name: `Walk to ${name}`, exact: true })
        .tap();
      const back = page.getByRole("button", {
        name: "Leave room",
        exact: true,
      });
      await expect(back).toBeVisible();
      const bounds = await back.boundingBox();
      expect(bounds?.x).toBe(portrait?.x);
      expect(bounds?.y).toBe(portrait?.y);
      await expect.poll(geometry).toEqual(town);
      await expect(page.locator(".world-menu > summary")).toBeVisible();
      await expect(page.locator(".toolbar-actions > button")).toBeVisible();
      await back.tap();
      await expect(page.locator(".scene-layer")).toHaveAttribute(
        "data-scene",
        "town",
      );
      await expect.poll(geometry).toEqual(town);
    }
  });
}
