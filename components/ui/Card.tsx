'use client';
import React from 'react';

interface CardProps { children: React.ReactNode; className?: string; hover?: boolean; padding?: 'none' | 'sm' | 'md' | 'lg'; onClick?: () => void; }
const paddingStyles = { none: '', sm: 'p-3', md: 'p-4', lg: 'p-6' };

export default function Card({ children, className = '', hover = false, padding = 'md', onClick }: CardProps) {
    return <div className={`bg-[#11151A] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden ${hover ? 'hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-180 cursor-pointer' : ''} ${paddingStyles[padding]} ${className}`} onClick={onClick}>{children}</div>;
}

Card.Header = function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <div className={`flex items-center gap-3 mb-3 ${className}`}>{children}</div>; };
Card.Title = function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <h3 className={`font-semibold text-[#E6EAF0] text-sm ${className}`}>{children}</h3>; };
Card.Description = function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <p className={`text-[#8A93A6] text-xs leading-relaxed ${className}`}>{children}</p>; };
Card.Footer = function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <div className={`flex items-center gap-3 mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)] ${className}`}>{children}</div>; };
