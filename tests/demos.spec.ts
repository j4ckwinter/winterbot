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
  await page
    .getByText("Try limiting how much code the agent receives", { exact: true })
    .click();
  const budget = page.getByRole("region", { name: "Context token budget" });
  await budget.getByRole("button", { name: "Tight budget" }).click();
  await expect(
    budget.getByRole("status", { name: "Context selection" }),
  ).toHaveText("2 of 4 complete functions · 134 / 200 estimated tokens");
  await expect(budget.locator('[data-kept="true"]')).toHaveCount(2);
  const slider = budget.getByRole("slider", { name: "Estimated token budget" });
  await slider.focus();
  await page.keyboard.press("Home");
  await expect(
    budget.getByRole("status", { name: "Context selection" }),
  ).toHaveText("0 of 4 complete functions · 0 / 0 estimated tokens");
  await budget.getByRole("button", { name: "Fit all functions" }).click();
  await expect(
    budget.getByRole("status", { name: "Context selection" }),
  ).toHaveText("4 of 4 complete functions · 723 / 750 estimated tokens");
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

test("code search explains the match before showing its source", async ({
  page,
}) => {
  await page.goto("/#projects/brain-cache");
  const demo = page.getByRole("region", { name: "Sample code search" });
  await expect(
    demo.getByRole("heading", { name: "assembleContext", exact: true }),
  ).toBeVisible();
  await expect(demo.locator(".demo-results pre")).toBeHidden();
  await demo.getByRole("button", { name: "offline", exact: true }).click();
  await expect(
    demo.getByRole("heading", { name: "requireOllama", exact: true }),
  ).toBeVisible();
  await demo.locator(".demo-results summary").click();
  await expect(demo.locator(".demo-results pre")).toContainText(
    "async function requireOllama",
  );
  await demo.getByRole("searchbox").fill("no-such-function");
  await expect(demo.getByText(/No matching snippets/)).toBeVisible();
});

for (const [slug, name] of [
  ["winterbot", "WinterBot"],
  ["brain-cache", "brain-cache"],
  ["pancake-stack", "pancake-stack"],
]) {
  test(`demo shortcut focuses ${name} without changing the project route`, async ({
    page,
  }) => {
    await page.goto(`/#projects/${slug}`);
    await page.getByRole("button", { name: "Try the demo" }).click();
    await expect(
      page.getByRole("region", { name: `${name} demo`, exact: true }),
    ).toBeFocused();
    await expect(page).toHaveURL(new RegExp(`#projects/${slug}$`));
    await page.getByText("My contribution & evidence", { exact: true }).click();
    await expect(page.locator(".project-summary")).toBeVisible();
  });
}

test("project changes announce the name without wrapping interactive demos in a live region", async ({
  page,
}) => {
  await page.goto("/#projects/winterbot");
  await page.getByRole("button", { name: /NO. 002 brain-cache/ }).click();
  const heading = page.locator("#project-detail > h3");
  await expect(heading).toHaveText("brain-cache");
  await expect(heading).toHaveAttribute("aria-live", "polite");
  expect(
    await page
      .getByRole("region", { name: "brain-cache demo", exact: true })
      .evaluate((el) => el.closest("[aria-live]")),
  ).toBeNull();
});
