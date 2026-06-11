import { Service } from '@/types/service';

export const services: Service[] = [
  {
    id: 'airport-transfers',
    title: 'Airport Transfers',
    description: 'Reliable door-to-door airport transfer service.',
    image: '/images/airport-transfer.jpg',
    href: '/airport-transfers',
  },
  {
    id: 'school-runs',
    title: 'School Runs',
    description: 'Safe and punctual school runs for your children.',
    image: '/images/school-runs.jpg',
    href: '/school-runs',
  },
  {
    id: 'local-rides',
    title: 'Local Rides',
    description: 'Comfortable local rides across North London.',
    image: '/images/local-rides.jpg',
    href: '/local-rides',
  },
  {
    id: 'corporate-travel',
    title: 'Corporate Travel',
    description: 'Professional corporate travel solutions.',
    image: '/images/corporate-travel.jpg',
    href: '/corporate-travel',
  },
];
