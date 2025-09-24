"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useOrders, type Order } from "@/hooks/useOrders";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Calendar,
  Tag,
  CheckCircle,
  CreditCard,
  PackageCheck,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ManualPayDialog from "@/components/public/shared/Orders/ManualPayDialog";
import OrderDetailDialog from "@/components/public/shared/Orders/OrderDetailDialog";
import OrderItemDetailDialog from "@/components/public/shared/Orders/OrderItemDetailDialog"; // ✅ BARU
import SketchBackground from "@/components/public/common/SketchBackground";
import { Button as ShadcnButton } from "@/components/ui/button";
import api from "@/services/api";
import {
  useOrderBubbleCounts,
  type OrderBubbleCounts,
} from "@/hooks/useOrderBubbleCounts";

type TabKey = keyof OrderBubbleCounts;

const TABS: Array<{
  key: TabKey;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  itemStatuses: string[];
}> = [
  {
    key: "pending",
    label: "Perlu Dibayar",
    shortLabel: "Bayar",
    icon: CreditCard,
    itemStatuses: ["pending", "unpaid"], // status item untuk tab pending
  },
  {
    key: "confirmed",
    label: "Dikonfirmasi",
    shortLabel: "Proses",
    icon: PackageCheck,
    itemStatuses: ["confirmed"], // status item untuk tab confirmed
  },
  {
    key: "completed",
    label: "Selesai",
    shortLabel: "Selesai",
    icon: CheckCircle,
    itemStatuses: ["completed"], // status item untuk tab completed
  },
  {
    key: "cancelled",
    label: "Dibatalkan",
    shortLabel: "Batal",
    icon: XCircle,
    itemStatuses: ["cancelled", "expired", "failed"], // status item untuk tab cancelled
  },
];

const MyOrdersClient: React.FC = () => {
  const { orders, isLoading, error, refetch } = useOrders();
  const {
    counts: bubbleCounts,
    isLoading: isBubbleLoading,
    refetch: refetchBubbleCounts,
  } = useOrderBubbleCounts();
  const [activeTab, setActiveTab] = useState<TabKey>("pending");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [manualOpenFor, setManualOpenFor] = useState<{
    orderId: string;
    amount: number;
  } | null>(null);
  const [paying, setPaying] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null); // ✅ untuk OrderDetailDialog
  const [selectedItem, setSelectedItem] = useState<any | null>(null);   // ✅ untuk OrderItemDetailDialog

  // ambil tab dari query param
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    const isValidTab = TABS.some((tab) => tab.key === tabFromUrl);
    if (isValidTab && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl!);
    }
  }, [searchParams, activeTab]);

  const handleTabClick = (tabKey: TabKey) => {
    setActiveTab(tabKey);
    router.replace(`${pathname}?tab=${tabKey}`);
  };

  const formatCount = (value: number) => {
    if (value > 99) return "99+";
    return String(value);
  };

  // ✅ Fetch detail order by ID
  const fetchOrderDetail = async (id: string) => {
    const res = await api.get(`/api/orders/${id}`);
    return res.data;
  };

  const handleOpenDetail = async (order: Order) => {
    try {
      const detail = await fetchOrderDetail(order.id);
      console.log("Detail order:", detail);
      setSelectedOrder(detail);
    } catch (err) {
      console.error("Gagal ambil detail order:", err);
      // fallback pakai data list
      setSelectedOrder(order);
    }
  };

  // ✅ Filter order berdasarkan status item untuk setiap tab
  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    const activeTabInfo = TABS.find((tab) => tab.key === activeTab);
    if (!activeTabInfo) return [];

    return orders.filter((order: Order) => {
      // Untuk tab pending, cek payment status
      if (activeTab === "pending") {
        const paymentStatus = String(order.payment_status || "").toLowerCase();
        return ["pending", "unpaid"].includes(paymentStatus);
      }

      // Untuk tab lainnya, cek status item
      if (!order.items || order.items.length === 0) return false;

      return order.items.some((item: any) => {
        const itemStatus = String(item.status || "").toLowerCase();
        return activeTabInfo.itemStatuses.includes(itemStatus);
      });
    });
  }, [orders, activeTab]);

  // ✅ Payment check - hanya berdasarkan payment status
  const canPay = (order: Order) => {
    const paymentStatus = String(order.payment_status || "").toLowerCase();
    return ["pending", "unpaid"].includes(paymentStatus);
  };

  const handlePayNow = (order: Order) => {
    console.log("Redirect ke pembayaran untuk order:", order.id);
    window.location.href = `/pembayaran?order=${order.id}`;
  };

  const getEmptyStateMessages = () => {
    switch (activeTab) {
      case "pending":
        return {
          title: "Tidak Ada Pesanan yang Perlu Dibayar",
          subtitle: "Semua pesanan Anda sudah lunas!",
        };
      case "confirmed":
        return {
          title: "Tidak Ada Pesanan yang Sedang Diproses",
          subtitle: "Pesanan yang sudah dibayar akan muncul di sini.",
        };
      case "completed":
        return {
          title: "Belum Ada Pesanan yang Selesai",
          subtitle: "Riwayat pesanan sukses Anda akan tersimpan di sini.",
        };
      case "cancelled":
        return {
          title: "Tidak Ada Pesanan yang Dibatalkan",
          subtitle: "Riwayat pesanan yang gagal atau dibatalkan.",
        };
      default:
        return {
          title: "Tidak Ada Pesanan",
          subtitle: "Mulai jelajahi dan pesan tiket atau kuliner.",
        };
    }
  };

  const activeTabIndex = TABS.findIndex((tab) => tab.key === activeTab);

  // 🔄 Render
  if (isLoading) {
    return <p className="text-center py-10">Memuat pesanan...</p>;
  }
  if (error) {
    return (
      <p className="text-center py-10 text-red-500">Gagal memuat pesanan.</p>
    );
  }

  return (
    <div className="relative min-h-screen overflow-y-hidden bg-gray-50">
      <SketchBackground />
      <div className="container mx-auto px-4 py-6 md:py-12 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Typography
            variant="h4"
            component="h1"
            className="text-2xl md:text-4xl text-primary mb-2"
          >
            <span className="font-bold">Pesanan Saya</span>
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Kelola dan pantau status pesanan Anda
          </Typography>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
            <div className="relative mb-4">
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 hidden md:block"></div>
              <motion.div
                className="absolute top-6 left-0 h-0.5 bg-blue-500 hidden md:block"
                initial={false}
                animate={{
                  width: `${(activeTabIndex + 1) * (100 / TABS.length)}%`,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <div className="grid grid-cols-4 gap-2 relative z-10">
                {TABS.map((tab, index) => (
                  <motion.button
                    key={tab.key}
                    onClick={() => handleTabClick(tab.key)}
                    className={`relative flex flex-col items-center p-3 md:p-4 rounded-xl transition-all duration-200 ${activeTab === tab.key
                      ? "bg-blue-50 text-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${activeTab === tab.key
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-400"
                        }`}
                    >
                      <tab.icon size={18} className="md:w-5 md:h-5" />
                      <div
                        className={`absolute -top-1 -right-1 min-w-[1.75rem] h-5 px-1 rounded-full text-xs font-semibold flex items-center justify-center ${activeTab === tab.key
                          ? "bg-primary text-white"
                          : (bubbleCounts[tab.key] ?? 0) > 0
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                          }`}
                      >
                        {isBubbleLoading ? "…" : formatCount(bubbleCounts[tab.key] ?? 0)}
                      </div>
                    </div>
                    <span className="text-xs md:text-sm font-medium text-center leading-tight">
                      <span className="block md:hidden">{tab.shortLabel}</span>
                      <span className="hidden md:block">{tab.label}</span>
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {filteredOrders.length === 0 ? (
            <motion.div
              key={`empty-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
              </div>
              <Typography
                variant="h6"
                className="text-lg md:text-xl font-semibold text-gray-900 mb-2"
              >
                {getEmptyStateMessages().title}
              </Typography>
              <Typography className="text-gray-600 mb-6">
                {getEmptyStateMessages().subtitle}
              </Typography>
              <ShadcnButton
                asChild
                size="lg"
                className="bg-primary mt-3 hover:bg-primary/70"
              >
                <Link href="/kuliner">Mulai Berbelanja</Link>
              </ShadcnButton>
            </motion.div>
          ) : (
            <motion.div
              key="order-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 mb-20"
            >
              {filteredOrders.map((order: Order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <Typography
                        variant="h6"
                        className="font-semibold text-gray-900"
                      >
                        Pesanan #{order.id.substring(0, 8).toUpperCase()}
                      </Typography>
                      <Typography className="text-sm text-gray-500">
                        {format(new Date(order.created_at), "d MMM yyyy", {
                          locale: id,
                        })}
                      </Typography>
                    </div>
                    <ShadcnButton
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenDetail(order)} // 🔹 buka OrderDetailDialog
                    >
                      Detail
                    </ShadcnButton>
                  </div>

                  {/* Items */}
                  <div className="p-4 md:p-6 space-y-3">
                    {order.items?.map((item: any) => {
                      const details =
                        typeof item.details === "string"
                          ? (() => {
                            try {
                              return JSON.parse(item.details);
                            } catch {
                              return {};
                            }
                          })()
                          : item.details || {};

                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                        >
                          {/* Kiri: Nama + harga */}
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">
                              {details?.name || "Pesanan"}
                            </p>
                            <p className="text-sm text-gray-500">
                              Rp {Number(item.subtotal).toLocaleString("id-ID")}
                            </p>
                          </div>

                          {/* Kanan: Tombol Detail Item */}
                          <div className="flex items-center gap-3">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium capitalize ${item.status === "confirmed"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : item.status === "completed"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : item.status === "cancelled"
                                    ? "bg-red-50 text-red-700 border border-red-200"
                                    : "bg-orange-50 text-orange-700 border border-orange-200"
                                }`}
                            >
                              {item.status}
                            </span>

                            <ShadcnButton
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedItem(item)} // ✅ buka OrderItemDetailDialog
                              className="shrink-0"
                            >
                              Detail
                            </ShadcnButton>
                          </div>
                        </div>
                      );
                    })}

                    {/* Payment Buttons */}
                    {/* Payment Buttons */}
                    {canPay(order) && (
                      <div className="mt-4 flex flex-col md:flex-row gap-3">
                        {order.payment_type === "midtrans" && (
                          <ShadcnButton
                            onClick={() => handlePayNow(order)}
                            disabled={paying === order.id}
                            className="flex-1 py-2 bg-primary hover:bg-primary/70"
                            size="lg"
                          >
                            {paying === order.id ? "Memproses..." : "Bayar Sekarang"}
                          </ShadcnButton>
                        )}

                        {order.payment_type === "manual" && (
                          <ShadcnButton
                            variant="outline"
                            onClick={() =>
                              setManualOpenFor({
                                orderId: order.id,
                                amount: Number(order.total_price || 0),
                              })
                            }
                            className="flex-1 py-2"
                            size="lg"
                          >
                            Transfer Manual
                          </ShadcnButton>
                        )}

                        {order.payment_type === "cod" && (
                          <div className="w-full p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                            Metode Pembayaran Anda <strong>Bayar di Tempat</strong>.
                            Silakan langsung bayar di kasir.
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dialogs */}
        <ManualPayDialog
          open={!!manualOpenFor}
          orderId={manualOpenFor?.orderId || ""}
          amount={manualOpenFor?.amount || 0}
          onClose={() => setManualOpenFor(null)}
          onConfirmed={() => {
            setManualOpenFor(null);
            refetch?.();
            refetchBubbleCounts();
          }}
        />
        <OrderDetailDialog
          open={!!selectedOrder}
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
        <OrderItemDetailDialog
          open={!!selectedItem}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </div>
  );
};

export default MyOrdersClient;
