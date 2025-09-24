// lib/static-data.ts
import { Destination } from './data';

// Static data for build time - you would populate this with your actual data
export const STATIC_DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Curug Orok",
    category: "Wisata Alam",
    address: "Garut, Jawa Barat",
    description: "Air terjun yang indah...",
    rating: 4.5,
    reviews: 120,
    image: "/images/curug-orok.jpg",
    images: [],
    prices: {
      weekday: { adult: 15000, child: 10000 },
      weekend: { adult: 20000, child: 15000 }
    },
    facilities: [],
    coords: [-7.2, 107.8]
  },
  // Add more destinations...
];

// Use this for generateStaticParams
export function getStaticDestinationIds(): string[] {
  return STATIC_DESTINATIONS.map(dest => dest.id);
}

export function getStaticDestinationById(id: string): Destination | null {
  return STATIC_DESTINATIONS.find(dest => dest.id === id) || null;
}