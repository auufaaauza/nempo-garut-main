"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { CreditCard, CheckCircle, PackageCheck, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  useOrderBubbleCounts,
  type OrderBubbleCounts,
} from "@/hooks/useOrderBubbleCounts";

type OrderStatusKey = keyof OrderBubbleCounts;

const MyOrdersCard: React.FC = () => {
  const router = useRouter();
  const {
    counts: bubbleCounts,
    isLoading: isBubbleLoading,
    refetch: refetchBubbleCounts,
  } = useOrderBubbleCounts();
  
  const actions: Array<{
    label: string;
    icon: React.ComponentType<{ size?: number }>;
    href: string;
    key: OrderStatusKey;
  }> = [
    {
      label: "Perlu Dibayar",
      icon: CreditCard,
      href: "/pesanan-saya?tab=pending",
      key: "pending",
    },
    {
      label: "Dikonfirmasi",
      icon: PackageCheck,
      href: "/pesanan-saya?tab=confirmed",
      key: "confirmed",
    },
    {
      label: "Selesai",
      icon: CheckCircle,
      href: "/pesanan-saya?tab=completed",
      key: "completed",
    },
    {
      label: "Dibatalkan",
      icon: XCircle,
      href: "/pesanan-saya?tab=cancelled",
      key: "cancelled",
    },
  ];

  const formatCount = (value: number) => {
    if (value > 99) return "99+";
    return String(value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card 
        className="max-w-md mx-auto shadow-lg rounded-2xl overflow-hidden border border-gray-200" 
        sx={{ borderRadius: "20px" }}
      >
        <CardContent className="p-6">
          <div className="mb-6">
            <Typography variant="h6" className="font-bold text-primary">
              <span className="font-bold">Pesanan Saya</span>
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              Pantau semua transaksi Anda di sini
            </Typography>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {actions.map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                onClick={() => {
                  router.push(item.href);
                  refetchBubbleCounts();
                }}
              >
                <Box className="flex flex-col items-center text-center">
                  <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-2 transition-colors duration-200 hover:bg-primary/20">
                    <item.icon size={24} />
                    <span
                      className={`absolute -top-1 -right-1 min-w-[1.5rem] h-5 px-1 rounded-full text-xs font-semibold flex items-center justify-center ${
                        (bubbleCounts[item.key] ?? 0) > 0
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {isBubbleLoading ? "…" : formatCount(bubbleCounts[item.key] ?? 0)}
                    </span>
                  </div>
                  <Typography variant="caption" className="font-semibold text-gray-700 leading-tight">
                    {item.label}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MyOrdersCard;
