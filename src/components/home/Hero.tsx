'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  Car,
  Clock,
  CreditCard,
  UserCheck,
} from 'lucide-react';
import Button from '@/components/ui/Button';

const trustPoints = [
  { icon: Car, title: '24/7', text: 'Always Available' },
  { icon: Clock, title: 'On Time', text: 'Every Time' },
  { icon: CreditCard, title: 'Fixed Prices', text: 'No Hidden Charges' },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050607] text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/fleet/Hero5.png"
          alt="Bittacy premium taxi service"
          fill
          priority
          className="object-cover object-[68%_center] opacity-90"
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98)_0%,rgba(5,6,7,0.90)_36%,rgba(5,6,7,0.55)_58%,rgba(5,6,7,0.18)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(229,9,20,0.28),transparent_32%)]" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#050607] via-[#050607]/80 to-transparent" />

      {/* Light streaks */}
      <div className="absolute right-[-12%] top-[20%] h-[2px] w-[58%] rotate-[-18deg] bg-[#e50914]/70 blur-[1px]" />
      <div className="absolute right-[-15%] top-[30%] h-[1px] w-[65%] rotate-[-18deg] bg-[#ff2b24]/60 blur-[1px]" />
      <div className="absolute left-0 bottom-[28%] h-[1px] w-[44%] bg-[#e50914]/35 blur-[1px]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          {/* Left Content */}
          <div className="max-w-2xl">
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#ff1f2d]"
            >
              Mill Hill Taxis, Airport Transfers &amp; School Runs
            </motion.p>

            <motion.h1
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-[44px] font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-[76px]"
            >
              Your Journey,
              <br />
              Our <span className="text-[#e50914]">Priority</span>
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mb-8 max-w-[520px] text-base leading-relaxed text-[#d4d4d8] sm:text-lg"
            >
              Reliable, punctual and comfortable taxi services across North London
              and beyond.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="mb-11 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                variant="primary"
                href="/book"
                className="group h-14 px-8 text-base font-bold shadow-[0_18px_50px_rgba(229,9,20,0.35)]"
              >
                Book a Ride
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>

              <Button
                variant="outline"
                href="/contact"
                className="h-14 border-white/30 bg-black/25 px-8 text-base font-bold backdrop-blur-md hover:border-[#e50914] hover:text-[#e50914]"
              >
                Get a Quote
              </Button>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.46 }}
              className="grid max-w-md grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            >
              {trustPoints.map(({ icon: Icon, title, text }) => (
                <div key={title} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#e50914]/60 bg-[#e50914]/10 text-[#ff1f2d] shadow-[0_0_28px_rgba(229,9,20,0.18)]">
                    <Icon size={21} strokeWidth={2} />
                  </div>
                  <h3 className="text-sm font-bold leading-tight text-white">{title}</h3>
                  <p className="mt-1 text-xs leading-snug text-[#b8b8bf]">{text}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Car Space */}
          <motion.div
            initial={
              shouldReduceMotion
                ? {}
                : { opacity: 0, scale: 0.94, x: 70, filter: 'blur(8px)' }
            }
            animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative hidden min-h-[520px] lg:block"
          >
            <div className="absolute bottom-6 right-[-40px] h-[170px] w-[82%] rounded-full bg-[#e50914]/20 blur-[70px]" />
            <div className="absolute bottom-10 right-[-30px] h-[90px] w-[78%] rounded-full bg-black/70 blur-[42px]" />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}