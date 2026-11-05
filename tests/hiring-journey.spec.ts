import { test, expect } from "@playwright/test";

test("trainer card leads to the KTO case study and a contact route", async ({
  page,
}) => {
  await page.goto("/#profile");
  await page.getByRole("link", { name: "Read the KTO case study" }).click();
  await expect(page).toHaveURL(/\/work\/kto\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Rebuilding KTO’s sportsbook frontend",
  );
  await expect(
    page.getByText("Results from performance testing, as reported in my CV."),
  ).toBeVisible();
  await expect(page.locator(".case-metrics dd")).toHaveText([
    "40%",
    "25%",
    "20%",
    "9.3%",
    "11×",
  ]);
  await expect(page.getByRole("link", { name: "Email Jack" })).toHaveAttribute(
    "href",
    "mailto:jackwinter.10@outlook.com",
  );
  await page.setViewportSize({ width: 320, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    320,
  );
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("experience links to the case study and back", async ({ page }) => {
    await page.goto("/portfolio#experience");
    await page.getByRole("link", { name: "Read the KTO case study" }).click();
    await expect(
      page.getByRole("heading", { name: "Performance results" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "← Experience", exact: true }).click();
    await expect(page).toHaveURL(/\/portfolio#experience$/);
  });
});

test("project previews open their matching demos and CV downloads", async ({
  page,
}) => {
  for (const [name, slug] of [
    ["WinterBot", "winterbot"],
    ["brain-cache", "brain-cache"],
    ["pancake-stack", "pancake-stack"],
  ]) {
    await page.goto("/portfolio");
    await page
      .getByRole("link", { name: `Try the ${name} demo`, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`#projects/${slug}$`));
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("dialog").getByRole("heading", { name, exact: true }),
    ).toBeVisible();
  }
  await page.goto("/portfolio");
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download CV" }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe("Jack-Winter-CV.pdf");
  expect(await download.failure()).toBeNull();
});

for (const [path, image] of [
  ["/", "portfolio-social.png"],
  ["/work/kto", "kto-social.png"],
]) {
  test(`sharing metadata resolves the correct image for ${path}`, async ({
    page,
    request,
  }) => {
    await page.goto(path);
    const imageUrl = `https://winterbyte.vercel.app/${image}`;
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      imageUrl,
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      imageUrl,
    );
    await expect(
      page.locator('meta[property="og:image:alt"]'),
    ).not.toHaveAttribute("content", "");
    const response = await request.get(`/${image}`);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
    const bytes = await response.body();
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
  });
}
