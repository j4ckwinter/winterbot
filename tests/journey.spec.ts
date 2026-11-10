import { test, expect } from "@playwright/test";

test("mobile overview fits its frame and menu keeps controls accessible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Walk controls", exact: true }),
  ).toBeEnabled();
  const controls = await page.locator(".play-controls").boundingBox();
  expect(controls!.y + controls!.height).toBeLessThanOrEqual(850);
  await expect(page.locator(".d-pad")).toBeHidden();
  const frame = await page.locator(".world").boundingBox();
  expect(frame!.width / frame!.height).toBeCloseTo(1.5, 1);
  await page.locator(".world-menu > summary").click();
  await expect(
    page.getByRole("button", { name: "Sound", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
});

for (const reduced of [false, true]) {
  test(`optional station trip returns focus and respects reduced motion (${reduced})`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page
      .getByRole("button", { name: "Walk to Winter Station", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Collect ticket" }),
    ).toBeDisabled();
    await page
      .getByRole("navigation", { name: "Quick access" })
      .getByRole("button", { name: "Projects" })
      .click();
    await page
      .getByRole("button", { name: "Close details", exact: true })
      .click();
    await page.getByRole("button", { name: "Collect ticket" }).click();
    await page.emulateMedia({
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    await page.getByRole("button", { name: "Take the train" }).click();
    const trip = page.getByRole("dialog");
    await expect(trip).toBeVisible();
    if (!reduced) {
      await expect(
        page.getByRole("button", { name: "Skip ride" }),
      ).toBeVisible();
      await page.getByRole("button", { name: "Skip ride" }).click();
    }
    await expect(
      page.getByRole("heading", { name: "Above Winter Town" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trip).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Take the train" }),
    ).toBeFocused();
    await page.getByRole("button", { name: "Take the train" }).click();
    await page.getByRole("button", { name: "Return to station" }).click();
    await page.waitForTimeout(1900);
    await expect(trip).not.toBeVisible();
  });
}

test("sign names stay visible and details appear on hover and approach", async ({
  page,
}) => {
  await page.goto("/");
  const sign = page.getByRole("button", {
    name: "Walk to The Workshop",
    exact: true,
  });
  await expect(sign).toBeEnabled();
  const distant = page.getByRole("button", {
    name: "Walk to Jack’s House",
    exact: true,
  });
  await expect(distant.locator("span")).toBeVisible();
  await expect(distant.locator("small")).toBeHidden();
  await distant.hover();
  await expect(distant.locator("small")).toBeVisible();
  await page.getByRole("button", { name: "Map", exact: true }).click();
  await expect(sign.locator("span")).toBeVisible();
  await sign.click();
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "workshop",
    { timeout: 15000 },
  );
  await page.getByRole("button", { name: "Map", exact: true }).click();
  const machine = page.getByRole("button", {
    name: "Inspect brain-cache",
    exact: true,
  });
  await machine.click();
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });
  await expect(page.locator(".player")).toHaveAttribute("data-direction", "up");
  await page
    .getByRole("button", { name: "Close details", exact: true })
    .click();
  await expect(machine).toHaveClass(/is-near/);
  await expect(machine.locator("span")).toBeVisible();
});

test("reduced motion keeps the idle sprite still", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Map", exact: true }),
  ).toBeEnabled();
  await expect(page.locator(".sprite-torso")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".sprite-blink")).toHaveCSS(
    "animation-name",
    "none",
  );
});
