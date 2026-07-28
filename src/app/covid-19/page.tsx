import { ShieldCheck } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import Reveal from '@/components/ui/Reveal';

export const metadata = buildMetadata({
  path: '/covid-19',
  title: 'COVID-19 Precautionary Measures | Bittacy Cars',
  description:
    'Learn about the COVID-19 health and safety precautionary measures Bittacy Cars follows to keep passengers and drivers safe on every journey.',
  keywords: ['COVID-19 taxi safety', 'Bittacy Cars precautions', 'safe minicab Mill Hill'],
});

const measures = [
  'Payments are received through cards only.',
  'Provision of hand sanitizers in all our private hire cars in London.',
  'All our London city minicabs are disinfected and washed on daily bases.',
  'Non-contact pick up and drop off facility by our local minicab company in London.',
  'The health status of our minicab drivers is regularly monitored and the coronavirus tests are also conducted on regular places.',
  'Detailed cleaning of our local Minicabs in London with the use of disinfectants to clean the door handles, travel accessories, passenger facilities, seats, steering wheel, head rests, keys, armrests and other services.',
  'At the time of journey our drivers properly wear mask and discarded it when it gets deformed.',
  'Air-conditioning is quite harmful in these circumstances so the windows of our private hire cars in London remain open to regulate the ventilation.',
  'We change the seat covers frequently.',
  'Our drivers are advised to encourage passengers to avoid touching surfaces and wear mask.',
  'Our minicab drivers remind their passengers to store the confirmation of electronic payment in their phones after each ride.',
  'Our local minicabs in London are sprayed, disinfected and cleaned to prevent the spread of the virus.',
  'We advise our drivers to consume healthy diet and adequate rest.',
  'The team of over 24 hours minicab service in London is working diligently 24/7 to ensure that is Standard Operating Procedures are properly followed.',
];

export default function Covid19Page() {
  return (
    <main style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <section
        className="relative pt-28 sm:pt-32 lg:pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%)`,
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(204,32,14,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <Reveal className="max-w-3xl mx-auto relative z-10">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6"
            style={{
              background: 'rgba(204,32,14,0.12)',
              border: '1px solid rgba(204,32,14,0.3)',
              color: '#cc200e',
            }}
          >
            <ShieldCheck size={14} />
            Health &amp; Safety
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-fg mb-8"
            style={{ letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            COVID-19 Precautionary Measures
          </h1>

          <div className="space-y-4 text-muted leading-relaxed text-base">
            <p>
              The outbreak of coronavirus is now the biggest treat to the lives of people. Bittacy
              Cars being a responsible and renowned 24 hours minicab service in London strictly
              follows the Standard Operating Procedures (SOPs). Our London minicab firm
              prioritises your security, health and safety. The situation of coronavirus is
              worsening day by day and in the light of the current situation, our London minicab
              transportation has enforced strict safety measures. The staff members of Bittacy
              Cars ensures that the cars are disinfected, sprayed and washed properly after each
              ride.
            </p>
            <p>
              To prevent the spread of COVID-19, the following health and safety precautionary
              measures are taken seriously:
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {measures.map((measure) => (
              <li
                key={measure}
                className="flex items-start gap-3 text-sm text-muted leading-relaxed"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#cc200e' }}
                />
                {measure}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </main>
  );
}
