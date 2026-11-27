'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { IntroLoader } from '@/components/intro/IntroLoader';
import { HeroSection } from '@/components/hero';

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);

  // Check if intro was already played in this browser session
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('dk_intro_completed') === 'true') {
      setIsIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIsIntroComplete(true);
  }, []);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
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
        <HeroSection isIntroComplete={isIntroComplete} />
      </main>
    </div>
  );
}
