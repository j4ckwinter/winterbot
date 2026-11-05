import { test, expect } from "@playwright/test";

test("inspected machines remember project switches for the current visit", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#projects/brain-cache");
  await page.getByRole("button", { name: /NO. 003 pancake-stack/ }).click();
  await page
    .getByRole("button", { name: "Close details", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Walk to The Workshop", exact: true })
    .click();
  await expect(page.locator('[data-project-machine="0"]')).toHaveAttribute(
    "data-inspected",
    "false",
  );
  await expect(page.locator('[data-project-machine="1"]')).toHaveAttribute(
    "data-inspected",
    "true",
  );
  await expect(page.locator('[data-project-machine="2"]')).toHaveAttribute(
    "data-inspected",
    "true",
  );
  await page.getByRole("button", { name: "Leave room" }).click();
  await page
    .getByRole("button", { name: "Walk to Winter Station", exact: true })
    .click();
  await page
    .getByText("Talk to the station attendant", { exact: true })
    .click();
  await expect(page.locator(".station-attendant p")).toBeVisible();
});

test("cat wanders and reduced motion returns it to a resting spot", async ({
  page,
}) => {
  await page.goto("/");
  const cat = page.locator("[data-cat-walking]");
  await expect(cat).toHaveAttribute("data-cat-walking", "false");
  const resting = await cat.getAttribute("transform");
  await expect(cat).not.toHaveAttribute("transform", resting!, {
    timeout: 8000,
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(cat).toHaveAttribute("transform", resting!);
  await expect(cat).toHaveAttribute("data-cat-walking", "false");
});
