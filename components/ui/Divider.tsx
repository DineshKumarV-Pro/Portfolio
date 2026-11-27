import React from 'react';
import { cn } from '@/lib/utils';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'default' | 'subtle' | 'aurora';
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  spacing?: DividerSpacing;
}

const HORIZONTAL_SPACING: Record<DividerSpacing, string> = {
  none: 'my-0',
  sm: 'my-4',
  md: 'my-8',
  lg: 'my-12',
};

const VERTICAL_SPACING: Record<DividerSpacing, string> = {
  none: 'mx-0',
  sm: 'mx-3',
  md: 'mx-6',
  lg: 'mx-8',
};

export function Divider({
  orientation = 'horizontal',
  variant = 'default',
  spacing = 'none',
  className,
  ...props
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          'w-px self-stretch shrink-0',
          variant === 'aurora'
            ? 'bg-gradient-to-b from-transparent via-aurora-violet/50 to-transparent'
            : variant === 'subtle'
              ? 'bg-border-subtle'
              : 'bg-border',
          VERTICAL_SPACING[spacing],
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        'h-px w-full',
        variant === 'aurora'
          ? 'aurora-hairline'
          : variant === 'subtle'
            ? 'bg-border-subtle'
            : 'bg-border',
        HORIZONTAL_SPACING[spacing],
        className
      )}
      {...props}
    />
  );
}
