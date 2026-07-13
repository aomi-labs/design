import type { Config } from "tailwindcss";

/**
 * Aomi Tailwind preset.
 *
 * Spread this into the `presets` array of a consuming app's tailwind.config.
 * Color/role utilities resolve to CSS variables from `tokens.css`, so dark
 * mode and per-surface overrides work without rebuilding Tailwind.
 *
 *   // tailwind.config.ts
 *   import aomi from "@aomi-labs/design/tailwind";
 *   export default { presets: [aomi], content: [...] };
 *
 * and import the tokens once at your app root:
 *   import "@aomi-labs/design/tokens.css";
 */
const preset = {
  // Activate `dark:` utilities under either a `.dark` class or a
  // `[data-theme="dark"]` attribute — mirroring how tokens.css scopes the
  // dark CSS variables, so variant utilities and token overrides stay in sync.
  darkMode: ["variant", [".dark &", '[data-theme="dark"] &']],
  theme: {
    extend: {
      colors: {
        pink: {
          50: "var(--aomi-pink-50)",
          100: "var(--aomi-pink-100)",
          200: "var(--aomi-pink-200)",
          300: "var(--aomi-pink-300)",
          400: "var(--aomi-pink-400)",
          500: "var(--aomi-pink-500)",
          600: "var(--aomi-pink-600)",
          700: "var(--aomi-pink-700)",
          800: "var(--aomi-pink-800)",
          900: "var(--aomi-pink-900)",
          950: "var(--aomi-pink-950)",
        },
        lilac: {
          50: "var(--aomi-lilac-50)",
          100: "var(--aomi-lilac-100)",
          200: "var(--aomi-lilac-200)",
          300: "var(--aomi-lilac-300)",
          400: "var(--aomi-lilac-400)",
          500: "var(--aomi-lilac-500)",
        },
        sky: {
          50: "var(--aomi-sky-50)",
          100: "var(--aomi-sky-100)",
          200: "var(--aomi-sky-200)",
          300: "var(--aomi-sky-300)",
          400: "var(--aomi-sky-400)",
          500: "var(--aomi-sky-500)",
        },
        cool: {
          0: "var(--aomi-cool-0)",
          50: "var(--aomi-cool-50)",
          100: "var(--aomi-cool-100)",
          200: "var(--aomi-cool-200)",
          300: "var(--aomi-cool-300)",
          400: "var(--aomi-cool-400)",
          500: "var(--aomi-cool-500)",
          600: "var(--aomi-cool-600)",
          700: "var(--aomi-cool-700)",
          800: "var(--aomi-cool-800)",
          900: "var(--aomi-cool-900)",
          950: "var(--aomi-cool-950)",
        },
        // Semantic roles — prefer these in product code.
        bg: "var(--aomi-bg)",
        "bg-subtle": "var(--aomi-bg-subtle)",
        surface: "var(--aomi-surface)",
        "surface-raised": "var(--aomi-surface-raised)",
        ink: "var(--aomi-text)",
        "ink-muted": "var(--aomi-text-muted)",
        "ink-subtle": "var(--aomi-text-subtle)",
        border: "var(--aomi-border)",
        "border-strong": "var(--aomi-border-strong)",
        primary: {
          DEFAULT: "var(--aomi-primary)",
          hover: "var(--aomi-primary-hover)",
          active: "var(--aomi-primary-active)",
          subtle: "var(--aomi-primary-subtle)",
        },
        accent: {
          DEFAULT: "var(--aomi-accent)",
          hover: "var(--aomi-accent-hover)",
          active: "var(--aomi-accent-active)",
          subtle: "var(--aomi-accent-subtle)",
        },
        success: "var(--aomi-success-500)",
        warning: "var(--aomi-warning-500)",
        danger: "var(--aomi-danger-500)",
        info: "var(--aomi-info-500)",
        // Landing roles (match aomi.dev) — cool, flat. Near-black primary
        // uses the cool-950 ramp; semantic `ink` stays the text role above.
        "landing-bg": "var(--aomi-landing-bg)",
        "landing-text": "var(--aomi-landing-text)",
        "landing-muted": "var(--aomi-landing-muted)",
        "landing-border": "var(--aomi-landing-border)",
        "card-tinted": "var(--aomi-card-tinted)",
      },
      fontFamily: {
        display: "var(--aomi-font-display)",
        sans: "var(--aomi-font-sans)",
        mono: "var(--aomi-font-mono)",
        wordmark: "var(--aomi-font-wordmark)",
      },
      fontSize: {
        xs: "var(--aomi-text-xs)",
        sm: "var(--aomi-text-sm)",
        base: "var(--aomi-text-base)",
        lg: "var(--aomi-text-lg)",
        xl: "var(--aomi-text-xl)",
        "2xl": "var(--aomi-text-2xl)",
        "3xl": "var(--aomi-text-3xl)",
        "4xl": "var(--aomi-text-4xl)",
        "5xl": "var(--aomi-text-5xl)",
      },
      borderRadius: {
        sm: "var(--aomi-radius-sm)",
        md: "var(--aomi-radius-md)",
        lg: "var(--aomi-radius-lg)",
        xl: "var(--aomi-radius-xl)",
        "2xl": "var(--aomi-radius-2xl)",
        composer: "var(--aomi-radius-composer)",
        pill: "var(--aomi-radius-pill)",
      },
      boxShadow: {
        sm: "var(--aomi-shadow-sm)",
        md: "var(--aomi-shadow-md)",
        lg: "var(--aomi-shadow-lg)",
        glass: "var(--aomi-glass-shadow)",
      },
      ringColor: {
        DEFAULT: "var(--aomi-ring)",
      },
      transitionTimingFunction: {
        standard: "var(--aomi-ease-standard)",
        emphasized: "var(--aomi-ease-emphasized)",
      },
      transitionDuration: {
        fast: "var(--aomi-duration-fast)",
        base: "var(--aomi-duration-base)",
        slow: "var(--aomi-duration-slow)",
      },
      backdropBlur: {
        glass: "var(--aomi-glass-blur)",
      },
    },
  },
} satisfies Partial<Config>;

export default preset;
