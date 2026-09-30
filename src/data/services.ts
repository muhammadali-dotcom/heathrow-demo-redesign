import { Service } from '@/types/service';

export const services: Service[] = [
  {
    id: 'airport-transfers',
    title: 'Airport Transfers',
    description: 'Heathrow T2–T5 and all London airports, fixed prices.',
    image: '/images/airport-transfer.jpg',
    href: '/airport-transfers',
  },
  {
    id: 'school-runs',
    title: 'School Runs',
    description: 'DBS-checked drivers, safe & punctual.',
    image: '/images/school-runs.jpg',
    href: '/school-runs',
  },
  {
    id: 'local-rides',
    title: 'Local Rides',
    description: 'Comfortable rides across West London and Heathrow.',
    image: '/images/local-rides.jpg',
    href: '/local-rides',
  },
  {
    id: 'corporate-travel',
    title: 'Corporate Travel',
    description: 'Executive transport for businesses.',
    image: '/images/corporate-travel.jpg',
    href: '/corporate-travel',
  },
];
