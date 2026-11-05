import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { fileURLToPath, URL } from "node:url";
import process from "node:process";
import { profile } from "../src/components/town/profile.ts";
import { ktoCaseStudy } from "../src/data/ktoCaseStudy.ts";

const root = new URL("../", import.meta.url);
const portrait = (
  await readFile(new URL("public/profile.jpeg", root))
).toString("base64");
const town = (
  await readFile(new URL("public/previews/winter-town.png", root))
).toString("base64");
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
});
try {
  for (const kind of ["portfolio", "kto"]) {
    const caseStudy = kind === "kto";
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
    });
    await page.setContent(`<!doctype html><html><head><style>
      *{box-sizing:border-box} body{margin:0;background:#f5f6f1;color:#30372e;font-family:Arial,sans-serif}
      main{padding:54px 60px;height:630px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
      header{display:flex;gap:16px;align-items:center;font-size:18px;line-height:1.5}header img{width:64px;height:64px;border-radius:14px}
      header span{display:block;color:#626c5e;font-size:15px}h1{font-size:58px;line-height:1.08;letter-spacing:-2px;margin:24px 0;max-width:${caseStudy ? "1000" : "600"}px}
      .lead{font-size:23px;line-height:1.5;max-width:580px;margin:0}.town{position:absolute;width:430px;height:380px;object-fit:cover;right:0;top:168px;border-radius:20px 0 0 20px}
      .metrics{display:flex;gap:50px;margin:16px 0}.metric{max-width:220px}.metric strong{display:block;font-size:42px;color:#49613f;margin-bottom:10px}.metric span{font-size:17px;line-height:1.4}
      footer{font-size:15px;color:#626c5e;display:flex;justify-content:space-between}
    </style></head><body><main>
      <header><img src="data:image/jpeg;base64,${portrait}" alt=""><div>Jack Winter<span>${escape(profile.headline)}</span></div></header>
      <div><h1>${caseStudy ? escape(ktoCaseStudy.title) : "A portfolio worth exploring."}</h1>
      ${caseStudy ? `<div class="metrics">${[ktoCaseStudy.metrics[0], ktoCaseStudy.metrics[1], ktoCaseStudy.metrics[4]].map((m) => `<div class="metric"><strong>${escape(m.value)}</strong><span>${escape(m.label)}</span></div>`).join("")}</div>` : `<p class="lead">React, TypeScript and real-time interfaces.<br>Explore my work in Winter Town.</p><img class="town" src="data:image/png;base64,${town}" alt="">`}</div>
      <footer><span>${caseStudy ? "Results from performance testing · KTO case study" : "Projects · Experience · Open-source tools"}</span><span>winterbyte.vercel.app</span></footer>
    </main></body></html>`);
    await page.locator("header img").evaluate((img) => img.decode());
    if (!caseStudy) await page.locator(".town").evaluate((img) => img.decode());
    await page.screenshot({
      path: fileURLToPath(new URL(`public/${kind}-social.png`, root)),
    });
    await page.close();
  }
} finally {
  await browser.close();
}
