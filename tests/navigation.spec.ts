import { test, expect } from "@playwright/test";

test("project deep links survive reload, switches, and browser history", async ({
  page,
}) => {
  await page.goto("/#projects/brain-cache");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("#project-detail h3")).toHaveText("brain-cache");
  await page.getByRole("button", { name: /NO. 003 pancake-stack/ }).click();
  await expect(page).toHaveURL(/#projects\/pancake-stack$/);
  await expect(
    page.getByRole("button", { name: /NO. 003 pancake-stack/ }),
  ).toBeFocused();
  await page.goBack();
  await expect(page.locator("#project-detail h3")).toHaveText("brain-cache");
  await page.goForward();
  await expect(page.locator("#project-detail h3")).toHaveText("pancake-stack");
  await page.reload();
  await expect(page.locator("#project-detail h3")).toHaveText("pancake-stack");
  await page
    .getByRole("button", { name: "Close details", exact: true })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page).toHaveURL("http://localhost:4323/");
  await page.goBack();
  await expect(page.locator("#project-detail h3")).toHaveText("pancake-stack");
});

test("section links and invalid hashes remain usable", async ({ page }) => {
  for (const [hash, title] of [
    ["about", "Jack’s House"],
    ["experience", "Winter Station"],
    ["contact", "The Post Office"],
  ]) {
    await page.goto(`/#${hash}`);
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
  await page.goto("/#projects/not-a-project");
  await expect(
    page.getByRole("button", { name: "Map", exact: true }),
  ).toBeEnabled();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page
    .getByRole("navigation", { name: "Quick access" })
    .getByRole("button", { name: "Contact" })
    .click();
  await expect(page).toHaveURL(/#contact$/);
});

test("copy-link failure offers a usable permalink", async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("Blocked")) },
    }),
  );
  await page.goto("/#projects/brain-cache");
  await page.getByRole("button", { name: "Copy link", exact: true }).click();
  await expect(
    page.getByText("Copy the URL from your address bar."),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Permalink" })).toHaveAttribute(
    "href",
    "#projects/brain-cache",
  );
});

test("a completed copy does not report success for a different project", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () =>
          new Promise<void>((resolve) =>
            window.addEventListener("finish-copy", () => resolve(), {
              once: true,
            }),
          ),
      },
    }),
  );
  await page.goto("/#projects/brain-cache");
  await page.getByRole("button", { name: "Copy link", exact: true }).click();
  await page.getByRole("button", { name: /NO. 003 pancake-stack/ }).click();
  await expect(page).toHaveURL(/#projects\/pancake-stack$/);
  await page.evaluate(async () => {
    window.dispatchEvent(new Event("finish-copy"));
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
  });
  await expect(page.locator(".share-content [role=status]")).toBeEmpty();
  await page.getByRole("button", { name: "Copy link", exact: true }).click();
  await page.evaluate(() => window.dispatchEvent(new Event("finish-copy")));
  await expect(page.locator(".share-content [role=status]")).toHaveText(
    "Link copied",
  );
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("plain portfolio exposes all content and real links", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Plain portfolio" }).click();
    await expect(page).toHaveURL(/\/portfolio\/?$/);
    await expect(
      page.getByRole("heading", { name: "brain-cache", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "KTO", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /jackwinter.10@gmail.com/ }),
    ).toHaveAttribute("href", "mailto:jackwinter.10@gmail.com");
    await page
      .getByRole("navigation", { name: "Portfolio sections" })
      .getByRole("link", { name: "Experience" })
      .click();
    await expect(page).toHaveURL(/#experience$/);
    await page.setViewportSize({ width: 320, height: 700 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(320);
  });
});
