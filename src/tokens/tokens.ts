/**
 * Typed mirror of the design tokens defined in `tokens.css`.
 *
 * Use these when you need token values in JS/TS (charts, canvas, inline
 * styles, animation libs). For anything rendered with CSS or Tailwind,
 * prefer the CSS custom properties / Tailwind classes so runtime theming
 * keeps working.
 */

export const colors = {
  pink: {
    50: "#fdf3f5",
    100: "#fce7eb",
    200: "#f9d0d7",
    300: "#f5b3bf",
    400: "#f18fa1",
    500: "#ec6c83",
    600: "#d26175",
    700: "#b35465",
    800: "#904653",
    900: "#6d3741",
    950: "#4e2a31",
  },
  purple: {
    50: "#f0f3f8",
    100: "#e1e7f2",
    200: "#c2d0e4",
    300: "#9cb3d4",
    400: "#6f8fc0",
    500: "#416cac",
    600: "#3b6199",
    700: "#355484",
    800: "#2d466b",
    900: "#253752",
    950: "#1e2a3c",
  },
  neutral: {
    0: "#ffffff",
    50: "#fcf7f6",
    100: "#f5efed",
    200: "#e9e1df",
    300: "#d5cbc8",
    400: "#a99f9c",
    500: "#7c7370",
    600: "#5b5350",
    700: "#423b39",
    800: "#2a2523",
    900: "#1a1614",
    950: "#100d0c",
  },
  status: {
    success: "#2e9e6b",
    warning: "#d9982b",
    danger: "#d2495b",
    info: "#416cac",
  },
} as const;

export const fonts = {
  display: '"PT Serif", ui-serif, Georgia, Cambria, serif',
  sans: '"Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  mono: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
} as const;

export const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.5rem",
  "5xl": "3.25rem",
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
} as const;

export const radii = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  pill: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 2px rgba(26, 22, 20, 0.06)",
  md: "0 4px 16px rgba(26, 22, 20, 0.08)",
  lg: "0 12px 40px rgba(26, 22, 20, 0.12)",
  glass:
    "inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 6px 24px rgba(26, 22, 20, 0.12)",
} as const;

export const motion = {
  duration: { fast: "120ms", base: "200ms", slow: "320ms" },
  ease: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    emphasized: "cubic-bezier(0.3, 0, 0, 1.2)",
  },
} as const;

export const tokens = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  spacing,
  radii,
  shadows,
  motion,
} as const;

export type Tokens = typeof tokens;
