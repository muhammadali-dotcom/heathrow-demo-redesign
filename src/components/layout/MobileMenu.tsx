'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronDown } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { services } from '@/data/services';
import { COMPANY_NAME } from '@/lib/constants';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [servicesOpen, setServicesOpen] = useState(false);

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
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] flex flex-col"
        style={{ background: 'var(--color-bg-alt)', borderLeft: '1px solid var(--color-line)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-line">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/images/fleet/bittacylogo.png"
                alt="Bittacy Cars Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-fg font-bold text-base">{COMPANY_NAME}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle iconSize={20} />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 rounded-lg text-muted hover:text-fg hover:bg-fg/5 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navLinks.map((link) =>
            link.label === 'Services' ? (
              <div key={link.href}>
                <button
                  type="button"
                  onClick={() => setServicesOpen((open) => !open)}
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services-list"
                  className="flex items-center justify-between w-full px-4 py-3 text-muted hover:text-fg hover:bg-fg/5 rounded-xl text-sm font-medium transition-colors"
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200"
                    style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {servicesOpen && (
                  <div id="mobile-services-list" className="flex flex-col pl-4">
                    {services.map((s) => (
                      <Link
                        key={s.id}
                        href={s.href}
                        onClick={onClose}
                        className="px-4 py-2.5 text-muted hover:text-fg hover:bg-fg/5 rounded-xl text-sm transition-colors"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="px-4 py-3 text-muted hover:text-fg hover:bg-fg/5 rounded-xl text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Contact Now CTA */}
        <div className="p-6 border-t border-line">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-semibold text-sm"
            style={{ background: '#cc200e' }}
          >
            Contact Now
          </Link>
        </div>
      </div>
    </div>
  );
}
