"use client";

import React, { useEffect, useState } from "react";
import { X, Copy, Check } from "lucide-react";
import api from "@/services/api";
import imageCompression from "browser-image-compression";
import Image from "next/image"

type BankAccount = {
  id: string;
  bank_name: string;
  account_number: string;
  account_owner: string;
  is_active: boolean | number;
  image: string | null;       // path asli di DB
  image_url: string | null;   // url full dari accessor Laravel
};

type Props = {
  open: boolean;
  amount: number;
  orderId: string;
  onClose: () => void;
  onConfirmed?: (payload: {
    orderId: string;
    bankId?: string;
    proofFile?: File;
  }) => void;
};

const rupiah = (n: number) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;

const ManualPayDialog: React.FC<Props> = ({
  open,
  amount,
  orderId,
  onClose,
  onConfirmed,
}) => {
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<BankAccount | null>(null);
  const [copied, setCopied] = useState<"account" | "amount" | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const openWhatsApp = () => {
    window.open("https://wa.me/6281385840306", "_blank"); // ✅ Hapus spasi ekstra
  };

  useEffect(() => {
    if (!open) return;
    setSelected(null);
    setError(null);
    setCopied(null);
    setProofFile(null);
    setPreviewUrl(null);
    setUploadError(null);
    setLoading(true);

    (async () => {
      try {
        const res = await api.get("/api/bank-accounts");
        const list: BankAccount[] = res.data?.data ?? [];
        setBanks(list);
      } catch (e: any) {
        setError(
          e?.response?.data?.message || e?.message || "Gagal memuat rekening."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [open, orderId]);

  const copy = async (text: string, which: "account" | "amount") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 1200);
    } catch { }
  };

  // === handle upload bukti transfer
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setUploadError(
        "Format file tidak didukung. Hanya JPG, JPEG, PNG, atau WEBP yang diperbolehkan."
      );
      setProofFile(null);
      setPreviewUrl(null);
      return;
    }

    if (file.size > 1024 * 1024) {
      setUploadError("Ukuran file maksimal 1MB");
      return;
    }

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      });
      setProofFile(compressed);
      setPreviewUrl(URL.createObjectURL(compressed));
      setUploadError(null);
    } catch (err) {
      setUploadError("Gagal memproses gambar.");
    }
  };

  const handleConfirm = async () => {
    if (!selected) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("order_id", orderId);
      formData.append("bank_id", selected.id);
      if (proofFile) formData.append("proof_file", proofFile);

      const res = await api.post("/api/order-payments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload sukses:", res.data);

      onConfirmed?.({ orderId, bankId: selected.id, proofFile });

      setProofFile(null);
      setPreviewUrl(null);
      onClose();
      alert("Bukti transfer berhasil dikirim, menunggu verifikasi admin.");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal mengirim bukti transfer.");
    } finally {
      setLoading(false);
    }
  };


  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" />

      <div
        className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl mx-auto 
                 p-4 sm:p-6 max-h-[90vh] overflow-y-auto
                 [&::-webkit-scrollbar]:w-2 
                 [&::-webkit-scrollbar-track]:bg-gray-100 
                 [&::-webkit-scrollbar-thumb]:bg-blue-500 
                 [&::-webkit-scrollbar-thumb]:rounded-md"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#3B82F6 #F3F4F6",
        }}
      >

        {/* header */}
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-bold">Transfer Manual</h4>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Pilih rekening tujuan. Nominal harus sesuai agar verifikasi lebih
          mudah. <br />
          (Order: {orderId.slice(0, 8)}…)
        </p>

        {/* daftar rekening */}
        <div className="space-y-2 max-h-52 overflow-auto mb-4">
          {loading && (
            <div className="text-sm text-gray-500">Memuat rekening…</div>
          )}
          {error && <div className="text-sm text-red-600">{error}</div>}
          {!loading && !error && banks.length === 0 && (
            <div className="text-sm text-gray-500">Belum ada rekening aktif.</div>
          )}

          {banks.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelected(b)}
              className={`w-full text-left border rounded-xl px-3 py-2 transition ${selected?.id === b.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
                }`}
            >
              <div className="font-semibold">{b.bank_name}</div>
              <div className="text-sm text-gray-600">
                {b.account_owner} • {b.account_number}
              </div>
            </button>
          ))}
        </div>

        {/* detail rekening */}
        {selected && (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 sm:p-4 space-y-4 mb-4">
            <div>
              <div className="text-xs uppercase text-blue-700 tracking-wide">
                Jumlah yang dibayarkan
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{rupiah(amount)}</span>
                <button
                  onClick={() => copy(String(amount), "amount")}
                  className="inline-flex items-center gap-1 text-xs border rounded px-2 py-1 hover:bg-white"
                >
                  {copied === "amount" ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}
                  {copied === "amount" ? "Tersalin" : "Salin"}
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Transfer tepat sesuai nominal.
              </p>
            </div>

            <div>
              <div className="text-xs uppercase text-blue-700 tracking-wide">
                Rekening Tujuan
              </div>
              <div className="font-semibold">{selected.bank_name}</div>
              <div className="text-sm text-gray-700">{selected.account_owner}</div>

              {selected.image_url ? (
                <div className="relative mt-2">
                  <Image
                    src={selected.image_url}
                    alt={selected.bank_name}
                    width={400}
                    height={200}
                    className="w-full h-auto rounded-lg border object-contain"
                  />
                  <a
                    href={selected.image_url}
                    download
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur px-3 py-1 rounded-md text-xs font-medium shadow hover:bg-white transition"
                  >
                    Download QRIS
                  </a>
                </div>
              ) : (
                <div className="mt-2 space-y-2">
                  {/* alert kalau belum ada gambar */}
                  <div className="w-full rounded-md border border-yellow-300 bg-yellow-50 text-yellow-800 px-3 py-2 text-xs">
                    ⚠️ Belum ada gambar/QRIS yang diupload admin.
                  </div>

                  {/* fallback ke nomor rekening */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{selected.account_number}</span>
                    <button
                      onClick={() => copy(selected.account_number, "account")}
                      className="inline-flex items-center gap-1 text-xs border rounded px-2 py-1 hover:bg-white"
                    >
                      {copied === "account" ? <Check size={14} /> : <Copy size={14} />}
                      {copied === "account" ? "Tersalin" : "Salin"}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* upload bukti transfer */}
        <div className="mb-4">
          <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center cursor-pointer hover:border-blue-500 transition"
            onClick={() => document.getElementById("proof-input")?.click()}
          >
            {!previewUrl ? (
              <>
                <div className="text-gray-500 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4m0 0H7m4 0h6"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Upload your image</span> atau seret ke sini
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Format JPG, JPEG, PNG, WEBP — max 1MB
                </p>
              </>
            ) : (
              <div className="relative inline-block">
                <img
                  src={previewUrl}
                  alt="Preview bukti transfer"
                  className="h-32 rounded-lg border object-cover"
                />
                <button
                  onClick={() => {
                    setPreviewUrl(null);
                    setProofFile(null);
                  }}
                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-red-100"
                >
                  <X size={16} className="text-red-600" />
                </button>
              </div>
            )}
          </div>

          {/* hidden input */}
          <input
            id="proof-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />

          {uploadError && (
            <p className="text-xs text-red-600 mt-2">{uploadError}</p>
          )}

          <div className="mt-2 text-xs text-gray-600 text-center">
            Jika kesulitan upload, konfirmasi via{" "}
            <button onClick={openWhatsApp} className="text-primary underline">
              WhatsApp
            </button>
          </div>
        </div>


        {/* aksi */}
        {/* ✅ Ganti mb-18 (invalid) → pb-6 + space di bawah tombol */}
        <div className="mt-4 pb-6 flex flex-col sm:flex-row gap-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg"
          >
            Tutup
          </button>
          <button
            disabled={!selected || loading}
            onClick={handleConfirm}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg ${selected
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-500"
              }`}
          >
            {loading ? "Mengirim..." : "Saya sudah transfer"}
          </button>
        </div>

        {/* ✅ Tambahkan spacer untuk amankan tombol dari bottom bar */}
        <div className="h-16 sm:hidden"></div>

      </div>
    </div>
  );
};

export default ManualPayDialog;