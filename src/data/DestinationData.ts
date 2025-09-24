import { type LucideIcon } from "lucide-react";

// Definisikan tipe datanya biar rapi
export interface Destination {
  id: number;
  name: string;
  category: string;
  location: string;
  address: string;
  rating: number;
  reviews: number;
  description: string;
  image: string; // Gambar utama
  images: string[]; // Galeri
  prices: {
    weekday: { adult: number; child: number };
    weekend: { adult: number; child: number };
  };
  facilities: { icon: LucideIcon; text: string }[];
  outbound?: { name: string; price: number }[];
  coords: [number, number];
}

// Data statik (bisa kamu tambahin lagi nanti)
export const destinationsData: Destination[] = [
    {
        id: 1,
        name: 'Kawah Darajat',
        category: 'Pemandian Air Panas',
        location: 'Pasirwangi, Garut',
        address: 'Jl. Darajat KM. 25, Pasirwangi',
        rating: 4.8,
        reviews: 5200,
        description: 'Kawah Darajat adalah destinasi populer yang menawarkan pemandian air panas alami dengan pemandangan pegunungan yang menakjubkan.',
        image: 'https://via.placeholder.com/800x600/007BFF/FFFFFF?Text=Darajat+Pass',
        images: ['/images/placeholder1.jpg', '/images/placeholder2.jpg'],
        prices: { weekday: { adult: 25000, child: 15000 }, weekend: { adult: 35000, child: 20000 } },
        facilities: [],
        outbound: [{ name: 'Flying Fox', price: 25000 }, { name: 'ATV', price: 50000 }],
        coords: [-7.22, 107.78],
    },
    // ... Tambahkan data destinasi lainnya di sini
];
