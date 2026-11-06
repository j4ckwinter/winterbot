import { expect, type Page } from "@playwright/test";

export async function installMovementClock(page: Page) {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
}

export async function pauseMovementClock(page: Page) {
  await expect(
    page.getByRole("button", {
      name: "Move up",
      exact: true,
      includeHidden: true,
    }),
  ).toBeEnabled();
  await page.clock.pauseAt(new Date("2026-01-01T01:00:00Z"));
}

export async function advanceToScene(page: Page, scene: string) {
  await expect
    .poll(
      async () => {
        await page.clock.runFor(500);
        return page.locator(".scene-layer").getAttribute("data-scene");
      },
      { timeout: 15000 },
    )
    .toBe(scene);
}
