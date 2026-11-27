import React from 'react';
import { cn } from '@/lib/utils';

export type TagVariant = 'default' | 'outline' | 'aurora';
export type TagSize = 'sm' | 'md';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  size?: TagSize;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<TagVariant, string> = {
  default: 'bg-surface text-secondary border border-border-subtle',
  outline: 'bg-transparent text-secondary border border-border',
  aurora:
    'bg-elevated/80 text-primary border border-aurora-violet/35 shadow-[0_0_16px_-6px_rgba(139,92,246,0.35)]',
};

const SIZE_CLASSES: Record<TagSize, string> = {
  sm: 'px-2.5 py-1 text-[length:var(--text-mono-xs)]',
  md: 'px-3 py-1.5 text-[length:var(--text-mono-sm)]',
};

export function Tag({
  variant = 'default',
  size = 'sm',
  className,
  children,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-mono leading-none tracking-[0.04em] whitespace-nowrap',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
