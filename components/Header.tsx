'use client';

import React from 'react';
import { Logo } from './brand/Logo';
import { SignatureButton } from './signature/SignatureButton';

interface HeaderProps {
  isNavOpen?: boolean;
  onToggleNav?: () => void;
  isIntroComplete?: boolean;
  children?: React.ReactNode;
}

export function Header({
  isNavOpen = false,
  onToggleNav,
  isIntroComplete = false,
  children,
}: HeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-5  transition-all duration-700 ease-out ${isIntroComplete
        ? 'opacity-100 pointer-events-auto translate-y-0'
        : 'opacity-0 pointer-events-none -translate-y-2'
        }`}
    >
      {/* Brand Logo Container (Target measured by IntroLoader) */}
      <div className="flex items-center gap-4">
        <a
          href="#"
          className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A55F5]/50 rounded-sm"
          aria-label="DK Brand Home"
        >
          <div
            id="header-brand-logo"
            className="w-[105px] sm:w-[125px] md:w-[135px] aspect-[425/139] flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]"
          >
            <Logo className="w-full h-auto object-contain" />
          </div>
        </a>

      </div>

      {/* Right Controls: Signature Trigger & custom children */}
      <div className="flex items-center gap-4">
        {children}

        {onToggleNav && (
          <SignatureButton
            isOpen={isNavOpen}
            onToggle={onToggleNav}
            isReady={isIntroComplete}
          />
        )}
      </div>
    </header>
  );
}
