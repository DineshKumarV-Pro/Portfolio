import { useEffect, useState } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { useIsTouch } from "@/hooks/use-is-touch";
import { cn } from "@/lib/utils";

type CursorState = "default" | "pointer" | "text" | "media";

export function InteractiveCursor() {
  const touch = useIsTouch();
  const reduce = useReducedMotion();
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const spring = { stiffness: 520, damping: 38, mass: 0.6 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const scale = useSpring(1, spring);

  useEffect(() => {
    if (touch || reduce) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const detect = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, summary, label, [data-cursor='pointer']",
      );
      const media = target.closest("img, video, [data-cursor='media']");
      const text = target.closest("p, h1, h2, h3, h4, h5, h6, article, [data-cursor='text']");

      if (interactive) {
        setState("pointer");
        scale.set(1.65);
      } else if (media) {
        setState("media");
        scale.set(2.2);
      } else if (text) {
        setState("text");
        scale.set(1.2);
      } else {
        setState("default");
        scale.set(1);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousemove", detect, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.classList.add("custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", detect);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [touch, reduce, x, y, scale, visible]);

  if (touch || reduce) return null;

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference",
        !visible && "opacity-0",
      )}
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className={cn(
          "rounded-full border border-white/80 bg-white/10 backdrop-blur-[1px]",
          state === "pointer" && "bg-white/20",
          state === "media" && "rounded-md border-white/60",
          state === "text" && "h-5 w-0.5 rounded-sm border-0 bg-white/90",
        )}
        style={{
          width: state === "text" ? undefined : 10,
          height: state === "text" ? undefined : 10,
          scale,
        }}
      />
    </motion.div>
  );
}
