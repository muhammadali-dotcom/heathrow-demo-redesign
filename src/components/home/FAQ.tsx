import { faqs } from '@/lib/seo';
import Reveal from '@/components/ui/Reveal';

export default function FAQ() {
  return (
    <section className="py-24" style={{ background: 'var(--color-bg-alt)' }}>
      <Reveal className="mx-auto max-w-5xl section-padding">
        <div className="mb-12 text-center">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
            style={{
              background: 'rgba(204,32,14,0.12)',
              border: '1px solid rgba(204,32,14,0.3)',
              color: '#cc200e',
            }}
          >
            Quick Answers
          </span>
          <h2
            className="text-4xl font-black text-fg sm:text-5xl"
            style={{ letterSpacing: '-0.04em' }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-2xl p-6"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-line)',
              }}
            >
              <h3 className="mb-3 text-lg font-bold leading-snug text-fg">{faq.question}</h3>
              <p className="text-sm leading-6 text-muted">{faq.answer}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
