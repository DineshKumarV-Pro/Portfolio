import { motion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const glow = useTransform(scrollVelocity, (v) => Math.min(Math.abs(v) * 120, 1));
  const boxShadow = useTransform(
    glow,
    (g) => `0 0 ${8 + g * 12}px oklch(from var(--brand) l c h / ${0.25 + g * 0.35})`,
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[var(--brand)] via-[var(--brand)] to-[var(--brand-hover)]"
        style={{
          scaleX,
          boxShadow,
        }}
      />
    </div>
  );
}
