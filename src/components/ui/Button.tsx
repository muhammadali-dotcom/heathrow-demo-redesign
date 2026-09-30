import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer border outline-none text-center';

  const variantClasses = {
    primary: 'border-transparent bg-[var(--color-accent-solid)] text-[var(--color-accent-solid-fg)] hover:brightness-110 shadow-[0_16px_40px_rgba(var(--color-accent-rgb),0.28)] hover:shadow-[0_16px_40px_rgba(var(--color-accent-rgb),0.4)]',
    secondary: 'border-line bg-surface-soft text-fg hover:bg-fg/10',
    outline: 'border-line bg-transparent text-fg hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5',
    white: 'border-transparent bg-white text-[#0A0A0A] hover:bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.2)]',
  };

  const combinedClassName = cn(base, 'px-6 py-3', variantClasses[variant], className);

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
