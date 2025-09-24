"use client";

import React, { useMemo, useState } from "react";
import { useCulinaries } from "@/hooks/useCulinaries";
import KulinerCard from "./KulinerCard";
import PageBanner from "../../common/PageBanner";
import { useLangStore } from "@/stores/language";

// Lucide
import {
  Utensils,
  Search,
  Filter as FilterIcon,
  Coffee,
  Pizza,
  WifiOff,
  Loader2,
} from "lucide-react";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// --- 1. Impor Button dari UI dengan nama alias ---
import { Button as ShadcnButton } from "@/components/ui/button";

export type KulinerItem = {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  rating?: number | string;
  reviews?: number;
  address?: string;
  image?: string;
  image_url?: string;
  discount?: string | number;
  tax?: string | number;
};

type Props = {
  data?: KulinerItem[];
};

const KulinerClient: React.FC<Props> = ({ data }) => {
  const { data: fetched, isLoading, error } = useCulinaries();
  const { selectedLanguage } = useLangStore();

  const culinaryData: KulinerItem[] | undefined = data ?? fetched;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  };

  const categories = useMemo(() => {
    if (!culinaryData) return ["Semua"];

    const all = Array.from(new Set(culinaryData.map((i) => i.category)));

    const special = ["Kupon, Cafe"];
    const ordered: string[] = [];

    // Tambahkan "Semua" dulu
    ordered.push("Semua");

    // Kalau ada Kupon, Cafe tambahkan di urutan kedua
    special.forEach((s) => {
      if (all.includes(s)) {
        ordered.push(s);
      }
    });

    // Tambahkan kategori lain selain special
    const rest = all.filter((c) => !special.includes(c));
    ordered.push(...rest);

    return ordered;
  }, [culinaryData]);

  const filteredKuliner = useMemo(() => {
    if (!culinaryData) return [];
    return culinaryData.filter((item) => {
      const inCat =
        selectedCategory === "Semua" || item.category === selectedCategory;
      const inSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return inCat && inSearch;
    });
  }, [culinaryData, selectedCategory, searchTerm]);

  const showLoading = !data && isLoading;
  const showError = !data && !!error;

  // Teks multi-bahasa (tetap sama)
  const texts = {
    bannerTitle: { ID: "Jelajah Kuliner Garut", EN: "Explore Garut Culinary", SU: "Nempo Kadaharan Garut" },
    bannerSubtitle: { ID: "Temukan rasa khas Kota Intan, dari makanan berat hingga kafe hits.", EN: "Discover the unique taste of Garut, from hearty meals to trendy cafés.", SU: "Panggihan rasa khas Kota Intan, ti sangu nepi ka kafe kekinian." },
    searchPlaceholder: { ID: "Cari nama tempat kuliner...", EN: "Search culinary places...", SU: "Téang ngaran tempat kadaharan..." },
    category: { ID: "Kategori", EN: "Category", SU: "Kategori" },
    loading: { ID: "Memuat data kuliner...", EN: "Loading culinary data...", SU: "Ngamuat data kadaharan..." },
    errorTitle: { ID: "Gagal memuat data", EN: "Failed to load data", SU: "Gagal ngamuat data" },
    errorDesc: { ID: "Gagal menyambung ke server.", EN: "Failed to connect to server.", SU: "Gagal nyambung ka server." },
    notFoundTitle: { ID: "Kuliner Tidak Ditemukan", EN: "Culinary Not Found", SU: "Kadaharan Teu Kapanggih" },
    notFoundDesc: { ID: "Coba kata kunci atau filter yang berbeda.", EN: "Try different keywords or filters.", SU: "Cobian kecap konci atawa filter séjén." },
  };

  return (
    <div className="bg-gray-50 pb-15 min-h-screen">
      {/* <PageBanner
        icon={Utensils}
        title={texts.bannerTitle[selectedLanguage]}
        subtitle={texts.bannerSubtitle[selectedLanguage]}
        decor1={Coffee}
        decor2={Pizza}
      /> */}

      {/* Filter Bar (tetap sama) */}
      <section className="py-6 bg-white shadow-sm sticky top-[60px] lg:top-[76px] z-30">
        <div className="container mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
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
            <div className="md:hidden">
              <FormControl fullWidth>
                <InputLabel id="category-select-label">{texts.category[selectedLanguage]}</InputLabel>
                <Select
                  labelId="category-select-label"
                  value={selectedCategory}
                  label={texts.category[selectedLanguage]}
                  onChange={handleCategoryChange}
                  sx={{ borderRadius: "9999px", height: "48px" }}
                  startAdornment={<InputAdornment position="start"><FilterIcon className="h-4 w-4 text-gray-500" /></InputAdornment>}
                >
                  {categories.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* --- 2. GANTI KOMPONEN BUTTON DI SINI --- */}
          <div className="hidden md:flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <ShadcnButton
                key={c}
                variant={selectedCategory === c ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(c)}
                className="rounded-full" // shadcn/ui menggunakan className
              >
                {c}
              </ShadcnButton>
            ))}
          </div>
        </div>
      </section>

      {/* List (tetap sama) */}
      <section className="py-12">
        <div className="container mx-auto">
          {showLoading && (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg text-gray-500 font-semibold">{texts.loading[selectedLanguage]}</p>
            </div>
          )}
          {showError && (
            <div className="flex flex-col items-center justify-center text-center py-16 text-red-600">
              <WifiOff className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold">{texts.errorTitle[selectedLanguage]}</h3>
              <p className="text-gray-500 mt-2">{texts.errorDesc[selectedLanguage]}</p>
            </div>
          )}
          {!showLoading && !showError && (
            <>
              <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
                {filteredKuliner.map((item, index) => (
                  <KulinerCard key={item.id} item={item as any} index={index} activeCategory={selectedCategory}/>
                ))}
              </div>
              {filteredKuliner.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <Utensils className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-700">{texts.notFoundTitle[selectedLanguage]}</h3>
                  <p className="text-gray-500 mt-2">{texts.notFoundDesc[selectedLanguage]}</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default KulinerClient;