import { test, expect, type Page } from "@playwright/test";

type Registered = {
  name: string;
  annotations: { readOnlyHint: boolean };
  execute: (input?: object) => Promise<string>;
};
declare global {
  interface Window {
    registeredTools: Registered[];
    pendingCall: Promise<string>;
  }
}

async function provideModelContext(page: Page) {
  await page.addInitScript(() => {
    window.registeredTools = [];
    Object.defineProperty(document, "modelContext", {
      value: {
        registerTool: async (
          tool: Registered,
          options: { signal: AbortSignal },
        ) => {
          if (window.registeredTools.some((t) => t.name === tool.name))
            throw new DOMException("duplicate", "InvalidStateError");
          window.registeredTools.push(tool);
          options.signal.addEventListener("abort", () => {
            window.registeredTools = window.registeredTools.filter(
              (t) => t !== tool,
            );
          });
        },
      },
    });
  });
}

async function openTown(page: Page) {
  await page.goto("/");
  await expect
    .poll(() => page.evaluate(() => window.registeredTools.length))
    .toBe(5);
}

const call = (page: Page, name: string, input?: object) =>
  page.evaluate(
    ([name, input]) =>
      window.registeredTools
        .find((tool) => tool.name === name)!
        .execute(input as object | undefined),
    [name, input] as const,
  );

const playerPosition = (page: Page) =>
  page.locator(".player").evaluate((element) => {
    const { left, top } = (element as HTMLElement).style;
    return { x: parseFloat(left), y: parseFloat(top) };
  });

test("an agent walks the town, reads a project and leaves", async ({
  page,
}) => {
  test.setTimeout(60000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await provideModelContext(page);
  await openTown(page);
  expect(
    await page.evaluate(() =>
      window.registeredTools.map((tool) => [
        tool.name,
        tool.annotations.readOnlyHint,
      ]),
    ),
  ).toEqual([
    ["look_around", true],
    ["walk_to", false],
    ["enter_building", false],
    ["read", false],
    ["leave_building", false],
  ]);

  expect(await call(page, "look_around")).toContain(
    "You are standing at the door of The Workshop.",
  );
  const start = await playerPosition(page);

  await page.evaluate(() => {
    window.pendingCall = window.registeredTools
      .find((tool) => tool.name === "walk_to")!
      .execute({ place: "home" });
  });
  await expect(page.locator(".walk-route")).toBeVisible();
  await expect
    .poll(async () => (await playerPosition(page)).x)
    .toBeGreaterThan(start.x + 40);
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "town",
  );
  expect(await page.evaluate(() => window.pendingCall)).toContain(
    "You are standing at the door of Jack’s House.",
  );
  expect(await playerPosition(page)).toEqual({ x: 660, y: 280 });
  await expect(page.locator(".walk-route")).toHaveCount(0);

  expect(await call(page, "enter_building")).toContain(
    "You are inside Jack’s House.",
  );
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "home",
  );
  expect(await call(page, "leave_building")).toContain(
    "You are standing at the door of Jack’s House.",
  );

  expect(await call(page, "enter_building", { place: "workshop" })).toContain(
    "You step inside The Workshop.",
  );
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "workshop",
  );

  const reading = await call(page, "read", { project: "brain-cache" });
  expect(reading).toMatch(/^## brain-cache\n/);
  expect(reading).toContain(
    "Helps coding agents find relevant functions without reading entire files",
  );
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("#project-detail h3")).toHaveText("brain-cache");
  await expect(page).toHaveURL(/#projects\/brain-cache$/);
  expect(await playerPosition(page)).toEqual({ x: 480, y: 300 });
  expect(await call(page, "look_around")).toContain(
    "You are reading brain-cache.",
  );

  expect(await call(page, "leave_building")).toContain(
    "You are standing at the door of The Workshop.",
  );
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "town",
  );
  await expect(page.getByText("2 / 4 places explored")).toBeVisible();
  expect(errors).toEqual([]);
});

test("a person taking the controls interrupts the agent honestly", async ({
  page,
}) => {
  await provideModelContext(page);
  await openTown(page);
  await page.evaluate(() => {
    window.pendingCall = window.registeredTools
      .find((tool) => tool.name === "enter_building")!
      .execute({ place: "post" });
  });
  await expect(page.locator(".walk-route")).toBeVisible();
  await page.keyboard.press("Escape");
  const result = await page.evaluate(() => window.pendingCall);
  expect(result).toContain("You did not reach The Post Office");
  await expect(page.locator(".scene-layer")).toHaveAttribute(
    "data-scene",
    "town",
  );
});

test("with reduced motion the agent arrives without animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await provideModelContext(page);
  await openTown(page);
  expect(await call(page, "walk_to", { place: "post" })).toContain(
    "You are standing at the door of The Post Office.",
  );
  expect(await call(page, "enter_building")).toContain(
    "You step inside The Post Office.",
  );
  expect(await call(page, "read")).toContain("mailto:");
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(await call(page, "leave_building")).toContain(
    "You step back outside.",
  );
});

test("browsers without WebMCP get the town unchanged", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("button", { name: /^Walk to/ })).toHaveCount(4);
  await expect(
    page.getByRole("button", { name: "Move up", includeHidden: true }),
  ).toBeEnabled();
  expect(
    await page.evaluate(
      () => "modelContext" in document || "modelContext" in navigator,
    ),
  ).toBe(false);
  await expect(page.locator(".agent-panel")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("every building is served as markdown that matches the portfolio", async ({
  page,
  request,
}) => {
  const markdown: Record<string, string> = {};
  for (const place of ["workshop", "home", "station", "post"]) {
    const response = await request.get(`/places/${place}.md`);
    expect(response.status(), place).toBe(200);
    expect(response.headers()["content-type"], place).toContain(
      "text/markdown",
    );
    markdown[place] = await response.text();
  }
  await page.goto("/portfolio");
  const shown = (selector: string) =>
    page
      .locator(selector)
      .evaluateAll((elements) =>
        elements.map((element) =>
          (element.textContent ?? "").replace(/\s+/g, " ").trim(),
        ),
      );
  const sections: [string, string, number][] = [
    ["workshop", ".portfolio-project > h3, .project-highlights li", 9],
    ["home", "#about p, #skills h4, #skills strong", 8],
    ["station", ".place-career h3, .place-career h4, .place-career li li", 19],
  ];
  for (const [place, selector, count] of sections) {
    const texts = await shown(selector);
    expect(texts, place).toHaveLength(count);
    for (const text of texts) expect(markdown[place], place).toContain(text);
  }
  const contactLinks = await page
    .locator("#contact a")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));
  expect(contactLinks).toHaveLength(3);
  for (const href of contactLinks) expect(markdown.post).toContain(`(${href})`);
});

test("agents can discover the markdown and tools", async ({
  page,
  request,
}) => {
  const response = await request.get("/llms.txt");
  expect(response.status()).toBe(200);
  const index = await response.text();
  expect(index).toMatch(/^# Jack Winter — Winter Town\n/);
  for (const place of ["workshop", "home", "station", "post"])
    expect(index).toContain(
      `(https://winterbyte.vercel.app/places/${place}.md)`,
    );
  for (const tool of [
    "look_around",
    "walk_to",
    "enter_building",
    "read",
    "leave_building",
  ])
    expect(index).toContain(`- \`${tool}\`: `);
  await page.goto("/portfolio");
  await expect(page.getByRole("link", { name: "/llms.txt" })).toHaveAttribute(
    "href",
    "/llms.txt",
  );
});
