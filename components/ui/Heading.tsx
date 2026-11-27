import React from 'react';
import { cn } from '@/lib/utils';

export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
export type HeadingSize =
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-sm';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingElement;
  size?: HeadingSize;
  aurora?: boolean;
  children: React.ReactNode;
}

const SIZE_CLASSES: Record<HeadingSize, string> = {
  'display-xl':
    'text-[length:var(--text-display-xl)] leading-[1.02] tracking-[-0.03em] font-semibold',
  'display-lg':
    'text-[length:var(--text-display-lg)] leading-[1.06] tracking-[-0.025em] font-semibold',
  'display-md':
    'text-[length:var(--text-display-md)] leading-[1.12] tracking-[-0.02em] font-medium',
  'heading-lg':
    'text-[length:var(--text-heading-lg)] leading-[1.18] tracking-[-0.015em] font-medium',
  'heading-md':
    'text-[length:var(--text-heading-md)] leading-[1.28] tracking-[-0.01em] font-medium',
  'heading-sm':
    'text-[length:var(--text-heading-sm)] leading-[1.35] tracking-[-0.005em] font-medium',
};

export function Heading({
  as: Component = 'h2',
  size = 'heading-lg',
  aurora = false,
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(
        'font-display text-primary',
        SIZE_CLASSES[size],
        aurora && 'aurora-text',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
