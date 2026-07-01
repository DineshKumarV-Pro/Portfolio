import { type ReactNode, useRef, useEffect } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import { sectionVariants, type SectionVariant, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SectionEntrance({
  children,
  variant = "fade",
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  variant?: SectionVariant;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Tag = motion[as] as typeof motion.div;

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const v = sectionVariants[variant];

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: v.hidden,
        show: {
          ...v.show,
          transition: { ...(v.show.transition as object), delay },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/** Headline with word-by-word reveal */
export function HeadlineReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("inline", className)} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: EASE }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

/** Animated number counter */
export function AnimatedCounter({
  value,
  suffix = "",
  className,
  duration = 1.2,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const display = useRef(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      display.current = Math.round(value * eased);
      if (ref.current) ref.current.textContent = `${display.current}${suffix}`;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {reduce || !inView ? `${value}${suffix}` : `0${suffix}`}
    </span>
  );
}
