export interface WisataItem {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  address: string;
  image: string;
}

export const allWisataData: WisataItem[] = [
  {
    id: 1,
    name: "Kawah Kamojang",
    category: "Wisata Kawah",
    rating: 4.9,
    reviews: 3200,
    address: "Jl. Kamojang, Samarang",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/Kawah%20kamojang.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9LYXdhaCBrYW1vamFuZy5qcGciLCJpYXQiOjE3NTYzMzkxNzEsImV4cCI6MTgxOTQxMTE3MX0.Tsv93oq1ebtSubd5nKl_7Anp7g2cl4Lru_W93jK6QyA",
  },
  {
    id: 2,
    name: "Gunung Papandayan",
    category: "Wisata Gunung",
    rating: 4.9,
    reviews: 4500,
    address: "Cisurupan, Garut",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/Gunung%20papandayan.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9HdW51bmcgcGFwYW5kYXlhbi5qcGVnIiwiaWF0IjoxNzU2MzM5MTI5LCJleHAiOjE4MTk0MTExMjl9.QochAh9ZLO5tDW8ia8-MH4exRUzaScs7_rw8qUer8W0",
  },
  {
    id: 3,
    name: "Antapura Djati",
    category: "Agrowisata",
    rating: 4.9,
    reviews: 2800,
    address: "Jl. Raya Cibiuk, Cibiuk",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/ANTAPURA%20DJPATI.JPEG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9BTlRBUFVSQSBESlBBVEkuSlBFRyIsImlhdCI6MTc1NjMzOTAzMCwiZXhwIjoxODE5NDExMDMwfQ.yalEChph7vkaPao5hzXd26wY7IZUttw7tH911JwMOuo",
  },
  {
    id: 4,
    name: "Kawah Darajat",
    category: "Wisata Kawah",
    rating: 4.8,
    reviews: 2900,
    address: "Jl. Darajat, Pasirwangi",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/Kawah%20darajat.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9LYXdhaCBkYXJhamF0LmpwZyIsImlhdCI6MTc1NjMzOTE1OSwiZXhwIjoxODE5NDExMTU5fQ.oZ45K-GWft42BbdMGZQ8wghGK-IvayvoJ4A-ZxoBbJw",
  },
  {
    id: 5,
    name: "Gunung Cikuray",
    category: "Wisata Gunung",
    rating: 4.8,
    reviews: 3800,
    address: "Bayongbong, Garut",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/Gunung%20cikuray.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9HdW51bmcgY2lrdXJheS5qcGciLCJpYXQiOjE3NTYzMzkxMDQsImV4cCI6MTgxOTQxMTEwNH0.ZBNBsXJ2KzYluJOZ5iqVqsEhL7Z6Q-7lWbvw3blA5EA",
  },
  {
    id: 6,
    name: "Situ Bagendit",
    category: "Wisata Situ",
    rating: 4.8,
    reviews: 3500,
    address: "Jl. KH Hasan Arief, Banyuresmi",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/SITUBAGENDIT.JPEG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9TSVRVQkFHRU5ESVQuSlBFRyIsImlhdCI6MTc1NjMzOTIyNSwiZXhwIjoxODE5NDExMjI1fQ.hTSsc0P2JTXNz9nSWz7LG2fT2HHZJzIKeKKVjjQ7x34",
  },
  {
    id: 7,
    name: "Candi Cangkuwang dan Kampung Adat Pulo",
    category: "Wisata Budaya",
    rating: 4.8,
    reviews: 2500,
    address: "Leles, Garut",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/CANDI%20CANGKUANG.JPEG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9DQU5ESSBDQU5HS1VBTkcuSlBFRyIsImlhdCI6MTc1NjMzOTA0NywiZXhwIjoxODE5NDExMDQ3fQ.zfwyKk5JewMbpEGP7O6sriJv4Viwsd9ChxVugMtFzwc",
  },
  {
    id: 8,
    name: "Kawah Talaga Bodas",
    category: "Wisata Kawah",
    rating: 4.7,
    reviews: 2500,
    address: "Wanaraja, Garut",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/kawah%20talaga%20bodas.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9rYXdhaCB0YWxhZ2EgYm9kYXMuanBnIiwiaWF0IjoxNzU2MzM5MTg4LCJleHAiOjE4MTk0MTExODh9.5L3XxL1cyodbMpTRATuebsTDLaTsAtU2-gqGWSBjQ5U",
  },
  {
    id: 9,
    name: "Gunung Guntur",
    category: "Wisata Gunung",
    rating: 4.7,
    reviews: 3100,
    address: "Tarogong Kaler, Garut",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/Gunung%20guntur.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9HdW51bmcgZ3VudHVyLmpwZyIsImlhdCI6MTc1NjMzOTExOCwiZXhwIjoxODE5NDExMTE4fQ.TEbR4xZ1i39K2Y46apzX-ZVkTh8fvP8nhzi08aMKMaI",
  },
  {
    id: 10,
    name: "Pantai Sayang Heulang",
    category: "Wisata Pantai",
    rating: 4.7,
    reviews: 2200,
    address: "Pameungpeuk, Garut",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/kawah%20talaga%20bodas.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9rYXdhaCB0YWxhZ2EgYm9kYXMuanBnIiwiaWF0IjoxNzU2MzM5MTg4LCJleHAiOjE4MTk0MTExODh9.5L3XxL1cyodbMpTRATuebsTDLaTsAtU2-gqGWSBjQ5U",
  },
  {
    id: 11,
    name: "Curug Sanghyang Taraje",
    category: "Wisata Curug",
    rating: 4.7,
    reviews: 1900,
    address: "Pamulihan, Garut",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/CURUG%20SAYANG%20TARAJE.JPEG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9DVVJVRyBTQVlBTkcgVEFSQUpFLkpQRUciLCJpYXQiOjE3NTYzMzkwNjksImV4cCI6MTgxOTQxMTA2OX0.smGqrdR1u3N5Wjlf4oGNov4z9Eq_XMXp16-FAznoh4s",
  },
  {
    id: 12,
    name: "Darajat Pass",
    category: "Wisata Air Panas",
    rating: 4.7,
    reviews: 4000,
    address: "Jl. Darajat KM. 14, Pasirwangi",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/Darajat%20Pass.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9EYXJhamF0IFBhc3MuanBlZyIsImlhdCI6MTc1NjM0MDIwMCwiZXhwIjoxODE5NDEyMjAwfQ.5TTtwZozkVb9fpiNyLJKLfhYk5IhzvAJLLxfb6BzG4s",
  },
  {
    id: 13,
    name: "Situ Cangkuang",
    category: "Wisata Situ",
    rating: 4.7,
    reviews: 2800,
    address: "Leles, Garut",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/SITUCANGKUANG.JPEG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9TSVRVQ0FOR0tVQU5HLkpQRUciLCJpYXQiOjE3NTYzMzkyMzgsImV4cCI6MTgxOTQxMTIzOH0.82iygAlJ7fiE5xprUTllLvxJVuCkDpGCigLVm1QwPQY",
  },
  {
    id: 14,
    name: "Agrowisata Eptilu",
    category: "Agrowisata",
    rating: 4.7,
    reviews: 2300,
    address: "Cikajang, Garut",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/Eptilu.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9FcHRpbHUuanBnIiwiaWF0IjoxNzU2MzM5MDg2LCJleHAiOjE4MTk0MTEwODZ9.kiCvp4lhtxTmwJuntruwbab6qpaUJzxjRpOFjcnEMWo",
  },
  {
    id: 15,
    name: "Kawah Papandayan",
    category: "Wisata Kawah",
    rating: 4.6,
    reviews: 2100,
    address: "Cisurupan, Garut",
    image: "https://images.unsplash.com/photo-1656173616083-b01316f960d6",
  },
  {
    id: 16,
    name: "Leuwi Asri",
    category: "Wisata Curug",
    rating: 4.6,
    reviews: 1800,
    address: "Cisompet, Garut",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/LEUWI%20ASRI.JPEG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9MRVVXSSBBU1JJLkpQRUciLCJpYXQiOjE3NTY4MDA4NDEsImV4cCI6MTc4ODMzNjg0MX0.Lstij0CSiiDopOw6FMFg9Dx3Y0YO5GHuGSRYu81zhLI",
  },
  {
    id: 17,
    name: "Kopilogi",
    category: "Cafe",
    rating: 4.8,
    reviews: 1500,
    address: "Jl. Cikuray, Garut Kota",
    image:
      "https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto%20Wisata/Kopilogi.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvIFdpc2F0YS9Lb3BpbG9naS5qcGVnIiwiaWF0IjoxNzU2ODAwODY4LCJleHAiOjE3ODgzMzY4Njh9.S353M46kW5wfes0QawFUGve015a4VbBvSfd7pfJ2ZsI",
  },
];
