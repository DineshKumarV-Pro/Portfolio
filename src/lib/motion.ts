/** Shared motion tokens — GPU-friendly, reduced-motion aware at call sites. */
export const EASE = [0.22, 0.61, 0.36, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_SPRING = { type: "spring" as const, stiffness: 380, damping: 32 };

export const STAGGER = 0.04;
export const SPRING = {
  default: { type: "spring" as const, stiffness: 380, damping: 32 },
  gentle: { type: "spring" as const, stiffness: 280, damping: 28 },
  bouncy: { type: "spring" as const, stiffness: 420, damping: 22 },
} as const;

export const DURATION = {
  fast: 0.18,
  base: 0.45,
  slow: 0.65,
  page: 0.42,
} as const;

export const pageTransition = {
  initial: { opacity: 0, y: 14, scale: 0.992, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: DURATION.page, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.996,
    filter: "blur(4px)",
    transition: { duration: 0.28, ease: EASE },
  },
};

export const sectionVariants = {
  fade: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  },
  slide: {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
  },
  blur: {
    hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE },
    },
  },
} as const;

export type SectionVariant = keyof typeof sectionVariants;

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
