import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Badge / tag — the small pills used across the landing surface.
 *
 * `solid` is the near-black category chip (DEX, Cross-chain, Analytics),
 * `success` the green "Open access" status pill, and `eyebrow` the small
 * uppercase outline label (SOLUTION, APPS) that sits above section titles.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap font-sans font-medium leading-none",
  {
    variants: {
      variant: {
        solid: "bg-cool-950 text-cool-0",
        success: "bg-[var(--aomi-success-subtle)] text-success",
        // Sky-subtle meta label (Live, New) — the accent as a quiet chip.
        accent: "bg-[var(--aomi-accent-subtle)] text-info",
        // Decorative pink pop (Beta, marketing) — never a status color.
        pop: "bg-pink-100 text-pink-700",
        outline: "border border-landing-border bg-transparent text-landing-text",
        eyebrow:
          "border border-landing-border bg-transparent text-landing-muted uppercase tracking-wide",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px]",
        md: "px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: { variant: "solid", size: "sm" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("rounded-pill", badgeVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { badgeVariants };
