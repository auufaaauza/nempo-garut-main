"use client";
import React, { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EventCard, { EventItem } from "@/components/public/shared/Event/EventCard";

// === Dummy Data ===
const dummyEvents: EventItem[] = [
  {
    id: 1,
    name: "Festival Dodol Garut",
    category: "Festival",
    date: "2025-12-15T09:00:00",
    location: "Alun-alun Garut",
    description:
      "Festival tahunan menampilkan berbagai varian dodol khas Garut.",
    image:
      "https://images.unsplash.com/photo-1509930854872-0f61005b282e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Garut Jazz Festival",
    category: "Musik",
    date: "2026-01-20T19:00:00",
    location: "Lapangan Guntur",
    description:
      "Festival musik jazz dengan lineup musisi lokal dan internasional.",
    image:
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Garut Marathon",
    category: "Olahraga",
    date: "2026-03-10T05:00:00",
    location: "Alun-alun Garut",
    description:
      "Marathon dengan rute scenic melewati pegunungan dan perkebunan Garut.",
    image:
      "https://images.unsplash.com/photo-1595872018818-97555653a011?q=80&w=800&auto=format&fit=crop",
  },
];

const EventClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(dummyEvents.map((e) => e.category)));
    return ["Semua", ...cats];
  }, []);

  const filteredEvents = useMemo(() => {
    return dummyEvents.filter((event) => {
      const inCategory =
        selectedCategory === "Semua" || event.category === selectedCategory;
      const inSearch = event.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return inCategory && inSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filter & Search */}
      <section className="py-6 bg-white shadow-sm sticky top-[60px] z-30">
        <div className="container mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Cari event..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="h-5 w-5 text-gray-400" />
                  </InputAdornment>
                ),
                sx: { borderRadius: "9999px", height: "48px" },
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* List Events */}
      <section className="py-12">
        <div className="container mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Event tidak ditemukan.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventClient;
