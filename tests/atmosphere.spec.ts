import { test, expect } from "@playwright/test";
import {
  installMovementClock,
  pauseMovementClock,
} from "./helpers/movement-clock";

const glowOpacity = (page: import("@playwright/test").Page) =>
  page
    .locator(".town-app")
    .evaluate((el) =>
      Number(getComputedStyle(el).getPropertyValue("--glow-o")),
    );

for (const [instant, light, glow] of [
  ["2026-01-15T12:00:00Z", "day", 0],
  ["2026-01-15T22:00:00Z", "night", 0.42],
] as const) {
  test(`London ${light} is applied before the town's scripts load`, async ({
    page,
  }) => {
    await page.clock.install({ time: new Date(instant) });
    await page.route("**/*.js", (route) => route.abort());
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-light", light);
    await expect(page.locator("html")).toHaveAttribute(
      "data-weather",
      /^(clear|snow|heavy)$/,
    );
    expect(await glowOpacity(page)).toBe(glow);
  });
}

test("the town moves from day to night while it stays open", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-15T16:00:00Z") });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-light", "day");
  await expect(
    page.getByRole("button", { name: "Map", exact: true }),
  ).toBeEnabled();
  await page.clock.fastForward("30:00");
  await expect(page.locator("html")).toHaveAttribute("data-light", "night");
});

test("time and weather can be chosen in the URL, and snow only falls when it is snowing", async ({
  page,
}) => {
  await page.goto("/?time=night&weather=heavy");
  await expect(page.locator("html")).toHaveAttribute("data-light", "night");
  await expect(page.locator("html")).toHaveAttribute("data-weather", "heavy");
  await expect(page.locator(".town-weather")).toBeVisible();
  await page.goto("/?time=day&weather=clear");
  await expect(page.locator("html")).toHaveAttribute("data-light", "day");
  await expect(page.locator(".town-weather")).toBeHidden();
});

test("walking leaves footprints that fill in again", async ({ page }) => {
  await installMovementClock(page);
  await page.goto("/");
  await pauseMovementClock(page);
  const prints = page.locator('[data-trail="player"] rect');
  await expect(prints).toHaveCount(0);
  await page.getByRole("group", { name: /^Town map/ }).focus();
  await page.keyboard.down("ArrowDown");
  await page.clock.runFor(400);
  await page.keyboard.up("ArrowDown");
  expect(await prints.count()).toBeGreaterThan(2);
  await expect
    .poll(async () => {
      await page.clock.runFor(2000);
      return prints.count();
    })
    .toBe(0);
});

test("reduced motion leaves no footprints and holds the snow still", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?weather=snow");
  const player = page.locator(".player");
  const top = () =>
    player.evaluate((el) => parseFloat((el as HTMLElement).style.top));
  const start = await top();
  await page.getByRole("group", { name: /^Town map/ }).focus();
  await page.keyboard.down("ArrowDown");
  await expect.poll(top).toBeGreaterThan(start + 30);
  await page.keyboard.up("ArrowDown");
  await expect(page.locator('[data-trail="player"] rect')).toHaveCount(0);
  expect(
    await page
      .locator(".snow-near")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

test("a night of heavy snow still takes taps on the map and opens a readable dialog", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?time=night&weather=heavy");
  await expect(page.locator(".town-weather")).toBeVisible();
  const world = await page.locator(".camera-layer").boundingBox();
  await page.mouse.click(
    world!.x + (world!.width * 660) / 960,
    world!.y + (world!.height * 200) / 640,
  );
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "home",
  );
  await page
    .getByRole("button", { name: "Inspect About & skills", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const colours = await dialog.evaluate((el) => {
    const style = getComputedStyle(el);
    return [style.backgroundColor, style.color];
  });
  expect(colours).toEqual(["rgb(253, 253, 251)", "rgb(38, 50, 63)"]);
});
