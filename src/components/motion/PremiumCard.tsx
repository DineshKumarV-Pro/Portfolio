import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePointerPosition } from "@/hooks/use-pointer-position";
import { useIsTouch } from "@/hooks/use-is-touch";
import { cn } from "@/lib/utils";

type PremiumCardProps = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  spotlight?: boolean;
  sweep?: boolean;
};

export function PremiumCard({
  children,
  className,
  tilt = true,
  spotlight = true,
  sweep = true,
}: PremiumCardProps) {
  const reduce = useReducedMotion();
  const touch = useIsTouch();
  const { ref, onMove, onLeave } = usePointerPosition<HTMLDivElement>();
  const classes = cn(
    "premium-card group/pcard",
    spotlight && "card-spotlight",
    sweep && "card-sweep",
    className,
  );

  if (reduce || touch) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={classes}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={
        tilt
          ? {
              y: -3,
              rotateX: 1.2,
              rotateY: -1.2,
              transition: { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] },
            }
          : { y: -3 }
      }
      style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
