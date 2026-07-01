import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function PremiumEmptyState({ icon, title, description, actions, className }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-dashed border-border bg-surface/30 p-10 text-center",
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
      animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {icon ? (
        <motion.div
          className="mx-auto grid size-12 place-items-center rounded-full bg-accent/60"
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
      ) : null}
      <h2 className="mt-4 text-h2 text-foreground">{title}</h2>
      {description ? <p className="mt-2 text-[14px] text-muted-foreground">{description}</p> : null}
      {actions ? <div className="mt-6 flex flex-wrap justify-center gap-2">{actions}</div> : null}
    </motion.div>
  );
}
