// lib/design/tokens.ts
// Single source of truth for all visual values in ORIGINE.DIGITAL

export const colors = {
    // Primary palette
    bg: '#0B0D10',
    surface: '#11151A',
    surfaceHover: '#181C22',
    elevated: '#1A1E24',

    // Text
    textPrimary: '#E6EAF0',
    textSecondary: '#8A93A6',
    textTertiary: '#5A6378',
    textInverse: '#0B0D10',

    // Accent
    accent: '#6EE7B7',
    accentHover: '#5EE5A7',
    accentGlow: 'rgba(110, 231, 183, 0.25)',
    accentSoft: 'rgba(110, 231, 183, 0.08)',

    // Secondary accent
    purple: '#A78BFA',
    purpleSoft: 'rgba(167, 139, 250, 0.08)',

    // Semantic
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    info: '#60A5FA',

    // Borders
    border: 'rgba(255, 255, 255, 0.06)',
    borderHover: 'rgba(255, 255, 255, 0.12)',
    borderAccent: 'rgba(110, 231, 183, 0.2)',

    // Reality Score badges
    realityA: '#6EE7B7',
    realityB: '#34D399',
    realityC: '#FBBF24',
    realityD: '#F87171',

    // Shadows
    shadowSm: '0 2px 6px rgba(0, 0, 0, 0.2)',
    shadowMd: '0 8px 24px rgba(0, 0, 0, 0.25)',
    shadowLg: '0 16px 48px rgba(0, 0, 0, 0.35)',
    shadowGlow: '0 0 30px rgba(110, 231, 183, 0.25)',
} as const;

export const typography = {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    fontMono: "'JetBrains Mono', 'Fira Code', monospace",

    scale: {
        xs: '0.75rem',    // 12px
        sm: '0.8125rem',  // 13px
        base: '0.875rem', // 14px
        md: '0.9375rem',  // 15px
        lg: '1.0625rem',  // 17px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem',// 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
        '6xl': '3.75rem', // 60px
    },

    weight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
    },

    lineHeight: {
        tight: 1.1,
        snug: 1.3,
        normal: 1.5,
        relaxed: 1.7,
    },

    letterSpacing: {
        tighter: '-0.025em',
        tight: '-0.01em',
        normal: '-0.005em',
        wide: '0.02em',
        wider: '0.05em',
    },
} as const;

export const spacing = {
    '0': '0',
    '1': '0.25rem',   // 4px
    '2': '0.5rem',    // 8px
    '3': '0.75rem',   // 12px
    '4': '1rem',      // 16px
    '5': '1.25rem',   // 20px
    '6': '1.5rem',    // 24px
    '8': '2rem',      // 32px
    '10': '2.5rem',   // 40px
    '12': '3rem',     // 48px
    '16': '4rem',     // 64px
    '20': '5rem',     // 80px
} as const;

export const borderRadius = {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    full: '9999px',
} as const;

export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;

export const motion = {
    duration: {
        instant: '80ms',
        fast: '120ms',
        base: '180ms',
        slow: '260ms',
        slower: '400ms',
    },
    easing: {
        smooth: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        linear: 'linear',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    },
    // Pre-built transitions
    fadeIn: 'opacity 180ms cubic-bezier(0.2, 0.8, 0.2, 1)',
    slideUp: 'transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 180ms cubic-bezier(0.2, 0.8, 0.2, 1)',
    scale: 'transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const zIndex = {
    base: 0,
    dropdown: 10,
    sticky: 20,
    modal: 30,
    toast: 40,
    tooltip: 50,
} as const;
