export const colors = {
    bg: '#0B0D10',
    surface: '#11151A',
    surfaceHover: '#181C22',
    elevated: '#1A1E24',
    textPrimary: '#E6EAF0',
    textSecondary: '#8A93A6',
    textTertiary: '#5A6378',
    accent: '#6EE7B7',
    accentHover: '#5EE5A7',
    purple: '#A78BFA',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    border: 'rgba(255, 255, 255, 0.06)',
} as const;

export const typography = {
    fontFamily: "'Inter', system-ui, sans-serif",
    scale: { xs: '0.75rem', sm: '0.8125rem', base: '0.875rem', lg: '1.0625rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem' },
    weight: { normal: '400', medium: '500', semibold: '600', bold: '700', extrabold: '800' },
} as const;

export const spacing = { '1': '0.25rem', '2': '0.5rem', '3': '0.75rem', '4': '1rem', '6': '1.5rem', '8': '2rem', '12': '3rem', '16': '4rem' } as const;
export const borderRadius = { sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' } as const;
export const breakpoints = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' } as const;
