"use client";

import React, { useState, useMemo } from "react";
import { MapPin, Search, Filter, Mountain, Waves } from "lucide-react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import WisataCard from "./WisataCard";
import { useLangStore } from "@/stores/language";
import { useTours } from "@/hooks/useTours";
import type { Tour } from "@/lib/data";

// ✅ impor button dari shadcn
import { Button as ShadcnButton } from "@/components/ui/button";

const WisataClient: React.FC = () => {
  const { selectedLanguage } = useLangStore();
  const { data: tours, isLoading, error } = useTours();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const texts = {
    bannerTitle: { ID: "Pesona Wisata Garut", EN: "Garut Travel Attractions", SU: "Pesona Wisata Garut" },
    bannerSubtitle: { ID: "Temukan keindahan alam, budaya, dan petualangan tak terlupakan.", EN: "Discover nature, culture, and unforgettable adventures.", SU: "Panggihan kaéndahan alam, budaya, jeung pangalaman anu moal hilap." },
    searchPlaceholder: { ID: "Cari gunung, pantai, atau kawah..", EN: "Search mountain, beach, or crater..", SU: "Téang gunung, basisir, atawa kawah.." },
    selectCategory: { ID: "Pilih kategori", EN: "Select category", SU: "Pilih kategori" },
    notFoundTitle: { ID: "Wisata Tidak Ditemukan", EN: "No Destinations Found", SU: "Wisata Teu Kapanggih" },
    notFoundDesc: { ID: "Coba kata kunci atau filter lain.", EN: "Try different keywords or filters.", SU: "Cobian kecap konci atawa filter séjén." },
  };

  const categories = useMemo(() => {
    if (!tours) return ["Semua"];
    const allCategories = tours.map((item) => item.category);
    return ["Semua", ...new Set(allCategories)];
  }, [tours]);

  const filteredWisata = useMemo(() => {
    if (!tours) return [];
    return tours
      .filter((item) => {
        const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => b.rating_avg - a.rating_avg);
  }, [tours, searchTerm, selectedCategory]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  };

  return (
    <div className="bg-gray-50 mb-13">
      {/* Search & Filter */}
      <section className="py-6 bg-white shadow-sm sticky top-[60px] lg:top-[76px] z-30">
        <div className="container mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder={texts.searchPlaceholder[selectedLanguage]}
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

            {/* Mobile Filter Dropdown */}
            <div className="md:hidden">
              <FormControl fullWidth>
                <InputLabel id="category-select-label">
                  {texts.selectCategory[selectedLanguage]}
                </InputLabel>
                <Select
                  labelId="category-select-label"
                  value={selectedCategory}
                  label={texts.selectCategory[selectedLanguage]}
                  onChange={handleCategoryChange}
                  sx={{ borderRadius: "9999px", height: "48px" }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Filter className="h-4 w-4 text-gray-500" />
                    </InputAdornment>
                  }
                >
                  {categories.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* ✅ Desktop: pakai shadcn button */}
          <div className="hidden md:flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <ShadcnButton
                key={c}
                variant={selectedCategory === c ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(c)}
                className="rounded-full"
              >
                {c}
              </ShadcnButton>
            ))}
          </div>
        </div>
      </section>

      {/* Hasil */}
      <section className="py-12">
        <div className="container mx-auto">
          {isLoading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!isLoading && !error && (
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
              {filteredWisata.map((item, index) => (
                <WisataCard key={item.id} destination={item} index={index} />
              ))}
            </div>
          )}

          {!isLoading && !error && filteredWisata.length === 0 && (
            <div className="text-center py-16 col-span-full">
              <MapPin className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700">
                {texts.notFoundTitle[selectedLanguage]}
              </h3>
              <p className="text-gray-500 mt-2">
                {texts.notFoundDesc[selectedLanguage]}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WisataClient;
