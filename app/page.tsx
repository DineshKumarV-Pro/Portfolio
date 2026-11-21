'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { IntroLoader } from '@/components/intro/IntroLoader';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      {/* Cinematic GSAP Intro Loader */}
      <IntroLoader />

      {/* Website Navigation Header with top-left brand logo */}
      <Header />

      {/* Main Website Area */}
      <main className="relative min-h-screen pt-24 md:pt-28">
        {/* Your content goes here */}
      </main>
    </div>
  );
}
