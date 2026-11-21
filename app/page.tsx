'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { IntroLoader } from '@/components/intro/IntroLoader';
import { FullscreenNav } from '@/components/navigation/FullscreenNav';

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

  // Keyboard shortcut: Pressing 'M' toggles fullscreen menu (only after intro finishes)
  useEffect(() => {
    if (!isIntroComplete) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.metaKey ||
        e.ctrlKey
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
    <div className="relative min-h-screen bg-[#000000] text-[#F0F0F5] overflow-x-hidden selection:bg-[#6236BD] selection:text-white">
      {/* Cinematic GSAP Intro Loader (Fullscreen pure black overlay until logo settles) */}
      <IntroLoader onComplete={handleIntroComplete} />

      {/* Website Navigation Header with Signature Menu/Close Button (only revealed after logo docks) */}
      <Header
        isNavOpen={isNavOpen}
        onToggleNav={toggleNav}
        isIntroComplete={isIntroComplete}
      />

      {/* Fullscreen Creative Navigation System */}
      <FullscreenNav isOpen={isNavOpen && isIntroComplete} onClose={closeNav} />

      {/* Main Website Area - Pure Full Dark (#000000) & activated only after intro settles */}
      <main
        className={`relative min-h-screen pt-24 md:pt-28 transition-opacity duration-700 ease-out ${
          isIntroComplete ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Your content goes here */}
      </main>
    </div>
  );
}
