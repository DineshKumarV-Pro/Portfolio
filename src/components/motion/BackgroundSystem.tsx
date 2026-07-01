import { useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect } from "react";

/** Global ambient layers — aurora drift, parallax, scroll-linked opacity. */
export function BackgroundSystem() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  const auroraY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 48]);
  const gridOpacity = useTransform(scrollY, [0, 400, 1200], [0.55, 0.35, 0.15]);
  const bloomScale = useTransform(scrollY, [0, 600], [1, reduce ? 1 : 1.08]);

  if (reduce) {
    return (
      <>
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-aurora" />
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-noise" />
      </>
    );
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-aurora animate-aurora-drift"
        style={{ y: auroraY, scale: bloomScale }}
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-noise" />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-dot-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]"
        style={{ opacity: gridOpacity }}
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-vignette" />
      {/* Floating orbs */}
      <div
        aria-hidden
        className="pointer-events-none fixed -z-10 size-[420px] rounded-full bg-[var(--brand)]/6 blur-[100px] animate-orb-1"
        style={{ top: "12%", left: "-8%" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -z-10 size-[320px] rounded-full bg-[var(--brand)]/4 blur-[80px] animate-orb-2"
        style={{ top: "55%", right: "-6%" }}
      />
    </>
  );
}

/** Restores scroll to top on route change unless hash present. */
export function ScrollRestoration() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
