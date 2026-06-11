'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { COMPANY_NAME } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="absolute right-0 top-0 bottom-0 w-80 flex flex-col"
        style={{ background: '#0B0B0D', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#262626]">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/images/fleet/bittacylogo.png"
                alt="Bittacy Cars Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-white font-bold text-base">{COMPANY_NAME}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="px-4 py-3 text-[#A1A1AA] hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact Now CTA */}
        <div className="p-6 border-t border-[#262626]">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg, #FF1D25, #D90012)' }}
          >
            Contact Now
          </Link>
        </div>
      </div>
    </div>
  );
}
