'use client';

import React from 'react';

interface ShinyTextProps {
  text: string;
  className?: string;
  shimmerColor?: string;
  speed?: number;
}

export function ShinyText({
  text,
  className = '',
  shimmerColor = 'rgba(255, 255, 255, 0.9)',
  speed = 3,
}: ShinyTextProps) {
  return (
    <span
      className={`relative inline-block overflow-hidden bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(200, 202, 211, 0.4) 0%, rgba(200, 202, 211, 0.6) 20%, ${shimmerColor} 50%, rgba(200, 202, 211, 0.6) 80%, rgba(200, 202, 211, 0.4) 100%)`,
        backgroundSize: '200% 100%',
        animation: `shiny-shimmer ${speed}s infinite linear`,
      }}
    >
      {text}
    </span>
  );
}

