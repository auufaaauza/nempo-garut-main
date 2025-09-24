export interface Destination {
  id: string;
  name: string;
  category: string;
  location?: string;
  address?: string;
  rating: number;
  reviews: number;
  description?: string;
  image?: string;
  images: string[];
  prices?: {
    weekday?: { adult?: number; child?: number };
    weekend?: { adult?: number; child?: number };
  };
  facilities?: { icon?: string; text: string }[];
  outbound?: { name: string; price: number }[];
  coords?: [number, number] | number[];
}
