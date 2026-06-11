import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'dark';
}

export default function Badge({ children, variant = 'red' }: BadgeProps) {
  const styles = {
    red: { background: 'rgba(255,29,37,0.12)', border: '1px solid rgba(255,29,37,0.3)', color: '#FF1D25' },
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
