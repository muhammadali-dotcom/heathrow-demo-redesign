import { FleetVehicle } from '@/types/fleet';

export const fleet: FleetVehicle[] = [
  { id: 'saloon', name: 'Saloon', passengers: 4, luggage: 2, image: '/images/fleet/saloon-yellow-dark.jpg', imageLight: '/images/fleet/saloon-yellow-light.jpg' },
  { id: 'estate', name: 'Estate', passengers: 4, luggage: 4, image: '/images/fleet/estate-yellow-dark.jpg', imageLight: '/images/fleet/estate-yellow-light.jpg' },
  { id: 'mpv', name: 'MPV', passengers: 6, luggage: 4, image: '/images/fleet/mpv-yellow-dark.jpg', imageLight: '/images/fleet/mpv-yellow-light.jpg' },
  { id: 'executive', name: 'Executive', passengers: 4, luggage: 2, image: '/images/fleet/executive-yellow-dark.jpg', imageLight: '/images/fleet/executive-yellow-light.jpg' },
];
