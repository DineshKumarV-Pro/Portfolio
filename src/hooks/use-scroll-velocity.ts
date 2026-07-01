import { useEffect, useRef, useState } from "react";

/** Scroll velocity in px/ms, smoothed via rAF. */
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const last = useRef({ y: 0, t: 0 });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const now = performance.now();
        const y = window.scrollY;
        const dt = now - last.current.t;
        if (dt > 0) {
          const v = Math.abs(y - last.current.y) / dt;
          setVelocity((prev) => prev * 0.82 + v * 0.18);
        }
        last.current = { y, t: now };
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return velocity;
}
