import { type ReactNode } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { useIsTouch } from "@/hooks/use-is-touch";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Wraps children with subtle magnetic pull on desktop. */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const touch = useIsTouch();
  const reduce = useReducedMotion();

  if (touch || reduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <MagneticInner className={className} strength={strength}>
      {children}
    </MagneticInner>
  );
}

function MagneticInner({
  children,
  className,
  strength,
}: {
  children: ReactNode;
  className?: string;
  strength: number;
}) {
  const { ref, onMove, onLeave } = useMagnetic<HTMLSpanElement>(strength);

  return (
    <span
      ref={ref}
      className={cn("inline-flex transition-transform duration-200 ease-out", className)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </span>
  );
}

export { InteractiveCursor } from "./InteractiveCursor";
