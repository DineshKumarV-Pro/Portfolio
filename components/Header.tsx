'use client';

import React from 'react';
import { Logo } from './brand/Logo';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 md:px-12 md:py-5  transition-all duration-300">
      <div className="flex items-center">
        <a
          href="#"
          className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
          aria-label="DK Brand Home"
        >
          {/* Target container measured by IntroLoader */}
          <div
            id="header-brand-logo"
            className="w-[105px] sm:w-[125px] md:w-[135px] aspect-[425/139] flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]"
          >
            <Logo className="w-full h-auto object-contain" />
          </div>
        </a>
      </div>

      {children && (
        <div className="flex items-center gap-4">
          {children}
        </div>
      )}
    </header>
  );
}