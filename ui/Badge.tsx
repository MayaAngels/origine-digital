// components/ui/Badge.tsx
'use client';
import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'purple' | 'ai' | 'reality-a' | 'reality-b' | 'reality-c';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
    dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-[rgba(255,255,255,0.06)] text-[#8A93A6]',
    success: 'bg-[rgba(52,211,153,0.1)] text-[#34D399] border border-[rgba(52,211,153,0.2)]',
    warning: 'bg-[rgba(251,191,36,0.1)] text-[#FBBF24] border border-[rgba(251,191,36,0.2)]',
    danger: 'bg-[rgba(248,113,113,0.1)] text-[#F87171] border border-[rgba(248,113,113,0.2)]',
    purple: 'bg-[rgba(167,139,250,0.08)] text-[#A78BFA]',
    ai: 'bg-[rgba(110,231,183,0.1)] text-[#6EE7B7] uppercase tracking-wider',
    'reality-a': 'bg-[rgba(110,231,183,0.1)] text-[#6EE7B7] border border-[rgba(110,231,183,0.2)]',
    'reality-b': 'bg-[rgba(52,211,153,0.1)] text-[#34D399] border border-[rgba(52,211,153,0.2)]',
    'reality-c': 'bg-[rgba(251,191,36,0.1)] text-[#FBBF24] border border-[rgba(251,191,36,0.2)]',
};

export default function Badge({ children, variant = 'default', className = '', dot = false }: BadgeProps) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.65rem] font-semibold rounded-full ${variantStyles[variant]} ${className}`}>
            {dot && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
            {children}
        </span>
    );
}
