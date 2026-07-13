#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

function usage() {
  console.log(`Usage:
  capture-stills.mjs <animation.html> --times 0,2.5,7 --out <directory>

Options:
  --selector <css>  Capture target (default: #stage)
  --width <px>      Capture width (default: 1200)
  --height <px>     Capture height (default: 675)`);
}

function parseArgs(argv) {
  const options = { selector: "#stage", width: 1200, height: 675 };
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith("--")) {
      positional.push(value);
      continue;
    }
    const key = value.slice(2);
    if (!["times", "out", "selector", "width", "height"].includes(key)) {
      throw new Error(`Unknown option: ${value}`);
    }
    options[key] = argv[++index];
  }
  options.input = positional[0];
  return options;
}

function loadPlaywright() {
  const loaders = [createRequire(path.join(process.cwd(), "package.json")), createRequire(import.meta.url)];
  for (const require of loaders) {
    try {
      return require("playwright");
    } catch {}
  }
  throw new Error("Playwright is required. Install it in the active project with `npm install -D playwright`.");
}

async function launchBrowser(chromium) {
  try {
    return await chromium.launch({ headless: true });
  } catch (bundledError) {
    try {
      return await chromium.launch({ channel: "chrome", headless: true });
    } catch {
      throw bundledError;
    }
  }
}

async function settle(page, seconds) {
  await page.evaluate(async (time) => {
    document.documentElement.dataset.capture = "true";
    const api = window.__AOMI_VIDEO__;
    api?.pause?.();
    if (api?.seek) api.seek(time);
    else if (typeof window.__seek === "function") window.__seek(time);
    else throw new Error("Missing window.__AOMI_VIDEO__.seek() or window.__seek().");
    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }, seconds);
}

async function sizeTarget(target, width, height) {
  await target.evaluate((element, size) => {
    element.style.width = `${size.width}px`;
    element.style.height = `${size.height}px`;
    element.style.maxWidth = "none";
    element.style.aspectRatio = "auto";
    window.dispatchEvent(new Event("resize"));
  }, { width, height });
}

async function capture(page, target, file, width, height) {
  const box = await target.boundingBox();
  if (!box) throw new Error("Capture target is not visible.");
  await page.screenshot({
    path: file,
    animations: "disabled",
    clip: { x: box.x, y: box.y, width, height }
  });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options.input || !options.times || !options.out) {
    usage();
    process.exitCode = 2;
    return;
  }

  const input = path.resolve(options.input);
  if (!fs.existsSync(input)) throw new Error(`Input not found: ${input}`);
  const times = options.times.split(",").map(Number);
  if (times.some((time) => !Number.isFinite(time) || time < 0)) {
    throw new Error("--times must be a comma-separated list of non-negative seconds.");
  }

  const output = path.resolve(options.out);
  const width = Number(options.width);
  const height = Number(options.height);
  if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0) {
    throw new Error("--width and --height must be greater than zero.");
  }
  fs.mkdirSync(output, { recursive: true });
  const { chromium } = loadPlaywright();
  const browser = await launchBrowser(chromium);
  try {
    const page = await browser.newPage({
      viewport: { width: Math.max(800, width + 200), height: Math.max(600, height + 300) },
      deviceScaleFactor: 1
    });
    await page.goto(pathToFileURL(input).href, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => window.__AOMI_VIDEO_READY__ === true || document.readyState === "complete");
    const target = page.locator(options.selector);
    if ((await target.count()) === 0) throw new Error(`Capture selector not found: ${options.selector}`);
    await sizeTarget(target, width, height);

    for (const time of times) {
      await settle(page, time);
      const name = `still-${time.toFixed(3).replace(".", "-")}s.png`;
      await capture(page, target, path.join(output, name), width, height);
      console.log(`${time.toFixed(3)}s -> ${path.join(output, name)}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
