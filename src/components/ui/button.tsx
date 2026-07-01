import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap select-none overflow-hidden",
    "rounded-md font-medium tracking-[-0.005em] cursor-pointer",
    "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out",
    "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-ring)]",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "btn-press btn-ripple",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-foreground/90 hover:shadow-[0_0_20px_-4px_oklch(from_var(--foreground)_l_c_h_/_0.25)]",
        primary:
          "bg-[var(--brand)] text-[var(--brand-foreground)] hover:bg-[var(--brand-hover)] hover:shadow-[0_0_24px_-4px_var(--brand-soft)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
        outline:
          "border border-[var(--border-strong)] bg-transparent text-foreground hover:border-foreground/40 hover:bg-accent/40",
        ghost: "text-foreground hover:bg-accent",
        link: "text-foreground underline-offset-4 hover:underline px-0 h-auto rounded-none",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        subtle:
          "bg-[var(--brand-soft)] text-[var(--brand)] hover:bg-[var(--brand-soft)] hover:brightness-110",
      },
      size: {
        default: "h-10 px-4 text-sm [&_svg]:size-4",
        sm: "h-8 px-3 text-[13px] [&_svg]:size-3.5",
        lg: "h-11 px-5 text-[15px] [&_svg]:size-4",
        xl: "h-12 px-6 text-base [&_svg]:size-4",
        icon: "h-10 w-10 [&_svg]:size-4",
        "icon-sm": "h-8 w-8 [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "pointer-events-none",
          "group/btn [&_svg:not([class*='animate-'])]:transition-transform [&_svg:not([class*='animate-'])]:duration-300 group-hover/btn:[&_svg:not([class*='animate-'])]:translate-x-0.5",
        )}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-cursor="pointer"
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            <span className="sr-only">Loading</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
