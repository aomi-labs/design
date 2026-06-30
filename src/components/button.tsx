import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Button — the signature Aomi control.
 *
 * Defaults to a fully-rounded "liquid glass" pill: soft translucent fill,
 * inner highlight, and a gentle lift on hover. Variants cover the common
 * action hierarchy; `glass` is the hero treatment used on the landing surface.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-sans font-medium select-none",
    "transition-[transform,background-color,box-shadow,color]",
    "duration-base ease-standard",
    "outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "focus-visible:ring-[var(--aomi-ring)] focus-visible:ring-offset-[var(--aomi-bg)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        // Near-black "ink" CTA — flat, the site's primary action.
        primary:
          "bg-[var(--aomi-primary)] text-[var(--aomi-text-on-brand)] hover:bg-[var(--aomi-primary-hover)] active:bg-[var(--aomi-primary-active)]",
        // Soft lilac chip with ink text.
        accent:
          "bg-[var(--aomi-accent)] text-[var(--aomi-text)] hover:bg-[var(--aomi-accent-hover)] active:bg-[var(--aomi-accent-active)]",
        glass:
          "border border-[var(--aomi-glass-border)] bg-[var(--aomi-glass-bg)] text-[var(--aomi-text)] backdrop-blur-glass shadow-glass hover:-translate-y-px",
        outline:
          "border border-[var(--aomi-border-strong)] bg-transparent text-[var(--aomi-text)] hover:bg-[var(--aomi-bg-subtle)]",
        ghost:
          "bg-transparent text-[var(--aomi-text)] hover:bg-[var(--aomi-bg-subtle)]",
        // Dashed wallet-connect affordance.
        connect:
          "border border-dashed border-[var(--aomi-border-strong)] bg-[var(--aomi-bg-subtle)] text-[var(--aomi-text-muted)] hover:text-[var(--aomi-text)] hover:border-[var(--aomi-text-muted)]",
        danger:
          "bg-[var(--aomi-danger-500)] text-white hover:brightness-110 active:brightness-95",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-5 text-base",
        lg: "h-12 px-7 text-lg",
        icon: "h-10 w-10 p-0",
      },
      shape: {
        pill: "rounded-pill",
        rounded: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "pill",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show a spinner and disable interaction. */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, shape, loading, disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-pill border-2 border-current border-r-transparent"
          />
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
