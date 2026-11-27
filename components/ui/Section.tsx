import React from 'react';
import { cn } from '@/lib/utils';

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg';
export type SectionSurface = 'void' | 'surface' | 'elevated';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  surface?: SectionSurface;
  bordered?: boolean;
  children: React.ReactNode;
}

const SPACING_CLASSES: Record<SectionSpacing, string> = {
  none: 'py-0',
  sm: 'py-[var(--space-section-sm)]',
  md: 'py-[var(--space-section-md)]',
  lg: 'py-[var(--space-section-lg)]',
};

const SURFACE_CLASSES: Record<SectionSurface, string> = {
  void: 'bg-void',
  surface: 'bg-surface',
  elevated: 'bg-elevated',
};

export function Section({
  spacing = 'md',
  surface = 'void',
  bordered = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative w-full',
        SPACING_CLASSES[spacing],
        SURFACE_CLASSES[surface],
        bordered && 'border-t border-border-subtle',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
