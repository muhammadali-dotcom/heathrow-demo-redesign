'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  iconSize?: number;
}

export default function ThemeToggle({ className = '', iconSize = 18 }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className={`inline-flex items-center justify-center p-2 rounded-full border border-line bg-surface ${className}`} style={{ width: iconSize + 16, height: iconSize + 16 }} aria-hidden="true" />;
  }

  const isDark = resolvedTheme !== 'light';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`inline-flex items-center justify-center self-center p-2 rounded-full border border-line bg-surface text-fg hover:bg-surface-soft hover:text-muted transition-colors duration-200 ${className}`}
    >
      {isDark ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
    </button>
  );
}
