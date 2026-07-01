import { type ReactNode, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useIsTouch } from "@/hooks/use-is-touch";

/** Cursor-following spotlight and animated grid for hero sections. */
export function HeroAmbient({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const touch = useIsTouch();
  const ref = useRef<HTMLElement>(null);
  const disabled = reduce || touch;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      onPointerMove={
        disabled
          ? undefined
          : (e) => {
              const el = ref.current;
              if (!el) return;
              const rect = el.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              el.style.setProperty("--hx", `${x}%`);
              el.style.setProperty("--hy", `${y}%`);
              const spot = el.querySelector(".hero-spotlight-target") as HTMLElement | null;
              if (spot) spot.style.opacity = "1";
            }
      }
      onPointerLeave={
        disabled
          ? undefined
          : () => {
              const el = ref.current;
              if (!el) return;
              const spot = el.querySelector(".hero-spotlight-target") as HTMLElement | null;
              if (spot) spot.style.opacity = "0";
            }
      }
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-spotlight" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
      />
      {!disabled ? <CursorSpotlight /> : null}
      {!reduce ? <AnimatedGrid /> : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent"
      />
      {children}
    </section>
  );
}

function CursorSpotlight() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hero-spotlight-target"
      style={{
        background:
          "radial-gradient(480px circle at var(--hx, 50%) var(--hy, 40%), oklch(from var(--brand) l c h / 0.12), transparent 65%)",
      }}
    />
  );
}

function AnimatedGrid() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      animate={{ backgroundPosition: ["0px 0px", "56px 56px"] }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    />
  );
}
