#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

function usage() {
  console.log(`Usage:
  render-frames.mjs <animation.html> --out <directory> [--duration 24] [--fps 30]

Options:
  --duration <s>    Read from window.__AOMI_VIDEO__.duration when omitted
  --fps <n>         Frames per second (default: 30)
  --selector <css>  Capture target (default: #stage)
  --width <px>      Capture width (default: 1920)
  --height <px>     Capture height (default: 1080)`);
}

function parseArgs(argv) {
  const options = { fps: 30, selector: "#stage", width: 1920, height: 1080 };
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith("--")) {
      positional.push(value);
      continue;
    }
    const key = value.slice(2);
    if (!["out", "duration", "fps", "selector", "width", "height"].includes(key)) {
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

async function paint(page, seconds) {
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
  if (!options.input || !options.out) {
    usage();
    process.exitCode = 2;
    return;
  }

  const input = path.resolve(options.input);
  if (!fs.existsSync(input)) throw new Error(`Input not found: ${input}`);
  const fps = Number(options.fps);
  if (!Number.isFinite(fps) || fps <= 0) throw new Error("--fps must be greater than zero.");
  const width = Number(options.width);
  const height = Number(options.height);
  if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0) {
    throw new Error("--width and --height must be greater than zero.");
  }

  const output = path.resolve(options.out);
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

    const duration = options.duration
      ? Number(options.duration)
      : await page.evaluate(() => Number(window.__AOMI_VIDEO__?.duration));
    if (!Number.isFinite(duration) || duration <= 0) {
      throw new Error("Provide --duration or expose window.__AOMI_VIDEO__.duration.");
    }

    const target = page.locator(options.selector);
    if ((await target.count()) === 0) throw new Error(`Capture selector not found: ${options.selector}`);
    await sizeTarget(target, width, height);
    const frameCount = Math.ceil(duration * fps);
    const digits = Math.max(6, String(frameCount - 1).length);
    console.log(`Rendering ${frameCount} frames at ${fps} fps (${duration}s).`);

    for (let frame = 0; frame < frameCount; frame += 1) {
      await paint(page, frame / fps);
      const name = `frame-${String(frame).padStart(digits, "0")}.png`;
      await capture(page, target, path.join(output, name), width, height);
      if (frame % Math.max(1, Math.round(fps)) === 0 || frame === frameCount - 1) {
        console.log(`${frame + 1}/${frameCount}`);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
