"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useCartClient } from "@/hooks/useCartClient";
import CartSkeleton from "./CartSkeleton";
import CartEmpty from "./CartEmpty";
import CartItemCulinary from "./CartItemCulinary";
import CartItemTicket from "./CartItemTicket";
import CartSummary from "./CartSummary";
import ConfirmModal from "./ConfirmModal";
import SketchBackground from "@/components/public/common/SketchBackground";

const CartClient: React.FC = () => {
  const {
    cartGroups,
    summary,
    paymentMethods,
    isLoading,
    openMenus,
    toggleMenus,
    handleRemoveItem,
    handleClearCart,
    handleCheckout,
    isCouponLoading,
    processedCoupons,
    handleApplyCoupon,
    handleRemoveCoupon,
    paymentError,
    setPaymentError,

    // 🔽 ambil dari hook
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  } = useCartClient();

  const [isCouponDropdownOpen, setIsCouponDropdownOpen] = useState<
    string | null
  >(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [selectedGroups, setSelectedGroups] = useState<
    Record<string, boolean>
  >({});

  const handleSelectGroup = (groupId: string, isSelected: boolean) => {
    setSelectedGroups((prev) => ({
      ...prev,
      [groupId]: isSelected,
    }));
  };

  const allSelected =
    cartGroups.length > 0 &&
    cartGroups.every((g) => selectedGroups[g.cart_group_id]);

  const toggleSelectAll = () => {
    const newState: Record<string, boolean> = {};
    cartGroups.forEach((g) => {
      newState[g.cart_group_id] = !allSelected;
    });
    setSelectedGroups(newState);
  };

  const selectedCartGroups = cartGroups.filter(
    (g) => selectedGroups[g.cart_group_id]
  );

  const selectedSummary = useMemo(() => {
    if (!summary) return null;
    if (selectedCartGroups.length === 0) return summary;

    const subtotal = selectedCartGroups.reduce(
      (acc, g) => acc + Number(g.total_price || 0),
      0
    );
    const serviceFeePercent = summary?.service_fee_percent ?? 0;
    const serviceFee = Math.round(subtotal * (serviceFeePercent / 100));
    return {
      ...summary,
      subtotal,
      service_fee_percent: serviceFeePercent,
      service_fee: serviceFee,
      total_payment: subtotal + serviceFee,
    };
  }, [selectedCartGroups, summary]);

  if (isLoading) return <CartSkeleton />;
  if (cartGroups.length === 0) return <CartEmpty />;

  return (
    <div className="relative min-h-screen bg-gray-50">
      <SketchBackground />
      <div className="container mx-auto py-12 md:py-20 relative z-10">
        <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-xl shadow-sm">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-gray-400 text-blue-600 focus:ring-blue-500 cursor-pointer"
            checked={allSelected}
            onChange={toggleSelectAll}
          />
          <span className="text-gray-700 font-semibold">Pilih Semua</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartGroups.map((group) =>
              group.type === "KULINER" ? (
                <CartItemCulinary
                  key={group.cart_group_id}
                  group={group}
                  openMenus={openMenus}
                  toggleMenus={toggleMenus}
                  handleRemoveItem={handleRemoveItem}
                  isCouponDropdownOpen={isCouponDropdownOpen}
                  setIsCouponDropdownOpen={setIsCouponDropdownOpen}
                  isCouponLoading={isCouponLoading}
                  processedCoupons={processedCoupons}
                  handleApplyCoupon={handleApplyCoupon}
                  handleRemoveCoupon={handleRemoveCoupon}
                  isSelected={!!selectedGroups[group.cart_group_id]}
                  onSelectGroup={(checked) =>
                    handleSelectGroup(group.cart_group_id, checked)
                  }
                />
              ) : (
                <CartItemTicket
                  key={group.cart_group_id}
                  group={group}
                  isSelected={!!selectedGroups[group.cart_group_id]}
                  onSelectGroup={(checked) =>
                    handleSelectGroup(group.cart_group_id, checked)
                  }
                />
              )
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              summary={
                selectedSummary ?? summary ?? {
                  subtotal: 0,
                  service_fee: 0,
                  service_fee_percent: 0,
                  total_payment: 0,
                }
              }
              cartGroups={selectedCartGroups}
              getTotalItems={() =>
                selectedCartGroups.reduce(
                  (acc, g) => acc + (g.items?.length || 0),
                  0
                )
              }
              isCouponLoading={isCouponLoading}
              processedCoupons={processedCoupons}
              handleClearCart={handleClearCart}
              openConfirmModal={() => setShowConfirm(true)}
              handleCheckout={handleCheckout}
              paymentMethods={paymentMethods}
              selectedPaymentMethod={selectedPaymentMethod}
              onPaymentMethodChange={setSelectedPaymentMethod}
              paymentError={paymentError}
              setPaymentError={setPaymentError}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => handleCheckout(selectedCartGroups)} 
      />
    </div>
  );
};

export default CartClient;
