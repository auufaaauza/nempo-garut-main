"use client";

import React from "react";
import Image from "next/image";
import {
  MapPin,
  Star,
  Trash2,
  Tag,
  Ticket,
  ChevronDown,
  Ban,
} from "lucide-react";
import {
  rupiah,
  formatDiscount,
} from "@/hooks/useCartClient";

// 1. Tipe Props diperbarui untuk menerima status checkbox dan handler-nya
type Props = {
  group: any;
  openMenus: Record<string, boolean>;
  toggleMenus: (id: string) => void;
  handleRemoveItem: (id: number) => void;
  isCouponDropdownOpen: string | null;
  setIsCouponDropdownOpen: (id: string | null) => void;
  isCouponLoading: boolean;
  processedCoupons: any[];
  handleApplyCoupon: (groupId: string, code: string) => void;
  handleRemoveCoupon: (groupId: string) => void;
  isSelected: boolean;
  onSelectGroup: (isSelected: boolean) => void;
};

const CartItemCulinary: React.FC<Props> = ({
  group,
  openMenus,
  toggleMenus,
  handleRemoveItem,
  isCouponDropdownOpen,
  setIsCouponDropdownOpen,
  isCouponLoading,
  processedCoupons,
  handleApplyCoupon,
  handleRemoveCoupon,
  // 2. Terima props baru di sini
  isSelected,
  onSelectGroup,
}) => {
  // ===== Perhitungan (tidak ada perubahan) =====
  const raw = (group.items || []).reduce(
    (a: number, i: any) => a + Number(i.subtotal || 0),
    0
  );
  const discountPct = Number(group.culinary?.discount || 0);
  const taxPct = Number(group.culinary?.tax || 0);
  const discountRp = Math.floor((raw * discountPct) / 100);
  const dpp = raw - discountRp;
  const appliedCouponDiscount = group.applied_coupon?.discount_amount || 0;
  const dppAfterCoupon = dpp - appliedCouponDiscount;
  const taxRp = taxPct > 0 ? Math.round((dppAfterCoupon * taxPct) / 100) : 0;

  const computeCouponDiscount = (coupon: any, base: number) => {
    if (!coupon) return 0;
    const type = coupon.discount_type;
    const val = Number(coupon.discount_value || 0);
    const max = coupon.max_discount != null ? Number(coupon.max_discount) : null;

    let cut = 0;
    if (type === "percent") {
      cut = Math.floor(base * (val / 100));
      if (max != null) cut = Math.min(cut, max);
    } else if (type === "fixed") {
      cut = Math.min(val, base);
    }
    return cut;
  };
  
  const isThisCouponDropdownOpen = isCouponDropdownOpen === group.cart_group_id;

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-lg shadow-xl mb-10 relative ${isThisCouponDropdownOpen ? 'z-30' : 'z-10'}`}>
      <div className="p-6">
        {/* Header dan Items */}
        <div className="flex items-start gap-4 mb-4">

          {/* 3. Checkbox ditambahkan di sini sesuai gambar */}
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 rounded border-gray-400 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
            checked={isSelected}
            onChange={(e) => onSelectGroup(e.target.checked)}
          />

          <Image
            src={group.culinary?.image_url || "/images/placeholder.jpg"}
            alt={group.culinary?.name || "Culinary"}
            width={64}
            height={64}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold">{group.culinary?.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <MapPin size={14} />
              <span>{group.culinary?.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span>
                {group.culinary?.rating} ({group.culinary?.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-3">
          <button
            onClick={() => toggleMenus(group.cart_group_id)}
            className="w-full text-left font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition flex items-center justify-between"
          >
            <span>Menu yang Dipesan</span>
            <span>{openMenus[group.cart_group_id] ? "▲" : "▼"}</span>
          </button>
          {openMenus[group.cart_group_id] && (
            <div className="mt-3 space-y-2 px-2">
              {(group.items || []).map((item: any) => (
                <div
                  key={item.cart_item_id}
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{item.menu_name}</h4>
                    <p className="text-sm text-gray-600">
                      {rupiah(Number(item.price))} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">
                      {rupiah(Number(item.subtotal))}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.cart_item_id)}
                      className="text-red-600 border border-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown Kupon (tidak ada perubahan) */}
        <div className="mt-4 relative"> 
          <h4 className="font-semibold text-gray-700 mb-2">Pilih Kupon</h4>
          <button
            onClick={() =>
              setIsCouponDropdownOpen(
                isThisCouponDropdownOpen
                  ? null
                  : group.cart_group_id
              )
            }
            className="w-full flex justify-between items-center text-left p-3 border-2 border-gray-300 rounded-lg bg-white hover:border-blue-500 transition-all relative"
          >
            {group.applied_coupon ? (
              <div className="flex items-center gap-2 font-bold text-green-700">
                <Tag size={16} />
                <span>{group.applied_coupon.code}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500">
                <Ticket size={16} />
                <span>Pilih Kupon</span>
              </div>
            )}
            <ChevronDown
              size={20}
              className={`transition-transform ${
                isThisCouponDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isThisCouponDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40 bg-transparent" 
                onClick={() => setIsCouponDropdownOpen(null)} 
              />
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 p-2 space-y-2 max-h-64 overflow-y-auto">
                {isCouponLoading ? (
                  <div className="text-sm text-center text-gray-500 py-4">
                    Memproses...
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleRemoveCoupon(group.cart_group_id);
                        setIsCouponDropdownOpen(null);
                      }}
                      className="w-full flex items-center gap-2 text-left p-3 rounded-lg hover:bg-gray-100 transition-all text-gray-700 font-semibold"
                    >
                      <Ban size={16} />
                      <span>Jangan Gunakan Kupon</span>
                    </button>
                    {processedCoupons.map((coupon) => {
                      const potentialDiscount = computeCouponDiscount(coupon, dpp);
                      const currentCulinaryId = group.culinary?.id;
                      const isCouponSpecific = coupon.culinaries && coupon.culinaries.length > 0;
                      let isApplicableForThisGroup = coupon.isApplicable; 
                      if (isApplicableForThisGroup && isCouponSpecific) {
                        isApplicableForThisGroup = coupon.culinaries.some((c: any) => c.id === currentCulinaryId);
                      }

                      return (
                        <button
                          key={coupon.id}
                          onClick={() => {
                            handleApplyCoupon(group.cart_group_id, coupon.code);
                            setIsCouponDropdownOpen(null);
                          }}
                          disabled={!isApplicableForThisGroup}
                          className={`w-full text-left p-3 border-t border-gray-100 rounded-lg transition-all ${
                            isApplicableForThisGroup
                              ? "hover:bg-blue-50"
                              : "bg-gray-50 filter grayscale cursor-not-allowed opacity-70"
                          }`}
                        >
                          <div
                            className={`flex justify-between items-center font-bold ${
                              isApplicableForThisGroup
                                ? "text-blue-600"
                                : "text-gray-500"
                            }`}
                          >
                            <span>{coupon.code}</span>
                            {isApplicableForThisGroup && potentialDiscount > 0 && (
                              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                                Hemat ~{rupiah(potentialDiscount)}
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-xs mt-1 ${
                              isApplicableForThisGroup
                                ? "text-gray-600"
                                : "text-gray-400"
                            }`}
                          >
                            {isApplicableForThisGroup
                              ? formatDiscount(coupon)
                              : "Tidak berlaku untuk toko ini."
                            }
                          </p>
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Diskon, Pajak & Subtotal (tidak ada perubahan) */}
        <hr className="my-4" />
        <div className="space-y-2">
          {discountRp > 0 && (
            <div className="flex justify-between text-sm">
              <span>Diskon ({discountPct}%)</span>
              <span className="text-red-600">- {rupiah(discountRp)}</span>
            </div>
          )}
          {group.applied_coupon?.discount_amount > 0 && (
            <div className="flex justify-between text-sm">
              <span>Diskon Kupon ({group.applied_coupon.code})</span>
              <span className="text-red-600">
                - {rupiah(group.applied_coupon.discount_amount)}
              </span>
            </div>
          )}
          {taxRp > 0 && (
            <div className="flex justify-between text-sm">
              <span>PPN ({taxPct}%)</span>
              <span>+ {rupiah(taxRp)}</span>
            </div>
          )}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Subtotal</span>
          <span className="text-lg font-bold text-blue-600">
            {rupiah(Number(group.total_price))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItemCulinary;