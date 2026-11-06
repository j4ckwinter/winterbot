import { test, expect } from "@playwright/test";

test("inspected machines remember project switches for the current visit", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#projects/brain-cache");
  await page.getByRole("button", { name: /NO. 003 pancake-stack/ }).click();
  await page
    .getByRole("button", { name: "Close details", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Walk to The Workshop", exact: true })
    .click();
  await expect(
    page.locator('[data-project-machine="winterbot"]'),
  ).toHaveAttribute("data-inspected", "false");
  await expect(
    page.locator('[data-project-machine="brain-cache"]'),
  ).toHaveAttribute("data-inspected", "true");
  await expect(
    page.locator('[data-project-machine="pancake-stack"]'),
  ).toHaveAttribute("data-inspected", "true");
  await page.getByRole("button", { name: "Leave room" }).click();
  await page
    .getByRole("button", { name: "Walk to Winter Station", exact: true })
    .click();
  await page
    .getByText("Talk to the station attendant", { exact: true })
    .click();
  await expect(page.locator(".station-attendant p")).toBeVisible();
});

test("cat wanders and reduced motion returns it to a resting spot", async ({
  page,
}) => {
  await page.goto("/");
  const cat = page.locator("[data-cat-walking]");
  await expect(cat).toHaveAttribute("data-cat-walking", "false");
  const resting = await cat.getAttribute("transform");
  await expect(cat).not.toHaveAttribute("transform", resting!, {
    timeout: 8000,
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(cat).toHaveAttribute("transform", resting!);
  await expect(cat).toHaveAttribute("data-cat-walking", "false");
});

test("destination highlighting follows travel and clears on cancellation", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Map", exact: true }).click();
  const house = page.getByRole("button", { name: "Walk to Jack’s House" });
  await house.click();
  await expect(house).toHaveClass(/is-destination/);
  await expect(page.locator('[data-scenery="home"]')).toHaveClass(
    /is-destination/,
  );
  await page.getByRole("button", { name: "Cancel walk" }).click();
  await expect(house).not.toHaveClass(/is-destination/);
  await expect(page.locator('[data-scenery="home"]')).not.toHaveClass(
    /is-destination/,
  );
  await expect(page.locator(".walk-route")).toHaveCount(0);
});

test.describe("mobile touch navigation", () => {
  test.use({ hasTouch: true });
  for (const width of [320, 390]) {
    test(`mobile town starts with tappable signs and optional controls at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await expect(
        page.getByRole("button", { name: "Follow player", exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(".d-pad")).toBeHidden();
      await expect
        .poll(async () => {
          const bounds = await page.locator(".world").boundingBox();
          const signs = await page.locator(".town-label").all();
          const boxes = await Promise.all(
            signs.map((sign) => sign.boundingBox()),
          );
          return boxes.every(
            (box) =>
              box &&
              bounds &&
              box.height >= 43.9 &&
              box.x >= bounds.x &&
              box.x + box.width <= bounds.x + bounds.width,
          );
        })
        .toBe(true);
      await page.getByRole("button", { name: "Walk to Jack’s House" }).tap();
      await expect(page.locator('[data-scenery="home"]')).toHaveClass(
        /is-destination/,
      );
      await page.getByRole("button", { name: "Cancel walk" }).tap();
      await page
        .getByRole("button", { name: "Walk controls", exact: true })
        .tap();
      await expect(
        page.getByRole("button", { name: "Move up", exact: true }),
      ).toBeVisible();
      await page
        .getByRole("button", { name: "Hide controls", exact: true })
        .tap();
      await expect(page.locator(".d-pad")).toBeHidden();
      await page.getByRole("button", { name: "Walk to Jack’s House" }).tap();
      await expect(page.locator(".scene-layer")).toHaveAttribute(
        "data-scene",
        "home",
        { timeout: 10000 },
      );
      const about = page.getByRole("button", {
        name: "Inspect About & skills",
        exact: true,
      });
      await expect
        .poll(async () => (await about.boundingBox())?.height ?? 0)
        .toBeGreaterThanOrEqual(43.9);
      await about.tap();
      await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });
      await page
        .getByRole("button", { name: "Close details", exact: true })
        .tap();
      await page.getByRole("button", { name: "Leave room" }).tap();
      await expect(
        page.getByRole("button", { name: "Follow player", exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      await page
        .getByRole("button", { name: "Walk to The Workshop", exact: true })
        .tap();
      await expect(page.locator(".scene-layer")).toHaveAttribute(
        "data-scene",
        "workshop",
        { timeout: 10000 },
      );
      await page.getByRole("button", { name: "Leave room" }).tap();
      await expect(page.locator(".scene-layer")).toHaveAttribute(
        "data-scene",
        "town",
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
    });
  }
});
