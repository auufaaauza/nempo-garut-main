"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence, easeInOut } from "framer-motion";

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  const buttonVariants = {
    tap: { scale: 0.95 },
  };

  const faqContentVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.4, ease: easeInOut },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: easeInOut },
    },
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

  return (
    <>
      <Head>
        <title>Sponsorship — JEOS Mobile Legend Championship Vol. 2</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-white to-slate-200 text-foreground">
        {/* HERO */}
        <section className="relative py-16 md:py-24">
          <div className="container grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xs uppercase tracking-[.3em] text-gray-500">
                Sponsorship Deck
              </p>
              <h1 className="mt-3 hero-h1 font-extrabold leading-tight">
                <span className="text-[#9F2798]">
                  JEOS Mobile Legend Championship
                </span>
                <br />
                <span className="text-gray-900">Vol. 2 — 2025/2026</span>
              </h1>
              <p className="mt-4 text-gray-600 max-w-xl">
                Be a Legend, Be a Champion. Ajang esports komunitas Garut yang
                menggabungkan kompetisi, hiburan, dan kolaborasi brand.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <motion.a
                  variants={buttonVariants}
                  whileTap="tap"
                  href="/Proposal_JMLC_Vol2.pdf"
                  className="px-5 py-3 rounded-lg bg-[#9F2798] text-white font-semibold transition hover:opacity-80"
                >
                  Download Proposal PDF
                </motion.a>
                <motion.a
                  variants={buttonVariants}
                  whileTap="tap"
                  href="#packages"
                  className="px-5 py-3 rounded-lg border border-gray-300 text-gray-800 transition hover:bg-gray-100"
                >
                  Lihat Paket Sponsor
                </motion.a>
              </div>
              <div className="mt-6 text-xs text-gray-500">
                Diselenggarakan oleh <b>JEOS</b> · <b>Nempo Garut</b> ·{" "}
                <b>Garut Event</b> (tiga <i>Main Organizer</i>)
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[480px] rounded-2xl p-6 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl"></div>

              {/* Hero Banner Slideshow Otomatis */}
              <div className="relative rounded-xl overflow-hidden ring-1 ring-gray-200 h-full w-full mx-auto">
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
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Statistik */}
              <div className="grid grid-cols-3 gap-3 text-center absolute bottom-3 left-6 right-6 p-4">
                <div className="bg-[#F4C01E]/80 backdrop-blur-sm border border-[#F4C01E]/60 rounded-xl p-4">
                  <div className="text-2xl text-black font-bold">64</div>
                  <div className="text-[11px] text-gray-800">Tim</div>
                </div>
                <div className="bg-[#F4C01E]/80 backdrop-blur-sm border border-[#F4C01E]/60 rounded-xl p-4">
                  <div className="text-2xl text-black font-bold">500+</div>
                  <div className="text-[11px] text-gray-800">
                    Penonton Offline
                  </div>
                </div>
                <div className="bg-[#F4C01E]/80 backdrop-blur-sm border border-[#F4C01E]/60 rounded-xl p-4">
                  <div className="text-2xl text-black font-bold">10K+</div>
                  <div className="text-[11px] text-gray-800">
                    Digital Impressions
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-12 md:py-16 bg-[#F4C01E]/10">
          <div className="container grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h2 className="section-h2 font-extrabold text-[#9F2798]">Tentang Event</h2>
              <p className="text-gray-700">
                JEOS Mobile Legend Championship (JMLC) Vol. 2 adalah turnamen{" "}
                <i>Mobile Legends: Bang Bang</i> skala komunitas yang dikemas
                profesional oleh tiga <b>Main Organizer</b>: JEOS, Nempo Garut,
                dan Garut Event.
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-lg p-4">
                  <div className="text-[#3B46A5] font-semibold">Format</div>
                  <div className="text-gray-700">Offline + Live Streaming</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-lg p-4">
                  <div className="text-[#3B46A5] font-semibold">Durasi</div>
                  <div className="text-gray-700">2 Hari (BO1–BO5)</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-extrabold mb-3 text-[#3B46A5]">Event Goals</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Empower local gamers — panggung kompetitif terstruktur.</li>
                <li>• Build esports ecosystem — kolaborasi organizer, sponsor, media, UMKM.</li>
                <li>• Boost community engagement — ruang interaksi & hiburan positif.</li>
                <li>• Increase sponsor visibility — exposure offline/online terukur.</li>
                <li>• Promote Garut as creative hub — citra kota kreatif & digital.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* EVENT DETAILS */}
        <section id="event-details" className="py-16">
          <div className="container">
            <h2 className="section-h2 font-extrabold text-center mb-6 text-[#9F2798]">
              Detail Acara
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-6">
                <h4 className="font-semibold text-[#3B46A5] mb-2">Lokasi</h4>
                <p className="text-gray-700">Gedung Serbaguna Garut</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-6">
                <h4 className="font-semibold text-[#3B46A5] mb-2">Tanggal</h4>
                <p className="text-gray-700">Sabtu–Minggu, 14–15 Juni 2025</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-6">
                <h4 className="font-semibold text-[#3B46A5] mb-2">Format</h4>
                <p className="text-gray-700">
                  64 Tim · Knockout · BO1 (Qualifier) · BO3 (Semifinal) · BO5
                  (Grand Final)
                </p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-6">
                <h4 className="font-semibold text-[#3B46A5] mb-2">
                  Rundown Singkat
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Hari 1: Registrasi · Opening · Penyisihan</li>
                  <li>Hari 2: Semifinal · Grand Final · Awarding · Closing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AUDIENCE */}
        <section id="audience" className="py-12 bg-[#F4C01E]/10">
          <div className="container">
            <h2 className="section-h2 font-extrabold text-center mb-6 text-[#9F2798]">
              Audiens & Media Value
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-5">
                <div className="text-3xl font-bold text-[#3B46A5]">15–30 th</div>
                <div className="text-xs text-gray-600">Segment usia</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-5">
                <div className="text-3xl font-bold text-[#3B46A5]">
                  IG · TikTok · YT
                </div>
                <div className="text-xs text-gray-600">Kanal distribusi</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-5">
                <div className="text-3xl font-bold text-[#3B46A5]">
                  Gaming · F&B
                </div>
                <div className="text-xs text-gray-600">Brand fit</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-5">
                <div className="text-3xl font-bold text-[#3B46A5]">
                  Slides & Overlay
                </div>
                <div className="text-xs text-gray-600">Shout-out sponsor</div>
              </div>
            </div>
          </div>
        </section>

        {/* TOURNAMENT SYSTEM */}
        <section id="tournament-system" className="py-16">
          <div className="container">
            <h2 className="section-h2 font-extrabold text-center mb-6 text-[#9F2798]">
              Sistem Turnamen
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-6">
                <h4 className="font-semibold text-[#3B46A5] mb-2">
                  Tahapan Kompetisi
                </h4>
                <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                  <li>Pendaftaran Online</li>
                  <li>Technical Meeting</li>
                  <li>Penyisihan (BO1)</li>
                  <li>Semifinal (BO3)</li>
                  <li>Grand Final (BO5)</li>
                </ol>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-6">
                <h4 className="font-semibold text-[#3B46A5] mb-2">Penghargaan</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Juara 1–3 hadiah uang & sponsor</li>
                  <li>MVP Player</li>
                  <li>Best Play Highlight</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MEDIA PLAN */}
        <section id="media-plan" className="py-16 bg-[#F4C01E]/10">
          <div className="container">
            <h2 className="section-h2 font-extrabold text-center mb-6 text-[#9F2798]">
              Media & Promotion Plan
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-6">
                <h4 className="font-semibold text-[#3B46A5] mb-2">
                  Online Campaign
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Teaser & countdown di Instagram, TikTok, YouTube</li>
                  <li>• Ads targeting gamers Garut & Bandung</li>
                  <li>• Streaming di YouTube & Facebook Gaming</li>
                </ul>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-6">
                <h4 className="font-semibold text-[#3B46A5] mb-2">
                  Offline Activation
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Banner & backdrop venue</li>
                  <li>• Booth sponsor</li>
                  <li>• MC & caster mention sesuai paket</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SPONSOR PACKAGES */}
        <section id="packages" className="py-12 md:py-16">
          <div className="container">
            <h2 className="section-h2 font-extrabold text-center mb-6 text-[#9F2798]">
              Paket Sponsor
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Diamond */}
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-2xl p-6">
                <div className="text-xs bg-[#F4C01E] text-black px-2 py-1 rounded inline-block font-semibold">
                  DIAMOND
                </div>
                <div className="mt-2 text-2xl font-bold text-[#9F2798]">
                  Rp 20–25 Juta
                </div>
                <ul className="mt-4 text-sm text-gray-700 space-y-2">
                  <li>
                    Nama di depan event:{" "}
                    <b>“JMLC Vol. 2 presented by [Sponsor]”</b>
                  </li>
                  <li>Logo terbesar (backdrop, banner, jersey, overlay)</li>
                  <li>Booth eksklusif + product showcase sebelum final</li>
                  <li>MC & caster mention sepanjang acara</li>
                  <li>Masuk highlight video & recap</li>
                  <li>Eksklusif sponsor hadiah utama</li>
                </ul>
              </div>
              {/* Gold */}
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-2xl p-6">
                <div className="text-xs bg-[#F4C01E] text-black px-2 py-1 rounded inline-block font-semibold">
                  GOLD
                </div>
                <div className="mt-2 text-2xl font-bold text-[#9F2798]">
                  Rp 10–15 Juta
                </div>
                <ul className="mt-4 text-sm text-gray-700 space-y-2">
                  <li>Logo besar (backdrop, banner, overlay)</li>
                  <li>Booth/stand di venue</li>
                  <li>MC mention tiap babak penting</li>
                  <li>Social media mention</li>
                  <li>Sponsor hadiah tambahan</li>
                </ul>
              </div>
              {/* Silver */}
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-2xl p-6">
                <div className="text-xs bg-[#F4C01E] text-black px-2 py-1 rounded inline-block font-semibold">
                  SILVER
                </div>
                <div className="mt-2 text-2xl font-bold text-[#9F2798]">
                  Rp 3–5 Juta
                </div>
                <ul className="mt-4 text-sm text-gray-700 space-y-2">
                  <li>Logo sedang (banner & overlay)</li>
                  <li>MC mention opening & closing</li>
                  <li>Produk di meja caster/panitia</li>
                  <li>Opsional hadiah merchandise</li>
                </ul>
              </div>
            </div>
            {/* Supporting & UMKM */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-2xl p-6">
                <div className="text-xs bg-[#3B46A5] text-white px-2 py-1 rounded inline-block font-semibold">
                  SUPPORTING / IN-KIND
                </div>
                <div className="mt-2 text-xl font-bold text-[#9F2798]">
                  Barter Produk/Jasa
                </div>
                <ul className="mt-3 text-sm text-gray-700 space-y-2">
                  <li>Produk dibagikan/dipakai peserta & penonton</li>
                  <li>Logo kecil di media sosial + MC mention awarding</li>
                  <li>Foto awarding + tag sponsor</li>
                </ul>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-2xl p-6">
                <div className="text-xs bg-[#3B46A5] text-white px-2 py-1 rounded inline-block font-semibold">
                  COMMUNITY & UMKM
                </div>
                <div className="mt-2 text-xl font-bold text-[#9F2798]">
                  Rp 500 rb – Rp 1 Juta
                </div>
                <ul className="mt-3 text-sm text-gray-700 space-y-2">
                  <li>
                    Logo pada slide <b>Community Supporter</b>
                  </li>
                  <li>MC mention sesi apresiasi</li>
                  <li>Meja kecil promosi di venue (opsional)</li>
                  <li>Produk bisa jadi hadiah hiburan</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section id="compare" className="py-12 bg-[#F4C01E]/10">
          <div className="container">
            <h2 className="section-h2 font-extrabold text-center mb-6 text-[#9F2798]">
              Perbandingan Benefit
            </h2>
            <div className="overflow-x-auto bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl">
              <table className="min-w-full text-sm">
                <thead className="bg-[#3B46A5]/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-800">Benefit</th>
                    <th className="px-4 py-3 text-[#3B46A5]">Diamond</th>
                    <th className="px-4 py-3 text-[#3B46A5]">Gold</th>
                    <th className="px-4 py-3 text-[#3B46A5]">Silver</th>
                    <th className="px-4 py-3 text-[#3B46A5]">UMKM/Supporting</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Nama di depan event", "Ya", "—", "—", "—"],
                    [
                      "Logo backdrop/banner",
                      "Terbesar",
                      "Besar",
                      "Sedang",
                      "Slide/Story",
                    ],
                    ["Overlay streaming", "Ya", "Ya", "Ya", "—"],
                    [
                      "Booth di venue",
                      "Eksklusif",
                      "Ya",
                      "Opsional",
                      "Meja kecil",
                    ],
                    [
                      "MC & Caster mention",
                      "Sepanjang acara",
                      "Per babak",
                      "Opening/Closing",
                      "Sesi apresiasi",
                    ],
                    [
                      "Hak sponsor hadiah",
                      "Utama",
                      "Tambahan",
                      "Merchandise",
                      "Hiburan",
                    ],
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium text-gray-700">{row[0]}</td>
                      {row.slice(1).map((cell, j) => (
                        <td key={j} className="px-4 py-3 text-center text-gray-600">
                          {cell === "Ya" ? (
                            <span className="text-[#9F2798] font-semibold">
                              Ya
                            </span>
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

        {/* PRIZE INTEGRATION */}
        <section className="py-12">
          <div className="container">
            <h2 className="section-h2 font-extrabold text-center mb-6 text-[#9F2798]">
              Contoh Integrasi Hadiah Sponsor
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-6">
                <h4 className="font-semibold text-[#3B46A5]">Juara 1</h4>
                <p className="text-sm text-gray-700">
                  Rp 6.000.000 + Voucher Hotel 2 Malam —{" "}
                  <i>by Hotel Partner</i>
                </p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-6">
                <h4 className="font-semibold text-[#3B46A5]">Juara 2</h4>
                <p className="text-sm text-gray-700">
                  Rp 4.000.000 + Voucher Restoran Rp 1.000.000 —{" "}
                  <i>by Café Sponsor</i>
                </p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-6">
                <h4 className="font-semibold text-[#3B46A5]">Juara 3</h4>
                <p className="text-sm text-gray-700">
                  Rp 2.500.000 + Merchandise Eksklusif —{" "}
                  <i>by Brand Lokal</i>
                </p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-6">
                <h4 className="font-semibold text-[#3B46A5]">MVP</h4>
                <p className="text-sm text-gray-700">
                  Rp 500.000 + 1 Malam Villa —{" "}
                  <i>by Villa Partner</i>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DELIVERABLES & TIMELINE */}
        <section id="deliverables" className="py-12 md:py-16 bg-[#F4C01E]/10">
          <div className="container grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="section-h2 font-extrabold mb-4 text-[#9F2798]">
                Sponsor Deliverables
              </h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Logo di materi (backdrop, banner, overlay, konten media sosial)</li>
                <li>• Booth/aktivasi di venue (Diamond/Gold)</li>
                <li>• MC & caster shout-out sesuai paket</li>
                <li>• Integrasi hadiah (voucher/produk) saat awarding</li>
                <li>• Dokumentasi foto & video recap berlogo sponsor</li>
              </ul>
              <h3 className="mt-6 font-semibold text-[#3B46A5]">
                Kebutuhan Materi dari Sponsor
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Logo vektor (.AI/.EPS/.SVG) & PNG transparan</li>
                <li>• Brand guideline (warna, clear space, larangan penggunaan)</li>
                <li>• Copy pendek untuk MC (maks 30–45 detik)</li>
                <li>• Detail hadiah/booth (jika ada)</li>
              </ul>
            </div>
            <div>
              <h2 className="section-h2 font-extrabold mb-4 text-[#9F2798]">
                Timeline Sponsor
              </h2>
              <ol className="text-sm text-gray-700 space-y-3">
                <li>
                  <b>H-60 — H-45</b>: Konfirmasi paket & penandatanganan MoU
                </li>
                <li>
                  <b>H-45 — H-30</b>: Kirim logo & brand guideline
                </li>
                <li>
                  <b>H-30 — H-21</b>: Produksi materi (backdrop, overlay,
                  konten)
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

        {/* ORGANIZER */}
        <section className="py-12">
          <div className="container">
            <h2 className="section-h2 font-extrabold text-center mb-6 text-[#9F2798]">
              Organizer — Tiga Main Organizer Setara
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#3B46A5]/10 backdrop-blur-sm border border-[#3B46A5]/20 rounded-xl p-6 text-center">
                <div className="mx-auto w-14 h-14 rounded bg-gradient-to-br from-[#9F2798] to-[#3B46A5] mb-3"></div>
                <div className="font-semibold text-gray-800">JEOS</div>
                <div className="text-xs text-gray-600">Main Organizer</div>
              </div>
              <div className="bg-[#3B46A5]/10 backdrop-blur-sm border border-[#3B46A5]/20 rounded-xl p-6 text-center">
                <div className="mx-auto w-14 h-14 rounded bg-gradient-to-br from-[#F4C01E] to-[#3B46A5] mb-3"></div>
                <div className="font-semibold text-gray-800">Nempo Garut</div>
                <div className="text-xs text-gray-600">Main Organizer</div>
              </div>
              <div className="bg-[#3B46A5]/10 backdrop-blur-sm border border-[#3B46A5]/20 rounded-xl p-6 text-center">
                <div className="mx-auto w-14 h-14 rounded bg-gradient-to-br from-[#9F2798] to-[#F4C01E] mb-3"></div>
                <div className="font-semibold text-gray-800">Garut Event</div>
                <div className="text-xs text-gray-600">Main Organizer</div>
              </div>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-4">
                <h4 className="font-semibold text-[#3B46A5] mb-2">
                  Produksi & Operasional
                </h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Manajemen venue & layout</li>
                  <li>• Perizinan & keamanan</li>
                  <li>• Tim teknis (sound, network, stream)</li>
                </ul>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-4">
                <h4 className="font-semibold text-[#3B46A5] mb-2">
                  Kompetisi & Talents
                </h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Bracket & match schedule</li>
                  <li>• Caster, MC, juri, marshal</li>
                  <li>• Technical meeting & rulebook</li>
                </ul>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-4">
                <h4 className="font-semibold text-[#3B46A5] mb-2">
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

        {/* FAQ */}
        <section id="faq" className="py-12 md:py-16 bg-[#F4C01E]/10">
          <div className="container">
            <h2 className="section-h2 font-extrabold text-center mb-6 text-[#9F2798]">
              FAQ Sponsor
            </h2>
            <div className="space-y-3">
              {faqData.map((item, i) => (
                <div key={i}>
                  <div
                    className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl p-4 cursor-pointer"
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-gray-800">{item.q}</h4>
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-[#3B46A5]"
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
                  </div>
                  <AnimatePresence>
                    {openFAQ === i && (
                      <motion.div
                        className="overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={faqContentVariants}
                      >
                        <p className="mt-2 text-sm text-gray-700 p-4 bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-xl shadow-inner">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-12 md:py-16">
          <div className="container grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="section-h2 font-extrabold mb-4 text-[#9F2798]">
                Bergabung sebagai Sponsor
              </h2>
              <p className="text-gray-700">
                Pilih paket yang sesuai, kirim logo & guideline, dan aktifkan
                brand Anda di JMLC Vol. 2.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <motion.a
                  variants={buttonVariants}
                  whileTap="tap"
                  href="/Proposal_JMLC_Vol2.pdf"
                  className="px-5 py-3 rounded-lg bg-[#9F2798] text-white font-semibold transition hover:opacity-80"
                >
                  Unduh Proposal PDF
                </motion.a>
                <motion.a
                  variants={buttonVariants}
                  whileTap="tap"
                  href="https://wa.me/6281234567890  "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg border border-[#3B46A5] text-gray-800 transition hover:bg-gray-100"
                >
                  WhatsApp Panitia
                </motion.a>
                <motion.a
                  variants={buttonVariants}
                  whileTap="tap"
                  href="mailto:sponsor@jmlc.id?subject=JMLC%20Vol.2%20Sponsorship"
                  className="px-5 py-3 rounded-lg border border-[#3B46A5] text-gray-800 transition hover:bg-gray-100"
                >
                  Email Kami
                </motion.a>
              </div>
            </motion.div>
            <motion.form
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              onSubmit={handleSubmit}
              className="bg-white/50 backdrop-blur-sm border border-gray-300/60 rounded-2xl p-6 grid gap-3 text-sm"
            >
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  placeholder="Nama Perusahaan"
                  className="px-4 py-3 rounded-lg border border-gray-300 bg-white/50 text-gray-800"
                />
                <input
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  placeholder="PIC / Kontak"
                  className="px-4 py-3 rounded-lg border border-gray-300 bg-white/50 text-gray-800"
                />
              </div>
              <select
                name="packageType"
                value={formData.packageType}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-lg border border-gray-300 bg-white/50 text-gray-800"
              >
                <option value="">Pilihan Paket</option>
                <option>Diamond Sponsor</option>
                <option>Gold Sponsor</option>
                <option>Silver Sponsor</option>
                <option>Supporting / In-Kind</option>
                <option>Community & UMKM</option>
              </select>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Catatan / kebutuhan aktivasi"
                className="px-4 py-3 rounded-lg border border-gray-300 bg-white/50 text-gray-800"
              ></textarea>
              <motion.button
                variants={buttonVariants}
                whileTap="tap"
                type="submit"
                className="mt-2 px-5 py-3 rounded-lg font-semibold bg-[#9F2798] text-white transition hover:opacity-80"
              >
                Kirim Minat
              </motion.button>
              <p className="text-[11px] text-gray-500">
                *Form ini contoh tampilan. Integrasikan ke backend/Google Form
                sesuai kebutuhan.
              </p>
            </motion.form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-gray-200 py-8 text-center text-xs text-gray-500">
          © JMLC Vol. 2 — JEOS · Nempo Garut · Garut Event
        </footer>
      </div>
    </>
  );
};

export default JMLCEventDetailPage;