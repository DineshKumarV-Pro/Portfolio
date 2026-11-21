import React from 'react';
import { FULL_LOGO_PATH, LOGO_VIEWBOX } from './logoData';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  fill?: string;
}

export function Logo({ className = "w-full h-auto", fill = "#FFFFFF", ...props }: LogoProps) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DK Logo"
      {...props}
    >
      <path
        d={FULL_LOGO_PATH}
        fillRule="evenodd"
        clipRule="evenodd"
        fill={fill}
      />
    </svg>
  );
}
