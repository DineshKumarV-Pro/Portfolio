'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { FULL_LOGO_PATH, LOGO_SUBPATHS, LOGO_VIEWBOX } from '../brand/logoData';

interface IntroLoaderProps {
  onComplete?: () => void;
  forcePlay?: boolean;
}

export function IntroLoader({ onComplete, forcePlay = false }: IntroLoaderProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoContainerRef = useRef<HTMLDivElement | null>(null);
  const fillPathRef = useRef<SVGPathElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Set path ref helper
  const setPathRef = (index: number) => (el: SVGPathElement | null) => {
    pathRefs.current[index] = el;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if intro has already played in this session (unless forcePlay is requested)
    const hasPlayed =
      typeof window !== 'undefined' &&
      sessionStorage.getItem('dk_intro_completed') === 'true';

    if (hasPlayed && !forcePlay) {
      // Immediately reveal header logo and restore scroll
      const headerLogo = document.getElementById('header-brand-logo');
      if (headerLogo) headerLogo.style.opacity = '1';
      document.body.style.overflow = '';
      if (overlayRef.current) overlayRef.current.style.display = 'none';
      onComplete?.();
      return;
    }

    setIsPlaying(true);

    // Lock scrolling during cinematic intro
    document.body.style.overflow = 'hidden';

    // Ensure header logo is hidden while intro plays
    const headerLogo = document.getElementById('header-brand-logo');
    if (headerLogo) {
      headerLogo.style.opacity = '0';
    }

    if (overlayRef.current) {
      overlayRef.current.style.display = 'flex';
      overlayRef.current.style.opacity = '1';
    }

    const ctx = gsap.context(() => {
      // If user prefers reduced motion, skip long sketch animation
      if (prefersReducedMotion) {
        if (fillPathRef.current) fillPathRef.current.style.opacity = '1';
        if (headerLogo) headerLogo.style.opacity = '1';
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.4,
          delay: 0.2,
          onComplete: () => {
            if (overlayRef.current) overlayRef.current.style.display = 'none';
            document.body.style.overflow = '';
            sessionStorage.setItem('dk_intro_completed', 'true');
            setIsPlaying(false);
            onComplete?.();
          },
        });
        return;
      }

      // STEP 1 - Setup initial state (pure black screen, invisible logo)
      gsap.set(logoContainerRef.current, {
        opacity: 0,
        visibility: 'hidden',
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: '0 0',
      });

      if (fillPathRef.current) {
        gsap.set(fillPathRef.current, { opacity: 0 });
      }

      // Measure SVG path lengths accurately using getTotalLength()
      pathRefs.current.forEach((path) => {
        if (!path) return;
        try {
          const length = path.getTotalLength();
          const safeLength = length > 0 ? length : 2000;
          // Add 2 to prevent any 1px dot when offset is at maximum with round linecaps
          gsap.set(path, {
            strokeDasharray: `${safeLength + 2} ${safeLength + 2}`,
            strokeDashoffset: safeLength + 2,
            opacity: 1,
          });
        } catch {
          gsap.set(path, {
            strokeDasharray: '2500 2500',
            strokeDashoffset: 2500,
            opacity: 1,
          });
        }
      });

      // Orchestrate the master cinematic timeline
      const masterTl = gsap.timeline({
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = 'none';
          }
          document.body.style.overflow = '';
          sessionStorage.setItem('dk_intro_completed', 'true');
          setIsPlaying(false);
          onComplete?.();
        },
      });

      // --- STEP 1: Pure Black Screen ---
      // Cinematic pause in pure black before sketching begins
      masterTl.to({}, { duration: 0.4 });

      // Reveal the logo canvas
      masterTl.set(logoContainerRef.current, {
        opacity: 1,
        visibility: 'visible',
      });

      // --- STEP 2: Animated SVG Outline Drawing ---
      // Organically sketch the white outline along the actual SVG curves
      // Outer boundary path (subpath 0) sketches first
      if (pathRefs.current[0]) {
        masterTl.to(
          pathRefs.current[0],
          {
            strokeDashoffset: 0,
            duration: 1.9,
            ease: 'power2.inOut',
          },
          'sketch'
        );
      }

      // Internal loops and cutouts sketch with organic staggered timing
      if (pathRefs.current[2]) {
        masterTl.to(
          pathRefs.current[2],
          {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: 'power2.inOut',
          },
          'sketch+=0.35'
        );
      }

      if (pathRefs.current[1]) {
        masterTl.to(
          pathRefs.current[1],
          {
            strokeDashoffset: 0,
            duration: 1.0,
            ease: 'power2.inOut',
          },
          'sketch+=0.6'
        );
      }

      if (pathRefs.current[4]) {
        masterTl.to(
          pathRefs.current[4],
          {
            strokeDashoffset: 0,
            duration: 0.95,
            ease: 'power2.inOut',
          },
          'sketch+=0.85'
        );
      }

      if (pathRefs.current[3]) {
        masterTl.to(
          pathRefs.current[3],
          {
            strokeDashoffset: 0,
            duration: 0.85,
            ease: 'power2.inOut',
          },
          'sketch+=1.05'
        );
      }

      // Small pause to let drawing complete cleanly
      masterTl.to({}, { duration: 0.1 });

      // --- STEP 3: Outline to Solid Logo Transformation ---
      // Smoothly transition from the outlined SVG into the fully filled original solid white SVG
      if (fillPathRef.current) {
        masterTl.to(
          fillPathRef.current,
          {
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
          },
          'fill'
        );
      }

      // Smoothly fade outline strokes into the solid fill with zero flash
      masterTl.to(
        pathRefs.current.filter(Boolean),
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        'fill+=0.2'
      );

      // Hold the solid white logo proudly in center
      masterTl.to({}, { duration: 0.55 });

      // --- STEP 4: Cinematic Logo Shrink and Position Transition ---
      masterTl.add(() => {
        const introEl = logoContainerRef.current;
        const targetEl = document.getElementById('header-brand-logo');

        if (!introEl) return;

        // Fallback target if header element is not yet in DOM
        const targetRect = targetEl
          ? targetEl.getBoundingClientRect()
          : { left: 48, top: 24, width: 130, height: 130 / (425 / 139) };

        const introRect = introEl.getBoundingClientRect();

        const deltaX = targetRect.left - introRect.left;
        const deltaY = targetRect.top - introRect.top;
        const scale = targetRect.width / introRect.width;

        // Smoothly scale down and translate logo simultaneously using GSAP power3.inOut
        gsap.to(introEl, {
          x: deltaX,
          y: deltaY,
          scale: scale,
          transformOrigin: '0 0',
          duration: 1.3,
          ease: 'power3.inOut',
        });
      }, 'shrinkAndTravel');

      // Allow the 1.3s travel animation to complete
      masterTl.to({}, { duration: 1.3 });

      // --- STEP 5: Reveal the Actual Website ---
      // Seamless handoff: reveal header logo at exact top-left position
      masterTl.add(() => {
        const targetEl = document.getElementById('header-brand-logo');
        if (targetEl) {
          targetEl.style.opacity = '1';
        }
      }, 'reveal');

      // Smoothly fade out the black cinematic overlay to reveal the website
      if (overlayRef.current) {
        masterTl.to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.7,
            ease: 'power2.inOut',
          },
          'reveal'
        );
      }
    }, overlayRef);

    return () => {
      document.body.style.overflow = '';
      const targetEl = document.getElementById('header-brand-logo');
      if (targetEl) targetEl.style.opacity = '1';
      ctx.revert();
    };
  }, [isMounted, forcePlay, onComplete]);

  if (!isMounted) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-[#000000] flex items-center justify-center overflow-hidden pointer-events-auto select-none"
      aria-hidden="true"
    >
      {/* Centered Logo Container */}
      <div
        ref={logoContainerRef}
        className="relative w-[min(72vw,440px)] aspect-[425/139] flex items-center justify-center"
      >
        <svg
          viewBox={LOGO_VIEWBOX}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible drop-shadow-[0_0_35px_rgba(255,255,255,0.08)]"
        >
          {/* Solid White Original Logo (fades in during Step 3) */}
          <path
            ref={fillPathRef}
            d={FULL_LOGO_PATH}
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#FFFFFF"
            style={{ opacity: 0 }}
          />

          {/* Individual Stroke Paths for Step 2 organic sketch animation */}
          {LOGO_SUBPATHS.map((subpath, index) => (
            <path
              key={index}
              ref={setPathRef(index)}
              d={subpath}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0 }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
