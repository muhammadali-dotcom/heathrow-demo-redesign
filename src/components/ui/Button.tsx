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
    primary: 'border-transparent bg-gradient-to-r from-[#FF1D25] to-[#D90012] text-white hover:brightness-110 shadow-[0_16px_40px_rgba(255,29,37,0.28)] hover:shadow-[0_16px_40px_rgba(255,29,37,0.4)]',
    secondary: 'border-white/10 bg-white/5 text-white hover:bg-white/10',
    outline: 'border-white/20 bg-transparent text-white hover:border-[#FF1D25] hover:text-[#FF1D25] hover:bg-[#FF1D25]/5',
    white: 'border-transparent bg-white text-[#D90012] hover:bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.2)]',
  };

  const combinedClassName = cn(base, 'px-6 py-3', variantClasses[variant], className);

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...(props as any)}>
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
