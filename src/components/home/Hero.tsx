'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

const trustPoints = [
  '24/7 Always Available',
  'On Time Every Time',
  'Fixed Prices No Hidden Charges',
  'Professional & Friendly Drivers',
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const carVariants = shouldReduceMotion
    ? {}
    : {
        initial: { scale: 0.65, opacity: 0, x: 180, y: 80, filter: 'blur(10px)' },
        animate: { scale: 1, opacity: 1, x: 0, y: 0, filter: 'blur(0px)' },
        transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `
          linear-gradient(90deg, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.75) 60%, rgba(255,29,37,0.15) 100%),
          linear-gradient(180deg, #050505 0%, #0B0B0D 100%)
        `,
      }}
    >
      {/* Red glow orb */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,29,37,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Road streaks */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px opacity-20"
            style={{
              background: 'linear-gradient(90deg, transparent, #FF1D25, transparent)',
              bottom: `${i * 18 + 10}px`,
              left: `${i * 8}%`,
              width: `${60 + i * 8}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text Content */}
          <div>
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6"
                style={{
                  background: 'rgba(255,29,37,0.12)',
                  border: '1px solid rgba(255,29,37,0.3)',
                  color: '#FF1D25',
                }}
              >
                Mill Hill Taxis, Airport Transfers &amp; School Runs
              </span>
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
              style={{ letterSpacing: '-0.04em', lineHeight: 1.02 }}
            >
              Your Journey,<br />
              Our{' '}
              <span style={{ color: '#FF1D25' }}>Priority</span>
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-lg text-[#A1A1AA] mb-8 max-w-lg leading-relaxed"
            >
              Reliable, punctual and comfortable taxi services across North London and beyond.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Button variant="primary" href="/book" className="text-base px-8 py-4">
                Book a Ride
              </Button>
              <Button variant="outline" href="/contact" className="text-base px-8 py-4">
                Get a Quote
              </Button>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                  <CheckCircle size={15} style={{ color: '#FF1D25', flexShrink: 0 }} />
                  {point}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Car Animation */}
          <div className="relative flex items-center justify-center">
            {/* Soft red glow behind car */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(255,29,37,0.2) 0%, transparent 70%)',
              }}
            />

            <motion.div
              {...(shouldReduceMotion
                ? {}
                : {
                    initial: { scale: 0.65, opacity: 0, x: 180, y: 80, filter: 'blur(10px)' },
                    animate: { scale: 1, opacity: 1, x: 0, y: 0, filter: 'blur(0px)' },
                    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                  })}
              className="relative z-10 w-full"
            >
              {/* Idle float after entrance */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
              >
                <div className="relative w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                  <Image
                    src="/images/fleet/hero-car.png"
                    alt="Premium Taxi Service"
                    fill
                    priority
                    className="object-cover animate-fade-in"
                    sizes="(max-w-768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
