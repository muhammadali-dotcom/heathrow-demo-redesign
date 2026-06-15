import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Clock, Phone } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { services } from '@/data/services';
import { EMAIL, LOCATION, COMPANY_NAME, PHONE } from '@/lib/constants';

// Inline SVG icons for social platforms not available in this lucide version
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { Icon: FacebookIcon, label: 'Facebook', href: '#' },
  { Icon: InstagramIcon, label: 'Instagram', href: '#' },
  { Icon: XIcon, label: 'X (Twitter)', href: '#' },
];

const contactItems = [
  { icon: Phone, label: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, label: LOCATION, href: null },
  { icon: Clock, label: '24 Hours, 7 Days a Week', href: null },
];

export default function Footer() {
  return (
    <footer
      className="border-t relative z-10"
      style={{
        background: '#0B0B0D',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="flex flex-col">
            {/* Logo — same vertical height as the headings in other columns */}
            <div className="flex items-center gap-3 mb-4" style={{ minHeight: '28px' }}>
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image
                  src="/images/fleet/bittacylogo.png"
                  alt="Bittacy Cars Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-base tracking-wide">{COMPANY_NAME}</span>
            </div>

            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">
              Mill Hill&apos;s most trusted taxi service. Reliable, professional and
              always on time for airport transfers, school runs and local rides across
              North London.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-auto">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-[#A1A1AA] hover:text-white transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4" style={{ minHeight: '28px', display: 'flex', alignItems: 'center' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A1A1AA] hover:text-[#C0392B] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4" style={{ minHeight: '28px', display: 'flex', alignItems: 'center' }}>
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={s.href}
                    className="text-[#A1A1AA] hover:text-[#C0392B] text-sm transition-colors duration-200"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4" style={{ minHeight: '28px', display: 'flex', alignItems: 'center' }}>
              Contact
            </h3>

            <ul className="space-y-3 mb-6">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="flex items-start gap-3 text-[#A1A1AA] hover:text-white text-sm transition-colors group"
                    >
                      <Icon
                        size={15}
                        className="mt-0.5 text-[#cc200e] flex-shrink-0 group-hover:text-[#ff3a27] transition-colors"
                        strokeWidth={2}
                      />
                      <span>{label}</span>
                    </a>
                  ) : (
                    <span className="flex items-start gap-3 text-[#A1A1AA] text-sm">
                      <Icon
                        size={15}
                        className="mt-0.5 text-[#cc200e] flex-shrink-0"
                        strokeWidth={2}
                      />
                      <span>{label}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-200 hover:brightness-110 w-full sm:w-auto"
              style={{
                background: 'linear-gradient(135deg, #cc200e, #cc200e)',
                boxShadow: '0 4px 16px rgba(192,57,43,0.28)',
              }}
            >
              Contact Now
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A1A1AA] text-xs">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-[#A1A1AA] hover:text-white text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[#A1A1AA] hover:text-white text-xs transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
