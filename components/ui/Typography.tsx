import React from 'react';

interface TypographyProps { children: React.ReactNode; className?: string; as?: keyof JSX.IntrinsicElements; }

export function H1({ children, className = '', as: Component = 'h1' }: TypographyProps) {
    return <Component className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[#E6EAF0] ${className}`}>{children}</Component>;
}

export function H2({ children, className = '', as: Component = 'h2' }: TypographyProps) {
    return <Component className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#E6EAF0] ${className}`}>{children}</Component>;
}

export function H3({ children, className = '', as: Component = 'h3' }: TypographyProps) {
    return <Component className={`text-lg sm:text-xl font-semibold tracking-tight text-[#E6EAF0] ${className}`}>{children}</Component>;
}

export function Body({ children, className = '', as: Component = 'p' }: TypographyProps) {
    return <Component className={`text-sm text-[#8A93A6] leading-relaxed ${className}`}>{children}</Component>;
}

export function Caption({ children, className = '', as: Component = 'span' }: TypographyProps) {
    return <Component className={`text-xs text-[#5A6378] uppercase tracking-wider font-medium ${className}`}>{children}</Component>;
}

export function Gradient({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <span className={`bg-gradient-to-r from-[#6EE7B7] to-[#A78BFA] bg-clip-text text-transparent ${className}`}>{children}</span>;
}
