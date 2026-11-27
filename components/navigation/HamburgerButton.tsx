'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import { MOTION_DURATION, MOTION_EASE, prefersReducedMotion } from '@/lib/motion';

export interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  controlsId?: string;
  isReady?: boolean;
  className?: string;
}

export const HamburgerButton = forwardRef<HTMLButtonElement, HamburgerButtonProps>(
  function HamburgerButton(
    {
      isOpen,
      onToggle,
      controlsId = 'fullscreen-navigation',
      isReady = true,
      className,
    },
    forwardedRef
  ) {
    const internalRef = useRef<HTMLButtonElement | null>(null);
    const topLineRef = useRef<HTMLSpanElement | null>(null);
    const middleLineRef = useRef<HTMLSpanElement | null>(null);
    const bottomLineRef = useRef<HTMLSpanElement | null>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const isFirstRenderRef = useRef(true);

    const setButtonRef = (node: HTMLButtonElement | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    // Animate hamburger lines <-> X via GSAP
    useEffect(() => {
      const top = topLineRef.current;
      const middle = middleLineRef.current;
      const bottom = bottomLineRef.current;
      if (!top || !middle || !bottom) return;

      tlRef.current?.kill();

      const reduced = prefersReducedMotion();

      // Set initial state without animation on first mount
      if (isFirstRenderRef.current || reduced) {
        isFirstRenderRef.current = false;
        if (isOpen) {
          gsap.set(top, { y: 0, rotation: 45, width: 22 });
          gsap.set(middle, { opacity: 0, scaleX: 0 });
          gsap.set(bottom, { y: 0, rotation: -45, width: 22 });
        } else {
          gsap.set(top, { y: -6, rotation: 0, width: 22 });
          gsap.set(middle, { opacity: 1, scaleX: 1 });
          gsap.set(bottom, { y: 6, rotation: 0, width: 22 });
        }
        return;
      }

      const tl = gsap.timeline();
      tlRef.current = tl;

      if (isOpen) {
        // Stage A: Converge to center, then rotate into X
        tl.to(
          middle,
          {
            opacity: 0,
            scaleX: 0,
            duration: MOTION_DURATION.micro,
            ease: MOTION_EASE.micro,
          },
          0
        )
          .to(
            [top, bottom],
            {
              y: 0,
              duration: MOTION_DURATION.micro,
              ease: MOTION_EASE.inOutEditorial,
            },
            0
          )
          .to(
            top,
            {
              rotation: 45,
              duration: MOTION_DURATION.ui,
              ease: MOTION_EASE.outExpo,
            },
            0.12
          )
          .to(
            bottom,
            {
              rotation: -45,
              duration: MOTION_DURATION.ui,
              ease: MOTION_EASE.outExpo,
            },
            0.12
          );
      } else {
        // Reverse: Un-rotate, then separate back into 3 lines
        tl.to(
          [top, bottom],
          {
            rotation: 0,
            duration: MOTION_DURATION.micro,
            ease: MOTION_EASE.micro,
          },
          0
        )
          .to(
            top,
            {
              y: -6,
              duration: MOTION_DURATION.ui,
              ease: MOTION_EASE.outExpo,
            },
            0.1
          )
          .to(
            bottom,
            {
              y: 6,
              duration: MOTION_DURATION.ui,
              ease: MOTION_EASE.outExpo,
            },
            0.1
          )
          .to(
            middle,
            {
              opacity: 1,
              scaleX: 1,
              duration: MOTION_DURATION.ui,
              ease: MOTION_EASE.outExpo,
            },
            0.14
          );
      }

      return () => {
        tl.kill();
      };
    }, [isOpen]);

    return (
      <button
        ref={setButtonRef}
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls={controlsId}
        className={cn(
          'group relative inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-transparent transition-colors duration-[var(--duration-micro)] ease-[var(--ease-micro)] cursor-pointer select-none',
          'hover:border-border-subtle hover:bg-surface/60',
          'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-aurora-lavender',
          isReady ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
          className
        )}
      >
        <span
          aria-hidden="true"
          className="relative flex h-5 w-6 items-center justify-center"
        >
          {/* Top bar */}
          <span
            ref={topLineRef}
            className="absolute h-[1.5px] w-[22px] rounded-full bg-primary transition-colors duration-[var(--duration-micro)] group-hover:bg-white"
            style={{ transform: 'translateY(-6px)' }}
          />
          {/* Middle bar (asymmetric editorial accent) */}
          <span
            ref={middleLineRef}
            className="absolute right-[1px] h-[1.5px] w-[14px] origin-right rounded-full bg-secondary transition-all duration-[var(--duration-micro)] group-hover:w-[22px] group-hover:bg-aurora-lavender"
          />
          {/* Bottom bar */}
          <span
            ref={bottomLineRef}
            className="absolute h-[1.5px] w-[22px] rounded-full bg-primary transition-colors duration-[var(--duration-micro)] group-hover:bg-white"
            style={{ transform: 'translateY(6px)' }}
          />
        </span>
      </button>
    );
  }
);
