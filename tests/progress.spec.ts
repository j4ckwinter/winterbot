import { test, expect } from "@playwright/test";
const key = "winter-town:progress:v1";

test("season and discoveries survive reload, reset preserves season", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".world-menu > summary").click();
  await page.getByRole("button", { name: "Switch to autumn" }).click();
  await page.locator(".world-menu > summary").click();
  await page
    .getByRole("navigation", { name: "Quick access" })
    .getByRole("button", { name: "Projects" })
    .click();
  await page
    .getByRole("button", { name: "Close details", exact: true })
    .click();
  await page.reload();
  await expect(page.locator(".town-app")).toHaveClass(/season-fire/);
  const log = page.getByRole("button", {
    name: "Travel log: 1 of 4 places explored",
  });
  await log.click();
  await expect(page.locator(".travel-log li.is-visited")).toHaveCount(1);
  await expect(page.locator(".travel-log li.is-visited")).toContainText(
    "The Workshop",
  );
  await page.getByRole("button", { name: "Reset exploration" }).click();
  await expect(
    page.getByRole("button", { name: "Travel log: 0 of 4 places explored" }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator(".town-app")).toHaveClass(/season-fire/);
  await expect(
    page.getByRole("button", { name: "Travel log: 0 of 4 places explored" }),
  ).toBeVisible();
});

test("malformed progress cannot break startup", async ({ page }) => {
  await page.addInitScript(
    (key) => localStorage.setItem(key, "{broken json"),
    key,
  );
  await page.goto("/");
  await page
    .getByRole("button", { name: "Travel log: 0 of 4 places explored" })
    .click();
  await expect(
    page.getByRole("button", { name: "Reset exploration" }),
  ).toBeDisabled();
  await page.locator(".world-menu > summary").click();
  await expect(
    page.getByRole("button", { name: "Switch to autumn" }),
  ).toBeEnabled();
});

test("saved discoveries are validated and deduplicated", async ({ page }) => {
  await page.addInitScript(
    (key) =>
      localStorage.setItem(
        key,
        JSON.stringify({
          version: 1,
          season: "fire",
          visited: ["workshop", "unknown", "workshop", "post", null],
        }),
      ),
    key,
  );
  await page.goto("/");
  await expect(page.locator(".town-app")).toHaveClass(/season-fire/);
  await page
    .getByRole("button", { name: "Travel log: 2 of 4 places explored" })
    .click();
  await expect(page.locator(".travel-log li.is-visited")).toHaveCount(2);
});

test("denied storage keeps exploration usable for the current visit", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Denied");
      },
    });
  });
  await page.goto("/#contact");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("button", { name: "Close details", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Travel log: 1 of 4 places explored" })
    .click();
  await expect(page.getByText("Progress lasts for this visit.")).toBeVisible();
  await page.locator(".world-menu > summary").click();
  await page.getByRole("button", { name: "Switch to autumn" }).click();
  await page.locator(".world-menu > summary").click();
  await expect(page.locator(".town-app")).toHaveClass(/season-fire/);
});
