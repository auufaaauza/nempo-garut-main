"use client";

import React from "react";

// Helper function lokal untuk mengatasi error import
const rupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// Tipe Props diperbarui untuk menerima status dan handler checkbox
type Props = {
  group: any;
  // --- PROPS BARU DITAMBAHKAN ---
  isSelected: boolean;
  onSelectGroup: (isSelected: boolean) => void;
};

// Terima props baru di sini
const CartItemTicket: React.FC<Props> = ({ group, isSelected, onSelectGroup }) => {
  const adultQty = Number(group.ticket?.qty?.adult || 0);
  const adultPrice = Number(group.ticket?.price?.adult || 0);
  const childQty = Number(group.ticket?.qty?.child || 0);
  const childPrice = Number(group.ticket?.price?.child || 0);

  const adultSubtotal = adultQty * adultPrice;
  const childSubtotal = childQty * childPrice;

  const addons = (group.ticket?.outbound || []).map((o: any) => ({
    name: o.name,
    price: o.price,
    quantity: o.quantity,
    subtotal: o.price * o.quantity,
  }));

  const addonsTotal = addons.reduce((sum, a) => sum + a.subtotal, 0);
  const total = adultSubtotal + childSubtotal + addonsTotal;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">

          {/* Checkbox ditambahkan di sini */}
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 rounded border-gray-400 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
            checked={isSelected}
            onChange={(e) => onSelectGroup(e.target.checked)}
          />
          
          <img
            src={group.ticket?.destination?.image_url || "/images/placeholder.jpg"}
            alt={group.ticket?.destination?.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold">{group.ticket?.destination?.name}</h3>
            <div className="text-sm text-gray-600">
              Tanggal kunjungan: {group.ticket?.visit_date}
            </div>
            <div className="text-sm text-gray-600">
              Dewasa: {adultQty} • Anak: {childQty}
            </div>
          </div>
          <span className="text-sm text-gray-500">Tiket Wisata</span>
        </div>

        <hr className="my-4" />

        {/* Rincian tiket */}
        <div className="flex items-center justify-between py-2">
          <div className="flex-1">
            <h4 className="font-medium">Tiket Masuk</h4>
            <p className="text-sm text-gray-600">
              Dewasa: {rupiah(adultPrice)} × {adultQty}
              <br />
              Anak: {rupiah(childPrice)} × {childQty}
            </p>
          </div>
          <span className="font-bold">{rupiah(adultSubtotal + childSubtotal)}</span>
        </div>

        {addons.map((o, idx) => (
          <div key={idx} className="flex items-center justify-between py-2">
            <div className="flex-1">
              <h4 className="font-medium">{o.name}</h4>
              <p className="text-sm text-gray-600">
                {rupiah(Number(o.price))} × {o.quantity}
              </p>
            </div>
            <span className="font-bold">{rupiah(o.subtotal)}</span>
          </div>
        ))}

        <hr className="my-4" />

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Subtotal</span>
          <span className="text-lg font-bold text-blue-600">{rupiah(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItemTicket;

