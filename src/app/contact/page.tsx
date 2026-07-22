"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { PHONE, EMAIL, LOCATION } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: PHONE,
    href: `tel:${PHONE.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: MapPin,
    label: "Based In",
    value: LOCATION,
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "24 Hours, 7 Days a Week",
    href: null,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative pt-28 sm:pt-32 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%)",
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(204,32,14,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <Reveal
          className="max-w-3xl mx-auto text-center relative z-10"
          aria-labelledby="contact-hero-heading"
        >
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(204,32,14,0.12)",
              border: "1px solid rgba(204,32,14,0.3)",
              color: "#cc200e",
            }}
          >
            Get In Touch
          </span>
          <h1
            id="contact-hero-heading"
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-fg mb-6 leading-tight"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.02 }}
          >
            Contact <span style={{ color: "#cc200e" }}>Us</span>
          </h1>
          <div className="w-full flex justify-center">
            <p className="max-w-xl text-center text-lg leading-relaxed text-balance text-muted">
              Ready to book or have a question? We&apos;d love to hear from you.
              Reach out and we&apos;ll get back to you as quickly as possible.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Main content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <Reveal>
                <h2
                  className="text-3xl font-black text-fg mb-8"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Get In Touch
                </h2>
              </Reveal>

              <div className="space-y-4 mb-10">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const content = (
                    <div
                      className="flex items-start gap-4 p-5 rounded-2xl"
                      style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-line)",
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #cc200e, #A93226)",
                          boxShadow: "0 6px 16px rgba(204,32,14,0.3)",
                        }}
                      >
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-muted mb-1">
                          {item.label}
                        </div>
                        <div className="text-fg font-semibold text-base">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );

                  return (
                    <Reveal key={item.label} delay={index * 0.08}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="block transition-opacity hover:opacity-80"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </Reveal>
                  );
                })}
              </div>

              {/* Quick call CTA */}
              <Reveal
                delay={contactInfo.length * 0.08}
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(204,32,14,0.15), rgba(139,0,0,0.08))",
                  border: "1px solid rgba(204,32,14,0.25)",
                }}
              >
                <div className="relative z-10">
                  <div className="text-sm font-bold text-fg mb-1">
                    Prefer to call?
                  </div>
                  <div className="text-muted text-sm mb-4">
                    For immediate bookings, give us a call and we can arrange a
                    driver for you right away.
                  </div>
                  <a
                    href={`tel:${PHONE.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-xl font-bold text-sm px-6 py-3 text-white transition-all duration-200"
                    style={{
                      background: "linear-gradient(135deg, #cc200e, #A93226)",
                      boxShadow: "0 8px 20px rgba(204,32,14,0.3)",
                    }}
                  >
                    <Phone size={15} />
                    {PHONE}
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Quote form */}
            <Reveal delay={0.15}>
              <div
                className="rounded-3xl p-8 sm:p-10"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-line)",
                }}
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{
                        background: "linear-gradient(135deg, #cc200e, #A93226)",
                        boxShadow: "0 16px 40px rgba(204,32,14,0.35)",
                      }}
                    >
                      <CheckCircle size={36} className="text-white" />
                    </div>
                    <h3
                      className="text-2xl font-black text-fg mb-3"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      Message Sent!
                    </h3>
                    <p className="text-muted leading-relaxed">
                      Thank you for getting in touch. A member of our team will
                      contact you shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2
                      className="text-2xl font-black text-fg mb-2"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      Get a Free Quote
                    </h2>
                    <p className="text-muted text-sm mb-7">
                      Fill in your details and we&apos;ll get back to you with a
                      fixed price quote.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                            Full Name *
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                            placeholder="John Smith"
                            className="w-full px-4 py-3 rounded-xl text-fg text-sm font-medium outline-none transition-all duration-200"
                            style={{
                              background: "var(--color-surface-soft)",
                              border: "1px solid var(--color-line)",
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                            Phone Number *
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                            }
                            placeholder="07700 000000"
                            className="w-full px-4 py-3 rounded-xl text-fg text-sm font-medium outline-none transition-all duration-200"
                            style={{
                              background: "var(--color-surface-soft)",
                              border: "1px solid var(--color-line)",
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl text-fg text-sm font-medium outline-none transition-all duration-200"
                          style={{
                            background: "var(--color-surface-soft)",
                            border: "1px solid var(--color-line)",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                          Service Required
                        </label>
                        <select
                          id="contact-service"
                          value={form.service}
                          onChange={(e) =>
                            setForm({ ...form, service: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl text-fg text-sm font-medium outline-none transition-all duration-200"
                          style={{
                            background: "var(--color-surface-soft)",
                            border: "1px solid var(--color-line)",
                            color: form.service ? "var(--color-fg)" : "var(--color-muted)",
                          }}
                        >
                          <option value="" style={{ background: "var(--color-surface)" }}>
                            Select a service...
                          </option>
                          <option
                            value="airport-transfer"
                            style={{ background: "var(--color-surface)" }}
                          >
                            Airport Transfer
                          </option>
                          <option
                            value="school-run"
                            style={{ background: "var(--color-surface)" }}
                          >
                            School Run
                          </option>
                          <option
                            value="local-ride"
                            style={{ background: "var(--color-surface)" }}
                          >
                            Local Ride
                          </option>
                          <option
                            value="corporate"
                            style={{ background: "var(--color-surface)" }}
                          >
                            Corporate Travel
                          </option>
                          <option
                            value="other"
                            style={{ background: "var(--color-surface)" }}
                          >
                            Other
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
                          Message / Journey Details
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          value={form.message}
                          onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                          }
                          placeholder="Tell us about your journey, dates, pickup address, destination..."
                          className="w-full px-4 py-3 rounded-xl text-fg text-sm font-medium outline-none transition-all duration-200 resize-none"
                          style={{
                            background: "var(--color-surface-soft)",
                            border: "1px solid var(--color-line)",
                          }}
                        />
                      </div>
                      <button
                        id="contact-submit"
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white transition-all duration-200"
                        style={{
                          background:
                            "linear-gradient(135deg, #cc200e, #A93226)",
                          boxShadow: "0 16px 40px rgba(204,32,14,0.3)",
                        }}
                      >
                        <Send size={16} />
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
