'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { MOTION_EASE, prefersReducedMotion } from '@/lib/motion';
import { CinematicThreadsGrainient } from './CinematicThreadsGrainient';

gsap.registerPlugin(ScrollTrigger);

export interface HeroSectionProps {
  isIntroComplete: boolean;
}

export function HeroSection({ isIntroComplete }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const dineshRef = useRef<HTMLHeadingElement | null>(null);
  const kumarWrapRef = useRef<HTMLDivElement | null>(null);
  const kumarFillRef = useRef<HTMLSpanElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);
  const hairlineRef = useRef<HTMLDivElement | null>(null);
  const hasPlayedRef = useRef(false);

  // Choreographed GSAP entrance (fires once IntroLoader settles)
  useEffect(() => {
    if (!isIntroComplete || hasPlayedRef.current) return;

    const section = sectionRef.current;
    const bgLayer = bgLayerRef.current;
    const eyebrow = eyebrowRef.current;
    const dinesh = dineshRef.current;
    const kumarWrap = kumarWrapRef.current;
    const kumarFill = kumarFillRef.current;
    const bottomBar = bottomBarRef.current;
    const hairline = hairlineRef.current;

    if (
      !section ||
      !bgLayer ||
      !eyebrow ||
      !dinesh ||
      !kumarWrap ||
      !kumarFill ||
      !bottomBar ||
      !hairline
    ) {
      return;
    }

    hasPlayedRef.current = true;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([bgLayer, eyebrow, dinesh, kumarWrap, bottomBar], {
          opacity: 1,
          x: 0,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        gsap.set(kumarFill, { clipPath: 'inset(0% 0% 0% 0%)' });
        gsap.set(hairline, { scaleX: 1 });
        return;
      }

      gsap.set(bgLayer, { opacity: 0 });
      gsap.set(eyebrow, { opacity: 0, y: 10 });
      gsap.set(dinesh, { opacity: 0, x: -28, clipPath: 'inset(0% 100% 0% 0%)' });
      gsap.set(kumarWrap, { opacity: 0, y: 20 });
      gsap.set(kumarFill, { clipPath: 'inset(0% 100% 0% 0%)' });
      gsap.set(hairline, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(bottomBar, { opacity: 0, y: 14 });

      const tl = gsap.timeline({ delay: 0.08 });

      // 1. Reveal Threads + Grainient atmosphere
      tl.to(
        bgLayer,
        {
          opacity: 1,
          duration: 1.05,
          ease: MOTION_EASE.outExpo,
        },
        0
      )
        // 2. Eyebrow index
        .to(
          eyebrow,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: MOTION_EASE.outExpo,
          },
          0.18
        )
        // 3. DINESH horizontal mask slice
        .to(
          dinesh,
          {
            opacity: 1,
            x: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.85,
            ease: MOTION_EASE.inOutEditorial,
            clearProps: 'clipPath',
          },
          0.22
        )
        // 4. KUMAR V. outline rise + aurora gradient fill wipe
        .to(
          kumarWrap,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: MOTION_EASE.outExpo,
          },
          0.45
        )
        .to(
          kumarFill,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.95,
            ease: MOTION_EASE.inOutEditorial,
            clearProps: 'clipPath',
          },
          0.62
        )
        // 5. Bottom hairline & positioning
        .to(
          hairline,
          {
            scaleX: 1,
            duration: 0.7,
            ease: MOTION_EASE.inOutEditorial,
          },
          0.75
        )
        .to(
          bottomBar,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: MOTION_EASE.outExpo,
          },
          0.85
        );

      // Scroll-driven depth exit into next section
      gsap.to(dinesh, {
        x: -36,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(kumarWrap, {
        x: 36,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(bgLayer, {
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isIntroComplete]);

  // Subtle pointer-driven Z-plane parallax between DINESH and KUMAR V. (Desktop only)
  useEffect(() => {
    if (!isIntroComplete || prefersReducedMotion()) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const section = sectionRef.current;
    const dinesh = dineshRef.current;
    const kumarWrap = kumarWrapRef.current;
    if (!section || !dinesh || !kumarWrap) return;

    const moveDineshX = gsap.quickTo(dinesh, 'x', {
      duration: 0.8,
      ease: 'power3.out',
    });
    const moveKumarX = gsap.quickTo(kumarWrap, 'x', {
      duration: 0.9,
      ease: 'power3.out',
    });

    const handlePointerMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      moveDineshX(nx * -12);
      moveKumarX(nx * 16);
    };

    const handlePointerLeave = () => {
      moveDineshX(0);
      moveKumarX(0);
    };

    section.addEventListener('pointermove', handlePointerMove, { passive: true });
    section.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [isIntroComplete]);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-void pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-12"
    >
      {/* Generative Threads + Grainient Atmosphere */}
      <div ref={bgLayerRef} className="absolute inset-0" style={{ opacity: 0 }}>
        <CinematicThreadsGrainient isActive={isIntroComplete} />
      </div>

      <Container
        size="wide"
        className="relative z-10 flex flex-1 flex-col justify-between"
      >
        {/* Top Metadata Coordinate */}
        <div
          ref={eyebrowRef}
          className="flex items-center gap-3 font-mono text-[length:var(--text-mono-xs)] uppercase tracking-[0.18em] text-secondary"
          style={{ opacity: 0 }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-aurora-violet to-aurora-cyan shadow-[0_0_10px_rgba(139,92,246,0.75)]"
          />
          <span>01 / Identity</span>
        </div>

        {/* Centerpiece Dual-Plane Typography: DINESH KUMAR V. */}
        <div className="my-auto py-8 sm:py-12">
          <h1 className="sr-only">Dinesh Kumar V.</h1>

          <div aria-hidden="true" className="flex flex-col gap-1.5 sm:gap-2">
            <span
              ref={dineshRef}
              className="block font-display text-[clamp(2.625rem,11.5vw,9.25rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-primary select-none"
              style={{ opacity: 0 }}
            >
              DINESH
            </span>

            <div
              ref={kumarWrapRef}
              className="relative ml-0 w-fit sm:ml-[12%] lg:ml-[18%]"
              style={{ opacity: 0 }}
            >
              {/* Translucent architectural stroke plane */}
              <span
                className="block font-display text-[clamp(2.375rem,10.2vw,8.75rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-transparent select-none"
                style={{ WebkitTextStroke: '1.25px rgba(245, 245, 245, 0.38)' }}
              >
                KUMAR V.
              </span>

              {/* Aurora-gradient fill plane wiped via GSAP clip-path */}
              <span
                ref={kumarFillRef}
                className="pointer-events-none absolute inset-0 block bg-gradient-to-r from-primary via-aurora-lavender to-aurora-cyan bg-clip-text font-display text-[clamp(2.375rem,10.2vw,8.75rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-transparent select-none"
              >
                KUMAR V.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Identity Anchor */}
        <div className="space-y-4">
          <div
            ref={hairlineRef}
            className="h-px w-full bg-gradient-to-r from-border via-border-subtle to-transparent"
          />

          <div
            ref={bottomBarRef}
            className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"
            style={{ opacity: 0 }}
          >
            <p className="font-sans text-[length:var(--text-body-md)] text-primary/90">
              Frontend Developer <span className="text-secondary">·</span> Product Builder
            </p>
            <p className="font-mono text-[length:var(--text-mono-xs)] uppercase tracking-[0.14em] text-secondary">
              Founder of ALPHA CodeX · Computer Science Student
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
