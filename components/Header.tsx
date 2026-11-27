'use client';

import React, { useRef } from 'react';
import { Logo } from './brand/Logo';
import { FullscreenNavigation, HamburgerButton } from './navigation';

interface HeaderProps {
  isNavOpen?: boolean;
  onToggleNav?: () => void;
  onCloseNav?: () => void;
  isIntroComplete?: boolean;
  children?: React.ReactNode;
}

const NAVIGATION_ID = 'fullscreen-navigation';

export function Header({
  isNavOpen = false,
  onToggleNav,
  onCloseNav,
  isIntroComplete = false,
  children,
}: HeaderProps) {
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = () => {
    if (onCloseNav) {
      onCloseNav();
    } else if (isNavOpen && onToggleNav) {
      onToggleNav();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-5 transition-all duration-700 ease-out ${
          isIntroComplete
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-2'
        }`}
      >
        {/* Brand Logo Container (Target measured by IntroLoader) */}
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="flex items-center group rounded-[var(--radius-xs)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-aurora-lavender"
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

        {/* Right Controls: Custom children & Hamburger Trigger */}
        <div className="flex items-center gap-4">
          {children}

          {onToggleNav && (
            <HamburgerButton
              ref={hamburgerRef}
              isOpen={isNavOpen}
              onToggle={onToggleNav}
              controlsId={NAVIGATION_ID}
              isReady={isIntroComplete}
            />
          )}
        </div>
      </header>

      {onToggleNav && (
        <FullscreenNavigation
          id={NAVIGATION_ID}
          isOpen={isNavOpen}
          onClose={handleClose}
          triggerRef={hamburgerRef}
        />
      )}
    </>
  );
}
