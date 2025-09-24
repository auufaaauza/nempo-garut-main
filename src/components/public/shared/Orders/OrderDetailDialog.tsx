"use client";

import React from "react";
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
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface OrderDetailDialogProps {
  open: boolean;
  onClose: () => void;
  order: any | null;
}

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = ({
  open,
  onClose,
  order,
}) => {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Header */}
      <DialogTitle className="flex justify-between items-center">
        <Typography component="div" variant="h6" fontWeight="bold">
          Pesanan #{order.id.substring(0, 8).toUpperCase()}
        </Typography>
        <QRCodeCanvas value={order.id} size={64} />
      </DialogTitle>

      <DialogContent dividers>
        {/* Informasi order */}
        <Typography variant="body2" color="textSecondary">
          Order ID: {order.id}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Tanggal:{" "}
          {format(
            new Date(order.booking_date || order.created_at),
            "d MMMM yyyy, HH:mm",
            { locale: id }
          )}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Ringkasan per toko */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Ringkasan Per Toko
        </Typography>
        <div className="space-y-2">
          {order.items?.map((item: any) => {
            let details: any = {};
            try {
              details =
                typeof item.details === "string"
                  ? JSON.parse(item.details)
                  : item.details;
            } catch {
              details = {};
            }

            return (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{details?.name || "Pesanan"}</span>
                <span>Rp {Number(item.subtotal).toLocaleString("id-ID")}</span>
              </div>
            );
          })}
        </div>

        <Divider sx={{ my: 2 }} />

        {/* Ringkasan total global */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Ringkasan Pembayaran
        </Typography>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {Number(order.subtotal || 0).toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya Layanan</span>
            <span>
              Rp {Number(order.service_fee || 0).toLocaleString("id-ID")}
            </span>
          </div>
          {order.discount_amount > 0 && (
            <div className="flex justify-between text-red-500">
              <span>Diskon</span>
              <span>
                - Rp {Number(order.discount_amount).toLocaleString("id-ID")}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base mt-2">
            <span>Total Bayar</span>
            <span>
              Rp {Number(order.total_price || 0).toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Tutup
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailDialog;
