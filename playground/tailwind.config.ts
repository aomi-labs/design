import type { Config } from "tailwindcss";
import aomi from "../src/tailwind/preset";

export default {
  presets: [aomi],
  // Scan the playground AND the design system source so component classes
  // (incl. custom utilities like rounded-pill, shadow-glass) are generated.
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../src/**/*.{ts,tsx}",
  ],
} satisfies Config;
