import React from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'aurora';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

export type ButtonAsButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

export type ButtonAsLinkProps = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-void border border-primary hover:bg-white hover:border-white active:scale-[0.99]',
  secondary:
    'bg-surface text-primary border border-border hover:bg-elevated hover:border-border-strong active:scale-[0.99]',
  ghost:
    'bg-transparent text-secondary border border-transparent hover:text-primary hover:bg-white/[0.04]',
  aurora:
    'bg-elevated text-primary border border-aurora-violet/45 hover:border-aurora-cyan/60 hover:shadow-[0_0_24px_-6px_rgba(139,92,246,0.4)] active:scale-[0.99]',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-[36px] px-3.5 py-1.5 text-[length:var(--text-body-sm)] gap-2',
  md: 'min-h-[44px] px-5 py-2.5 text-[length:var(--text-body-sm)] gap-2.5',
  lg: 'min-h-[48px] px-7 py-3 text-[length:var(--text-body-md)] gap-3',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center rounded-[var(--radius-sm)] font-sans font-medium tracking-[-0.005em] transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)] cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-aurora-lavender disabled:opacity-45 disabled:pointer-events-none';

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );

  if (typeof props.href === 'string') {
    const { href, ...anchorProps } = rest as Omit<
      ButtonAsLinkProps,
      keyof ButtonBaseProps
    >;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = rest as Omit<
    ButtonAsButtonProps,
    keyof ButtonBaseProps
  >;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
