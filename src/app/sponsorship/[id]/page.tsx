// JMLCEventDetailPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const JMLCEventDetailPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    whatsapp: "",
    packageType: "",
    notes: "",
  });

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      "Minat sponsor berhasil dikirim! Tim kami akan segera menghubungi Anda."
    );
  };

  const highlightImages = [
    "/images/jmlc-vol1-1.jpg",
    "/images/jmlc-vol1-2.jpg",
    "/images/jmlc-vol1-3.jpg",
    "/images/jmlc-vol1-4.jpg",
    "/images/jmlc-vol1-5.jpg",
    "/images/jmlc-vol1-6.jpg",
    "/images/jmlc-vol1-7.jpg",
    "/images/jmlc-vol1-8.jpg",
    "/images/jmlc-vol1-9.jpg",
    "/images/jmlc-vol1-10.jpg",
    "/images/jmlc-vol1-11.jpg",
    "/images/jmlc-vol1-12.jpg",
    "/images/jmlc-vol1-13.jpg",
    "/images/jmlc-vol1-14.jpg",
    "/images/jmlc-vol1-15.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % highlightImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [highlightImages.length]);

  const mainVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    tap: { scale: 0.95 },
  };

  const faqData = [
    {
      q: "Apa metode pembayaran & invoice?",
      a: "Transfer bank; invoice & kwitansi resmi disediakan setelah konfirmasi paket.",
    },
    {
      q: "Spesifikasi booth & listrik?",
      a: "Meja 2×1 m, listrik 1.000–1.500W/booth; kebutuhan khusus harap diinformasikan H-14.",
    },
    {
      q: "Kapan materi logo harus dikirim?",
      a: "Maksimal H-30 (AI/SVG/PNG). Materi terlambat dapat mempengaruhi output desain.",
    },
    {
      q: "Konten shout-out boleh custom?",
      a: "Boleh, kirim script 30–45 detik (Diamond/Gold). Silver/UMKM: 1× mention.",
    },
    {
      q: "Bagaimana laporan pasca event?",
      a: "Ringkasan reach, foto, tautan konten, dan dokumentasi awarding akan dikirim H+3—H+7.",
    },
  ];

  const packageOptions = [
    { label: "Pilihan Paket", value: "" },
    { label: "Diamond Sponsor", value: "Diamond Sponsor" },
    { label: "Gold Sponsor", value: "Gold Sponsor" },
    { label: "Silver Sponsor", value: "Silver Sponsor" },
    { label: "Supporting / In-Kind", value: "Supporting / In-Kind" },
    { label: "Community & UMKM", value: "Community & UMKM" },
  ];

  const handlePackageSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, packageType: value }));
    setIsDropdownOpen(false);
  };
  return (
    <>
      <Head>
        <title>JMLC Vol. 2 Sponsorship</title>
        <meta name="description" content="Jawa Barat Mobile Legend Championship Sponsorship Page" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={mainVariants}
        className="font-lato min-h-screen bg-white text-gray-800"
      >
        {/* HERO */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-indigo-100">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight font-montserrat text-purple-800">
                JEOS Mobile Legend Championship
                <br />
                <span className="text-gray-900">Vol. 2 2025 Se-Jawa Barat</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-gray-600 max-w-xl">
                Be a Legend, Be a Champion. Turnamen MLBB skala provinsi dengan sistem multi-kota, Garut offline day dan Final 1 hari Prizepool Rp 22.000.000 dibagi sampai top 16.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.a
                  variants={buttonVariants}
                  whileTap="tap"
                  href="/Proposal_JMLC_Vol2.pdf"
                  className="px-6 py-3 text-lg rounded-full bg-purple-800 text-white font-bold shadow-lg hover:bg-purple-900 transition-colors"
                >
                  Download Proposal PDF
                </motion.a>
                <motion.a
                  variants={buttonVariants}
                  whileTap="tap"
                  href="#packages"
                  className="px-6 py-3 text-lg rounded-full border-2 border-purple-800 text-purple-800 font-semibold transition-colors hover:bg-purple-800 hover:text-white"
                >
                  Lihat Paket Sponsor
                </motion.a>
              </div>
              <div className="mt-6 text-sm text-gray-500">
                Diselenggarakan oleh <b>JEOS</b> · <b>Nempo Garut</b> · <b>Garut Event</b> (tiga <i>Main Organizer</i>)
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative h-[300px] md:h-[500px] rounded-3xl p-6 md:p-8 overflow-hidden bg-white/60 shadow-xl">
                <div className="absolute inset-0 bg-white/50"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-inner h-full w-full">
                  {highlightImages.map((src, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Dokumentasi JMLC Vol. 1 - Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center mt-6">
                <div className="bg-yellow-300/80 border border-yellow-400/60 rounded-xl p-4 md:p-6 shadow-md">
                  <div className="text-2xl md:text-3xl text-black font-bold font-montserrat">128</div>
                  <div className="text-sm text-gray-800 mt-1">Tim</div>
                </div>
                <div className="bg-yellow-300/80 border border-yellow-400/60 rounded-xl p-4 md:p-6 shadow-md">
                  <div className="text-2xl md:text-3xl text-black font-bold font-montserrat">200+</div>
                  <div className="text-sm text-gray-800 mt-1">Penonton Offline</div>
                </div>
                <div className="bg-yellow-300/80 border border-yellow-400/60 rounded-xl p-4 md:p-6 shadow-md">
                  <div className="text-2xl md:text-3xl text-black font-bold font-montserrat">100K+</div>
                  <div className="text-sm text-gray-800 mt-1">Digital Impressions</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* ABOUT */}
        <section id="about" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-purple-800">
                Tentang Event
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                JMLC Vol. 2 adalah turnamen Mobile Legends: Bang Bang skala provinsi (Jawa Barat) yang menggabungkan kompetisi profesional dan kolaborasi brand. Format multi-kota memastikan pemerataan kesempatan dan membangun ekosistem esports lokal.
              </p>
              <div className="grid grid-cols-2 gap-4 text-base">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="text-blue-800 font-bold">Format</div>
                  <div className="text-gray-700 mt-1">Online + Offline 1 Hari Final</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="text-blue-800 font-bold">Skala</div>
                  <div className="text-gray-700 mt-1">128 Tim . 4 Regional </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-extrabold font-montserrat text-blue-800">
                Tujuan Event
              </h3>
              <ul className="space-y-3 text-gray-700 text-base list-disc pl-5">
                <li>Menyediakan panggung kompetitif yang adil (double elimination).</li>
                <li>Membangun jejaring sponsor–komunitas–media di Jawa Barat.</li>
                <li>Meningkatkan engagement digital & kehadiran offline.</li>
                <li>Mengangkat citra daerah sebagai hub esports kreatif.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* EVENT DETAILS */}
        <section id="event-details" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-center mb-10 text-purple-800">
              Detail Acara
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                <h4 className="font-bold text-blue-800 mb-2">Lokasi</h4>
                <p className="text-gray-700 text-lg">Garut</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                <h4 className="font-bold text-blue-800 mb-2">Tanggal</h4>
                <p className="text-gray-700 text-lg">13-14 Desember 2025</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                <h4 className="font-bold text-blue-800 mb-2">Format</h4>
                <p className="text-gray-700 text-lg">128 Tim · Knockout · BO1 (Qualifier) · BO3 (Semifinal) · BO5 (Grand Final)</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                <h4 className="font-bold text-blue-800 mb-2">Rundown Singkat</h4>
                <p className="text-gray-700 text-lg">Hari 1: Registrasi · Opening · Semifinal · Grand Final · Awarding · Closing</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* AUDIENCE */}
        <section id="audience" className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-center mb-10 text-purple-800">
              Audiens & Media Value
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                <div className="text-3xl md:text-4xl font-bold font-montserrat text-blue-800">15–30 th</div>
                <div className="text-sm text-gray-600 mt-1">Segment usia</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                <div className="text-2xl md:text-3xl font-bold font-montserrat text-blue-800">Instagram · TikTok · Website</div>
                <div className="text-sm text-gray-600 mt-1">Kanal distribusi</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                <div className="text-2xl md:text-3xl font-bold font-montserrat text-blue-800">Gaming · F&B</div>
                <div className="text-sm text-gray-600 mt-1">Brand fit</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                <div className="text-2xl md:text-3xl font-bold font-montserrat text-blue-800">Slides & Overlay</div>
                <div className="text-sm text-gray-600 mt-1">Shout-out sponsor</div>
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* SPONSOR PACKAGES */}
        <section id="packages" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-center mb-10 text-purple-800">
              Paket Sponsor
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Diamond */}
              <div className="relative bg-gray-50 rounded-3xl p-8 shadow-xl border-4 border-purple-800/80 transition-transform transform hover:scale-105">
                <div className="text-sm bg-yellow-300 text-black px-3 py-1.5 rounded-full inline-block font-semibold">MYTHIC</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute -top-4 right-4 text-xs font-bold bg-purple-800 text-white px-4 py-2 rounded-full shadow-lg transform rotate-6"
                >
                  PILIHAN TERBAIK
                </motion.div>
                <div className="mt-4 text-3xl font-bold font-montserrat text-purple-800">Rp 20–25 Juta</div>
                <ul className="mt-6 text-base text-gray-700 space-y-3 list-disc pl-5">
                  <li>Nama di depan event: <b>“JMLC Vol. 2 presented by [Sponsor]”</b></li>
                  <li>Logo terbesar (backdrop, banner, jersey, overlay)</li>
                  <li>Booth eksklusif + product showcase sebelum final</li>
                  <li>MC & caster mention sepanjang acara</li>
                  <li>Masuk highlight video & recap</li>
                  <li>Eksklusif sponsor hadiah utama</li>
                </ul>
              </div>
              {/* Gold */}
              <div className="bg-gray-50 rounded-3xl p-8 shadow-xl border border-gray-200 transition-transform transform hover:scale-105">
                <div className="text-sm bg-yellow-300 text-black px-3 py-1.5 rounded-full inline-block font-semibold">LEGEND</div>
                <div className="mt-4 text-3xl font-bold font-montserrat text-purple-800">Rp 10–15 Juta</div>
                <ul className="mt-6 text-base text-gray-700 space-y-3 list-disc pl-5">
                  <li>Logo besar (backdrop, banner, overlay)</li>
                  <li>Booth/stand di venue</li>
                  <li>MC mention tiap babak penting</li>
                  <li>Social media mention</li>
                  <li>Sponsor hadiah tambahan</li>
                </ul>
              </div>
              {/* Silver */}
              <div className="bg-gray-50 rounded-3xl p-8 shadow-xl border border-gray-200 transition-transform transform hover:scale-105">
                <div className="text-sm bg-yellow-300 text-black px-3 py-1.5 rounded-full inline-block font-semibold">EPIC</div>
                <div className="mt-4 text-3xl font-bold font-montserrat text-purple-800">Rp 3–5 Juta</div>
                <ul className="mt-6 text-base text-gray-700 space-y-3 list-disc pl-5">
                  <li>Logo sedang (banner & overlay)</li>
                  <li>MC mention opening & closing</li>
                  <li>Produk di meja caster/panitia</li>
                  <li>Opsional hadiah merchandise</li>
                </ul>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 mt-8">
              <div className="bg-gray-50 rounded-3xl p-8 shadow-xl border border-gray-200 transition-transform transform hover:scale-105">
                <div className="text-sm bg-blue-800 text-white px-3 py-1.5 rounded-full inline-block font-semibold">SUPPORTING / IN-KIND</div>
                <div className="mt-4 text-xl font-bold font-montserrat text-purple-800">Barter Produk/Jasa</div>
                <ul className="mt-6 text-base text-gray-700 space-y-3 list-disc pl-5">
                  <li>Produk dibagikan/dipakai peserta & penonton</li>
                  <li>Logo kecil di media sosial + MC mention awarding</li>
                  <li>Foto awarding + tag sponsor</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-3xl p-8 shadow-xl border border-gray-200 transition-transform transform hover:scale-105">
                <div className="text-sm bg-blue-800 text-white px-3 py-1.5 rounded-full inline-block font-semibold">COMMUNITY & UMKM</div>
                <div className="mt-4 text-xl font-bold font-montserrat text-purple-800">Rp 500 rb – Rp 1 Juta</div>
                <ul className="mt-6 text-base text-gray-700 space-y-3 list-disc pl-5">
                  <li>Logo pada slide <b>Community Supporter</b></li>
                  <li>MC mention sesi apresiasi</li>
                  <li>Meja kecil promosi di venue (opsional)</li>
                  <li>Produk bisa jadi hadiah hiburan</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* COMPARISON TABLE */}
        <section id="compare" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-center mb-10 text-purple-800">
              Perbandingan Benefit
            </h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
              <table className="min-w-full text-base">
                <thead className="bg-blue-800/10">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold text-gray-800">Benefit</th>
                    <th className="px-6 py-4 text-center font-bold text-blue-800">Mythic</th>
                    <th className="px-6 py-4 text-center font-bold text-blue-800">Legend</th>
                    <th className="px-6 py-4 text-center font-bold text-blue-800">Epic</th>
                    <th className="px-6 py-4 text-center font-bold text-blue-800">UMKM/Supporting</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Nama di depan event", "Ya", "—", "—", "—"],
                    ["Logo backdrop/banner", "Terbesar", "Besar", "Sedang", "Slide/Story"],
                    ["Overlay streaming", "Ya", "Ya", "Ya", "—"],
                    ["Booth di venue", "Eksklusif", "Ya", "Opsional", "Meja kecil"],
                    ["MC & Caster mention", "Sepanjang acara", "Per babak", "Opening/Closing", "Sesi apresiasi"],
                    ["Hak sponsor hadiah", "Utama", "Tambahan", "Merchandise", "Hiburan"],
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-gray-200 hover:bg-gray-100 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-700">{row[0]}</td>
                      {row.slice(1).map((cell, j) => (
                        <td
                          key={j}
                          className="px-6 py-4 text-center text-gray-600"
                        >
                          {cell === "Ya" ? (
                            <span className="text-purple-800 font-bold">Ya</span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* PRIZE INTEGRATION */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-center mb-10 text-purple-800">
              Contoh Integrasi Hadiah Sponsor
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                <h4 className="font-bold text-blue-800">Juara 1</h4>
                <p className="text-sm text-gray-700 mt-1">
                  Rp 8.000.000 + Voucher Hotel 2 Malam — <i>by Hotel Partner</i>
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                <h4 className="font-bold text-blue-800">Juara 2</h4>
                <p className="text-sm text-gray-700 mt-1">
                  Rp 4.000.000 + Voucher Restoran Rp 1.000.000 —{" "}
                  <i>by Café Sponsor</i>
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                <h4 className="font-bold text-blue-800">Juara 3</h4>
                <p className="text-sm text-gray-700 mt-1">
                  Rp 3.000.000 + Merchandise Eksklusif — <i>by Brand Lokal</i>
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                <h4 className="font-bold text-blue-800">Juara 4</h4>
                <p className="text-sm text-gray-700 mt-1">
                  Rp 2.000.000 + 1 Malam Villa — <i>by Villa Partner</i>
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                <h4 className="font-bold text-blue-800">Juara 5-8</h4>
                <p className="text-sm text-gray-700 mt-1">
                  Rp 500.000 + Product — <i>by UMKM</i>
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                <h4 className="font-bold text-blue-800">Juara 9-16</h4>
                <p className="text-sm text-gray-700 mt-1">
                  Rp 250.000 + Product — <i>by UMKM</i>
                </p>
              </div>
              <div className="lg:col-start-2"> {/* Ini yang baru untuk memposisikan di tengah */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                  <h4 className="font-bold text-blue-800">MVP</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Rp 1.000.000 + Product — <i>by UMKM</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* DELIVERABLES & TIMELINE */}
        <section id="deliverables" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat mb-4 text-purple-800">
                Sponsor Deliverables
              </h2>
              <ul className="text-base text-gray-700 space-y-3 list-disc pl-5">
                <li>
                  Logo di materi (backdrop, banner, overlay, konten media
                  sosial)
                </li>
                <li>Booth/aktivasi di venue (Diamond/Gold)</li>
                <li>MC & caster shout-out sesuai paket</li>
                <li>Integrasi hadiah (voucher/produk) saat awarding</li>
                <li>Dokumentasi foto & video recap berlogo sponsor</li>
              </ul>
              <h3 className="mt-8 font-bold text-xl text-blue-800">
                Kebutuhan Materi dari Sponsor
              </h3>
              <ul className="text-base text-gray-700 space-y-3 list-disc pl-5 mt-2">
                <li>Logo vektor (.AI/.EPS/.SVG) & PNG transparan</li>
                <li>
                  Brand guideline (warna, clear space, larangan penggunaan)
                </li>
                <li>Copy pendek untuk MC (maks 30–45 detik)</li>
                <li>Detail hadiah/booth (jika ada)</li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat mb-4 text-purple-800">
                Timeline Sponsor
              </h2>
              <ol className="text-base text-gray-700 space-y-4 list-decimal pl-5">
                <li>
                  <b>H-60 — H-45</b>: Konfirmasi paket & penandatanganan MoU
                </li>
                <li>
                  <b>H-45 — H-30</b>: Kirim logo & brand guideline
                </li>
                <li>
                  <b>H-30 — H-21</b>: Produksi materi (backdrop, overlay, konten)
                </li>
                <li>
                  <b>H-21 — H-7</b>: Promo publik, sosial media blast
                </li>
                <li>
                  <b>H-3</b>: Technical meeting & final check
                </li>
                <li>
                  <b>H</b>: Event day + aktivasi booth
                </li>
                <li>
                  <b>H+3 — H+7</b>: Rilis dokumentasi & laporan singkat
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* ORGANIZER */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-center mb-10 text-purple-800">
              Organizer — Tiga Main Organizer Setara
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center shadow-md">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#9F2798] to-[#3B46A5] mb-3"></div>
                <div className="font-semibold text-lg text-gray-800">JEOS</div>
                <div className="text-sm text-gray-600">Main Organizer</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center shadow-md">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#F4C01E] to-[#3B46A5] mb-3"></div>
                <div className="font-semibold text-lg text-gray-800">Nempo Garut</div>
                <div className="text-sm text-gray-600">Main Organizer</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center shadow-md">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#9F2798] to-[#F4C01E] mb-3"></div>
                <div className="font-semibold text-lg text-gray-800">Garut Event</div>
                <div className="text-sm text-gray-600">Main Organizer</div>
              </div>
            </div>
            <div className="mt-10 grid md:grid-cols-3 gap-6 text-base">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-blue-800 mb-2">
                  Produksi & Operasional
                </h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Manajemen venue & layout</li>
                  <li>• Perizinan & keamanan</li>
                  <li>• Tim teknis (sound, network, stream)</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-blue-800 mb-2">
                  Kompetisi & Talents
                </h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Bracket & match schedule</li>
                  <li>• Caster, MC, juri, marshal</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-blue-800 mb-2">
                  Branding & Partnership
                </h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Materi desain & publikasi</li>
                  <li>• Media & KOL coordination</li>
                  <li>• Sponsorship servicing & report</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* FAQ */}
        <section id="faq" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-center mb-10 text-purple-800">
              FAQ Sponsor
            </h2>
            <div className="space-y-4">
              {faqData.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                >
                  <div
                    className="cursor-pointer font-semibold text-lg text-gray-800 p-6 flex justify-between items-center"
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  >
                    <h4>{item.q}</h4>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-blue-800 transform transition-transform duration-300"
                      animate={{ rotate: openFAQ === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </motion.svg>
                  </div>
                  {openFAQ === i && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <p className="mt-2 text-base text-gray-700 p-6 border-t border-gray-200">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- */}

        {/* CONTACT */}
        <section id="contact" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat mb-4 text-purple-800">
                Bergabung sebagai Sponsor
              </h2>
              <p className="text-lg text-gray-700">
                Pilih paket yang sesuai, kirim logo & guideline, dan aktifkan brand Anda di JMLC Vol. 2.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <motion.a
                  variants={buttonVariants}
                  whileTap="tap"
                  href="/Proposal_JMLC_Vol2.pdf"
                  className="px-6 py-3 text-lg rounded-full bg-purple-800 text-white font-bold shadow-lg hover:bg-purple-900 transition-colors"
                >
                  Unduh Proposal PDF
                </motion.a>
                <motion.a
                  variants={buttonVariants}
                  whileTap="tap"
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-lg rounded-full border-2 border-blue-800 text-blue-800 font-semibold transition-colors hover:bg-blue-800 hover:text-white"
                >
                  WhatsApp Panitia
                </motion.a>
                <motion.a
                  variants={buttonVariants}
                  whileTap="tap"
                  href="mailto:sponsor@jmlc.id?subject=JMLC%20Vol.2%20Sponsorship"
                  className="px-6 py-3 text-lg rounded-full border-2 border-blue-800 text-blue-800 font-semibold transition-colors hover:bg-blue-800 hover:text-white"
                >
                  Email Kami
                </motion.a>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-gray-100 p-8 rounded-3xl shadow-xl grid gap-4"
            >
              <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">Formulir Minat Sponsor</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  placeholder="Nama Perusahaan"
                  className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  placeholder="PIC / Kontak"
                  className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email"
                  className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  required
                  placeholder="WhatsApp (ex: 62812...)"
                  className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <div
                  className={`block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 cursor-pointer flex justify-between items-center transition-colors duration-200 ${isDropdownOpen ? "rounded-b-none" : ""}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{formData.packageType || "Pilihan Paket"}</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 text-gray-700"
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                </div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-lg overflow-hidden mt-0.5 shadow-lg"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {packageOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            if (option.value) {
                              handlePackageSelect(option.value);
                            }
                          }}
                          className={`px-4 py-3 cursor-pointer transition-colors ${
                            formData.packageType === option.value
                              ? "bg-purple-100 font-semibold"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {option.label}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Catatan / kebutuhan aktivasi"
                className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <motion.button
                variants={buttonVariants}
                whileTap="tap"
                type="submit"
                className="mt-4 px-6 py-3 text-lg rounded-full font-bold bg-purple-800 text-white shadow-lg hover:bg-purple-900 transition-colors"
              >
                Kirim Minat
              </motion.button>
              <p className="text-xs text-gray-500 mt-2">
                *Form ini contoh tampilan. Integrasikan ke backend/Google Form sesuai kebutuhan.
              </p>
            </form>
          </div>
        </section>

        {/* --- */}

        {/* FOOTER */}
        <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
          © JMLC Vol. 2 — JEOS · Nempo Garut · Garut Event
        </footer>
      </motion.div>
    </>
  );
};

export default JMLCEventDetailPage;