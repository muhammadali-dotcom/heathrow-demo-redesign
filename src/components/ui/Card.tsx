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
        background: 'var(--color-surface)',
        border: '1px solid var(--color-line)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
