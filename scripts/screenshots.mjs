// Renders every route at 390 and 1280 wide and fails on console errors.
// Run: pnpm screenshots (expects the site on http://localhost:3000, or set BASE_URL).
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const routes = ["/", "/hire", "/hire/white-folding-chair", "/occasions", "/about", "/contact", "/does-not-exist"];
const widths = [390, 1280];
const outDir = path.resolve(import.meta.dirname, "..", "screenshots");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const failures = [];

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width < 600 ? 844 : 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  for (const route of routes) {
    const errors = [];
    const onConsole = (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    };
    const onError = (err) => errors.push(err.message);
    page.on("console", onConsole);
    page.on("pageerror", onError);
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    const name = `${route === "/" ? "home" : route.slice(1).replaceAll("/", "_")}-${width}.png`;
    await page.screenshot({ path: path.join(outDir, name), fullPage: true });
    page.off("console", onConsole);
    page.off("pageerror", onError);
    const expected404 = route === "/does-not-exist";
    const relevant = errors.filter((e) => !(expected404 && /404/.test(e)));
    if (relevant.length) failures.push({ route, width, errors: relevant });
    console.log(`${relevant.length ? "FAIL" : "ok  "} ${route} @ ${width}`);
  }
  await context.close();
}
await browser.close();

if (failures.length) {
  console.error("\nConsole errors:");
  for (const f of failures) console.error(`${f.route} @ ${f.width}\n  ${f.errors.join("\n  ")}`);
  process.exit(1);
}
console.log(`\nScreenshots written to ${outDir}`);
