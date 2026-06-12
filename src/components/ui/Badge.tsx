import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'dark';
}

export default function Badge({ children, variant = 'red' }: BadgeProps) {
  const styles = {
    red: { background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)', color: '#cc200e' },
    dark: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#A1A1AA' },
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
