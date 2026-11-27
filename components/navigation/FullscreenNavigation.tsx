'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { cn } from '@/lib/utils';
import { MOTION_DURATION, MOTION_EASE, prefersReducedMotion } from '@/lib/motion';
import {
  NAVIGATION_ITEMS,
  NAVIGATION_META,
  NAVIGATION_SOCIALS,
} from './navigationData';

export interface FullscreenNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function FullscreenNavigation({
  isOpen,
  onClose,
  id = 'fullscreen-navigation',
  triggerRef,
}: FullscreenNavigationProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const auroraRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const supportRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const activeTlRef = useRef<gsap.core.Timeline | null>(null);
  const isFirstMountRef = useRef(true);
  const wasOpenRef = useRef(false);

  const setNavItemRef = (index: number) => (el: HTMLLIElement | null) => {
    navItemRefs.current[index] = el;
  };

  const setSupportRef = (index: number) => (el: HTMLDivElement | null) => {
    supportRefs.current[index] = el;
  };

  // GSAP coordinated opening & closing timeline
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const aurora = auroraRef.current;
    const navItems = navItemRefs.current.filter(
      (el): el is HTMLLIElement => el !== null
    );
    const supportItems = supportRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );

    activeTlRef.current?.kill();

    // Keep closed and hidden on initial mount
    if (isFirstMountRef.current && !isOpen) {
      isFirstMountRef.current = false;
      gsap.set(overlay, {
        visibility: 'hidden',
        opacity: 0,
        clipPath: 'inset(0% 0% 100% 0%)',
        pointerEvents: 'none',
      });
      if (aurora) {
        gsap.set(aurora, { opacity: 0, scale: 0.92 });
      }
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
        if (aurora) gsap.set(aurora, { opacity: 0.5, scale: 1 });
        gsap.set(navItems, { opacity: 1, y: 0 });
        gsap.set(supportItems, { opacity: 1, y: 0 });
        firstLinkRef.current?.focus();
        return;
      }

      gsap.set(overlay, {
        visibility: 'visible',
        pointerEvents: 'none',
      });
      if (aurora) gsap.set(aurora, { opacity: 0, scale: 0.92 });
      gsap.set(navItems, { opacity: 0, y: 28 });
      gsap.set(supportItems, { opacity: 0, y: 18 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: 'auto' });
          firstLinkRef.current?.focus();
        },
      });
      activeTlRef.current = tl;

      // 1. Overlay spatial reveal
      tl.fromTo(
        overlay,
        {
          opacity: 0,
          clipPath: 'inset(0% 0% 100% 0%)',
        },
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.55,
          ease: MOTION_EASE.inOutEditorial,
        },
        0
      );

      // 2. Atmospheric aurora spatial light transition
      if (aurora) {
        tl.to(
          aurora,
          {
            opacity: 0.5,
            scale: 1,
            duration: 0.85,
            ease: MOTION_EASE.outExpo,
          },
          0.12
        );
      }

      // 3. Oversized editorial navigation typography entrance
      if (navItems.length > 0) {
        tl.to(
          navItems,
          {
            opacity: 1,
            y: 0,
            duration: MOTION_DURATION.reveal * 0.85,
            stagger: 0.04,
            ease: MOTION_EASE.outExpo,
            clearProps: 'transform',
          },
          '-=0.58'
        );
      }

      // 4. Supporting editorial statement, metadata & channels
      if (supportItems.length > 0) {
        tl.to(
          supportItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.05,
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
          clipPath: 'inset(0% 0% 100% 0%)',
          pointerEvents: 'none',
        });
        if (aurora) gsap.set(aurora, { opacity: 0, scale: 0.92 });
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

      // Reverse exit: supporting items, nav typography, aurora & overlay
      if (supportItems.length > 0) {
        tl.to(
          supportItems,
          {
            opacity: 0,
            y: -10,
            duration: 0.2,
            stagger: 0.02,
            ease: MOTION_EASE.micro,
          },
          0
        );
      }

      if (navItems.length > 0) {
        tl.to(
          navItems,
          {
            opacity: 0,
            y: -14,
            duration: 0.24,
            stagger: 0.015,
            ease: MOTION_EASE.micro,
          },
          0.02
        );
      }

      if (aurora) {
        tl.to(
          aurora,
          {
            opacity: 0,
            scale: 0.92,
            duration: 0.32,
            ease: MOTION_EASE.micro,
          },
          0.05
        );
      }

      tl.to(
        overlay,
        {
          opacity: 0,
          clipPath: 'inset(0% 0% 100% 0%)',
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

  // Cleanup body scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('nav-open');
    };
  }, []);

  // Escape key & focus cycling between overlay links and trigger close button
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
      {/* Restrained atmospheric aurora light layer */}
      <div
        ref={auroraRef}
        aria-hidden="true"
        className="aurora-ambient pointer-events-none fixed -top-36 right-[-12%] h-[500px] w-[500px] rounded-full blur-3xl md:h-[700px] md:w-[700px]"
        style={{ opacity: 0 }}
      />

      <Container
        size="wide"
        className="relative flex min-h-full flex-col justify-between pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-28 lg:pb-12"
      >
        {/* Top contextual navigation strip aligned beneath Header */}
        <div
          ref={setSupportRef(0)}
          className="mb-8 flex items-center justify-between border-b border-border-subtle pb-4 sm:mb-10"
        >
          <span className="font-mono text-[length:var(--text-mono-xs)] uppercase tracking-[0.16em] text-secondary">
            Index / 08 Destinations
          </span>
          <span className="hidden font-mono text-[length:var(--text-mono-xs)] uppercase tracking-[0.14em] text-secondary sm:inline-block">
            {NAVIGATION_META.role}
          </span>
        </div>

        {/* Asymmetric Brutalist-Editorial Composition */}
        <div className="editorial-grid items-start gap-y-10 lg:gap-y-0">
          {/* Dominant Primary Navigation Grid */}
          <nav
            aria-label="Primary"
            className="col-span-4 sm:col-span-8 lg:col-span-8 lg:pr-10"
          >
            <ul className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2 sm:gap-y-2 lg:gap-x-12 lg:gap-y-3">
              {NAVIGATION_ITEMS.map((item, idx) => (
                <li key={item.id} ref={setNavItemRef(idx)}>
                  <a
                    ref={idx === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'group relative flex min-h-[48px] flex-col justify-center py-2 sm:py-2.5 lg:py-3',
                      'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aurora-lavender'
                    )}
                  >
                    <div className="flex items-baseline gap-3 sm:gap-4">
                      <span className="font-mono text-[length:var(--text-mono-xs)] tabular-nums text-secondary transition-colors duration-[var(--duration-ui)] group-hover:text-aurora-lavender group-focus-visible:text-aurora-lavender">
                        {item.index}
                      </span>
                      <span className="font-display text-[clamp(1.625rem,3.6vw,3.35rem)] font-medium leading-[1.06] tracking-[-0.025em] text-primary transition-transform duration-[var(--duration-ui)] ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-focus-visible:translate-x-2">
                        {item.label}
                      </span>
                    </div>

                    {/* Restrained secondary descriptor & aurora hairline */}
                    <div className="mt-1.5 flex items-center gap-3 pl-7 sm:pl-8">
                      <span
                        aria-hidden="true"
                        className="h-[1px] w-4 bg-border transition-all duration-[var(--duration-ui)] ease-[var(--ease-out-expo)] group-hover:w-8 group-hover:bg-gradient-to-r group-hover:from-aurora-violet group-hover:to-aurora-cyan group-focus-visible:w-8"
                      />
                      <span className="font-sans text-[length:var(--text-body-sm)] text-secondary/70 transition-colors duration-[var(--duration-ui)] group-hover:text-secondary">
                        {item.description}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Supporting Editorial & Metadata Column */}
          <aside className="col-span-4 flex flex-col justify-between gap-8 sm:col-span-8 lg:col-span-4 lg:border-l lg:border-border-subtle lg:pl-10">
            <div ref={setSupportRef(1)} className="space-y-6">
              <p className="font-sans text-[length:var(--text-body-md)] leading-[1.6] text-secondary">
                {NAVIGATION_META.statement}
              </p>

              <div className="flex items-center gap-2.5 text-[length:var(--text-body-sm)] text-primary/90">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 shrink-0 rounded-full bg-gradient-to-tr from-aurora-violet to-aurora-cyan shadow-[0_0_10px_rgba(103,217,255,0.5)]"
                />
                <span>{NAVIGATION_META.availability}</span>
              </div>

              <Divider variant="subtle" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <p className="font-mono text-[length:var(--text-mono-xs)] uppercase tracking-[0.14em] text-secondary">
                    Location
                  </p>
                  <p className="mt-1 font-sans text-[length:var(--text-body-sm)] text-primary/90">
                    {NAVIGATION_META.location}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[length:var(--text-mono-xs)] uppercase tracking-[0.14em] text-secondary">
                    Direct Contact
                  </p>
                  <a
                    href={`mailto:${NAVIGATION_META.email}`}
                    className="mt-1 inline-block font-mono text-[length:var(--text-mono-sm)] text-primary/90 transition-colors duration-[var(--duration-micro)] hover:text-aurora-lavender focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-aurora-lavender"
                  >
                    {NAVIGATION_META.email}
                  </a>
                </div>
              </div>
            </div>

            <div ref={setSupportRef(2)} className="space-y-2.5">
              <p className="font-mono text-[length:var(--text-mono-xs)] uppercase tracking-[0.14em] text-secondary">
                Channels
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-1">
                {NAVIGATION_SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.external ? '_blank' : undefined}
                      rel={social.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-[44px] items-center font-mono text-[length:var(--text-mono-sm)] text-secondary transition-colors duration-[var(--duration-micro)] hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-aurora-lavender"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Bottom Editorial Footer */}
        <div
          ref={setSupportRef(3)}
          className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border-subtle pt-5 font-mono text-[length:var(--text-mono-xs)] text-secondary sm:flex-row sm:items-center"
        >
          <span>Monochrome × Aurora</span>
          <span>Press Esc or M to toggle</span>
        </div>
      </Container>
    </div>
  );
}
