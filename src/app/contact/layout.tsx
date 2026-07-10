import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/contact',
  title: 'Contact Bittacy Cars | Mill Hill Taxi Quotes & Bookings',
  description:
    'Contact Bittacy Cars for Mill Hill taxis, airport transfers, school runs and corporate travel across North London. Call 020 3761 7526.',
  keywords: ['contact Bittacy Cars', 'Mill Hill taxi quote', 'North London taxi booking'],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
