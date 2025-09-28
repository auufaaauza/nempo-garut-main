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
      name: "JEOS MOBILE LEGENDS CHAMPIONSHIP VOL-2 2025",
      description:
        "Be a Legend, Be a Champion. Turnamen MLBB skala provinsi dengan sistem multi-kota, Garut offline day dan Final 1 hari Prizepool Rp 22.000.000 dibagi sampai top 16.",
      category: "Game",
      // price: { current: 3000000, total: 10000000 },
      banner:
        "https://i.pinimg.com/736x/34/43/6c/34436c8603ae4895ffc36dce5d61f794.jpg",
      benefits: [
        "Logo besar di banner utama.",
        "Publikasi di media partner.",
        "dan lain sebagainya."
      ],
    },
  ];