'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { NavItemData } from './navData';

interface FlowingPreviewProps {
  activeItem: NavItemData;
  isMenuOpen: boolean;
}

export function FlowingPreview({ activeItem, isMenuOpen }: FlowingPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imageLayerRef = useRef<HTMLDivElement | null>(null);
  const metaLayerRef = useRef<HTMLDivElement | null>(null);

  // Keep track of current and previous item for smooth cross-flowing transition
  const [displayedItem, setDisplayedItem] = useState<NavItemData>(activeItem);
  const [previousItem, setPreviousItem] = useState<NavItemData | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Parallax tilt on mouse move (desktop only)
  useEffect(() => {
    const el = containerRef.current;
    const frame = frameRef.current;
    if (!el || !frame) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      gsap.to(frame, {
        rotateY: x * 4,
        rotateX: -y * 4,
        x: x * 8,
        y: y * 8,
        duration: 0.8,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(frame, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf(frame);
    };
  }, []);

  // Handle activeItem changes with flowing GSAP choreography
  useEffect(() => {
    if (activeItem.id === displayedItem.id) return;

    setPreviousItem(displayedItem);
    setDisplayedItem(activeItem);
    setIsTransitioning(true);

    const meta = metaLayerRef.current;
    const imgLayer = imageLayerRef.current;

    const ctx = gsap.context(() => {
      // Flowing text metadata transition
      if (meta) {
        gsap.fromTo(
          meta.querySelectorAll('.meta-reveal'),
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.out',
            overwrite: 'auto',
          }
        );
      }

      // Flowing image cross-reveal
      if (imgLayer) {
        const incomingImg = imgLayer.querySelector('.incoming-img');
        const outgoingImg = imgLayer.querySelector('.outgoing-img');

        if (incomingImg) {
          gsap.fromTo(
            incomingImg,
            {
              scale: 1.12,
              opacity: 0,
              clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            },
            {
              scale: 1,
              opacity: 1,
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration: 0.75,
              ease: 'power3.inOut',
              onComplete: () => {
                setIsTransitioning(false);
                setPreviousItem(null);
              },
            }
          );
        }

        if (outgoingImg) {
          gsap.to(outgoingImg, {
            scale: 0.96,
            opacity: 0,
            duration: 0.55,
            ease: 'power2.inOut',
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeItem, displayedItem]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col justify-center items-center select-none"
    >
      {/* Ambient Aurora Violet Backlight */}
      <div
        className="absolute -inset-8 bg-gradient-to-tr from-[#35205E]/20 via-[#7040D8]/15 to-transparent blur-3xl pointer-events-none rounded-full"
        style={{ animation: 'aurora-pulse 8s infinite ease-in-out' }}
      />

      {/* Main Preview Editorial Frame */}
      <div
        ref={frameRef}
        className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border border-[#292832] bg-[#0B0B12] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] flex flex-col justify-between p-6 transition-all duration-300"
      >
        {/* Subtle Chrome Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C8CAD3]/40 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#C8CAD3]/40 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#C8CAD3]/40 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C8CAD3]/40 rounded-br-xl pointer-events-none" />

        {/* Top Metadata Header */}
        <div className="relative z-20 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#9295A3] uppercase">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: displayedItem.previewMetadata.accent }}
            />
            <span className="text-[#F0F0F5] font-semibold">{displayedItem.number} // 05</span>
          </div>
          <span className="text-[#51515D]">{displayedItem.category}</span>
        </div>

        {/* Dynamic Image Layers (Flowing Transition) */}
        <div
          ref={imageLayerRef}
          className="absolute inset-0 z-10 w-full h-full overflow-hidden"
        >
          {/* Outgoing Image Layer (during transition) */}
          {previousItem && isTransitioning && (
            <div className="outgoing-img absolute inset-0 w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previousItem.previewImage}
                alt={previousItem.title}
                className="w-full h-full object-cover object-center filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-[#0B0B12]/40 to-transparent" />
            </div>
          )}

          {/* Active / Incoming Image Layer */}
          <div className="incoming-img absolute inset-0 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayedItem.previewImage}
              alt={displayedItem.title}
              className="w-full h-full object-cover object-center filter brightness-90"
            />
            {/* Dark Obsidian Gradient Overlay to guarantee high text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-[#0B0B12]/50 to-transparent" />
          </div>
        </div>

        {/* Bottom Content Metadata Block */}
        <div
          ref={metaLayerRef}
          className="relative z-20 mt-auto flex flex-col gap-2 pt-6"
        >
          <div className="meta-reveal flex flex-wrap gap-1.5">
            {displayedItem.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[9px] font-mono tracking-wider text-[#C2A8FF] bg-[#20202B]/80 backdrop-blur-md border border-[#292832] rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h4 className="meta-reveal text-xl font-bold tracking-tight text-[#F0F0F5]">
            {displayedItem.previewMetadata.headline}
          </h4>

          <p className="meta-reveal text-xs text-[#9295A3] font-light leading-relaxed line-clamp-2">
            {displayedItem.previewMetadata.caption}
          </p>

          <div className="meta-reveal pt-2 border-t border-[#292832]/60 flex items-center justify-between text-[10px] font-mono tracking-wider text-[#51515D]">
            <span>{displayedItem.previewMetadata.metrics}</span>
            <span className="text-[#C8CAD3]">SECTION {displayedItem.number}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

