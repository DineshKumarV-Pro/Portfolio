import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: string;
  label: string;
  accent?: 'monochrome' | 'aurora';
}

export function SectionLabel({
  index,
  label,
  accent = 'monochrome',
  className,
  ...props
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.14em] text-secondary',
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          'inline-block h-1.5 w-1.5 rounded-full shrink-0',
          accent === 'aurora'
            ? 'bg-gradient-to-tr from-aurora-violet via-aurora-lavender to-aurora-cyan shadow-[0_0_10px_rgba(139,92,246,0.65)]'
            : 'bg-secondary/70'
        )}
      />
      {index ? (
        <span className="text-primary/80 tabular-nums">{index}</span>
      ) : null}
      {index ? (
        <span aria-hidden="true" className="text-border">
          /
        </span>
      ) : null}
      <span>{label}</span>
    </div>
  );
}
