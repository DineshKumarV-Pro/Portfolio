import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE, sectionVariants, type SectionVariant } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  y = 12,
  blur = false,
  duration = 0.55,
  className,
  as = "div",
  variant,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  duration?: number;
  className?: string;
  as?: "div" | "span" | "section" | "li";
  variant?: SectionVariant;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduce) {
    const StaticTag = as as "div";
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  if (variant) {
    const v = sectionVariants[variant];
    return (
      <Tag
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: v.hidden,
          show: {
            ...v.show,
            transition: { ...(v.show.transition as object), delay },
          },
        }}
        className={className}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      initial={{
        opacity: 0,
        y,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Staggers immediate children with a uniform reveal pattern.
 * Each direct child is wrapped in a motion.div — keep simple inline content.
 */
export function RevealStagger({
  children,
  className,
  childClassName,
  delay = 0,
  stagger = 0.08,
  y = 12,
  blur = false,
}: {
  children: ReactNode;
  className?: string;
  childClassName?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  blur?: boolean;
}) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          className={childClassName}
          variants={{
            hidden: {
              opacity: 0,
              y,
              filter: blur ? "blur(8px)" : "blur(0px)",
            },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: EASE },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
