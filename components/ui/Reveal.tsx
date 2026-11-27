'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE,
  prefersReducedMotion,
} from '@/lib/motion';

export type RevealDirection = 'up' | 'down' | 'none';
export type RevealElement = 'div' | 'section' | 'article' | 'span';

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: RevealElement;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  children: React.ReactNode;
}

export function Reveal({
  as: Component = 'div',
  direction = 'up',
  delay = 0,
  duration = MOTION_DURATION.reveal,
  distance = MOTION_DISTANCE.default,
  once = true,
  className,
  children,
  ...props
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const offsetY =
      direction === 'up' ? distance : direction === 'down' ? -distance : 0;

    gsap.set(el, { opacity: 0, y: offsetY });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimatedRef.current) return;
            hasAnimatedRef.current = true;

            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: MOTION_EASE.outExpo,
              clearProps: 'transform',
            });

            if (once) {
              observer.unobserve(el);
            }
          } else if (!once && hasAnimatedRef.current) {
            gsap.set(el, { opacity: 0, y: offsetY });
            hasAnimatedRef.current = false;
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(el);
    };
  }, [direction, delay, duration, distance, once]);

  const Tag = Component as React.ElementType;

  return (
    <Tag ref={containerRef} className={cn(className)} {...props}>
      {children}
    </Tag>
  );
}
