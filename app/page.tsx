'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import { Header } from '@/components/Header';
import { IntroLoader } from '@/components/intro/IntroLoader';
import { HeroSection } from '@/components/hero';
import { prefersReducedMotion } from '@/lib/motion';

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Check if intro was already played in this browser session
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('dk_intro_completed') === 'true') {
      setIsIntroComplete(true);
    }
  }, []);

  // Initialize Lenis smooth scroll once intro completes (respecting reduced motion)
  useEffect(() => {
    if (!isIntroComplete || prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isIntroComplete]);

  // Pause/resume Lenis when fullscreen navigation is open
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (isNavOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isNavOpen]);

  const handleIntroComplete = useCallback(() => {
    setIsIntroComplete(true);
  }, []);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const handleExplore = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(window.innerHeight);
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    }
  }, []);

  // Keyboard shortcut: Pressing 'M' toggles fullscreen navigation (only after intro finishes)
  useEffect(() => {
    if (!isIntroComplete) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable) ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      ) {
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleNav();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIntroComplete, toggleNav]);

  return (
    <div className="relative min-h-screen bg-void text-primary overflow-x-hidden">
      {/* Cinematic GSAP Intro Loader (Fullscreen pure black overlay until logo settles) */}
      <IntroLoader onComplete={handleIntroComplete} />

      {/* Website Navigation Header with Custom Hamburger & Fullscreen Navigation */}
      <Header
        isNavOpen={isNavOpen}
        onToggleNav={toggleNav}
        onCloseNav={closeNav}
        isIntroComplete={isIntroComplete}
      />

      {/* Main Website Area — Activated after intro settles */}
      <main
        className={`relative min-h-screen transition-opacity duration-700 ease-out ${
          isIntroComplete ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <HeroSection
          isIntroComplete={isIntroComplete}
          onExplore={handleExplore}
        />
      </main>
    </div>
  );
}
