// === Type Sponsorship ===
export interface SponsorshipItem {
    id: number;
    name: string;
    description?: string;
    benefits: string[];
    category: string;
    price?: {
      current: number;
      total: number;
    };
    banner?: string;
  }
  
  // === Dummy Data Sponsorship ===
  export const dummySponsorships: SponsorshipItem[] = [
    {
      id: 1,
      name: "MLBB CUP NATIONAL CAMPUS",
      description:
        "Turnamen e-sport terbesar antar kampus dengan peserta dari seluruh Indonesia.",
      category: "Game",
      price: { current: 3000000, total: 10000000 },
      banner:
        "https://i.pinimg.com/736x/34/43/6c/34436c8603ae4895ffc36dce5d61f794.jpg",
      benefits: [
        "Logo besar di banner utama",
        "Booth utama (strategis)",
        "Disebutkan di opening & closing",
        "Publikasi di media partner",
      ],
    },
    {
      id: 2,
      name: "FESTIVAL MUSIK GARUT",
      description:
        "Festival musik dengan puluhan musisi lokal dan nasional, menarik ribuan penonton.",
      category: "Konser",
      price: { current: 5000000, total: 7500000 },
      banner:
        "https://i.pinimg.com/736x/db/71/3b/db713be8dfe5bea6cef3dc2329d3443b.jpg",
      benefits: [
        "Logo di backdrop panggung",
        "Booth premium dekat entrance",
        "Mention di media sosial",
        "Publikasi di media partner",
      ],
    },
    {
      id: 3,
      name: "FESTIVAL BUDAYA NUSANTARA",
      description:
        "Event budaya tahunan dengan pertunjukan seni, kuliner, dan pameran UMKM.",
      category: "Budaya",
      price: { current: 2000000, total: 6000000 },
      banner:
        "https://i.pinimg.com/1200x/dd/b5/36/ddb536a0c6744fe34222af86f86cfc9b.jpg",
      benefits: [
        "Logo di katalog acara",
        "Booth pameran UMKM",
        "Publikasi di radio lokal",
        "Banner di area masuk",
      ],
    },
  ];