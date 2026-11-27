'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Container } from '@/components/ui/Container';
import { MOTION_EASE, prefersReducedMotion } from '@/lib/motion';
import { Grainient } from './Grainient';

export interface HeroSectionProps {
  isIntroComplete: boolean;
  onExplore?: () => void;
}

const NAME_SVG_SRC = '/Dinesh%20Kumar%20V.%20%E2%80%94%20Signature%20vector.svg';

export function HeroSection({ isIntroComplete, onExplore }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const atmosphereRef = useRef<HTMLDivElement | null>(null);
  const nameMaskRef = useRef<HTMLDivElement | null>(null);
  const mottoRef = useRef<HTMLParagraphElement | null>(null);
  const exploreRef = useRef<HTMLButtonElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isIntroComplete || hasAnimatedRef.current) return;

    const section = sectionRef.current;
    const atmosphere = atmosphereRef.current;
    const nameMask = nameMaskRef.current;
    const motto = mottoRef.current;
    const explore = exploreRef.current;

    if (!section || !atmosphere || !nameMask || !motto) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(atmosphere, { opacity: 1 });
        gsap.set(nameMask, {
          opacity: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        gsap.set(motto, { opacity: 1, y: 0 });
        if (explore) gsap.set(explore, { opacity: 0.72, y: 0 });
        hasAnimatedRef.current = true;
        return;
      }

      gsap.set(atmosphere, { opacity: 0 });
      gsap.set(nameMask, {
        opacity: 0,
        scale: 1.03,
        clipPath: 'inset(0% 100% 0% 0%)',
      });
      gsap.set(motto, { opacity: 0, y: 14 });
      if (explore) gsap.set(explore, { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        onComplete: () => {
          hasAnimatedRef.current = true;
        },
      });

      // Phase A: Establish dark Grainient atmosphere
      tl.to(
        atmosphere,
        {
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
        },
        0
      );

      // Phase B & C: Signature SVG reveal & settle
      tl.to(
        nameMask,
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.15,
          ease: MOTION_EASE.inOutEditorial,
        },
        0.18
      ).to(
        nameMask,
        {
          scale: 1,
          duration: 1.25,
          ease: MOTION_EASE.outExpo,
        },
        0.18
      );

      // Phase D: Personal motto reveal after name settles
      tl.to(
        motto,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: MOTION_EASE.outExpo,
        },
        '-=0.35'
      );

      // Phase E: Discreet Explore cue
      if (explore) {
        tl.to(
          explore,
          {
            opacity: 0.72,
            y: 0,
            duration: 0.55,
            ease: MOTION_EASE.outExpo,
          },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isIntroComplete]);

  const handleExploreClick = () => {
    if (onExplore) {
      onExplore();
      return;
    }

    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection instanceof HTMLElement) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-void"
    >
      {/* Sole Background Layer: Customized React Bits Grainient */}
      <div
        ref={atmosphereRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0 }}
      >
        <Grainient />
      </div>

      {/* Top breathing spacer aligned with fixed Header */}
      <div className="h-20 sm:h-24" aria-hidden="true" />

      {/* Optical Centerpiece: Custom Name SVG + Personal Motto */}
      <Container
        size="wide"
        className="relative z-10 flex flex-1 flex-col items-center justify-center py-8 sm:py-12"
      >
        <div className="flex w-full -translate-y-[2vh] flex-col items-center text-center">
          <h1 className="sr-only">Dinesh Kumar V.</h1>

          <div
            ref={nameMaskRef}
            className="w-[min(92vw,420px)] sm:w-[min(86vw,700px)] lg:w-[min(78vw,920px)] aspect-[830/164] select-none"
            style={{ opacity: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={NAME_SVG_SRC}
              alt="Dinesh Kumar V."
              width={830}
              height={164}
              decoding="sync"
              fetchPriority="high"
              draggable={false}
              className="h-full w-full object-contain drop-shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
            />
          </div>

          <p
            ref={mottoRef}
            className="mt-6 font-sans text-[clamp(0.9375rem,1.25vw,1.125rem)] font-normal tracking-[0.04em] text-secondary sm:mt-8"
            style={{ opacity: 0 }}
          >
            Build Better Than Yesterday.
          </p>
        </div>
      </Container>

      {/* Bottom Discreet Explore Cue */}
      <div className="relative z-10 flex justify-center pb-8 sm:pb-10">
        <button
          ref={exploreRef}
          type="button"
          onClick={handleExploreClick}
          className="min-h-[44px] px-4 font-mono text-[length:var(--text-mono-xs)] uppercase tracking-[0.2em] text-secondary transition-colors duration-[var(--duration-micro)] hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-aurora-lavender cursor-pointer"
          style={{ opacity: 0 }}
        >
          Explore
        </button>
      </div>
    </section>
  );
}
