import { useCallback, useRef } from "react";

const MAX = 12;

/** Subtle magnetic pull toward pointer — desktop only. */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const raf = useRef(0);

  const onMove = useCallback(
    (e: React.PointerEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      if (raf.current) return;
      raf.current = window.requestAnimationFrame(() => {
        raf.current = 0;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        el.style.transform = `translate(${clamp(dx, -MAX, MAX)}px, ${clamp(dy, -MAX, MAX)}px)`;
      });
    },
    [strength],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  return { ref, onMove, onLeave };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
