'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Plane, GraduationCap, MapPin, Briefcase } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { services } from '@/data/services';
import { COMPANY_NAME } from '@/lib/constants';
import MobileMenu from './MobileMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';

const serviceIcons: Record<string, React.ElementType> = {
  'airport-transfers': Plane,
  'school-runs': GraduationCap,
  'local-rides': MapPin,
  'corporate-travel': Briefcase,
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'background 0.3s ease',
        }}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-line ${
          scrolled ? 'bg-bg-alt/92' : 'bg-bg-alt/75'
        }`}
      >
        <div className="max-w-7xl mx-auto section-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/fleet/bittacylogo.png"
                  alt="Bittacy Cars Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-fg font-bold text-lg tracking-tight hidden sm:block">
                {COMPANY_NAME}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.label === 'Services' ? (
                  /* ── Hover dropdown ── */
                  <div key={link.href} className="relative group">
                    <button
                      type="button"
                      aria-haspopup="true"
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted hover:text-fg rounded-lg transition-colors duration-200 whitespace-nowrap"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200 group-hover:rotate-180"
                      />
                    </button>

                    {/* Dropdown panel */}
                    <div
                      className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible translate-y-1
                                 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                                 transition-all duration-200 ease-out"
                      role="menu"
                      id="header-services-dropdown"
                    >
                      <div
                        className="rounded-2xl overflow-hidden py-2"
                        style={{
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-line)',
                          boxShadow: '0 16px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08)',
                        }}
                      >
                        {services.map((s) => {
                          const Icon = serviceIcons[s.id] ?? MapPin;
                          return (
                            <Link
                              key={s.id}
                              href={s.href}
                              role="menuitem"
                              className="group/item flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-fg/5"
                            >
                              <span
                                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-150"
                                style={{
                                  background: 'rgba(204,32,14,0.1)',
                                  border: '1px solid rgba(204,32,14,0.18)',
                                }}
                              >
                                <Icon size={14} style={{ color: '#cc200e' }} />
                              </span>
                              <div>
                                <div className="text-sm font-semibold text-fg leading-tight">
                                  {s.title}
                                </div>
                                <div className="text-xs text-muted leading-tight mt-0.5">
                                  {s.description}
                                </div>
                              </div>
                            </Link>
                          );
                        })}

                        {/* Footer link */}
                        <div className="mx-4 mt-1 pt-2" style={{ borderTop: '1px solid var(--color-line)' }}>
                          <Link
                            href="/services"
                            className="flex items-center justify-between py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-150"
                            style={{ color: '#cc200e' }}
                          >
                            View All Services
                            <ChevronDown size={12} className="-rotate-90" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-muted hover:text-fg rounded-lg transition-colors duration-200 whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Contact Now CTA */}
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:brightness-110"
              style={{
                background: 'var(--color-accent)',
                boxShadow: '0 4px 16px rgba(204,32,14,0.28)',
              }}
            >
              Contact Now
            </Link>

            <div className="hidden lg:flex items-center">
              <ThemeToggle className="ml-2" />
            </div>

            {/* Mobile: toggle + hamburger grouped top-right */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle iconSize={18} />
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="flex flex-col gap-1.5 p-2 rounded-lg"
              >
                <span className="block w-6 h-0.5 rounded-full" style={{ background: 'var(--color-fg)' }} />
                <span className="block w-6 h-0.5 rounded-full" style={{ background: 'var(--color-fg)' }} />
                <span className="block w-4 h-0.5 rounded-full" style={{ background: 'var(--color-fg)' }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
