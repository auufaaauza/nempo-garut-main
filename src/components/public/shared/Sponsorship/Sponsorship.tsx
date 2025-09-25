"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { dummySponsorships } from "@/data/dummySponsorships";
import { SponsorshipCard } from "./SponsorshipCard";

const SponsorshipPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [showFilter, setShowFilter] = useState(true);
  const lastScrollY = useRef(0);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(dummySponsorships.map((s) => s.category)));
    return ["Semua", ...cats];
  }, []);

  const filteredSponsors = useMemo(() => {
    return dummySponsorships.filter((sponsor) => {
      const inCategory =
        selectedCategory === "Semua" || sponsor.category === selectedCategory;
      const inSearch = sponsor.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return inCategory && inSearch;
    });
  }, [searchTerm, selectedCategory]);

  // Scroll handler untuk hide/show filter
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // scroll ke bawah → hide
        setShowFilter(false);
      } else {
        // scroll ke atas → show
        setShowFilter(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-12 bg-white shadow-sm">
        <div className="container mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary">
            Sponsorship
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pilih Event yang sesuai untuk mendukung acara
            dan dapatkan berbagai keuntungan eksklusif.
          </p>
        </div>
      </section>

      {/* Filter & Search */}
      <section
        className={`py-6 bg-white shadow-sm sticky top-[60px] z-30 overflow-hidden transform transition-all duration-300 origin-top ${
          showFilter ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        <div className="container mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Cari paket sponsorship..."
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

      {/* List Sponsorships */}
      <section className="py-12">
        <div className="container mx-auto">
          {filteredSponsors.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSponsors.map((sponsor) => (
                <SponsorshipCard key={sponsor.id} sponsor={sponsor} />
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

export default SponsorshipPage;
