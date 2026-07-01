import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent";
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-mono-label",
        tone === "default" &&
          "border-[var(--border-strong)] bg-surface/60 text-muted-foreground backdrop-blur-sm",
        tone === "accent" && "border-[var(--brand)]/30 bg-[var(--brand-soft)] text-[var(--brand)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  size = "lg",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  size?: "md" | "lg" | "xl";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "text-balance-tight text-foreground",
          size === "md" && "text-h1",
          size === "lg" && "text-display-lg",
          size === "xl" && "text-display-xl",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-[58ch] text-balance-pretty text-muted-foreground text-lede",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
