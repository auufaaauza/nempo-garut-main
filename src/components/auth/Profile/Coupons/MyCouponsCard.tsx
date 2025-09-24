"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { TicketPercent, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const MyCouponsCard: React.FC = () => {
  const router = useRouter();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="max-w-md mx-auto shadow-md hover:shadow-lg rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 cursor-pointer"
        sx={{ borderRadius: "12px" }}
        onClick={() => router.push("/coupons")}
      >
        <CardContent className="p-4">
          <motion.div
            className="flex items-center justify-between"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {/* Left Section - Icon & Content */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 text-primary">
                <TicketPercent size={20} />
              </div>
              <div>
                <Typography variant="body1" className="font-semibold text-gray-800">
                  Kupon Saya
                </Typography>
                <Typography variant="caption" className="text-gray-500 text-xs">
                  Lihat voucher aktif
                </Typography>
              </div>
            </div>

            {/* Right Section - Arrow */}
            <div className="text-gray-400">
              <ChevronRight size={18} />
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MyCouponsCard;