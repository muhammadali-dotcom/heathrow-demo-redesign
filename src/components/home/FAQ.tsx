import { faqs } from '@/lib/seo';

export default function FAQ() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8" style={{ background: '#0B0B0D' }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
            style={{
              background: 'rgba(229,9,20,0.12)',
              border: '1px solid rgba(229,9,20,0.3)',
              color: '#e50914',
            }}
          >
            Quick Answers
          </span>
          <h2
            className="text-4xl font-black text-white sm:text-5xl"
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
                background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h3 className="mb-3 text-lg font-bold leading-snug text-white">{faq.question}</h3>
              <p className="text-sm leading-6 text-[#A1A1AA]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
