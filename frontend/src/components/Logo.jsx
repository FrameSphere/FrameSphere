import React from 'react';

// Bildmarke: ein Rahmen (Frame) um einen Punkt (Sphere).
// Der Punkt ist das Signal – das einzige farbige Element des Logos.
export const LogoMark = ({ size = 28, className = '' }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M7 13V7h6M25 13V7h-6M7 19v6h6M25 19v6h-6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="square"
    />
    <circle cx="16" cy="16" r="4.5" fill="#FF4D2E" />
  </svg>
);

const Logo = ({ className = '' }) => (
  <span className={`inline-flex items-center gap-2 text-bone-100 ${className}`}>
    <LogoMark />
    <span className="font-display text-[19px] font-bold tracking-[-0.04em]">FrameSphere</span>
  </span>
);

export default Logo;
