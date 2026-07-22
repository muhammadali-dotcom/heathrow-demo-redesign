'use client';

import { useState } from 'react';
import { MapPin, Navigation, Users, Calendar, Clock, Car, Send, CheckCircle } from 'lucide-react';

export default function HomeBooking() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    pickup: '',
    dropoff: '',
    journeyType: 'one-way',
    date: '',
    time: '',
    passengers: '1',
    name: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-4" id="booking" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(204,32,14,0.12)',
              border: '1px solid rgba(204,32,14,0.3)',
              color: '#cc200e',
            }}
          >
            Book Now
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-fg"
            style={{ letterSpacing: '-0.04em' }}
          >
            Book Your Ride
          </h2>
          <p className="text-muted mt-4 text-base max-w-lg mx-auto leading-relaxed">
            Fill in your journey details below for a fast, fixed-price quote. No hidden fees.
          </p>
        </div>

        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-line)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
          }}
        >
          {submitted ? (
            <div className="text-center py-20 px-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: '#cc200e',
                  boxShadow: '0 16px 40px rgba(204,32,14,0.35)',
                }}
              >
                <CheckCircle size={36} className="text-white" />
              </div>
              <h3
                className="text-2xl font-black text-fg mb-3"
                style={{ letterSpacing: '-0.03em' }}
              >
                Booking Request Sent!
              </h3>
              <p className="text-muted leading-relaxed max-w-md mx-auto">
                Thanks! We&apos;ll confirm your ride and fixed price shortly. You can also call us directly for immediate assistance.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm font-semibold transition-colors"
                style={{ color: '#cc200e' }}
              >
                Make another booking →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 sm:p-10">
              {/* Journey details */}
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #cc200e, #A93226)' }}
                >
                  <Car size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-fg font-bold text-lg" style={{ letterSpacing: '-0.02em' }}>
                    Journey Details
                  </h3>
                  <p className="text-muted text-xs">Fast, reliable & professional</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Pickup */}
                <div>
                  <label htmlFor="hb-pickup" className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cc200e' }} />
                    <input
                      id="hb-pickup"
                      type="text"
                      required
                      value={form.pickup}
                      onChange={(e) => setForm({ ...form, pickup: e.target.value })}
                      placeholder="Enter pickup address"
                      className="w-full pl-9 pr-4 py-3 text-sm text-fg placeholder-muted rounded-xl outline-none"
                      style={{ background: 'var(--color-surface-soft)', border: '1px solid var(--color-line)' }}
                    />
                  </div>
                </div>

                {/* Drop-off */}
                <div>
                  <label htmlFor="hb-dropoff" className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                    Drop-off Location
                  </label>
                  <div className="relative">
                    <Navigation size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cc200e' }} />
                    <input
                      id="hb-dropoff"
                      type="text"
                      required
                      value={form.dropoff}
                      onChange={(e) => setForm({ ...form, dropoff: e.target.value })}
                      placeholder="Enter destination"
                      className="w-full pl-9 pr-4 py-3 text-sm text-fg placeholder-muted rounded-xl outline-none"
                      style={{ background: 'var(--color-surface-soft)', border: '1px solid var(--color-line)' }}
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="hb-date" className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cc200e' }} />
                    <input
                      id="hb-date"
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 text-sm text-fg rounded-xl outline-none"
                      style={{ background: 'var(--color-surface-soft)', border: '1px solid var(--color-line)' }}
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="hb-time" className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                    Time
                  </label>
                  <div className="relative">
                    <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cc200e' }} />
                    <input
                      id="hb-time"
                      type="time"
                      required
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 text-sm text-fg rounded-xl outline-none"
                      style={{ background: 'var(--color-surface-soft)', border: '1px solid var(--color-line)' }}
                    />
                  </div>
                </div>

                {/* Passengers */}
                <div>
                  <label htmlFor="hb-passengers" className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                    Passengers
                  </label>
                  <div className="relative">
                    <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cc200e' }} />
                    <select
                      id="hb-passengers"
                      value={form.passengers}
                      onChange={(e) => setForm({ ...form, passengers: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 text-sm text-fg rounded-xl outline-none appearance-none"
                      style={{ background: 'var(--color-surface-soft)', border: '1px solid var(--color-line)' }}
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n} style={{ background: 'var(--color-surface)' }}>
                          {n} Passenger{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Journey type */}
                <div>
                  <label htmlFor="hb-journey-type" className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                    Journey Type
                  </label>
                  <div className="relative">
                    <Car size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cc200e' }} />
                    <select
                      id="hb-journey-type"
                      value={form.journeyType}
                      onChange={(e) => setForm({ ...form, journeyType: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 text-sm text-fg rounded-xl outline-none appearance-none"
                      style={{ background: 'var(--color-surface-soft)', border: '1px solid var(--color-line)' }}
                    >
                      <option value="one-way" style={{ background: 'var(--color-surface)' }}>One Way</option>
                      <option value="return" style={{ background: 'var(--color-surface)' }}>Return</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px my-6" style={{ background: 'var(--color-line)' }} />

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div>
                  <label htmlFor="hb-name" className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                    Your Name
                  </label>
                  <input
                    id="hb-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-3 text-sm text-fg placeholder-muted rounded-xl outline-none"
                    style={{ background: 'var(--color-surface-soft)', border: '1px solid var(--color-line)' }}
                  />
                </div>
                <div>
                  <label htmlFor="hb-phone" className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                    Phone Number
                  </label>
                  <input
                    id="hb-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="07700 000000"
                    className="w-full px-4 py-3 text-sm text-fg placeholder-muted rounded-xl outline-none"
                    style={{ background: 'var(--color-surface-soft)', border: '1px solid var(--color-line)' }}
                  />
                </div>
              </div>

              <button
                id="hb-submit"
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl font-bold text-base py-4 text-white transition-all duration-200"
                style={{
                  background: '#cc200e',
                  boxShadow: '0 16px 40px rgba(204,32,14,0.3)',
                }}
              >
                <Send size={16} />
                Get Quote &amp; Book Now
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
