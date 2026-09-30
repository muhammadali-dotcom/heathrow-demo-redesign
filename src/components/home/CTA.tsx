import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

export default function CTA() {
  return (
    <section className="bg-bg-alt py-24">
      <Reveal className="mx-auto max-w-7xl section-padding">
        <div className="rounded-3xl border border-line bg-surface px-8 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:px-12 lg:px-16">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl text-left">
              <span className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Book Now
              </span>

              <h2
                className="mb-3 text-4xl font-black leading-tight text-fg sm:text-5xl"
                style={{ letterSpacing: '-0.04em' }}
              >
                Ready to Book Your Ride?
              </h2>

              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Fast, reliable and professional taxi services just a click away.
              </p>
            </div>

            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <a
                href="/contact"
                className="inline-flex h-14 min-w-[170px] items-center justify-center rounded-xl bg-[var(--color-accent-solid)] px-8 text-base font-bold text-[var(--color-accent-solid-fg)] shadow-[0_14px_35px_rgba(var(--color-accent-rgb),0.25)] transition hover:bg-[var(--color-accent-solid-hover)]"
              >
                Get a Quote
              </a>

              <Button
                variant="outline"
                href="/book"
                className="h-14 min-w-[170px] border border-line bg-surface-soft px-8 text-base font-bold text-fg hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}