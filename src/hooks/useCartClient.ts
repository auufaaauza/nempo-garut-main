"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCartStore } from "@/stores/cartStore";
import api from "@/services/api";
import { getMyCoupons } from "@/lib/data";
import type { Coupon } from "@/lib/data";

export const rupiah = (n: number) =>
  `Rp ${Number(n || 0).toLocaleString("id-ID")}`;

export const formatDiscount = (coupon: Coupon): string => {
  if (coupon.discount_type === "percent") {
    let text = `Diskon ${coupon.discount_value}%`;
    if (coupon.max_discount) {
      text += ` (maks. ${rupiah(coupon.max_discount)})`;
    }
    return text;
  }
  if (coupon.discount_type === "fixed") {
    return `Potongan ${rupiah(coupon.discount_value)}`;
  }
  return "Kupon Spesial";
};

export const calculateDiscountAmount = (
  coupon: Coupon,
  subtotal: number
): number => {
  if (coupon.discount_type === "percent") {
    const discount = (subtotal * coupon.discount_value) / 100;
    return coupon.max_discount
      ? Math.min(discount, coupon.max_discount)
      : discount;
  }
  if (coupon.discount_type === "fixed") {
    return Math.min(coupon.discount_value, subtotal);
  }
  return 0;
};

export const useCartClient = () => {
  const {
    cartGroups,
    summary,
    isLoading,
    fetchCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    getTotalItems,
  } = useCartStore();

  const { user } = useAuth();
  const router = useRouter();

  // local UI state
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [myCoupons, setMyCoupons] = useState<Coupon[]>([]);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [isCouponDropdownOpen, setIsCouponDropdownOpen] = useState(false);
  const autoAppliedRef = useRef(false);

  const paymentMethods = [
    { id: "cod", name: "Bayar Di Tempat" },
    { id: "manual", name: "Manual" },
    { id: "midtrans", name: "Bayar Otomatis" },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const toggleMenus = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if (user) {
      fetchCart();
      const fetchUserCoupons = async () => {
        try {
          const coupons = await getMyCoupons();
          setMyCoupons(coupons);
        } catch (error) {
          console.error("Gagal mengambil kupon saya:", error);
        }
      };
      fetchUserCoupons();
    }
  }, [user, fetchCart]);

  // filter coupons berdasarkan isi cart
  const processedCoupons = useMemo(() => {
    if (!myCoupons.length) return [];
    if (!cartGroups.length) {
      return myCoupons.map((coupon) => ({
        ...coupon,
        isApplicable: false,
      }));
    }

    const vendorIdsInCart = new Set<string>();
    cartGroups.forEach((group) => {
      const id =
        group.type === "KULINER"
          ? group.culinary.id
          : group.ticket.destination.id;
      vendorIdsInCart.add(id);
    });

    return myCoupons.map((coupon) => {
      const isForCulinary =
        coupon.culinaries?.some((c) => vendorIdsInCart.has(c.id)) ?? false;
      const isForDestination =
        coupon.destinations?.some((d) => vendorIdsInCart.has(d.id)) ?? false;
      const isApplicable = isForCulinary || isForDestination;
      return { ...coupon, isApplicable };
    });
  }, [myCoupons, cartGroups]);

  useEffect(() => {
    const applicableCoupons = processedCoupons.filter((c) => c.isApplicable);
    if (
      autoAppliedRef.current ||
      isLoading ||
      !applicableCoupons.length ||
      summary?.applied_coupon
    ) {
      return;
    }

    const bestCouponToApply = applicableCoupons[0];
    if (bestCouponToApply) {
      const autoApply = async () => {
        setIsCouponLoading(true);
        try {
          await applyCoupon(bestCouponToApply.code);
        } catch (error) {
          console.error("Gagal auto-apply kupon:", error);
        } finally {
          setIsCouponLoading(false);
        }
      };
      autoApply();
      autoAppliedRef.current = true;
    }
  }, [processedCoupons, summary, isLoading, applyCoupon]);

  // checkout
  const handleCheckout = async (selectedCartGroups?: any[]) => {
    try {
      // ✅ Validasi: harus pilih metode pembayaran
      if (!selectedPaymentMethod) {
        setPaymentError("Harus pilih metode pembayaran terlebih dahulu");
        return false;
      }

      // ✅ Validasi COD: hanya boleh 1 mitra
      if (selectedPaymentMethod === "cod") {
        const mitraIds = new Set(
          (selectedCartGroups ?? cartGroups).map((group) =>
            group.type === "KULINER"
              ? group.culinary.mitra_id
              : group.ticket.destination.mitra_id
          )
        );
        if (mitraIds.size > 1) {
          setPaymentError("COD hanya tersedia jika order dari satu mitra/vendor");
          return false;
        }
      }

      setPaymentError(null);

      // ✅ Mapping items untuk payload
      const items = (selectedCartGroups ?? cartGroups)
        .map((group) => {
          if (group.type === "KULINER") {
            return {
              id: group.culinary.id,
              mitra_id: group.culinary.mitra_id,
              type: "KULINER",
              name: group.culinary.name,
              subtotal: group.total_price,
              details: {
                id: group.culinary.id,
                name: group.culinary.name,
                menus: group.items.map((item: any) => ({
                  id: item.menu_id,
                  name: item.menu_name,
                  price: item.price,
                  quantity: item.quantity,
                  subtotal: item.subtotal,
                })),
              },
            };
          }

          if (group.type === "TIKET") {
            return {
              id: group.ticket.destination.id,
              mitra_id: group.ticket.destination.mitra_id,
              type: "TIKET",
              name: group.ticket.destination.name,
              subtotal: group.total_price,
              details: {
                id: group.ticket.destination.id,
                name: group.ticket.destination.name,
                visit_date: group.ticket.visit_date,
                tickets: {
                  adult: {
                    qty: group.ticket.qty.adult,
                    price: group.ticket.price.adult,
                    subtotal:
                      group.ticket.qty.adult * group.ticket.price.adult,
                  },
                  child: {
                    qty: group.ticket.qty.child,
                    price: group.ticket.price.child,
                    subtotal:
                      group.ticket.qty.child * group.ticket.price.child,
                  },
                },
                addons: (group.ticket.outbound || []).map((o: any) => ({
                  name: o.name,
                  price: o.price,
                  quantity: o.quantity,
                  subtotal: o.price * o.quantity,
                })),
              },
            };
          }

          return null;
        })
        .filter(Boolean);

      // ✅ Kumpulin cart_group_id yang dipilih
      const selectedGroups = (selectedCartGroups ?? cartGroups).map(
        (g) => g.cart_group_id
      );

      // ✅ Kirim ke backend
      const resp = await api.post("/api/checkout", {
        items,
        selected_groups: selectedGroups,
        customer: {
          first_name: user?.name ?? "User",
          email: user?.email ?? "user@example.com",
          phone: user?.phone_number ?? "",
        },
        payment_method: selectedPaymentMethod,
        // bank_account_id: selectedBankId || null, // kalau manual transfer
      });

      if (resp.data?.success) {
        await clearCart();
        router.push("/pesanan-saya");
        return true;
      } else {
        console.error("Checkout gagal:", resp.data);
        alert("Checkout gagal, coba lagi ya.");
        return false;
      }
    } catch (err) {
      console.error("Error saat checkout:", err);
      alert("Gagal memproses checkout.");
      return false;
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await useCartStore.getState().removeFromCart(cartItemId);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const handleApplyCoupon = async (groupId: string, code: string) => {
    if (!code) return;
    setIsCouponLoading(true);
    try {
      await applyCoupon({ group_id: groupId, code }); // backend harus terima group_id
      setIsCouponDropdownOpen(null);
    } catch (error: any) {
      console.error("applyCoupon gagal:", error);
      alert(error.message || "Gagal menerapkan kupon.");
    } finally {
      setIsCouponLoading(false);
    }
  };

  const handleRemoveCoupon = async (groupId: string) => {
    setIsCouponLoading(true);
    try {
      await removeCoupon(groupId); // backend juga harus support hapus per group
      setIsCouponDropdownOpen(null);
    } catch (error: any) {
      console.error("removeCoupon gagal:", error);
      alert(error.message || "Gagal menghapus kupon.");
    } finally {
      setIsCouponLoading(false);
    }
  };

  return {
    cartGroups,
    summary,
    isLoading,
    getTotalItems,
    openMenus,
    toggleMenus,
    isCouponDropdownOpen,
    setIsCouponDropdownOpen,
    isCouponLoading,
    processedCoupons,
    handleCheckout,
    handleRemoveItem,
    handleClearCart,
    handleApplyCoupon,
    handleRemoveCoupon,
    paymentMethods,

    // 🔽 ini penting
    selectedPaymentMethod,
    setSelectedPaymentMethod,

    paymentError,
    setPaymentError,
  };
};
