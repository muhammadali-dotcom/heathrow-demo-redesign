import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  label?: string;
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({ label, title, subtitle, centered, className }: SectionTitleProps) {
  return (
    <div className={cn(centered ? 'text-center max-w-2xl mx-auto' : '', className)}>
      {label && (
        <span
          className="text-xs font-bold tracking-[0.2em] uppercase mb-3 block"
          style={{ color: '#FF1D25' }}
        >
          {label}
        </span>
      )}
      <h2
        className="text-3xl sm:text-4xl font-black text-white mb-4"
        style={{ letterSpacing: '-0.04em', lineHeight: 1.05 }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#A1A1AA] leading-relaxed text-base">{subtitle}</p>
      )}
    </div>
  );
}
