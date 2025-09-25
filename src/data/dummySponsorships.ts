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
    {
      id: 4,
      name: "TECHNOLOGY EXPO 2025",
      description:
        "Pameran teknologi dengan startup, workshop, dan demo produk terbaru.",
      category: "Teknologi",
      price: { current: 4000000, total: 12000000 },
      banner:
        "https://i.pinimg.com/736x/98/9b/67/989b67efd4d1ca4f0d2c54c56f928f1a.jpg",
      benefits: [
        "Logo di website resmi",
        "Booth di hall utama",
        "Kesempatan presentasi produk",
        "Publikasi di media partner",
      ],
    },
    {
      id: 5,
      name: "KEJUARAAN FUTSAL ANTAR KAMPUS",
      description:
        "Kompetisi futsal bergengsi antar universitas dengan ratusan peserta.",
      category: "Olahraga",
      price: { current: 1500000, total: 5000000 },
      banner:
        "https://i.pinimg.com/1200x/b8/79/d3/b879d3425959a54572200c3105bb6bc6.jpg",
      benefits: [
        "Logo di jersey pemain",
        "Spanduk di area lapangan",
        "Mention saat pertandingan",
        "Booth merchandise",
      ],
    },
    {
      id: 6,
      name: "STARTUP PITCH DAY",
      description:
        "Ajang pitching startup dengan investor, media, dan komunitas teknologi.",
      category: "Startup",
      price: { current: 7000000, total: 15000000 },
      banner:
        "https://i.pinimg.com/736x/09/ef/88/09ef881677ff68805181d5d9a4382ab4.jpg",
      benefits: [
        "Logo di backdrop",
        "Akses networking VIP",
        "Mention di opening acara",
        "Publikasi di media partner",
      ],
    },
    {
      id: 7,
      name: "INDIE FILM FESTIVAL",
      description:
        "Festival film independen menampilkan karya sineas muda Indonesia.",
      category: "Film",
      price: { current: 2500000, total: 8000000 },
      banner:
        "https://i.pinimg.com/1200x/8c/5b/93/8c5b935ac1c7274ccb7fc60082ae7eec.jpg",
      benefits: [
        "Logo di layar bioskop sebelum film",
        "Logo di poster festival",
        "Kesempatan sponsor award",
        "Publikasi di media partner",
      ],
    },
    {
      id: 8,
      name: "FASHION WEEK GARUT",
      description:
        "Pameran fashion lokal dengan desainer, brand, dan UMKM kreatif.",
      category: "Fashion",
      price: { current: 4500000, total: 10000000 },
      banner:
        "https://i.pinimg.com/736x/24/de/eb/24deeba0a92fe4285584227533beb16d.jpg",
      benefits: [
        "Logo di catwalk backdrop",
        "Booth fashion brand",
        "Publikasi di majalah mode",
        "VIP seat di fashion show",
      ],
    },
    {
      id: 9,
      name: "SEMINAR KEWIRAUSAHAAN MUDA",
      description:
        "Seminar motivasi bisnis dengan pembicara pengusaha sukses nasional.",
      category: "Pendidikan",
      price: { current: 1000000, total: 4000000 },
      banner:
        "https://i.pinimg.com/736x/46/43/31/464331c7960c03d3471711cdf4951565.jpg",
      benefits: [
        "Logo di materi seminar",
        "Booth konsultasi",
        "Publikasi di kampus mitra",
        "Mention di sesi penutupan",
      ],
    },
    {
      id: 10,
      name: "GARUT FOOD FESTIVAL",
      description:
        "Festival kuliner terbesar di Garut dengan berbagai tenant makanan lokal.",
      category: "Festival",
      price: { current: 6000000, total: 10000000 },
      banner:
        "https://i.pinimg.com/736x/8a/b8/6c/8ab86cf530ee66ebdfe3960e97acf125.jpg",
      benefits: [
        "Logo di flyer & poster",
        "Booth strategis di area kuliner",
        "Publikasi di radio lokal",
        "Promo khusus tenant",
      ],
    },
  ];