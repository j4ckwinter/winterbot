import { test, expect } from "@playwright/test";

test.use({ hasTouch: true, viewport: { width: 390, height: 844 } });

test("touch navigation avoids focus borders and keyboard navigation restores them", async ({
  page,
}) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Quick access" });
  for (const name of ["Projects", "About & skills", "Experience", "Contact"]) {
    const trigger = nav.getByRole("button", { name });
    await trigger.tap();
    const heading = page.locator("#place-title");
    await expect(heading).toBeFocused();
    await expect(heading).toHaveCSS("outline-style", "none");
    await page
      .getByRole("button", { name: "Close details", exact: true })
      .tap();
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveCSS("outline-style", "none");
  }
  await page.keyboard.press("Enter");
  await expect(page.locator("#place-title")).toBeFocused();
  await expect(page.locator("#place-title")).toHaveCSS(
    "outline-style",
    "solid",
  );
  await page.keyboard.press("Escape");
  const contact = nav.getByRole("button", { name: "Contact" });
  await expect(contact).toBeFocused();
  await expect(contact).toHaveCSS("outline-style", "solid");
});
