"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Memuat");
  const [dots, setDots] = useState(".");
  const [closing, setClosing] = useState(false);

  // Animasi titik-titik (...)
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(dotsInterval);
  }, []);

  // Animasi pergantian teks
  useEffect(() => {
    const texts = ["Memuat aset", "Menyiapkan antarmuka", "Hampir selesai"];
    let index = 0;
    const textChangeInterval = setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
    }, 2200);
    return () => clearInterval(textChangeInterval);
  }, []);

  // Logika untuk menyembunyikan preloader
  useEffect(() => {
    const handleDone = () => {
      setClosing(true);
      setTimeout(() => setLoading(false), 500);
    };

    window.addEventListener("load", handleDone);
    const timer = setTimeout(handleDone, 5000);

    return () => {
      window.removeEventListener("load", handleDone);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        closing ? "opacity-0" : "opacity-100"
      } animate-aurora`}
    >
      {/* Floating Bubbles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-16 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-cyan-400/20 rounded-full blur-2xl animate-float-delayed"></div>

      {/* Logo Container dengan Animasi Ripple */}
      <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48">
        <div className="absolute w-full h-full rounded-full animate-ripple border-2 border-blue-400/50"></div>
        <div
          className="absolute w-full h-full rounded-full animate-ripple border-2 border-blue-400/50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute w-full h-full rounded-full animate-ripple border-2 border-blue-400/50"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative w-24 h-24 sm:w-32 sm:h-32 p-4 bg-white/90 rounded-full shadow-lg animate-pulse-subtle">
          <Image
            src="/Assets/Logo/Logo-2.png"
            alt="Logo Nempo Garut"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 640px) 96px, 128px"
          />
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center relative z-10">
        <p className="text-white font-bold text-lg tracking-wider">
          {loadingText}
          <span className="inline-block w-4 text-left">{dots}</span>
        </p>
        <p className="text-blue-200/70 text-sm mt-1">
          Nempo Garut - Platform Digital Unggulan
        </p>
      </div>

      <style jsx>{`
        /* Aurora background */
        @keyframes aurora {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-aurora {
          background: linear-gradient(
            270deg,
            #2a67ac,
            #154275,
            #3a8bd6,
            #1a3a6d
          );
          background-size: 600% 600%;
          animation: aurora 15s ease infinite;
        }

        /* Ripple logo */
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 3s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }

        /* Subtle pulse for logo */
        @keyframes pulse-subtle {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2.5s ease-in-out infinite;
        }

        /* Floating shapes */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(-10px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(10px) translateX(15px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
