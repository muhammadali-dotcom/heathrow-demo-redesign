import { FleetVehicle } from '@/types/fleet';

export const fleet: FleetVehicle[] = [
  { id: 'saloon', name: 'Saloon', passengers: 4, luggage: 2, image: '/images/fleet/Saloon.png', imageLight: '/images/fleet/lightsaloon.jpg' },
  { id: 'estate', name: 'Estate', passengers: 4, luggage: 4, image: '/images/fleet/Estate.png', imageLight: '/images/fleet/lightestate.jpg' },
  { id: 'mpv', name: 'MPV', passengers: 6, luggage: 4, image: '/images/fleet/MPV.png', imageLight: '/images/fleet/lightmpv.jpg' },
  { id: 'executive', name: 'Executive', passengers: 4, luggage: 2, image: '/images/fleet/Executive.png', imageLight: '/images/fleet/lightexecutive.jpg' },
];
