import { memo, type ReactNode } from "react";
import { PageTransition } from "./PageTransition";
import { BackgroundSystem, ScrollRestoration } from "./BackgroundSystem";
import { InteractiveCursor } from "./InteractiveCursor";

/** Memoized shell — avoids re-rendering ambient layers on route content updates. */
export const MotionShell = memo(function MotionShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollRestoration />
      <BackgroundSystem />
      <InteractiveCursor />
      <PageTransition>{children}</PageTransition>
    </>
  );
});
