import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const inputVariants = cva(
  [
    "w-full font-sans text-base text-[var(--aomi-text)]",
    "placeholder:text-[var(--aomi-text-subtle)]",
    "bg-[var(--aomi-surface)] border border-[var(--aomi-border)]",
    "transition-[border-color,box-shadow] duration-base ease-standard",
    "outline-none focus-visible:border-[var(--aomi-primary)]",
    "focus-visible:ring-2 focus-visible:ring-[var(--aomi-ring)]/40",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-5 text-lg",
      },
      shape: {
        pill: "rounded-pill",
        rounded: "rounded-lg",
      },
      invalid: {
        true: "border-[var(--aomi-danger-500)] focus-visible:border-[var(--aomi-danger-500)] focus-visible:ring-[var(--aomi-danger-500)]/30",
        false: "",
      },
    },
    defaultVariants: { size: "md", shape: "pill", invalid: false },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, shape, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(inputVariants({ size, shape, invalid }), className)}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { inputVariants };
