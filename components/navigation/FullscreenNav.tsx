'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { NAV_ITEMS, PORTFOLIO_META, NavItemData } from './navData';
import { FlowingPreview } from './FlowingPreview';
import { ShinyText } from './ShinyText';

interface FullscreenNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullscreenNav({ isOpen, onClose }: FullscreenNavProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const [activeItem, setActiveItem] = useState<NavItemData>(NAV_ITEMS[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [timeString, setTimeString] = useState<string>('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat('en-GB', options).format(now) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation & Focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Up / Down arrow navigation between items
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = NAV_ITEMS.findIndex((item) => item.id === activeItem.id);
        const nextIndex =
          e.key === 'ArrowDown'
            ? (currentIndex + 1) % NAV_ITEMS.length
            : (currentIndex - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
        setActiveItem(NAV_ITEMS[nextIndex]);
        setHoveredId(NAV_ITEMS[nextIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeItem, onClose]);

  // Master GSAP Staggered Entrance & Exit Timeline
  useEffect(() => {
    const container = containerRef.current;
    const backdrop = backdropRef.current;
    const navItems = navListRef.current ? navListRef.current.querySelectorAll('.nav-item-wrapper') : [];
    const preview = previewRef.current;
    const footer = footerRef.current;

    if (!container || !backdrop) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (isOpen) {
        // Lock body scrolling
        document.body.classList.add('nav-open');
        gsap.set(container, { display: 'flex', pointerEvents: 'auto' });

        if (prefersReducedMotion) {
          gsap.set(backdrop, { opacity: 1 });
          gsap.set([preview, footer, ...Array.from(navItems)], { opacity: 1, y: 0 });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 1. Expand deep full dark backdrop curtain
        tl.fromTo(
          backdrop,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            opacity: 0,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: 0.6,
            ease: 'power4.inOut',
          }
        );

        // 2. Stagger navigation items upwards with mask
        if (navItems.length > 0) {
          tl.fromTo(
            navItems,
            { y: 55, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.07,
              ease: 'power3.out',
            },
            '-=0.25'
          );
        }

        // 3. Reveal preview and footer
        if (preview) {
          tl.fromTo(
            preview,
            { scale: 0.94, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.55 },
            '-=0.45'
          );
        }

        if (footer) {
          tl.fromTo(
            footer,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45 },
            '-=0.35'
          );
        }
      } else {
        // Exit sequence
        if (prefersReducedMotion) {
          gsap.set(container, { display: 'none', pointerEvents: 'none' });
          document.body.classList.remove('nav-open');
          return;
        }

        const exitTl = gsap.timeline({
          onComplete: () => {
            gsap.set(container, { display: 'none', pointerEvents: 'none' });
            document.body.classList.remove('nav-open');
          },
        });

        exitTl.to(navItems, {
          y: -20,
          opacity: 0,
          duration: 0.25,
          stagger: 0.03,
          ease: 'power2.in',
        });

        if (preview) {
          exitTl.to(preview, { opacity: 0, duration: 0.2 }, '-=0.2');
        }

        exitTl.to(
          backdrop,
          {
            opacity: 0,
            duration: 0.35,
            ease: 'power3.inOut',
          },
          '-=0.1'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  const handleItemClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 hidden flex-col justify-between w-screen h-screen overflow-hidden select-none bg-[#000000] pt-20 md:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label="DK Portfolio Navigation"
    >
      {/* Layer 1: Pure Full Dark Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 w-full h-full bg-[#000000] overflow-hidden pointer-events-none"
      >
        {/* Subtle Architectural Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-20" />
      </div>

      {/* Layer 2: Main Editorial Body (Asymmetrical Grid) */}
      <main className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center px-6 md:px-12 py-4 md:py-6 overflow-y-auto lg:overflow-hidden">
        {/* Left Column: Navigation Typography List (60-65% width on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-center py-4 lg:py-0">
          <ul ref={navListRef} className="flex flex-col gap-1 sm:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem.id === item.id;

              return (
                <li
                  key={item.id}
                  className="nav-item-wrapper overflow-hidden"
                  onMouseEnter={() => {
                    setActiveItem(item);
                    setHoveredId(item.id);
                  }}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <button
                    onClick={() => handleItemClick(item.href)}
                    className="group relative w-full text-left py-2.5 sm:py-3.5 px-3 rounded-xl transition-all duration-300 cursor-pointer flex flex-col focus:outline-none focus-visible:bg-[#121218]"
                  >
                    {/* Active Background Subtle Sheen */}
                    <div
                      className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none ${
                        isActive
                          ? 'bg-gradient-to-r from-[#1B1B22]/80 via-[#121218]/40 to-transparent opacity-100 border-l-2 border-[#8A55F5]'
                          : 'opacity-0'
                      }`}
                    />

                    {/* Primary Title Line */}
                    <div className="relative z-10 flex items-baseline gap-4 sm:gap-6">
                      {/* Number Index */}
                      <span
                        className={`text-xs sm:text-sm font-mono tracking-widest transition-colors duration-300 ${
                          isActive ? 'text-[#BCA3F5] font-semibold' : 'text-[#3D3D48]'
                        }`}
                      >
                        {item.number}
                      </span>

                      {/* Large Editorial Headline */}
                      <span
                        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight transition-all duration-300 ${
                          isActive
                            ? 'text-[#F0F0F5] translate-x-1.5 sm:translate-x-3'
                            : 'text-[#8A8D9A] group-hover:text-[#F0F0F5]'
                        }`}
                      >
                        {isActive ? (
                          <ShinyText text={item.title} shimmerColor="rgba(188, 163, 245, 0.9)" />
                        ) : (
                          item.title
                        )}
                      </span>

                      {/* Directional Arrow / Status Dot */}
                      <span
                        className={`ml-auto text-lg sm:text-xl font-mono transition-all duration-300 ${
                          isActive
                            ? 'text-[#8A55F5] opacity-100 translate-x-0'
                            : 'text-[#3D3D48] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0'
                        }`}
                      >
                        &rarr;
                      </span>
                    </div>

                    {/* Descriptor & Tagline (Expands on active/hover) */}
                    <div
                      className={`relative z-10 flex items-center gap-3 pl-8 sm:pl-12 pt-1 text-xs font-mono tracking-wider transition-all duration-300 ${
                        isActive
                          ? 'opacity-100 max-h-8 text-[#8A8D9A]'
                          : 'opacity-0 max-h-0 text-[#3D3D48] group-hover:opacity-70 group-hover:max-h-8'
                      }`}
                    >
                      <span className="text-[#C0C2CB] uppercase">{item.descriptor}</span>
                      <span className="text-[#3D3D48]">&bull;</span>
                      <span className="text-[#6236BD]">{item.tags[0]}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Column: Flowing Image Preview Window (35-40% width on desktop) */}
        <div
          ref={previewRef}
          className="lg:col-span-5 hidden lg:flex justify-center items-center h-full px-4"
        >
          <FlowingPreview activeItem={activeItem} isMenuOpen={isOpen} />
        </div>
      </main>

      {/* Layer 3: Editorial Information Footer */}
      <footer
        ref={footerRef}
        className="relative z-20 flex flex-col sm:flex-row items-center justify-between w-full px-6 py-4 md:px-12 md:py-5 border-t border-white/[0.08] bg-[#000000]/90 backdrop-blur-md text-[11px] font-mono tracking-wider text-[#8A8D9A] gap-3 sm:gap-0"
      >
        {/* Left: Location & Realtime IST Clock */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[#F0F0F5] uppercase font-semibold">
              {PORTFOLIO_META.location}
            </span>
          </div>
          <span className="text-[#3D3D48]">&bull;</span>
          <span className="text-[#8A8D9A]">{timeString || '15:10:00 IST'}</span>
          <span className="hidden md:inline text-[#3D3D48]">&bull;</span>
          <span className="hidden md:inline text-[#3D3D48]">
            {PORTFOLIO_META.coordinates}
          </span>
        </div>

        {/* Center: Dynamic Active Section Indicator */}
        <div className="hidden lg:flex items-center gap-2 text-[#C0C2CB]">
          <span className="text-[#3D3D48]">ACTIVE:</span>
          <span className="text-[#8A55F5] font-semibold">
            {activeItem.number} // {activeItem.title.toUpperCase()}
          </span>
        </div>

        {/* Right: Social & Transmission Links */}
        <div className="flex items-center gap-5">
          <span className="hidden xl:inline text-[#3D3D48]">TRANSMISSIONS:</span>
          {PORTFOLIO_META.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8A8D9A] hover:text-[#F0F0F5] transition-colors duration-200 underline-offset-4 hover:underline cursor-pointer"
            >
              {social.label} &nearr;
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
