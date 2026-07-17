'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { services } from '@/data/services';
import { COMPANY_NAME } from '@/lib/constants';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          background: scrolled ? 'rgba(5,5,5,0.92)' : 'rgba(5,5,5,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          transition: 'background 0.3s ease',
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
                {COMPANY_NAME}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.label === 'Services' ? (
                  <div key={link.href} className="relative" ref={servicesRef}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((open) => !open)}
                      aria-expanded={servicesOpen}
                      aria-controls="header-services-dropdown"
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white hover:text-[#A1A1AA] rounded-lg transition-colors duration-200 whitespace-nowrap"
                      style={{ transition: 'color 0.2s' }}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200"
                        style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>
                    {servicesOpen && (
                      <div
                        id="header-services-dropdown"
                        className="absolute left-0 top-full mt-2 w-56 rounded-xl py-2 overflow-hidden"
                        style={{
                          background: '#111113',
                          border: '1px solid rgba(255,255,255,0.1)',
                          boxShadow: '0 12px 30px rgba(0,0,0,0.55)',
                        }}
                      >
                        {services.map((s) => (
                          <Link
                            key={s.id}
                            href={s.href}
                            onClick={() => setServicesOpen(false)}
                            className="block px-4 py-2.5 text-sm text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors"
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
                    className="px-4 py-2 text-sm font-medium text-[#A1A1AA] hover:text-white rounded-lg transition-colors duration-200 whitespace-nowrap"
                    style={{ transition: 'color 0.2s' }}
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
                background: '#cc200e',
                boxShadow: '0 4px 16px rgba(192,57,43,0.28)',
              }}
            >
              Contact Now
            </Link> 

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg"
            >
              <span className="block w-6 h-0.5 bg-white rounded-full" />
              <span className="block w-6 h-0.5 bg-white rounded-full" />
              <span className="block w-4 h-0.5 bg-white rounded-full" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
