'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { MOTION_EASE, prefersReducedMotion } from '@/lib/motion';
import {
  NAVIGATION_ITEMS,
  NAVIGATION_SOCIALS,
  type NavigationSocialLink,
} from './navigationData';

export interface FullscreenNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

const LEFT_COLUMN_ITEMS = NAVIGATION_ITEMS.slice(0, 4);
const RIGHT_COLUMN_ITEMS = NAVIGATION_ITEMS.slice(4, 8);

function SocialIcon({ id }: { id: NavigationSocialLink['id'] }) {
  switch (id) {
    case 'github':
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'x':
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'email':
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
  }
}

export function FullscreenNavigation({
  isOpen,
  onClose,
  id = 'fullscreen-navigation',
  triggerRef,
}: FullscreenNavigationProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const atmosphereRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const socialBarRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const activeTlRef = useRef<gsap.core.Timeline | null>(null);
  const isFirstMountRef = useRef(true);
  const wasOpenRef = useRef(false);

  const setItemRef = (index: number) => (el: HTMLLIElement | null) => {
    itemRefs.current[index] = el;
  };

  // Coordinated GSAP top-curtain reveal & staggered entrance
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const atmosphere = atmosphereRef.current;
    const socialBar = socialBarRef.current;
    const items = itemRefs.current.filter(
      (el): el is HTMLLIElement => el !== null
    );

    activeTlRef.current?.kill();

    if (isFirstMountRef.current && !isOpen) {
      isFirstMountRef.current = false;
      gsap.set(overlay, {
        visibility: 'hidden',
        opacity: 0,
        clipPath: 'inset(0% 0% 100% 0%)',
        pointerEvents: 'none',
      });
      if (atmosphere) gsap.set(atmosphere, { opacity: 0, scale: 0.94 });
      return;
    }

    isFirstMountRef.current = false;
    const reduced = prefersReducedMotion();

    if (isOpen) {
      wasOpenRef.current = true;
      document.body.classList.add('nav-open');

      if (reduced) {
        gsap.set(overlay, {
          visibility: 'visible',
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          pointerEvents: 'auto',
        });
        if (atmosphere) gsap.set(atmosphere, { opacity: 0.38, scale: 1 });
        gsap.set(items, { opacity: 1, y: 0 });
        if (socialBar) gsap.set(socialBar, { opacity: 1, y: 0 });
        firstLinkRef.current?.focus();
        return;
      }

      gsap.set(overlay, {
        visibility: 'visible',
        pointerEvents: 'none',
      });
      if (atmosphere) gsap.set(atmosphere, { opacity: 0, scale: 0.94 });
      gsap.set(items, { opacity: 0, y: 20 });
      if (socialBar) gsap.set(socialBar, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: 'auto' });
          firstLinkRef.current?.focus();
        },
      });
      activeTlRef.current = tl;

      // 1. Top-down curtain reveal
      tl.fromTo(
        overlay,
        {
          opacity: 0,
          clipPath: 'inset(0% 0% 100% 0%)',
        },
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.5,
          ease: MOTION_EASE.inOutEditorial,
        },
        0
      );

      // 2. Subtle atmospheric aurora glow
      if (atmosphere) {
        tl.to(
          atmosphere,
          {
            opacity: 0.38,
            scale: 1,
            duration: 0.75,
            ease: MOTION_EASE.outExpo,
          },
          0.12
        );
      }

      // 3. Staggered editorial link entrance
      if (items.length > 0) {
        tl.to(
          items,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.035,
            ease: MOTION_EASE.outExpo,
            clearProps: 'transform',
          },
          '-=0.28'
        );
      }

      // 4. Social bar settle
      if (socialBar) {
        tl.to(
          socialBar,
          {
            opacity: 1,
            y: 0,
            duration: 0.38,
            ease: MOTION_EASE.outExpo,
            clearProps: 'transform',
          },
          '-=0.25'
        );
      }
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;

      if (reduced) {
        gsap.set(overlay, {
          visibility: 'hidden',
          opacity: 0,
          clipPath: 'inset(0% 0% 100% 0%)',
          pointerEvents: 'none',
        });
        if (atmosphere) gsap.set(atmosphere, { opacity: 0, scale: 0.94 });
        document.body.classList.remove('nav-open');
        triggerRef?.current?.focus();
        return;
      }

      gsap.set(overlay, { pointerEvents: 'none' });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { visibility: 'hidden' });
          document.body.classList.remove('nav-open');
          triggerRef?.current?.focus();
        },
      });
      activeTlRef.current = tl;

      if (socialBar) {
        tl.to(
          socialBar,
          {
            opacity: 0,
            y: 8,
            duration: 0.16,
            ease: MOTION_EASE.micro,
          },
          0
        );
      }

      if (items.length > 0) {
        tl.to(
          items,
          {
            opacity: 0,
            y: -10,
            duration: 0.2,
            stagger: 0.015,
            ease: MOTION_EASE.micro,
          },
          0
        );
      }

      if (atmosphere) {
        tl.to(
          atmosphere,
          {
            opacity: 0,
            scale: 0.94,
            duration: 0.25,
            ease: MOTION_EASE.micro,
          },
          0.04
        );
      }

      tl.to(
        overlay,
        {
          opacity: 0,
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.38,
          ease: MOTION_EASE.inOutEditorial,
        },
        0.1
      );
    }

    return () => {
      activeTlRef.current?.kill();
    };
  }, [isOpen, triggerRef]);

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('nav-open');
    };
  }, []);

  // Escape key & accessible focus cycling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const overlay = overlayRef.current;
        if (!overlay) return;

        const overlayFocusable = Array.from(
          overlay.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        const focusables = triggerRef?.current
          ? [triggerRef.current, ...overlayFocusable]
          : overlayFocusable;

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
          if (active === first || !focusables.includes(active as HTMLElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !focusables.includes(active as HTMLElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!isOpen}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-40 overflow-y-auto overflow-x-hidden bg-void text-primary"
      style={{ visibility: 'hidden', opacity: 0 }}
    >
      {/* Restrained ambient aurora backdrop */}
      <div
        ref={atmosphereRef}
        aria-hidden="true"
        className="aurora-ambient pointer-events-none fixed -bottom-32 right-[-10%] h-[420px] w-[420px] rounded-full blur-3xl md:h-[620px] md:w-[620px]"
        style={{ opacity: 0 }}
      />

      <Container
        size="wide"
        className="relative flex min-h-full flex-col justify-between pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-12"
      >
        {/* Clean 2-Column Editorial Chapter Navigation */}
        <nav
          aria-label="Primary"
          className="my-auto py-4"
        >
          <div className="group/nav grid grid-cols-1 gap-x-12 md:grid-cols-2 lg:gap-x-20 xl:gap-x-28">
            {[LEFT_COLUMN_ITEMS, RIGHT_COLUMN_ITEMS].map((column, colIdx) => (
              <ul
                key={colIdx}
                className={cn(
                  'divide-y divide-border-subtle border-border-subtle border-b',
                  colIdx === 0 ? 'border-t' : 'border-t-0 md:border-t'
                )}
              >
                {column.map((item, rowIdx) => {
                  const globalIdx = colIdx * 4 + rowIdx;
                  return (
                    <li key={item.id} ref={setItemRef(globalIdx)}>
                      <a
                        ref={globalIdx === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'group/link relative flex min-h-[54px] items-center justify-between gap-4 py-3.5 sm:min-h-[64px] sm:py-4 lg:min-h-[76px] lg:py-5',
                          'transition-opacity duration-[var(--duration-ui)] ease-[var(--ease-out-expo)]',
                          'md:group-hover/nav:opacity-40 hover:!opacity-100 focus-visible:!opacity-100',
                          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora-lavender'
                        )}
                      >
                        <div className="flex items-baseline gap-4 sm:gap-5">
                          <span className="font-mono text-[length:var(--text-mono-xs)] tabular-nums text-secondary transition-colors duration-[var(--duration-micro)] group-hover/link:text-aurora-lavender group-focus-visible/link:text-aurora-lavender">
                            {item.index}
                          </span>
                          <span className="font-display text-[clamp(1.625rem,3.1vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.025em] text-primary transition-transform duration-[var(--duration-ui)] ease-[var(--ease-out-expo)] sm:group-hover/link:translate-x-2.5 group-focus-visible/link:translate-x-2">
                            {item.label}
                          </span>
                        </div>

                        <span
                          aria-hidden="true"
                          className="h-[1px] w-0 bg-gradient-to-r from-aurora-violet via-aurora-lavender to-aurora-cyan transition-all duration-[var(--duration-ui)] ease-[var(--ease-out-expo)] group-hover/link:w-8 group-focus-visible/link:w-8"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </nav>

        {/* Bottom Social Channels */}
        <div
          ref={socialBarRef}
          className="mt-8 flex items-center justify-end border-t border-border-subtle pt-5"
        >
          <ul
            aria-label="Social channels"
            className="flex items-center gap-2 sm:gap-3"
          >
            {NAVIGATION_SOCIALS.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] text-secondary transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)] hover:-translate-y-0.5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-aurora-lavender"
                >
                  <SocialIcon id={social.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
