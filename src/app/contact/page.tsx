'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { PHONE, EMAIL, LOCATION, COMPANY_NAME } from '@/lib/constants';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: PHONE,
    href: `tel:${PHONE.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: MapPin,
    label: 'Based In',
    value: LOCATION,
    href: null,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: '24 Hours, 7 Days a Week',
    href: null,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        className="relative pt-40 pb-20 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0B0B0D 0%, #050505 100%)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(192,57,43,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6"
            style={{
              background: 'rgba(192,57,43,0.12)',
              border: '1px solid rgba(192,57,43,0.3)',
              color: '#cc200e',
            }}
          >
            Get In Touch
          </span>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
            style={{ letterSpacing: '-0.04em', lineHeight: 1.02 }}
          >
            Contact{' '}
            <span style={{ color: '#cc200e' }}>Us</span>
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
            Ready to book or have a question? We&apos;d love to hear from you.
            Reach out and we&apos;ll get back to you as quickly as possible.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-3xl font-black text-white mb-8" style={{ letterSpacing: '-0.03em' }}>
                Get In Touch
              </h2>

              <div className="space-y-4 mb-10">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div
                      className="flex items-start gap-4 p-5 rounded-2xl"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #cc200e, #A93226)', boxShadow: '0 6px 16px rgba(192,57,43,0.3)' }}
                      >
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA] mb-1">
                          {item.label}
                        </div>
                        <div className="text-white font-semibold text-base">{item.value}</div>
                      </div>
                    </div>
                  );

                  if (item.href) {
                    return (
                      <a key={item.label} href={item.href} className="block transition-opacity hover:opacity-80">
                        {content}
                      </a>
                    );
                  }
                  return <div key={item.label}>{content}</div>;
                })}
              </div>

              {/* Quick call CTA */}
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(192,57,43,0.15), rgba(139,0,0,0.08))',
                  border: '1px solid rgba(192,57,43,0.25)',
                }}
              >
                <div className="relative z-10">
                  <div className="text-sm font-bold text-white mb-1">Prefer to call?</div>
                  <div className="text-[#A1A1AA] text-sm mb-4">
                    For immediate bookings, give us a call and we can arrange a driver for you right away.
                  </div>
                  <a
                    href={`tel:${PHONE.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 rounded-xl font-bold text-sm px-6 py-3 text-white transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #cc200e, #A93226)', boxShadow: '0 8px 20px rgba(192,57,43,0.3)' }}
                  >
                    <Phone size={15} />
                    {PHONE}
                  </a>
                </div>
              </div>
            </div>

            {/* Quote form */}
            <div>
              <div
                className="rounded-3xl p-8 sm:p-10"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'linear-gradient(135deg, #cc200e, #A93226)', boxShadow: '0 16px 40px rgba(192,57,43,0.35)' }}
                    >
                      <CheckCircle size={36} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3" style={{ letterSpacing: '-0.03em' }}>
                      Message Sent!
                    </h3>
                    <p className="text-[#A1A1AA] leading-relaxed">
                      Thank you for getting in touch. A member of our team will contact you shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black text-white mb-2" style={{ letterSpacing: '-0.03em' }}>
                      Get a Free Quote
                    </h2>
                    <p className="text-[#A1A1AA] text-sm mb-7">
                      Fill in your details and we&apos;ll get back to you with a fixed price quote.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#A1A1AA] mb-2">
                            Full Name *
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="John Smith"
                            className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium outline-none transition-all duration-200"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)',
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#A1A1AA] mb-2">
                            Phone Number *
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="07700 000000"
                            className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium outline-none transition-all duration-200"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)',
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#A1A1AA] mb-2">
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium outline-none transition-all duration-200"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#A1A1AA] mb-2">
                          Service Required
                        </label>
                        <select
                          id="contact-service"
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium outline-none transition-all duration-200"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: form.service ? 'white' : '#A1A1AA',
                          }}
                        >
                          <option value="" style={{ background: '#1a1a1a' }}>Select a service...</option>
                          <option value="airport-transfer" style={{ background: '#1a1a1a' }}>Airport Transfer</option>
                          <option value="school-run" style={{ background: '#1a1a1a' }}>School Run</option>
                          <option value="local-ride" style={{ background: '#1a1a1a' }}>Local Ride</option>
                          <option value="corporate" style={{ background: '#1a1a1a' }}>Corporate Travel</option>
                          <option value="other" style={{ background: '#1a1a1a' }}>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#A1A1AA] mb-2">
                          Message / Journey Details
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us about your journey, dates, pickup address, destination..."
                          className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium outline-none transition-all duration-200 resize-none"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        />
                      </div>
                      <button
                        id="contact-submit"
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white transition-all duration-200"
                        style={{
                          background: 'linear-gradient(135deg, #cc200e, #A93226)',
                          boxShadow: '0 16px 40px rgba(192,57,43,0.3)',
                        }}
                      >
                        <Send size={16} />
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
