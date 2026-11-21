'use client';

import React, { useRef, useEffect, useCallback, useId } from 'react';
import gsap from 'gsap';
import { MENU_SIGNATURE, CLOSE_SIGNATURE } from './signatureData';

interface SignatureButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  isReady?: boolean; // Only triggers entrance animation after the cinematic logo settles
}

export function SignatureButton({
  isOpen,
  onToggle,
  className = '',
  isReady = true,
}: SignatureButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // SVG Elements & Clip Rects
  const menuGroupRef = useRef<SVGGElement | null>(null);
  const closeGroupRef = useRef<SVGGElement | null>(null);
  const menuClipRectRef = useRef<SVGRectElement | null>(null);
  const closeClipRectRef = useRef<SVGRectElement | null>(null);
  const menuSparkRef = useRef<SVGCircleElement | null>(null);
  const closeSparkRef = useRef<SVGCircleElement | null>(null);
  const hoverShimmerRef = useRef<HTMLDivElement | null>(null);

  // Animation timeline reference & state tracking
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasEnteredRef = useRef<boolean>(false);
  const isAnimatingRef = useRef<boolean>(false);

  // Unique IDs for SVG clip paths to prevent collisions
  const rawId = useId();
  const safeId = rawId.replace(/:/g, '_');
  const menuClipId = `menu-sig-clip-${safeId}`;
  const closeClipId = `close-sig-clip-${safeId}`;

  // Initial Entrance Animation: ONLY runs when isReady becomes true (after intro docks)
  useEffect(() => {
    if (!isReady || hasEnteredRef.current) return;

    const el = buttonRef.current;
    const menuClip = menuClipRectRef.current;
    const menuGroup = menuGroupRef.current;
    const closeGroup = closeGroupRef.current;
    const menuSpark = menuSparkRef.current;

    if (!el || !menuClip || !menuGroup || !closeGroup) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Hide CLOSE completely
      gsap.set(closeGroup, { opacity: 0, scale: 0.95, pointerEvents: 'none' });

      if (prefersReducedMotion) {
        gsap.set(menuClip, { attr: { x: 0 } });
        gsap.set(menuGroup, { opacity: 1, scale: 1 });
        if (menuSpark) gsap.set(menuSpark, { opacity: 0 });
        hasEnteredRef.current = true;
        return;
      }

      // Start MENU concealed behind slanted clip mask
      gsap.set(menuClip, { attr: { x: -440 } });
      gsap.set(menuGroup, { opacity: 0, scale: 0.94, x: -6 });
      if (menuSpark) gsap.set(menuSpark, { opacity: 0, attr: { cx: 0 } });

      // Cursive entrance reveal once cinematic intro settles
      const tl = gsap.timeline({
        delay: 0.1,
        onComplete: () => {
          hasEnteredRef.current = true;
        },
      });

      tl.to(menuGroup, {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 0.85,
        ease: 'power3.out',
      }, 0);

      tl.to(menuClip, {
        attr: { x: 0 },
        duration: 0.95,
        ease: 'power3.inOut',
      }, 0);

      // Light trace spark glides along cursive edge
      if (menuSpark) {
        tl.fromTo(
          menuSpark,
          { opacity: 0, attr: { cx: 20 } },
          { opacity: 0.9, duration: 0.2, ease: 'power1.out' },
          0.05
        );
        tl.to(
          menuSpark,
          { attr: { cx: 413 }, duration: 0.9, ease: 'power3.inOut' },
          0.05
        );
        tl.to(
          menuSpark,
          { opacity: 0, duration: 0.25, ease: 'power2.out' },
          0.75
        );
      }
    }, buttonRef);

    return () => ctx.revert();
  }, [isReady]);

  // Handle MENU <-> CLOSE Exchange
  useEffect(() => {
    // Only handle exchanges after initial entrance has completed
    if (!hasEnteredRef.current) return;

    const menuClip = menuClipRectRef.current;
    const closeClip = closeClipRectRef.current;
    const menuGroup = menuGroupRef.current;
    const closeGroup = closeGroupRef.current;
    const closeSpark = closeSparkRef.current;
    const menuSpark = menuSparkRef.current;

    if (!menuClip || !closeClip || !menuGroup || !closeGroup) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        if (isOpen) {
          gsap.set(menuGroup, { opacity: 0, pointerEvents: 'none' });
          gsap.set(closeGroup, { opacity: 1, scale: 1, pointerEvents: 'auto' });
          gsap.set(closeClip, { attr: { x: 0 } });
        } else {
          gsap.set(closeGroup, { opacity: 0, pointerEvents: 'none' });
          gsap.set(menuGroup, { opacity: 1, scale: 1, pointerEvents: 'auto' });
          gsap.set(menuClip, { attr: { x: 0 } });
        }
        return;
      }

      isAnimatingRef.current = true;
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
      activeTimelineRef.current = tl;

      if (isOpen) {
        // ============================================
        // EXCHANGE: MENU ---> CLOSE
        // ============================================
        tl.to(menuGroup, {
          x: 10,
          opacity: 0,
          scale: 0.95,
          duration: 0.45,
          ease: 'power2.in',
        }, 0);

        tl.to(menuClip, {
          attr: { x: 440 },
          duration: 0.48,
          ease: 'power2.in',
        }, 0);

        gsap.set(closeClip, { attr: { x: -440 } });
        gsap.set(closeGroup, { opacity: 0, scale: 0.93, x: -8, pointerEvents: 'auto' });

        tl.to(closeGroup, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.65,
          ease: 'power3.out',
        }, 0.22);

        tl.to(closeClip, {
          attr: { x: 0 },
          duration: 0.7,
          ease: 'power3.inOut',
        }, 0.22);

        if (closeSpark) {
          tl.fromTo(
            closeSpark,
            { opacity: 0, attr: { cx: 20 } },
            { opacity: 0.95, duration: 0.15 },
            0.24
          );
          tl.to(
            closeSpark,
            { attr: { cx: 403 }, duration: 0.65, ease: 'power3.inOut' },
            0.24
          );
          tl.to(
            closeSpark,
            { opacity: 0, duration: 0.2 },
            0.7
          );
        }

        tl.set(menuGroup, { pointerEvents: 'none' });
      } else {
        // ============================================
        // REVERSE EXCHANGE: CLOSE ---> MENU
        // ============================================
        tl.to(closeGroup, {
          x: 10,
          opacity: 0,
          scale: 0.95,
          duration: 0.42,
          ease: 'power2.in',
        }, 0);

        tl.to(closeClip, {
          attr: { x: 440 },
          duration: 0.45,
          ease: 'power2.in',
        }, 0);

        gsap.set(menuClip, { attr: { x: -440 } });
        gsap.set(menuGroup, { opacity: 0, scale: 0.93, x: -8, pointerEvents: 'auto' });

        tl.to(menuGroup, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.65,
          ease: 'power3.out',
        }, 0.2);

        tl.to(menuClip, {
          attr: { x: 0 },
          duration: 0.7,
          ease: 'power3.inOut',
        }, 0.2);

        if (menuSpark) {
          tl.fromTo(
            menuSpark,
            { opacity: 0, attr: { cx: 20 } },
            { opacity: 0.95, duration: 0.15 },
            0.22
          );
          tl.to(
            menuSpark,
            { attr: { cx: 413 }, duration: 0.65, ease: 'power3.inOut' },
            0.22
          );
          tl.to(
            menuSpark,
            { opacity: 0, duration: 0.2 },
            0.68
          );
        }

        tl.set(closeGroup, { pointerEvents: 'none' });
      }
    }, buttonRef);

    return () => ctx.revert();
  }, [isOpen]);

  // Subtle Magnetic Attraction on Pointer Hover (Desktop only)
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn || !isReady) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.28;
      const deltaY = (e.clientY - centerY) * 0.28;

      gsap.to(btn, {
        x: deltaX,
        y: deltaY,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: 'elastic.out(1.2, 0.4)',
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(btn);
    };
  }, [isReady]);

  // Hover Sweep Interaction
  const handlePointerEnter = useCallback(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion || isAnimatingRef.current || !isReady) return;

    const shimmer = hoverShimmerRef.current;
    const container = containerRef.current;

    if (container) {
      gsap.to(container, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    if (shimmer) {
      gsap.fromTo(
        shimmer,
        { x: '-110%', opacity: 0 },
        {
          x: '110%',
          opacity: 0.65,
          duration: 0.55,
          ease: 'power2.inOut',
        }
      );
    }
  }, [isReady]);

  const handlePointerLeave = useCallback(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion || !isReady) return;

    const container = containerRef.current;
    if (container) {
      gsap.to(container, {
        scale: 1,
        duration: 0.45,
        ease: 'power2.out',
      });
    }
  }, [isReady]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onToggle}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      className={`group relative inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5  transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9563FF]/60 cursor-pointer overflow-hidden ${isReady ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } ${className}`}
    >

      {/* Signature SVG Container */}
      <div
        ref={containerRef}
        className="relative w-[78px] sm:w-[94px] h-[22px] sm:h-[26px] flex items-center justify-center"
      >
        {/* ========================================================= */}
        {/* MENU SIGNATURE SVG */}
        {/* ========================================================= */}
        <svg
          viewBox={MENU_SIGNATURE.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full overflow-visible"
          aria-hidden={isOpen}
        >
          <defs>
            <clipPath id={menuClipId}>
              <rect
                ref={menuClipRectRef}
                x="0"
                y="-20"
                width="460"
                height="150"
                transform="skewX(-16)"
              />
            </clipPath>
          </defs>

          <g ref={menuGroupRef} clipPath={`url(#${menuClipId})`}>
            <path
              d={MENU_SIGNATURE.d}
              fillRule="evenodd"
              clipRule="evenodd"
              fill="white"
              stroke="black"
              strokeLinejoin="round"
            />
          </g>

          {/* Light tracing spark following pen tip */}
          <circle
            ref={menuSparkRef}
            cx="0"
            cy="54"
            r="16"
            fill="url(#menuSparkGrad)"
            className="pointer-events-none"
            opacity="0"
          />
          <defs>
            <radialGradient id="menuSparkGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="40%" stopColor="#C2A8FF" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#9563FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7040D8" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* ========================================================= */}
        {/* CLOSE SIGNATURE SVG */}
        {/* ========================================================= */}
        <svg
          viewBox={CLOSE_SIGNATURE.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full overflow-visible"
          aria-hidden={!isOpen}
        >
          <defs>
            <clipPath id={closeClipId}>
              <rect
                ref={closeClipRectRef}
                x="-440"
                y="-20"
                width="460"
                height="160"
                transform="skewX(-16)"
              />
            </clipPath>
          </defs>

          <g ref={closeGroupRef} clipPath={`url(#${closeClipId})`}>
            <path
              d={CLOSE_SIGNATURE.d}
              fillRule="evenodd"
              clipRule="evenodd"
              fill="white"
              stroke="black"
            />
          </g>

          {/* Light tracing spark following pen tip */}
          <circle
            ref={closeSparkRef}
            cx="0"
            cy="59"
            r="16"
            fill="url(#closeSparkGrad)"
            className="pointer-events-none"
            opacity="0"
          />
          <defs>
            <radialGradient id="closeSparkGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="40%" stopColor="#C2A8FF" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#9563FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7040D8" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Screen Reader Helper Text */}
      <span className="sr-only">
        {isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      </span>
    </button>
  );
}
