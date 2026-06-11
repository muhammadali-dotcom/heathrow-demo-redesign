import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Card({ children, className, style }: CardProps) {
  return (
    <div
      className={cn('rounded-3xl overflow-hidden', className)}
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))',
        border: '1px solid rgba(255,255,255,0.1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
