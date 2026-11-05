import { test, expect } from "@playwright/test";

test("town renders with destinations and no browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Jack Winter",
  );
  await expect(page.getByRole("button", { name: /^Walk to/ })).toHaveCount(4);
  await page.locator(".world-menu > summary").click();
  await page.getByRole("button", { name: "Switch to autumn" }).click();
  await page.locator(".world-menu > summary").click();
  await expect(page.locator(".town-app")).toHaveClass(/season-fire/);
  expect(errors).toEqual([]);
});

test("projects open directly, switch and link to real work; Escape restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const projects = page
    .getByRole("navigation", { name: "Quick access" })
    .getByRole("button", { name: "Projects" });
  await projects.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const bounds = await page.getByRole("dialog").boundingBox();
  expect(
    Math.abs(bounds!.x + bounds!.width / 2 - page.viewportSize()!.width / 2),
  ).toBeLessThan(2);
  await page.getByRole("button", { name: /brain-cache/ }).click();
  await expect(page.locator("#project-detail h3")).toHaveText("brain-cache");
  await expect(
    page.getByRole("link", { name: "View package" }),
  ).toHaveAttribute("href", "https://www.npmjs.com/package/brain-cache");
  await page.getByRole("button", { name: /pancake-stack/ }).click();
  await expect(page.getByRole("link", { name: "View source" })).toHaveAttribute(
    "href",
    "https://github.com/j4ckwinter/pancake-stack",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(projects).toBeFocused();
  await expect(page.getByText("1 / 4 places explored")).toBeVisible();
});

test("walks into every room and returns to its door", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("/");
  for (const [name, scene] of [
    ["The Workshop", "workshop"],
    ["Jack’s House", "home"],
    ["Winter Station", "station"],
    ["The Post Office", "post"],
  ]) {
    await page.getByRole("button", { name: "Map", exact: true }).click();
    await page
      .getByRole("button", { name: `Walk to ${name}`, exact: true })
      .click();
    await expect(page.locator(".scene-layer")).toHaveAttribute(
      "data-scene",
      scene,
      { timeout: 15000 },
    );
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await page.getByRole("button", { name: "Walk to exit" }).click();
    await expect(page.locator(".scene-layer")).toHaveAttribute(
      "data-scene",
      "town",
    );
  }
  await expect(page.getByText("4 / 4 places explored")).toBeVisible();
});

test("keyboard movement faces direction and stops at scenery", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Map", exact: true }).click();
  await page.getByRole("button", { name: "Walk to The Workshop" }).click();
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "workshop",
    { timeout: 10000 },
  );
  await page.getByRole("button", { name: "Leave room" }).click();
  await expect(
    page.getByRole("button", { name: "Move up", exact: true }),
  ).toBeEnabled();
  const world = page.getByRole("group", { name: /^Town map/ });
  await world.focus();
  await page.keyboard.down("ArrowDown");
  await page.waitForTimeout(100);
  await page.keyboard.up("ArrowDown");
  await page.keyboard.down("ArrowRight");
  await page.waitForTimeout(700);
  await page.keyboard.up("ArrowRight");
  await expect(page.locator(".player")).toHaveAttribute(
    "data-direction",
    "right",
  );
  const x = await page
    .locator(".player")
    .evaluate((el) => parseFloat((el as HTMLElement).style.left));
  expect(x).toBeGreaterThan(220);
  expect(x).toBeLessThanOrEqual(236);
  await page.keyboard.press("Enter");
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "workshop",
  );
});

test("mobile content fits and every shortcut works", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    320,
  );
  for (const name of ["About & skills", "Experience", "Contact"]) {
    await page
      .getByRole("navigation", { name: "Quick access" })
      .getByRole("button", { name })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(
      await page
        .getByRole("dialog")
        .evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBeTruthy();
    await page
      .getByRole("button", { name: "Close details", exact: true })
      .click();
  }
});

test("reduced motion skips automatic walking and scene animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Walk to The Post Office" }).click();
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "post",
    { timeout: 1500 },
  );
  await expect(page.locator(".scene-layer")).toHaveCSS(
    "animation-name",
    "none",
  );
  await page
    .getByRole("button", { name: "Inspect Contact", exact: true })
    .click();
  await expect(
    page.getByRole("link", { name: /jackwinter.10@outlook.com/ }),
  ).toHaveAttribute("href", "mailto:jackwinter.10@outlook.com");
});

test("controls wait for scripts before accepting a visit", async ({ page }) => {
  let releaseScripts!: () => void;
  const scriptsReady = new Promise<void>((resolve) => {
    releaseScripts = resolve;
  });
  await page.route("**/*", async (route) => {
    if (route.request().resourceType() === "script") await scriptsReady;
    await route.continue();
  });
  await page.goto("/", { waitUntil: "commit" });
  const projects = page
    .getByRole("navigation", { name: "Quick access" })
    .getByRole("button", { name: "Projects" });
  try {
    await expect(projects).toBeVisible();
    await expect(projects).toBeDisabled();
  } finally {
    releaseScripts();
  }
  await projects.click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("workshop objects open their demos and preserve the room", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Map", exact: true }).click();
  await page.getByRole("button", { name: "Walk to The Workshop" }).click();
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "workshop",
    { timeout: 10000 },
  );
  await page.getByRole("button", { name: "Map", exact: true }).click();
  await page
    .getByRole("button", { name: "Inspect brain-cache", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });
  await expect(page.locator("#project-detail h3")).toHaveText("brain-cache");
  await page.getByRole("searchbox", { name: "Find code" }).fill("budget");
  await expect(page.getByText("1 match", { exact: true })).toBeVisible();
  await expect(page.locator(".demo-results summary")).toHaveText(
    "src/services/tokenCounter.ts",
  );
  await page
    .getByRole("searchbox", { name: "Find code" })
    .fill("nothing-matches");
  await expect(page.getByText(/No matching snippets/)).toBeVisible();
  await page.getByRole("button", { name: /NO. 001 WinterBot/ }).click();
  await page.getByText("Palette workbench", { exact: true }).click();
  await page.getByRole("button", { name: "Night", exact: true }).click();
  await expect(
    page.getByRole("img", { name: "Night house preview" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /NO. 003 pancake-stack/ }).click();
  await page.getByRole("button", { name: "Feature", exact: true }).click();
  await expect(page.getByRole("button", { name: /Scope/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "workshop",
  );
  await page.getByRole("group", { name: /Workshop room/ }).focus();
  await page.keyboard.press("Escape");
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "town",
  );
});

test("mobile movement follows the player without shrinking the map", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const camera = page.locator(".camera-layer");
  const before = await camera.getAttribute("style");
  const right = page.getByRole("button", { name: "Move right", exact: true });
  await expect(right).toBeEnabled();
  await right.hover();
  await page.mouse.down();
  await page.waitForTimeout(220);
  await page.mouse.up();
  await expect(camera).not.toHaveAttribute("style", before!);
  await expect(page.locator(".player")).toHaveAttribute(
    "data-direction",
    "right",
  );
  const player = await page.locator(".player").boundingBox(),
    world = await page.locator(".world").boundingBox();
  expect(player!.width).toBeGreaterThanOrEqual(24);
  expect(player!.x).toBeGreaterThan(world!.x);
  expect(player!.x + player!.width).toBeLessThan(world!.x + world!.width);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
  const prior = await page
    .locator(".player")
    .evaluate((el) => parseFloat((el as HTMLElement).style.left));
  await page.getByRole("button", { name: "Move left", exact: true }).focus();
  await page.keyboard.press("Space");
  const after = await page
    .locator(".player")
    .evaluate((el) => parseFloat((el as HTMLElement).style.left));
  expect(after).toBeCloseTo(prior - 10, 4);
});

test("keyboard focus reveals map signs without scrolling the camera container", async ({
  page,
  browserName,
}) => {
  // macOS WebKit uses Option+Tab to include buttons in keyboard navigation.
  const tab =
    browserName === "webkit" && process.platform === "darwin"
      ? "Alt+Tab"
      : "Tab";
  const backTab =
    browserName === "webkit" && process.platform === "darwin"
      ? "Alt+Shift+Tab"
      : "Shift+Tab";
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Move up", exact: true }),
  ).toBeEnabled();
  const world = page.getByRole("group", { name: /^Town map/ });
  await world.focus();
  await page.keyboard.press(tab);
  await expect(
    page.getByRole("button", { name: "Follow player", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  const sign = page.getByRole("button", { name: "Walk to The Workshop" });
  await expect(sign).toBeFocused();
  await expect
    .poll(async () => {
      const box = await sign.boundingBox(),
        bounds = await world.boundingBox();
      return (
        box!.x >= bounds!.x &&
        box!.y >= bounds!.y &&
        box!.x + box!.width <= bounds!.x + bounds!.width
      );
    })
    .toBe(true);
  expect(await world.evaluate((el) => [el.scrollLeft, el.scrollTop])).toEqual([
    0, 0,
  ]);
  await page.keyboard.press("Enter");
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "workshop",
    { timeout: 10000 },
  );
  await page.getByRole("group", { name: /Workshop room/ }).focus();
  await page.keyboard.down("ArrowUp");
  await page.waitForTimeout(1300);
  await page.keyboard.up("ArrowUp");
  await page.getByRole("button", { name: "Move up", exact: true }).focus();
  await page.keyboard.press(backTab);
  await expect(
    page.getByRole("button", { name: /^Travel log:/ }),
  ).toBeFocused();
  await page.keyboard.press(backTab);
  await expect(
    page.getByRole("button", { name: "Walk to exit" }),
  ).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Follow player", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("ground taps walk, blocked taps explain, and travel can be cancelled", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = window.requestAnimationFrame.bind(window);
    let first = true;
    window.requestAnimationFrame = (callback) =>
      original((time) => {
        const inject = first && !!document.querySelector(".walk-route");
        if (inject) {
          first = false;
          (
            window as unknown as { injectedEarlyFrame: boolean }
          ).injectedEarlyFrame = true;
        }
        callback(inject ? performance.now() - 100 : time);
      });
  });
  await page.goto("/");
  const map = page.getByRole("button", { name: "Map", exact: true });
  await map.click();
  const tap = async (x: number, y: number) => {
    const layer = await page.locator(".camera-layer").boundingBox();
    await page.mouse.click(
      layer!.x + (x * layer!.width) / 960,
      layer!.y + (y * layer!.height) / 640,
    );
  };
  await tap(600, 390);
  await expect(page.getByRole("button", { name: "Cancel walk" })).toBeVisible();
  await expect(page.locator(".player")).toHaveCSS("left", "600px", {
    timeout: 5000,
  });
  await expect(page.locator(".walk-route")).toHaveCount(0);
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { injectedEarlyFrame: boolean })
          .injectedEarlyFrame,
    ),
  ).toBe(true);
  await tap(360, 320);
  await expect(page.getByRole("status")).toHaveText("That spot is blocked.");
  await tap(480, 100);
  await page.getByRole("button", { name: "Cancel walk" }).click();
  const stopped = await page.locator(".player").getAttribute("style");
  await page.waitForTimeout(200);
  await expect(page.locator(".player")).toHaveAttribute("style", stopped!);
  await tap(210, 220);
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "workshop",
    { timeout: 10000 },
  );
});

test("held movement keys combine and release independently", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Move up", exact: true }),
  ).toBeEnabled();
  await page.getByRole("group", { name: /^Town map/ }).focus();
  await page.keyboard.down("ArrowUp");
  await page.keyboard.down("ArrowRight");
  await page.waitForTimeout(150);
  await page.keyboard.up("ArrowRight");
  const point = () =>
    page.locator(".player").evaluate((el) => ({
      x: parseFloat((el as HTMLElement).style.left),
      y: parseFloat((el as HTMLElement).style.top),
    }));
  const diagonal = await point();
  expect(diagonal.x).toBeGreaterThan(220);
  expect(diagonal.y).toBeLessThan(320);
  await page.waitForTimeout(100);
  await page.keyboard.up("ArrowUp");
  const after = await point();
  expect(after.x).toBe(diagonal.x);
  expect(after.y).toBeLessThan(diagonal.y);
});

test("movement sleeps when idle and stops when the page loses focus", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = window.requestAnimationFrame.bind(window);
    (window as unknown as { frameRequests: number }).frameRequests = 0;
    window.requestAnimationFrame = (callback) => {
      (window as unknown as { frameRequests: number }).frameRequests++;
      return original(callback);
    };
  });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Move up", exact: true }),
  ).toBeEnabled();
  const count = () =>
    page.evaluate(
      () => (window as unknown as { frameRequests: number }).frameRequests,
    );
  await page.waitForTimeout(150);
  const idle = await count();
  await page.waitForTimeout(200);
  expect(await count()).toBe(idle);
  await page.getByRole("group", { name: /^Town map/ }).focus();
  await page.keyboard.down("ArrowRight");
  await page.waitForTimeout(100);
  expect(await count()).toBeGreaterThan(idle);
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await page.keyboard.up("ArrowRight");
  await page.waitForTimeout(100);
  const stopped = await count();
  const position = await page.locator(".player").getAttribute("style");
  await page.waitForTimeout(200);
  expect(await count()).toBe(stopped);
  await expect(page.locator(".player")).toHaveAttribute("style", position!);
});

test("recorded code stays inside the mobile dialog", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto("/#projects/brain-cache");
  await page.getByRole("button", { name: "budget", exact: true }).click();
  const size = await page
    .getByRole("dialog")
    .evaluate((el) => ({ width: el.clientWidth, content: el.scrollWidth }));
  expect(size.content).toBeLessThanOrEqual(size.width);
  await expect(page.getByText("1 match", { exact: true })).toBeVisible();
});

test("sound is opt-in and can be muted", async ({ page }) => {
  await page.goto("/");
  await page.locator(".world-menu > summary").click();
  const sound = page.getByRole("button", { name: "Sound", exact: true });
  await expect(sound).toHaveAttribute("aria-pressed", "false");
  await sound.click();
  await expect(sound).toHaveAttribute("aria-pressed", "true");
  await sound.click();
  await expect(sound).toHaveAttribute("aria-pressed", "false");
});
