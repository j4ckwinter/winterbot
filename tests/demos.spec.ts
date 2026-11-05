import { test, expect } from "@playwright/test";

test("town route inspector exposes collisions and rejects the pond", async ({
  page,
}) => {
  await page.goto("/#projects/winterbot");
  const inspector = page.getByRole("region", { name: "Town route inspector" });
  await expect(inspector.locator(".demo-calculated-route")).toBeVisible();
  await inspector.getByRole("button", { name: "Inside the pond" }).click();
  await expect(inspector.getByRole("status")).toHaveText(
    "No route: the destination is blocked.",
  );
  await expect(inspector.locator(".demo-calculated-route")).toHaveCount(0);
  await inspector.getByRole("button", { name: "Across the bridge" }).click();
  await expect(inspector.getByRole("status")).toContainText("Route found");
  const path = await inspector
    .locator(".demo-calculated-route")
    .getAttribute("points");
  const riverPoints = path!
    .split(" ")
    .map((pair) => pair.split(",").map(Number))
    .filter(([x]) => x > 800);
  expect(riverPoints.length).toBeGreaterThan(0);
  expect(riverPoints.every(([, y]) => y >= 375 && y <= 405)).toBe(true);
  await inspector
    .getByRole("checkbox", { name: "Show collision cells" })
    .uncheck();
  await expect(inspector.locator(".demo-collision-cells")).toHaveCount(0);
});

test("token budget responds to presets and keyboard input without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto("/#projects/brain-cache");
  const budget = page.getByRole("region", { name: "Context token budget" });
  await budget.getByRole("button", { name: "Tight budget" }).click();
  await expect(
    budget.getByRole("status", { name: "Context selection" }),
  ).toHaveText("2 of 4 complete chunks · 134 / 200 estimated tokens");
  await expect(budget.locator('[data-kept="true"]')).toHaveCount(2);
  const slider = budget.getByRole("slider", { name: "Estimated token budget" });
  await slider.focus();
  await page.keyboard.press("Home");
  await expect(
    budget.getByRole("status", { name: "Context selection" }),
  ).toHaveText("0 of 4 complete chunks · 0 / 0 estimated tokens");
  await budget.getByRole("button", { name: "Fit all chunks" }).click();
  await expect(
    budget.getByRole("status", { name: "Context selection" }),
  ).toHaveText("4 of 4 complete chunks · 723 / 750 estimated tokens");
  await budget.locator("summary").click();
  await expect(budget.locator("pre")).toContainText("function assembleContext");
  const width = await page
    .getByRole("dialog")
    .evaluate((el) => ({ content: el.scrollWidth, frame: el.clientWidth }));
  expect(width.content).toBeLessThanOrEqual(width.frame);
});

test("walking bug replay shows the failed calculation and its fix", async ({
  page,
}) => {
  await page.goto("/#projects/pancake-stack");
  await page.getByText("Try the bug and fix yourself", { exact: true }).click();
  const replay = page.getByRole("group", { name: "Walking regression replay" });
  await page.getByRole("button", { name: "Replay failing frame" }).click();
  await expect(page.locator(".demo-frame-result")).toContainText(
    "Direction becomes NaN",
  );
  await expect(page.locator(".demo-frame-result")).toContainText("-1.330 px");
  await page.getByRole("button", { name: "Replay fixed frame" }).click();
  await expect(page.locator(".demo-frame-result")).toContainText(
    "Origin consumed; position stays valid.",
  );
  await expect(page.locator(".demo-frame-result")).toContainText("0.000 px");
  await expect(replay).toHaveCount(1);
});

test("workflow guides visitors through steps and resets when the task changes", async ({
  page,
}) => {
  await page.goto("/#projects/pancake-stack");
  const board = page.getByRole("region", { name: "Workflow example" });
  await expect(
    board.getByRole("button", { name: "Previous step" }),
  ).toBeDisabled();
  await board.getByRole("button", { name: "Next step" }).click();
  await expect(board.locator(".demo-stage h5")).toHaveText("Test");
  await board.getByRole("button", { name: "Next step" }).click();
  await board.getByRole("button", { name: "Next step" }).click();
  await expect(board.locator(".demo-stage h5")).toHaveText("Verify");
  await expect(board.getByRole("button", { name: "Next step" })).toBeDisabled();
  await board.getByRole("button", { name: "Feature", exact: true }).click();
  await expect(board.locator(".demo-stage h5")).toHaveText("Scope");
  await expect(
    board.getByRole("button", { name: "Previous step" }),
  ).toBeDisabled();
});
