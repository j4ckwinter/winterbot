import { test, expect, type Page } from "@playwright/test";

async function visitLookout(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#projects/brain-cache");
  await page
    .getByRole("button", { name: "Close details", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Walk to Winter Station", exact: true })
    .click();
  await page.getByRole("button", { name: "Collect ticket" }).click();
  await page.getByRole("button", { name: "Take the train" }).click();
  await expect(
    page.getByRole("group", { name: /^Lookout platform/ }),
  ).toBeFocused();
}

test("lookout offers a walkable railing and return train", async ({ page }) => {
  await visitLookout(page);
  await page
    .getByRole("button", { name: "Walk to the railing", exact: true })
    .click();
  await expect(page.locator(".lookout-player")).toHaveAttribute(
    "data-x",
    "400",
  );
  await expect(page.locator(".lookout-player")).toHaveAttribute(
    "data-y",
    "448",
  );
  await expect(page.locator(".lookout-message")).toContainText(
    "Beyond the bridge",
  );
  await page
    .getByRole("button", { name: "Board the return train", exact: true })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator(".lookout-player")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Take the train", exact: true }),
  ).toBeFocused();
});

test("lookout keyboard movement stops at the railing and on blur", async ({
  page,
}) => {
  await visitLookout(page);
  const platform = page.getByRole("group", { name: /^Lookout platform/ });
  await platform.focus();
  await page.keyboard.down("ArrowUp");
  await expect(page.locator(".lookout-player")).toHaveAttribute(
    "data-y",
    "444",
  );
  await page.keyboard.up("ArrowUp");
  const startX = Number(
    await page.locator(".lookout-player").getAttribute("data-x"),
  );
  await page.keyboard.down("ArrowLeft");
  await expect
    .poll(async () =>
      Number(await page.locator(".lookout-player").getAttribute("data-x")),
    )
    .toBeLessThan(startX);
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await page.keyboard.up("ArrowLeft");
  const x = await page.locator(".lookout-player").getAttribute("data-x");
  await page.waitForTimeout(150);
  await expect(page.locator(".lookout-player")).toHaveAttribute("data-x", x!);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("lookout mobile taps respect platform bounds", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await visitLookout(page);
  const platform = page.getByRole("group", { name: /^Lookout platform/ });
  await platform.scrollIntoViewIfNeeded();
  const tap = async (x: number, y: number) => {
    const box = await platform.boundingBox();
    await page.mouse.click(
      box!.x + (box!.width * x) / 800,
      box!.y + (box!.height * y) / 560,
    );
  };
  await tap(200, 490);
  await expect(page.locator(".lookout-player")).toHaveAttribute(
    "data-x",
    "200",
  );
  await tap(200, 200);
  await expect(page.locator(".lookout-player")).toHaveAttribute(
    "data-x",
    "200",
  );
  await expect(page.locator(".lookout-message")).toContainText(
    "Stay on the platform",
  );
  expect(
    await page
      .getByRole("dialog")
      .evaluate((el) => el.scrollWidth <= el.clientWidth),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Lookout move right", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".lookout-player")).toHaveAttribute(
    "data-x",
    "210",
  );
});
