"use client";
import React, { useState, useEffect } from "react";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<boolean>; // ✅ harus balikin true kalau sukses, false kalau gagal
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, onClose, onConfirm }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
      setIsConfirming(false);
      setShowCheckmark(false);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleConfirm = async () => {
    setIsConfirming(true);

    try {
      const success = await onConfirm(); // ✅ tunggu hasil checkout
      if (success) {
        setShowCheckmark(true);
        // kasih delay biar animasi checkmark kelihatan
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        // kalau gagal, reset biar tombol aktif lagi
        setIsConfirming(false);
      }
    } catch (err) {
      setIsConfirming(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/5 backdrop-blur-xs flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isConfirming) {
          onClose();
        }
      }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 transform transition-all duration-300 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4 opacity-0"
        } ${isConfirming ? "scale-105" : ""}`}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 ${
              showCheckmark
                ? "bg-green-100 animate-pulse"
                : "bg-blue-100 animate-bounce"
            }`}
          >
            {showCheckmark ? (
              <svg
                className="w-8 h-8 text-green-600 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Konten */}
        <div
          className={`text-center transition-all duration-500 ${
            showCheckmark ? "opacity-50 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <h4 className="text-xl font-bold text-gray-800 mb-3">
            {showCheckmark ? "Berhasil!" : "Konfirmasi Pembayaran"}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {showCheckmark
              ? "Pembayaran sedang diproses. Anda akan dialihkan ke halaman Pesanan Saya."
              : "Apakah Anda yakin ingin melanjutkan ke pembayaran? Setelah konfirmasi, Anda akan diarahkan ke halaman "}
            {!showCheckmark && (
              <span className="font-semibold text-blue-600">Pesanan Saya</span>
            )}
            .
          </p>
        </div>

        {/* Tombol */}
        <div
          className={`flex gap-4 justify-center pt-6 transition-all duration-500 ${
            showCheckmark
              ? "opacity-0 pointer-events-none scale-95"
              : "opacity-100 scale-100"
          }`}
        >
          <button
            onClick={onClose}
            disabled={isConfirming}
            className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed min-w-[120px] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            {isConfirming ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Memproses...</span>
              </>
            ) : (
              "Konfirmasi"
            )}
          </button>
        </div>

        {/* Progress bar */}
        {isConfirming && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-1 rounded-full animate-pulse"
                style={{
                  width: showCheckmark ? "100%" : "70%",
                  transition: "width 1.2s ease-in-out",
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmModal;
