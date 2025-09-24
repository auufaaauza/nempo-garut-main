"use client";

import React, { useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

interface OrderItemDetailDialogProps {
  open: boolean;
  onClose: () => void;
  item: any | null;
}

const OrderItemDetailDialog: React.FC<OrderItemDetailDialogProps> = ({
  open,
  onClose,
  item,
}) => {
  if (!item) return null;

  let details: any = {};
  try {
    details =
      typeof item.details === "string"
        ? JSON.parse(item.details)
        : item.details;
  } catch {
    details = {};
  }

  const mitraName = useMemo(() => {
    return (
      details?.mitra_name ||
      details?.vendor_name ||
      details?.culinary?.name ||
      details?.culinary_name ||
      details?.mitra?.name ||
      ""
    );
  }, [details]);

  const billUrl = useMemo(() => {
    return (
      item?.bill_url ||
      item?.bill_photo ||
      details?.bill_url ||
      details?.bill_photo ||
      details?.payment_proof_url ||
      ""
    );
  }, [details, item]);

  const handleDownloadBill = () => {
    if (!billUrl) {
      console.warn("Bill tidak tersedia untuk order item", item.id);
      return;
    }

    try {
      window.open(billUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Gagal membuka bill", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Header */}
      <DialogTitle
        component="div"
        className="flex justify-between items-center"
      >
        <Typography variant="h6" fontWeight="bold">
            {details?.name || "Detail Pesanan"}
        </Typography>
        <QRCodeCanvas value={item.id} size={64} />
      </DialogTitle>

      <DialogContent dividers>
        {mitraName && (
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Mitra: {mitraName}
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Order Item ID: <span className="font-mono text-xs">{item.id}</span>
        </Typography>

        {/* Kalau ada menus */}
        {details?.menus?.length > 0 && (
          <>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Menu
            </Typography>
            {details.menus.map((menu: any, idx: number) => (
              <div
                key={idx}
                className="flex justify-between text-sm text-gray-600 border-b pb-1"
              >
                <span>
                  {menu.menu_name} x{menu.quantity}
                </span>
                <span>Rp{Number(menu.subtotal).toLocaleString("id-ID")}</span>
              </div>
            ))}
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* Kalau ada tickets */}
        {details?.tickets && (
          <>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Tiket
            </Typography>
            {Object.entries(details.tickets).map(([type, t]: any) => (
              <div
                key={type}
                className="flex justify-between text-sm text-gray-600 border-b pb-1"
              >
                <span>
                  {type === "adult" ? "Dewasa" : "Anak"} x{t.qty}
                </span>
                <span>Rp{Number(t.subtotal).toLocaleString("id-ID")}</span>
              </div>
            ))}
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* Addons */}
        {details?.addons?.length > 0 && (
          <>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Addons
            </Typography>
            {details.addons.map((addon: any, idx: number) => (
              <div
                key={idx}
                className="flex justify-between text-sm text-gray-600 border-b pb-1"
              >
                <span>
                  {addon.name} x{addon.quantity}
                </span>
                <span>Rp{Number(addon.subtotal).toLocaleString("id-ID")}</span>
              </div>
            ))}
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* Ringkasan */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Ringkasan {details?.name}
        </Typography>
        <div className="space-y-1 text-sm">
            {details.applied_coupon && (
            <div className="flex justify-between text-red-500">
              <span>Diskon</span>
              <span>
                - Rp{" "}
                {Number(
                  details.applied_coupon.discount_amount || 0
                ).toLocaleString("id-ID")}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp{Number(item.subtotal).toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between font-bold text-base mt-2">
            <span>Total</span>
            <span>Rp{Number(item.subtotal).toLocaleString("id-ID")}</span>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleDownloadBill}
          variant="outlined"
          color="primary"
          disabled={!billUrl}
        >
          Download Bill
        </Button>
        <Button onClick={onClose} variant="contained" color="primary">
          Tutup
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderItemDetailDialog;
