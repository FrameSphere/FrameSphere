// src/components/ProductIcons.jsx
// Alle echten Produkt- und WebApp-Icons als inline SVG-Komponenten.
// Gradient-IDs sind pro Komponente unique benannt um Konflikte zu vermeiden.

import React from 'react';

/* ── API-PRODUKTE ──────────────────────────────────────────────────────────── */

export const FrameSpellIcon = ({ size = 56, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
    width={size} height={size} className={className}>
    <defs>
      <linearGradient id="fs-bg-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#6366f1" />
        <stop offset="55%"  stopColor="#a855f7" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" ry="22" fill="url(#fs-bg-g)" />
    <rect x="19" y="29" width="46" height="9"  rx="4.5" fill="rgba(255,255,255,0.92)" />
    <rect x="19" y="43" width="37" height="9"  rx="4.5" fill="rgba(255,255,255,0.92)" />
    <rect x="19" y="57" width="28" height="9"  rx="4.5" fill="rgba(255,255,255,0.92)" />
    <rect x="19" y="70" width="9"  height="4"  rx="2"   fill="rgba(244,114,182,0.85)" />
    <rect x="31" y="70" width="9"  height="4"  rx="2"   fill="rgba(244,114,182,0.85)" />
    <rect x="43" y="70" width="6"  height="4"  rx="2"   fill="rgba(244,114,182,0.85)" />
    <circle cx="74" cy="74" r="18" fill="rgba(244,114,182,0.22)" />
    <circle cx="74" cy="74" r="14.5" fill="white" />
    <polyline points="65.5,74.5 71.5,80.5 82.5,67.5"
      fill="none" stroke="#6366f1" strokeWidth="4.2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const RateLimitIcon = ({ size = 56, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
    width={size} height={size} className={className}>
    <defs>
      <linearGradient id="rl-bg-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#3b82f6" />
        <stop offset="50%"  stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#rl-bg-g)" />
    <g stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M32 14v4m0 24v4M18.64 18.64l2.83 2.83m17.06 17.06l2.83 2.83M14 32h4m24 0h4M18.64 45.36l2.83-2.83m17.06-17.06l2.83-2.83" />
      <circle cx="32" cy="32" r="6" fill="white" stroke="none" />
    </g>
  </svg>
);

export const FrameTrainIcon = ({ size = 56, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
    width={size} height={size} className={className}>
    <defs>
      <linearGradient id="ft-bg-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#a855f7" />
        <stop offset="50%"  stopColor="#ec4899" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#ft-bg-g)" />
    <text x="16" y="23" fontFamily="Arial, sans-serif" fontSize="18"
      fontWeight="900" fill="white" textAnchor="middle">F</text>
  </svg>
);

/* ── KeyScope (Keyword Engine) ─────────────────────────────────────────────── */
export const KeyScopeIcon = ({ size = 56, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
    width={size} height={size} className={className}>
    <defs>
      <linearGradient id="ks-a" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#2563EB" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="ks-b" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#D946EF" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="14" fill="url(#ks-a)" />
    <circle cx="26" cy="32" r="12" stroke="white" strokeWidth="3.5" fill="none" opacity="0.95" />
    <circle cx="26" cy="32" r="4"  fill="url(#ks-b)" opacity="0.9" />
    <line x1="35" y1="32" x2="52" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    <line x1="44" y1="32" x2="44" y2="38" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    <line x1="49" y1="32" x2="49" y2="36" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
  </svg>
);

/* ── SiteControl (Website Manager) ────────────────────────────────────────── */
export const SiteControlIcon = ({ size = 56, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
    width={size} height={size} className={className}>
    <defs>
      <linearGradient id="sc-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#5b6af6" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="14" fill="url(#sc-bg)" />
    {/* Sidebar strip */}
    <rect x="10" y="10" width="13" height="44" rx="4" fill="rgba(255,255,255,0.18)" />
    {/* Sidebar nav dots */}
    <rect x="13" y="15" width="7" height="3" rx="1.5" fill="white" opacity="0.9" />
    <rect x="13" y="21" width="7" height="3" rx="1.5" fill="white" opacity="0.6" />
    <rect x="13" y="27" width="7" height="3" rx="1.5" fill="white" opacity="0.6" />
    <rect x="13" y="33" width="7" height="3" rx="1.5" fill="white" opacity="0.6" />
    {/* Main content area */}
    <rect x="27" y="10" width="27" height="10" rx="3" fill="rgba(255,255,255,0.22)" />
    {/* KPI grid */}
    <rect x="27" y="24" width="12" height="8" rx="3" fill="rgba(255,255,255,0.75)" />
    <rect x="42" y="24" width="12" height="8" rx="3" fill="rgba(255,255,255,0.55)" />
    {/* List rows */}
    <rect x="27" y="36" width="27" height="3" rx="1.5" fill="rgba(255,255,255,0.45)" />
    <rect x="27" y="42" width="21" height="3" rx="1.5" fill="rgba(255,255,255,0.30)" />
    <rect x="27" y="48" width="17" height="3" rx="1.5" fill="rgba(255,255,255,0.20)" />
  </svg>
);

/* ── WEB APPS ──────────────────────────────────────────────────────────────── */

export const WordifyIcon = ({ size = 48, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
    width={size} height={size} className={className}>
    <rect width="100" height="100" fill="#6aaa64" rx="12" />
    <text x="50" y="72" fontFamily="Arial, sans-serif" fontSize="60"
      fontWeight="bold" fill="white" textAnchor="middle">W</text>
  </svg>
);

export const FlagGuessIcon = ({ size = 48, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
    width={size} height={size} className={className}>
    <rect width="100" height="100" fill="#1e293b" rx="12" />
    <rect x="14" y="14" width="72" height="46" fill="#3b82f6" rx="4" />
    <rect x="14" y="28" width="72" height="18" fill="#ef4444" />
    <rect x="14" y="46" width="72" height="14" fill="#22c55e" />
    <rect x="12" y="14" width="4" height="72" fill="#94a3b8" rx="2" />
  </svg>
);

export const BrawlMysteryIcon = ({ size = 48, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
    width={size} height={size} className={className}>
    <rect width="100" height="100" fill="#8B5CF6" rx="16" />
    <circle cx="50" cy="35" r="22" fill="#FCD34D" opacity="0.3" />
    <polygon points="50,15 55,30 70,30 58,40 63,55 50,45 37,55 42,40 30,30 45,30" fill="#FCD34D" />
    <path d="M 43 65 Q 43 58 50 58 Q 57 58 57 65 Q 57 72 50 76"
      fill="none" stroke="#FCD34D" strokeWidth="5" strokeLinecap="round" />
    <circle cx="50" cy="84" r="3" fill="#FCD34D" />
  </svg>
);

export const SpinSelectorIcon = ({ size = 48, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
    width={size} height={size} className={className}>
    <circle cx="50" cy="50" r="45" fill="#1e293b" stroke="#6366f1" strokeWidth="3" />
    <g transform="translate(50,50)">
      <path d="M0,0 L35,0 A35,35 0 0,1 24.7,24.7 Z"        fill="#ef4444"  opacity="0.9" />
      <path d="M0,0 L24.7,24.7 A35,35 0 0,1 0,35 Z"        fill="#3b82f6"  opacity="0.9" />
      <path d="M0,0 L0,35 A35,35 0 0,1 -24.7,24.7 Z"       fill="#22c55e"  opacity="0.9" />
      <path d="M0,0 L-24.7,24.7 A35,35 0 0,1 -35,0 Z"      fill="#f59e0b"  opacity="0.9" />
      <path d="M0,0 L-35,0 A35,35 0 0,1 -24.7,-24.7 Z"     fill="#8b5cf6"  opacity="0.9" />
      <path d="M0,0 L-24.7,-24.7 A35,35 0 0,1 0,-35 Z"     fill="#ec4899"  opacity="0.9" />
      <path d="M0,0 L0,-35 A35,35 0 0,1 24.7,-24.7 Z"      fill="#06b6d4"  opacity="0.9" />
      <path d="M0,0 L24.7,-24.7 A35,35 0 0,1 35,0 Z"       fill="#f97316"  opacity="0.9" />
    </g>
    <circle cx="50" cy="50" r="12" fill="#6366f1" />
    <circle cx="50" cy="50" r="8"  fill="white" />
    <path d="M50,5 L45,15 L55,15 Z" fill="#ef4444" />
  </svg>
);

export const TraitoraIcon = ({ size = 48, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
    width={size} height={size} className={className}>
    <defs>
      <linearGradient id="tr-bg-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#6366f1" />
        <stop offset="25%"  stopColor="#8b5cf6" />
        <stop offset="50%"  stopColor="#ec4899" />
        <stop offset="75%"  stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="#1e293b" />
    <ellipse cx="50" cy="45" rx="28" ry="32" fill="url(#tr-bg-g)" opacity="0.9" />
    <g transform="translate(50,45)">
      <path d="M-12,-8 Q-18,-8 -18,-2 Q-18,4 -12,8 Q-8,10 -4,8 Q0,6 0,0"
        fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12,-8 Q18,-8 18,-2 Q18,4 12,8 Q8,10 4,8 Q0,6 0,0"
        fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M-8,-2 Q-6,0 -8,2" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8,-2 Q6,0 8,2"   fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <ellipse cx="50" cy="78" rx="32" ry="12" fill="url(#tr-bg-g)" opacity="0.7" />
    <circle cx="50" cy="50" r="45" fill="none" stroke="#6366f1" strokeWidth="2.5" />
  </svg>
);

export const FileFlyrIcon = ({ size = 48, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
    width={size} height={size} className={className}>
    <defs>
      <linearGradient id="ff-bg-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#ff-bg-g)" rx="20" />
    <g transform="translate(50,50)">
      <rect x="-32" y="-20" width="20" height="28" fill="white" opacity="0.9" rx="2" />
      <line x1="-28" y1="-14" x2="-16" y2="-14" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="-28" y1="-9"  x2="-16" y2="-9"  stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="-28" y1="-4"  x2="-20" y2="-4"  stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M-7,-3 L0,-3" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M-2,-6 L2,-3 L-2,0" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7,3 L0,3"  stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M2,6 L-2,3 L2,0" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="12" y="-20" width="20" height="28" fill="white" opacity="0.9" rx="2" />
      <line x1="16" y1="-14" x2="28" y2="-14" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="-9"  x2="28" y2="-9"  stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="-4"  x2="24" y2="-4"  stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <path d="M70,25 L65,32 L68,32 L66,39 L71,32 L68,32 Z" fill="white" opacity="0.8" />
  </svg>
);
