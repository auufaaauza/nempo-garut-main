"use client";

import React from "react";
import { Lock, Trash2, CreditCard } from "lucide-react";
import { rupiah } from "@/hooks/useCartClient";

type Props = {
  summary: any;
  cartGroups: any[];
  getTotalItems: () => number;
  handleClearCart: () => void;
  openConfirmModal: () => void;
  paymentMethods: any[];
  selectedPaymentMethod: string | null;
  onPaymentMethodChange: (methodId: string) => void;
  paymentError?: string | null;
  setPaymentError: (err: string | null) => void;
};

const CartSummary: React.FC<Props> = ({
  summary,
  cartGroups,
  getTotalItems,
  handleClearCart,
  openConfirmModal,
  paymentMethods,
  selectedPaymentMethod,
  onPaymentMethodChange,
  paymentError,
  setPaymentError
}) => {
  const isEmpty = cartGroups.length === 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl sticky top-24 p-6 transition-all duration-500 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Ringkasan Pesanan</h3>
        <button
          onClick={handleClearCart}
          className={`flex items-center gap-2 text-red-600 border border-red-600 hover:bg-red-50 px-3 py-1 rounded text-sm transition-all duration-300 bg-white/50 ${isEmpty
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105"
            }`}
          disabled={isEmpty}
        >
          <Trash2 size={16} />
          Kosongkan
        </button>
      </div>

      <hr className="my-4" />

      {/* Isi */}
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${isEmpty ? "max-h-32 opacity-70" : "max-h-[800px] opacity-100"
          }`}
      >
        {isEmpty ? (
          <div>
            <p className="text-gray-500 text-sm text-center py-8 animate-pulse">
              Pilih item dulu untuk melihat ringkasan pesanan.
            </p>
          </div>
        ) : (
          <div>
            {/* List Group */}
            <div className="space-y-3 mb-4">
              {cartGroups.map((group, index) => {
                const label =
                  group.type === "KULINER"
                    ? group.culinary?.name ?? "Kuliner"
                    : group.ticket?.destination?.name ?? "Tiket Wisata";
                return (
                  <div
                    key={group.cart_group_id}
                    className="flex justify-between animate-in slide-in-from-left-5"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <span className="text-sm text-gray-600 truncate pr-2">
                      {label}
                    </span>
                    <span className="text-sm font-medium">
                      {rupiah(Number(group.total_price || 0))}
                    </span>
                  </div>
                );
              })}
            </div>

            <hr className="my-4" />

            {/* Ringkasan Harga */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{rupiah(summary?.subtotal || 0)}</span>
              </div>

              {summary?.applied_coupon && (
                <div>
                  <div className="flex justify-between">
                    <span>Diskon Kupon ({summary.applied_coupon.code})</span>
                    <span className="text-red-600">
                      - {rupiah(summary.applied_coupon.discount_amount)}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium mt-2">
                    <span>Subtotal setelah Diskon</span>
                    <span>
                      {rupiah(
                        (summary?.subtotal || 0) -
                        summary.applied_coupon.discount_amount
                      )}
                    </span>
                  </div>
                </div>
              )}

              {summary && (
                <div className="flex justify-between">
                  <span>
                    Biaya Layanan{" "}
                    {summary.service_fee_percent
                      ? `(${summary.service_fee_percent}%)`
                      : ""}
                  </span>
                  <span>
                    {summary.service_fee > 0
                      ? `+ ${rupiah(summary.service_fee)}`
                      : rupiah(0)}
                  </span>
                </div>
              )}
            </div>

            <hr className="my-4" />

            {/* Dropdown Pembayaran */}
            <div className="space-y-2">
              <label
                htmlFor="paymentMethod"
                className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-1"
              >
                <CreditCard size={16} />
                Metode Pembayaran
              </label>
              <select
                id="paymentMethod"
                value={selectedPaymentMethod || ""}
                onChange={(e) => onPaymentMethodChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50/50 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isEmpty}
              >
                <option value="" disabled>
                  -- Pilih Metode Pembayaran --
                </option>
                {paymentMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>

              {/* ✅ Tampilkan error di sini */}
              {paymentError && (
                <p className="text-red-500 text-sm mt-1">{paymentError}</p>
              )}
            </div>

            <hr className="my-4" />

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold mb-6">
              <span>Total Pembayaran</span>
              <span className="text-blue-600">
                {rupiah(summary?.total_payment || 0)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Tombol Bayar */}
      <button
        onClick={() => {
          if (!selectedPaymentMethod) {
            setPaymentError("Silakan pilih metode pembayaran terlebih dahulu.");
            return;
          }

          const selectedIds = cartGroups.map((g) =>
            g.type === "KULINER" ? g.culinary?.id : g.ticket?.destination?.id
          );
          const uniqueMitraIds = new Set(selectedIds);

          if (selectedPaymentMethod === "cod" && uniqueMitraIds.size > 1) {
            setPaymentError("COD hanya tersedia jika order dari satu mitra/vendor.");
            onPaymentMethodChange("");
            return;
          }

          setPaymentError(null);
          openConfirmModal();
        }}
        disabled={isEmpty}
        className={`w-full py-3 rounded-lg font-medium transition-all duration-600 ease-in-out flex items-center justify-center gap-2 relative overflow-hidden ${isEmpty
          ? "bg-gray-300 text-gray-500 cursor-not-allowed scale-95 opacity-60 shadow-none"
          : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] shadow-md"
          }`}
      >
        <Lock
          size={20}
          className={`relative z-10 ${isEmpty ? "opacity-50" : ""}`}
        />
        <span className="relative z-10">Lanjut Bayar</span>
      </button>

      {/* Info Items */}
      <div className="text-center mt-4">
        <p
          className={`text-sm ${isEmpty ? "text-gray-400" : "text-gray-600"
            }`}
        >
          {isEmpty
            ? "Belum ada item yang dipilih"
            : `Total ${getTotalItems()} item dipilih`}
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
