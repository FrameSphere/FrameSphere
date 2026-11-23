/** @type {import('tailwindcss').Config} */

/*
 * FrameSphere Design-Tokens — "Ink / Bone / Signal"
 *
 * Zwei Grundfarben + ein Signal (siehe DESIGN.md):
 *   ink    – tiefes, neutrales Schwarz (kein Blaustich)
 *   bone   – warmes Off-White und die daraus abgeleitete Grau-Skala
 *   signal – Zinnoberrot, die EINE Farbe, die heraussticht
 *
 * Die bunten Tailwind-Familien (blue, purple, indigo …) werden bewusst
 * umgeleitet, damit alle bestehenden Seiten automatisch in dieses
 * 2+1-Farbsystem fallen: kühle Töne → neutral (bone), violette/pinke
 * Töne → signal. Grün, Rot, Amber bleiben als Status-Farben semantisch.
 */

const signal = {
  50: '#FFF1EE',
  100: '#FFDFD8',
  200: '#FFBFB1',
  300: '#FF9580',
  400: '#FF6A4F',
  500: '#FF4D2E',
  600: '#E8381A',
  700: '#C02A12',
  800: '#8F2111',
  900: '#5E1A0F',
  950: '#330B05',
};

// Warme Neutral-Skala, abgeleitet von "bone" (#F2EFE8)
const bone = {
  50: '#F7F5F0',
  100: '#F2EFE8',
  200: '#E3DFD5',
  300: '#C9C4B8',
  400: '#A6A196',
  500: '#827E75',
  600: '#625F58',
  700: '#46443F',
  800: '#2E2D2A',
  900: '#1E1D1B',
  950: '#121211',
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        signal,
        bone,
        ink: '#0B0B0C',
        primary: signal,
        // Bunte Deko-Familien → 2+1-System
        purple: signal,
        violet: signal,
        fuchsia: signal,
        pink: signal,
        rose: signal,
        orange: signal,
        indigo: bone,
        blue: bone,
        sky: bone,
        cyan: bone,
        teal: bone,
        gray: bone,
        slate: bone,
        zinc: bone,
        dark: {
          950: '#070708',
          900: '#0B0B0C',
          800: '#131315',
          700: '#1B1B1E',
          600: '#242428',
          500: '#2E2E33',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Geist', 'system-ui', 'sans-serif'],
        sans: ['Geist', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        // Etwas kantiger als Tailwind-Default: wirkt präziser, weniger "Template"
        lg: '6px',
        xl: '10px',
        '2xl': '14px',
        '3xl': '20px',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      animation: {
        spin: 'spin 1s linear infinite',
        marquee: 'marquee 40s linear infinite',
        blink: 'blink 1.1s steps(2, start) infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          to: { visibility: 'hidden' },
        },
      },
    },
  },
  plugins: [],
};
