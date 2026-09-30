import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/contact',
  title: 'Contact Heathrow Mini Cab | Heathrow Minicab Quotes & Bookings',
  description:
    'Contact Heathrow Mini Cab for Heathrow minicabs, airport transfers, school runs and corporate travel across West London. Call 020 3761 7526.',
  keywords: ['contact Heathrow Mini Cab', 'Heathrow minicab quote', 'West London taxi booking'],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
