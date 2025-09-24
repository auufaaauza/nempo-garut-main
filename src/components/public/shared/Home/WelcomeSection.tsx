"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image"; // <-- 1. Impor komponen Image

const WelcomeSection: React.FC = () => {
  const [isContentReady, setIsContentReady] = useState(false);

  // Efek loading untuk seluruh konten, termasuk background
  useEffect(() => {
    const timer = setTimeout(() => setIsContentReady(true), 500); // Waktu munculnya komponen
    return () => clearTimeout(timer);
  }, []);

  // Fungsi ini akan dipanggil saat gambar maskot selesai dimuat
  const handleImageLoad = () => {
    // Jika Anda ingin animasi teks dan background muncul setelah gambar,
    // maka pindahkan setIsContentReady(true) ke sini.
    // Untuk saat ini, saya pisahkan agar background muncul duluan
    // bersamaan dengan placeholder teks.
  };

  return (
    <section className="container mt-16">
      <div className="relative rounded-4xl bg-[#3273BE] text-white p-6 md:p-10 flex items-center gap-4 shadow-lg overflow-hidden">
        
        {/* ======================================= */}
        {/* === DEKORASI BACKGROUND BARU (MINIMALIS) === */}
        {/* ======================================= */}
        
        {/* Perbukitan & Domba di Kanan Bawah */}
        <div
          className={`absolute bottom-0 right-0 w-full text-blue-300 transition-all duration-1000 ease-out ${
            isContentReady ? "opacity-20 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path fill="currentColor" fillOpacity="1" d="M0,192L60,197.3C120,203,240,213,360,208C480,203,600,181,720,165.3C840,149,960,149,1080,165.3C1200,181,1320,213,1380,229.3L1440,245.3L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
          {/* Siluet Domba di Atas Bukit */}
          <div className="absolute bottom-12 right-[10%] w-10 h-10 text-blue-200 opacity-60">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.143 14.286c0-1.572-1.572-2.857-3.429-2.857s-3.429 1.285-3.429 2.857c0 1.571 1.572 2.857 3.429 2.857s3.429-1.286 3.429-2.857zm-8.571-2.857c-1.857 0-3.429 1.285-3.429 2.857s1.572 2.857 3.429 2.857 3.429-1.286 3.429-2.857c0-1.572-1.572-2.857-3.429-2.857zm-2.857 5.714c-1.572 0-2.857-1.286-2.857-2.857s1.285-2.857 2.857-2.857c1.571 0 2.857 1.285 2.857 2.857s-1.286 2.857-2.857 2.857zM18 5c-1.125 0-2.14.563-2.734 1.438-1.531-.813-3.328-1.438-5.266-1.438s-3.734.625-5.266 1.438C4.14 5.562 3.125 5 2 5-1 5 0 8 0 8s.5-3 3-3c1.125 0 2.14.563 2.734 1.438 1.454-.781 3.125-1.438 4.981-1.438s3.527.656 4.981 1.438C16.297 5.562 17.312 5 18.438 5c2.5 0 3.437 3 3.437 3s-.938-3-3.875-3z"></path></svg>
          </div>
        </div>

        {/* Awan Kecil di Kiri Atas */}
        <div 
          className={`absolute top-4 left-10 w-20 h-20 text-blue-200 transition-all duration-700 ease-out delay-200 ${
            isContentReady ? "opacity-15 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path></svg>
        </div>
        
        {/* ======================================= */}
        {/* ========= KONTEN UTAMA ANDA ========= */}
        {/* ======================================= */}

        {/* Gambar Maskot */}
        <div className="relative w-35 h-35 sm:w-40 sm:h-40 md:w-45 md:h-45 flex-shrink-0 z-10">
          {!isContentReady && ( // Menggunakan isContentReady untuk placeholder
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse" />
          )}
          {/* --- PERUBAHAN DI SINI --- */}
          <Image
            src="/Assets/gif/domba2.GIF"
            alt="Maskot Domba"
            width={180} // Set lebar gambar (sesuaikan dg w-45, misal 11.25rem * 16px)
            height={180} // Set tinggi gambar (sesuaikan dg h-45)
            className={`object-contain w-full h-full transform transition-all duration-700 ${
              isContentReady ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageLoad} // Handle error jika gambar gagal load
            unoptimized={true} // <-- Tambahkan ini jika Anda menggunakan GIF animasi
          />
        </div>

        {/* Teks */}
        <div className="relative flex-1 z-10">
          {!isContentReady ? ( // Menggunakan isContentReady untuk placeholder
            <div className="space-y-3">
              <div className="h-5 sm:h-6 md:h-7 bg-blue-400 rounded w-2/3 animate-pulse"></div>
              <div className="h-3 sm:h-4 bg-blue-400 rounded w-full animate-pulse"></div>
              <div className="h-3 sm:h-4 bg-blue-400 rounded w-5/6 animate-pulse"></div>
            </div>
          ) : (
            <>
              <h1
                className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl"
              >
                <span className="shimmer-text">Wilujeng Sumping ka Garut!</span>
              </h1>
              <p
                className="text-blue-100 mt-1 text-sm sm:text-base md:text-lg"
              >
                Jelajahi keindahan, budaya, dan cita rasa khas Garut bersama Nempo.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;