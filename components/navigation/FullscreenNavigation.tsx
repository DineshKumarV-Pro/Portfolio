'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { MOTION_EASE, prefersReducedMotion } from '@/lib/motion';
import {
  NAVIGATION_ITEMS,
  NAVIGATION_SOCIALS,
  type NavigationItem,
  type NavigationSocialLink,
} from './navigationData';

export interface FullscreenNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

const BANDS: [NavigationItem, NavigationItem][] = [
  [NAVIGATION_ITEMS[0], NAVIGATION_ITEMS[1]],
  [NAVIGATION_ITEMS[2], NAVIGATION_ITEMS[3]],
  [NAVIGATION_ITEMS[4], NAVIGATION_ITEMS[5]],
  [NAVIGATION_ITEMS[6], NAVIGATION_ITEMS[7]],
];

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
  const stageRef = useRef<HTMLDivElement | null>(null);
  const axisPulseRef = useRef<HTMLSpanElement | null>(null);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);
  const socialItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const activeTlRef = useRef<gsap.core.Timeline | null>(null);
  const isFirstMountRef = useRef(true);
  const wasOpenRef = useRef(false);

  const setBandRef = (index: number) => (el: HTMLDivElement | null) => {
    bandRefs.current[index] = el;
  };

  const setSocialRef = (index: number) => (el: HTMLLIElement | null) => {
    socialItemRefs.current[index] = el;
  };

  // Track vertical axis aurora pulse to the active/hovered band
  const trackAxisToBand = useCallback((bandIndex: number) => {
    if (prefersReducedMotion()) return;
    const stage = stageRef.current;
    const pulse = axisPulseRef.current;
    const band = bandRefs.current[bandIndex];
    if (!stage || !pulse || !band) return;

    const stageRect = stage.getBoundingClientRect();
    const bandRect = band.getBoundingClientRect();
    const targetY =
      bandRect.top - stageRect.top + bandRect.height / 2 - pulse.offsetHeight / 2;

    gsap.to(pulse, {
      y: targetY,
      opacity: 0.9,
      duration: 0.4,
      ease: MOTION_EASE.outExpo,
    });
  }, []);

  // GSAP coordinated opening & closing choreography (Concept B x C)
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const atmosphere = atmosphereRef.current;
    const pulse = axisPulseRef.current;
    const bands = bandRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    const socials = socialItemRefs.current.filter(
      (el): el is HTMLLIElement => el !== null
    );

    activeTlRef.current?.kill();

    if (isFirstMountRef.current && !isOpen) {
      isFirstMountRef.current = false;
      gsap.set(overlay, {
        visibility: 'hidden',
        opacity: 0,
        clipPath: 'inset(50% 0% 50% 0%)',
        pointerEvents: 'none',
      });
      if (atmosphere) gsap.set(atmosphere, { opacity: 0, scale: 0.92 });
      return;
    }

    isFirstMountRef.current = false;
    const reduced = prefersReducedMotion();

    if (isOpen) {
      wasOpenRef.current = true;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('nav-open');

      if (reduced) {
        gsap.set(overlay, {
          visibility: 'visible',
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          pointerEvents: 'auto',
        });
        if (atmosphere) gsap.set(atmosphere, { opacity: 0.45, scale: 1 });
        if (pulse) gsap.set(pulse, { opacity: 0.75, y: 0 });
        gsap.set(bands, { opacity: 1, x: 0 });
        gsap.set(socials, { opacity: 1, y: 0 });
        firstLinkRef.current?.focus();
        return;
      }

      gsap.set(overlay, {
        visibility: 'visible',
        pointerEvents: 'none',
      });
      if (atmosphere) gsap.set(atmosphere, { opacity: 0, scale: 0.92 });
      if (pulse) gsap.set(pulse, { opacity: 0, y: 32 });

      bands.forEach((band, idx) => {
        gsap.set(band, {
          opacity: 0,
          x: idx % 2 === 0 ? -36 : 36,
        });
      });
      gsap.set(socials, { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: 'auto' });
          firstLinkRef.current?.focus();
        },
      });
      activeTlRef.current = tl;

      // Stage 1: Widescreen horizontal slit aperture expansion
      tl.fromTo(
        overlay,
        {
          opacity: 0,
          clipPath: 'inset(50% 0% 50% 0%)',
        },
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.55,
          ease: MOTION_EASE.inOutEditorial,
        },
        0
      );

      // Stage 2: Atmospheric radial depth bloom
      if (atmosphere) {
        tl.to(
          atmosphere,
          {
            opacity: 0.45,
            scale: 1,
            duration: 0.8,
            ease: MOTION_EASE.outExpo,
          },
          0.14
        );
      }

      // Stage 3: Counter-offset typographic bands glide inward
      if (bands.length > 0) {
        tl.to(
          bands,
          {
            opacity: 1,
            x: 0,
            duration: 0.62,
            stagger: 0.06,
            ease: MOTION_EASE.outExpo,
            clearProps: 'transform',
          },
          '-=0.52'
        );
      }

      // Stage 4: Vertical axis aurora pulse illuminates
      if (pulse) {
        tl.to(
          pulse,
          {
            opacity: 0.75,
            duration: 0.45,
            ease: MOTION_EASE.outExpo,
          },
          '-=0.4'
        );
      }

      // Stage 5: Social icons reveal in the negative-space anchor
      if (socials.length > 0) {
        tl.to(
          socials,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: MOTION_EASE.outExpo,
            clearProps: 'transform',
          },
          '-=0.35'
        );
      }
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;

      if (reduced) {
        gsap.set(overlay, {
          visibility: 'hidden',
          opacity: 0,
          clipPath: 'inset(50% 0% 50% 0%)',
          pointerEvents: 'none',
        });
        if (atmosphere) gsap.set(atmosphere, { opacity: 0, scale: 0.92 });
        document.body.style.overflow = '';
        document.body.classList.remove('nav-open');
        triggerRef?.current?.focus();
        return;
      }

      gsap.set(overlay, { pointerEvents: 'none' });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { visibility: 'hidden' });
          document.body.style.overflow = '';
          document.body.classList.remove('nav-open');
          triggerRef?.current?.focus();
        },
      });
      activeTlRef.current = tl;

      if (socials.length > 0) {
        tl.to(
          socials,
          {
            opacity: 0,
            y: 8,
            duration: 0.18,
            stagger: 0.02,
            ease: MOTION_EASE.micro,
          },
          0
        );
      }

      if (bands.length > 0) {
        bands.forEach((band, idx) => {
          tl.to(
            band,
            {
              opacity: 0,
              x: idx % 2 === 0 ? -24 : 24,
              duration: 0.24,
              ease: MOTION_EASE.micro,
            },
            idx * 0.02
          );
        });
      }

      if (pulse) {
        tl.to(pulse, { opacity: 0, duration: 0.2 }, 0);
      }

      if (atmosphere) {
        tl.to(
          atmosphere,
          {
            opacity: 0,
            scale: 0.92,
            duration: 0.28,
            ease: MOTION_EASE.micro,
          },
          0.04
        );
      }

      // Collapse aperture back to horizontal center slit
      tl.to(
        overlay,
        {
          opacity: 0,
          clipPath: 'inset(50% 0% 50% 0%)',
          duration: 0.42,
          ease: MOTION_EASE.inOutEditorial,
        },
        0.12
      );
    }

    return () => {
      activeTlRef.current?.kill();
    };
  }, [isOpen, triggerRef]);

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
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
      {/* Subtle atmospheric depth glow */}
      <div
        ref={atmosphereRef}
        aria-hidden="true"
        className="aurora-ambient pointer-events-none fixed top-1/2 left-[68%] -translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px] rounded-full blur-3xl md:h-[680px] md:w-[680px]"
        style={{ opacity: 0 }}
      />

      <Container
        size="wide"
        className="relative flex min-h-full flex-col justify-center pt-20 pb-8 sm:pt-24 sm:pb-10 lg:py-24"
      >
        {/* Widescreen Editorial Aperture Frame */}
        <div className="relative grid grid-cols-1 border-y border-border-subtle py-6 sm:py-8 lg:grid-cols-[26%_74%] lg:py-0">
          {/* Primary Navigation Stage (Right 74% on Desktop, Top on Mobile/Tablet) */}
          <nav
            aria-label="Primary"
            className="order-1 lg:order-2"
          >
            <div
              ref={stageRef}
              className={cn(
                'group/stage relative flex flex-col justify-between gap-2 sm:gap-5 lg:gap-7',
                'border-l border-border-subtle pl-5 sm:border-l-0 sm:pl-0',
                'lg:border-l lg:border-border-subtle lg:py-10 lg:pl-12 xl:pl-16'
              )}
            >
              {/* Vertical Axis Aurora Pulse (Desktop) */}
              <span
                ref={axisPulseRef}
                aria-hidden="true"
                className="pointer-events-none absolute -left-[1px] top-0 hidden h-24 w-[2px] bg-gradient-to-b from-transparent via-aurora-violet to-aurora-cyan lg:block"
                style={{ opacity: 0 }}
              />

              {BANDS.map((pair, bandIdx) => {
                const isEvenBand = bandIdx % 2 === 1;
                return (
                  <div
                    key={pair[0].id}
                    ref={setBandRef(bandIdx)}
                    className={cn(
                      'flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8',
                      isEvenBand
                        ? 'lg:pl-[12%] lg:pr-0'
                        : 'lg:pl-0 lg:pr-[12%]'
                    )}
                  >
                    {pair.map((item, itemIdx) => {
                      const globalIndex = bandIdx * 2 + itemIdx;
                      const isPrimaryScale =
                        item.id === 'home' ||
                        item.id === 'works' ||
                        item.id === 'contact';
                      const mobileStagger =
                        globalIndex % 2 === 1 ? 'pl-5 sm:pl-0' : 'pl-0';

                      return (
                        <a
                          key={item.id}
                          ref={globalIndex === 0 ? firstLinkRef : undefined}
                          href={item.href}
                          onClick={onClose}
                          onMouseEnter={() => trackAxisToBand(bandIdx)}
                          onFocus={() => trackAxisToBand(bandIdx)}
                          className={cn(
                            'group/link relative inline-flex min-h-[48px] items-start gap-2.5 py-1.5 sm:gap-3 sm:py-1',
                            'transition-opacity duration-[var(--duration-ui)] ease-[var(--ease-out-expo)]',
                            'group-hover/stage:opacity-25 hover:!opacity-100 focus-visible:!opacity-100',
                            'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aurora-lavender',
                            mobileStagger
                          )}
                        >
                          {/* Localized Aurora Spotlight Halo (appears only behind hovered/focused link) */}
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-x-5 -inset-y-3 -z-10 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.28)_0%,rgba(103,217,255,0.14)_48%,transparent_74%)] opacity-0 blur-xl transition-opacity duration-[var(--duration-ui)] group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
                          />

                          <span className="mt-1.5 font-mono text-[length:var(--text-mono-xs)] tabular-nums text-secondary transition-colors duration-[var(--duration-micro)] group-hover/link:text-aurora-cyan group-focus-visible/link:text-aurora-cyan sm:mt-2">
                            {item.index}
                          </span>

                          <span
                            className={cn(
                              'font-display font-medium leading-[1] tracking-[-0.035em] text-primary',
                              'transition-transform duration-[var(--duration-ui)] ease-[var(--ease-out-expo)]',
                              'sm:group-hover/link:translate-x-2.5 sm:group-hover/link:-translate-y-0.5 sm:group-hover/link:-skew-x-2',
                              'group-focus-visible/link:translate-x-2',
                              isPrimaryScale
                                ? 'text-[clamp(1.75rem,4vw,3.625rem)]'
                                : 'text-[clamp(1.5rem,3.4vw,3.125rem)]'
                            )}
                          >
                            {item.label}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Left Negative-Space Anchor Zone (26% on Desktop, Bottom on Mobile/Tablet) */}
          <div className="order-2 mt-6 flex items-end border-t border-border-subtle pt-5 sm:mt-8 sm:pt-6 lg:order-1 lg:mt-0 lg:border-t-0 lg:py-10 lg:pr-8">
            <ul
              aria-label="Social channels"
              className="flex items-center gap-2 sm:gap-3"
            >
              {NAVIGATION_SOCIALS.map((social, idx) => (
                <li key={social.id} ref={setSocialRef(idx)}>
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
        </div>
      </Container>
    </div>
  );
}
