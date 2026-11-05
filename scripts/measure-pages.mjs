import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import process from "node:process";

const baseURL = process.env.AUDIT_URL || "http://localhost:4325";
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
});
const results = [];
try {
  for (const path of ["/", "/portfolio", "/work/kto"]) {
    for (let run = 1; run <= 3; run++) {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      const errors = [];
      page.on("requestfailed", (request) =>
        errors.push({
          url: request.url(),
          error: request.failure()?.errorText,
        }),
      );
      const cdp = await context.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 150,
        downloadThroughput: 200000,
        uploadThroughput: 93750,
      });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      await page.addInitScript(() => {
        globalThis.auditLcp = 0;
        new globalThis.PerformanceObserver((list) => {
          globalThis.auditLcp = list.getEntries().at(-1).startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
      });
      const response = await page.goto(baseURL + path, { waitUntil: "load" });
      if (!response?.ok()) throw new Error(`Failed navigation: ${path}`);
      if (path === "/")
        await page
          .getByRole("button", { name: "Open trainer card" })
          .waitFor({ state: "visible" });
      await page.waitForTimeout(3000);
      const metrics = await page.evaluate(() => ({
        fcpMs: Math.round(
          globalThis.performance.getEntriesByName("first-contentful-paint")[0]
            ?.startTime || 0,
        ),
        observedLcpMs: Math.round(globalThis.auditLcp),
        resourceTransferBytes: globalThis.performance
          .getEntriesByType("resource")
          .reduce((sum, entry) => sum + entry.transferSize, 0),
      }));
      results.push({ path, run, ...metrics, failedRequests: errors });
      process.stdout.write(`${path} run ${run}: ${JSON.stringify(metrics)}\n`);
      await context.close();
    }
  }
  await writeFile(
    process.env.AUDIT_OUTPUT || "/tmp/winter-performance.json",
    JSON.stringify(
      {
        browser: browser.version(),
        viewport: "390x844",
        cpuSlowdown: 4,
        latencyMs: 150,
        downloadBytesPerSecond: 200000,
        cache: "disabled; fresh browser context each run",
        observation:
          "LCP candidate observed 3 seconds after load; no interactions. Resource transfer excludes document and may omit cross-origin sizes without timing permission. Local production server; not field data or Lighthouse.",
        results,
      },
      null,
      2,
    ) + "\n",
  );
} finally {
  await browser.close();
}
