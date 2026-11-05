import { test, expect } from "@playwright/test";

for (const reduced of [false, true]) {
  test(`room feedback respects reduced motion (${reduced})`, async ({
    page,
  }) => {
    await page.emulateMedia({
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    await page.goto("/");
    const workshop = page.getByRole("button", {
      name: "Walk to The Workshop",
      exact: true,
    });
    await expect(workshop).toBeEnabled();
    await expect(workshop).toHaveClass(/is-actionable/);
    await page.getByRole("group", { name: /^Town map/ }).focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".scene-layer")).toHaveAttribute(
      "data-scene",
      "workshop",
    );
    const transition = page.locator(".scene-arrival");
    await expect(transition).toHaveText("The Workshop");
    if (reduced) await expect(transition).toHaveCSS("display", "none");
    else await expect(transition).toHaveCSS("opacity", "0");
    const note = page.locator(".room-note");
    await expect(note).not.toHaveAttribute("open");
    await note.locator("summary").click();
    await expect(note.getByText(/pathfinder/)).toBeVisible();
    await page.getByRole("button", { name: "Leave room" }).click();
    await expect(page.locator(".scene-layer")).toHaveAttribute(
      "data-scene",
      "town",
    );
    await expect(note).toHaveCount(0);
  });
}
