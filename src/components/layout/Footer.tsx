import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Clock, MessageCircle, Share2, AtSign } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { services } from '@/data/services';
import { EMAIL, LOCATION, COMPANY_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: '#0B0B0D',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/fleet/bittacylogo.png"
                  alt="Bittacy Cars Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-lg">{COMPANY_NAME}</span>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">
              Mill Hill&apos;s most trusted taxi service. Reliable, professional and
              always on time for airport transfers, school runs and local rides across
              North London.
            </p>
            <div className="flex gap-3">
              {[
                { icon: MessageCircle, label: 'Facebook' },
                { icon: AtSign, label: 'Instagram' },
                { icon: Share2, label: 'Twitter' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-[#A1A1AA] hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#A1A1AA] hover:text-[#FF1D25] text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={s.href} className="text-[#A1A1AA] hover:text-[#FF1D25] text-sm transition-colors duration-200">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-200 hover:brightness-110"
                  style={{
                    background: 'linear-gradient(135deg, #FF1D25, #D90012)',
                    boxShadow: '0 4px 16px rgba(255,29,37,0.28)',
                  }}
                >
                  Contact Now
                </Link>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 text-[#A1A1AA] hover:text-white text-sm transition-colors">
                  <Mail size={15} className="mt-0.5 text-[#FF1D25] flex-shrink-0" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-[#A1A1AA] text-sm">
                  <MapPin size={15} className="mt-0.5 text-[#FF1D25] flex-shrink-0" />
                  {LOCATION}
                </span>
              </li>
              <li>
                <span className="flex items-start gap-3 text-[#A1A1AA] text-sm">
                  <Clock size={15} className="mt-0.5 text-[#FF1D25] flex-shrink-0" />
                  24 Hours, 7 Days a Week
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A1A1AA] text-xs">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-[#A1A1AA] hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[#A1A1AA] hover:text-white text-xs transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
