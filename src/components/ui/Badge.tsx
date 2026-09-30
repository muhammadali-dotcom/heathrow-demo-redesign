import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'dark';
}

export default function Badge({ children, variant = 'red' }: BadgeProps) {
  const styles = {
    red: { background: 'rgba(var(--color-accent-rgb), 0.12)', border: '1px solid rgba(var(--color-accent-rgb), 0.3)', color: 'var(--color-accent)' },
    dark: { background: 'var(--color-surface-soft)', border: '1px solid var(--color-line)', color: 'var(--color-muted)' },
  };
  return (
    <span
      className="inline-block text-xs font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full"
      style={styles[variant]}
    >
      {children}
    </span>
  );
}
