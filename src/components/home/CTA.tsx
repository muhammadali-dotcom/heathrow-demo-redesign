import Button from '@/components/ui/Button';

export default function CTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            background: '#A93226',
            boxShadow: '0 40px 100px rgba(192,57,43,0.35)',
          }}
        >
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-4 block">
              Book Now
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.04em' }}>
              Ready to Book Your Ride?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Fast, reliable and professional taxi services just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 transition-all duration-200 cursor-pointer cta-quote-btn"
                style={{
                  background: '#FFFFFF',
                  color: '#A93226',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  textDecoration: 'none',
                }}
              >
                Get a Quote
              </a>
              <Button
                variant="outline"
                href="/book"
                className="px-8 py-4 text-base font-bold border-2 border-white/40 hover:bg-white/10 hover:text-white"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
