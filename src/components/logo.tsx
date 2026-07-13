import * as React from "react";
import { cn } from "../lib/utils";
import { Brandmark } from "./brandmark";

export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Mark height in px; the wordmark scales with it. Defaults to 32. */
  size?: number;
  /** Show the wordmark next to the mark. Defaults to true. */
  wordmark?: boolean;
  /** Wordmark text — e.g. "aomi" (product) or "aomi labs" (company). Defaults to "aomi". */
  text?: string;
  /** Accessible label for the lockup. Defaults to the wordmark text, title-cased. */
  title?: string;
}

/**
 * The Aomi logo lockup — the brand mark followed by the wordmark in
 * Source Serif 4 SemiBold (600). Both mark and word render in `currentColor`,
 * so the whole lockup inherits `text-*` and inverts with the theme.
 * Pass `text="aomi labs"` for the company signature; `wordmark={false}` for
 * the mark alone (or use `<Brandmark />` directly).
 * Load "Source Serif 4" (weight 600) at the app root — see `--aomi-font-wordmark`.
 */
export const Logo = React.forwardRef<HTMLSpanElement, LogoProps>(
  ({ size = 32, wordmark = true, text = "aomi", title, className, ...props }, ref) => (
    <span
      ref={ref}
      role="img"
      aria-label={title ?? (wordmark ? text : "Aomi")}
      className={cn("inline-flex items-center", className)}
      style={{ gap: `${size * 0.34}px` }}
      {...props}
    >
      <Brandmark size={size} className="shrink-0" aria-hidden />
      {wordmark ? (
        <span
          aria-hidden
          className="font-wordmark font-semibold leading-none tracking-tight"
          style={{ fontSize: `${size}px` }}
        >
          {text}
        </span>
      ) : null}
    </span>
  ),
);
Logo.displayName = "Logo";
