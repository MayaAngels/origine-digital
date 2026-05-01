import React from 'react';

interface GridProps { children: React.ReactNode; className?: string; cols?: 1 | 2 | 3 | 4 | 5 | 6; gap?: 'sm' | 'md' | 'lg'; }
const colStyles = { 1: 'grid-cols-1', 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', 4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4', 5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5', 6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6' };
const gapStyles = { sm: 'gap-3', md: 'gap-5', lg: 'gap-8' };

export default function Grid({ children, className = '', cols = 3, gap = 'md' }: GridProps) {
    return <div className={`grid ${colStyles[cols]} ${gapStyles[gap]} ${className}`}>{children}</div>;
}
