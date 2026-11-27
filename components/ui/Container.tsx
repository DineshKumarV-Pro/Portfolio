import React from 'react';
import { cn } from '@/lib/utils';

export type ContainerSize = 'narrow' | 'default' | 'wide' | 'full';
export type ContainerElement = 'div' | 'main' | 'section' | 'header' | 'footer';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  size?: ContainerSize;
  as?: ContainerElement;
  children: React.ReactNode;
}

const SIZE_CLASSES: Record<ContainerSize, string> = {
  narrow: 'max-w-[52rem]',
  default: 'max-w-[75rem]',
  wide: 'max-w-[90rem]',
  full: 'max-w-none',
};

export function Container({
  size = 'default',
  as: Component = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-12',
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
