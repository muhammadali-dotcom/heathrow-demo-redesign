'use client';

import { MapPin, Navigation, Users, Calendar, Clock, Car } from 'lucide-react';
import Button from '@/components/ui/Button';

const fields = [
  { id: 'pickup', label: 'Pickup Location', icon: MapPin, placeholder: 'Enter pickup address' },
  { id: 'dropoff', label: 'Drop-off Location', icon: Navigation, placeholder: 'Enter destination' },
  { id: 'journey-type', label: 'Journey Type', icon: Car, placeholder: 'One Way / Return', type: 'select' },
  { id: 'date', label: 'Date', icon: Calendar, placeholder: '', type: 'date' },
  { id: 'time', label: 'Time', icon: Clock, placeholder: '', type: 'time' },
  { id: 'passengers', label: 'Passengers', icon: Users, placeholder: '1', type: 'select' },
];

export default function QuickBooking() {
  return (
    <section className="relative z-20 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-3xl p-8"
          style={{
            background: 'linear-gradient(180deg, rgba(18,18,20,0.98), rgba(8,8,10,0.98))',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FF1D25, #D90012)' }}
            >
              <Car size={15} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg" style={{ letterSpacing: '-0.02em' }}>Book Your Ride</h2>
              <p className="text-[#A1A1AA] text-xs">Fast, reliable &amp; professional</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {fields.map((field) => (
              <div key={field.id} className="flex flex-col gap-1.5">
                <label htmlFor={field.id} className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                  {field.label}
                </label>
                <div className="relative">
                  <field.icon
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF1D25] pointer-events-none"
                  />
                  {field.type === 'select' ? (
                    <select
                      id={field.id}
                      className="w-full pl-9 pr-4 py-3 text-sm text-white rounded-xl outline-none appearance-none cursor-pointer"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {field.id === 'journey-type' ? (
                        <>
                          <option value="one-way">One Way</option>
                          <option value="return">Return</option>
                        </>
                      ) : (
                        [1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
                        ))
                      )}
                    </select>
                  ) : (
                    <input
                      id={field.id}
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      className="w-full pl-9 pr-4 py-3 text-sm text-white placeholder-[#A1A1AA] rounded-xl outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button variant="primary" className="w-full py-4 text-base font-bold">
            Get Quote &amp; Book Now
          </Button>
        </div>
      </div>
    </section>
  );
}
