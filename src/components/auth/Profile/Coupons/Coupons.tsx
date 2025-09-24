"use client";

import { useMyCoupons } from "@/hooks/useCoupons";
import { Box, Typography, Card, CardContent, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Pagination } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ProfileBackground from "@/components/auth/Profile/ProfileBackground";
import { CheckCircle, Clock, Percent, Tag, XCircle, FileText, Copy, Gift, ArrowRight } from "lucide-react";
import { Button as ShadcnButton } from "@/components/ui/button";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function MyCouponsPage() {
  const { coupons, isLoading, error } = useMyCoupons();
  const [termsOpen, setTermsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedCode, setCopiedCode] = useState("");
  
  const ITEMS_PER_PAGE = 6;

  // Pagination logic
  const paginatedCoupons = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return coupons.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [coupons, currentPage]);

  const totalPages = Math.ceil(coupons.length / ITEMS_PER_PAGE);

  // Copy to clipboard
  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <Box className="min-h-screen relative px-4">
        <ProfileBackground />
        <div className="max-w-4xl mx-auto py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <div className="flex flex-col items-center text-center">
              <CircularProgress size={48} className="text-primary mb-4" />
              <Typography className="text-gray-700 font-medium">Memuat voucher Anda...</Typography>
            </div>
          </motion.div>
        </div>
      </Box>
    );
  }

  // Error State
  if (error) {
    return (
      <Box className="min-h-screen relative px-4">
        <ProfileBackground />
        <div className="max-w-4xl mx-auto py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <Alert severity="error" className="rounded-2xl shadow-md mb-6">
              {typeof error === "string" ? error : "Gagal memuat voucher. Coba lagi nanti."}
            </Alert>
            <ShadcnButton
              onClick={() => window.location.reload()}
              className="w-full bg-primary hover:bg-primary/80"
            >
              Muat Ulang
            </ShadcnButton>
          </motion.div>
        </div>
      </Box>
    );
  }

  // Helper: Cek apakah voucher expired
  const isExpired = (expiredAt: string | null | undefined) => {
    if (!expiredAt) return false;
    return new Date(expiredAt) < new Date();
  };

  // Helper: Format tanggal
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Box className="min-h-screen relative">
      <ProfileBackground />
      
      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 relative z-10">
        {/* Background Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 md:px-8 py-6 md:py-8 border-b border-primary/10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <Gift className="w-8 h-8 text-primary" />
                </div>
                <Typography variant="h4" className="font-bold text-primary">
                  <span className="font-bold">Voucher Saya</span>
                </Typography>
              </div>
              <div className="flex justify-center">
                <Typography 
                  variant="body1" 
                  className="text-gray-600 max-w-md text-center"
                >
                  Gunakan Voucher eksklusif untuk mendapatkan diskon menarik
                </Typography>
              </div>
              
              {/* Stats */}
              {coupons.length > 0 && (
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-primary/10">
                  <div className="text-center">
                    <Typography variant="h6" className="font-bold text-primary">
                      {coupons.filter(c => !isExpired(c.expired_at)).length}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500 text-xs">
                      Aktif
                    </Typography>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div className="text-center">
                    <Typography variant="h6" className="font-bold text-gray-500">
                      {coupons.length}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500 text-xs">
                      Total
                    </Typography>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Terms Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <ShadcnButton
                variant="outline"
                onClick={() => setTermsOpen(true)}
                className="w-full border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 h-12 rounded-xl"
              >
                <FileText className="w-5 h-5 mr-2" />
                Syarat & Ketentuan Penggunaan
                <ArrowRight className="w-4 h-4 ml-auto" />
              </ShadcnButton>
            </motion.div>

            {/* Empty State */}
            {coupons.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                // ✅ 1. Wrapper utama untuk centering secara vertikal dan horizontal
                className="flex flex-col items-center justify-center text-center py-12"
              >
                {/* Ikon dan latar belakangnya */}
                <div className="w-24 h-24 mb-6 bg-sky-100 rounded-full flex items-center justify-center">
                  <Tag size={40} className="text-sky-500" />
                </div>

                {/* Judul */}
                <Typography variant="h5" className="font-bold text-gray-800 mb-4">
                  <span className="font-bold">Belum Ada Voucher</span>
                </Typography>

                {/* Deskripsi */}
                <Typography variant="body1" className="text-gray-500 mb-8 max-w-sm mx-auto py-3 pb-5">
                  Voucher eksklusif akan muncul di sini. Jelajahi promo menarik untuk mendapatkan diskon!
                </Typography>

                {/* Tombol Aksi */}
                <ShadcnButton asChild className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all">
                  <Link href="/promo">
                    Lihat Promo Sekarang
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </ShadcnButton>
              </motion.div>
            ) : (
              <>
                {/* Coupons Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
                  >
                    {paginatedCoupons.map((coupon, index) => (
                      <motion.div
                        key={coupon.id}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="group"
                      >
                        <Card
                          className={`
                            relative overflow-hidden border-0 transition-all duration-300 h-full
                            ${isExpired(coupon.expired_at)
                              ? "bg-gradient-to-br from-gray-50 to-gray-100 shadow-md"
                              : "bg-gradient-to-br from-white to-primary/3 shadow-lg group-hover:shadow-xl"
                            }
                          `}
                          sx={{ borderRadius: "20px" }}
                        >
                          {/* Decorative Elements */}
                          <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/50 rounded-full transform rotate-45 scale-150"></div>
                          </div>
                          
                          {/* Side Accent */}
                          <div 
                            className={`absolute left-0 top-0 bottom-0 w-1 ${
                              isExpired(coupon.expired_at) 
                                ? "bg-gradient-to-b from-red-400 to-red-500" 
                                : "bg-gradient-to-b from-primary to-primary/70"
                            }`}
                          ></div>

                          <CardContent className="p-5 relative z-10">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                              {/* Status Badge */}
                              {isExpired(coupon.expired_at) ? (
                                <div className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-full">
                                  <XCircle size={12} />
                                  <Typography variant="caption" className="font-semibold text-xs">
                                    Kadaluarsa
                                  </Typography>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full">
                                  <CheckCircle size={12} />
                                  <Typography variant="caption" className="font-semibold text-xs">
                                    Aktif
                                  </Typography>
                                </div>
                              )}
                              
                              {/* Copy Button */}
                              {!isExpired(coupon.expired_at) && (
                                <button
                                  onClick={() => copyToClipboard(coupon.code)}
                                  className={`p-2 rounded-xl transition-all duration-200 ${
                                    copiedCode === coupon.code
                                      ? "bg-emerald-100 text-emerald-600"
                                      : "bg-gray-100 hover:bg-primary/10 text-gray-500 hover:text-primary"
                                  }`}
                                >
                                  {copiedCode === coupon.code ? (
                                    <CheckCircle size={14} />
                                  ) : (
                                    <Copy size={14} />
                                  )}
                                </button>
                              )}
                            </div>

                            {/* Coupon Code */}
                            <div className="mb-4">
                              <Typography 
                                variant="h5" 
                                className={`font-black tracking-wider mb-2 ${
                                  isExpired(coupon.expired_at) ? "text-gray-500" : "text-primary"
                                }`}
                              >
                                {coupon.code}
                              </Typography>
                              <div className="border-t-2 border-dashed border-gray-200"></div>
                            </div>

                            {/* Description */}
                            <Typography 
                              variant="body2" 
                              className="text-gray-600 mb-4 leading-relaxed line-clamp-2 min-h-[2.5rem]"
                            >
                              {coupon.description || "Tidak ada deskripsi"}
                            </Typography>

                            {/* Discount Value */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`p-2.5 rounded-xl ${
                                isExpired(coupon.expired_at) 
                                  ? "bg-gray-100" 
                                  : "bg-gradient-to-br from-primary/10 to-primary/5"
                              }`}>
                                {coupon.discount_type === "percent" ? (
                                  <Percent size={16} className={isExpired(coupon.expired_at) ? "text-gray-400" : "text-primary"} />
                                ) : (
                                  <Tag size={16} className={isExpired(coupon.expired_at) ? "text-gray-400" : "text-primary"} />
                                )}
                              </div>
                              
                              <div>
                                <Typography 
                                  variant="h6"
                                  className={`font-bold leading-none ${
                                    isExpired(coupon.expired_at) ? "text-gray-500" : "text-primary"
                                  }`}
                                >
                                  {coupon.discount_type === "percent"
                                    ? `${parseFloat(coupon.discount_value.toString()).toString()}%`
                                    : `Rp ${Number(coupon.discount_value).toLocaleString("id-ID")}`}
                                </Typography>
                                <Typography variant="caption" className="text-gray-500 text-xs">
                                  {coupon.discount_type === "percent" ? "Diskon" : "Potongan"}
                                </Typography>
                              </div>
                            </div>

                            {/* Expiry Date */}
                            {coupon.expired_at && (
                              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2.5 rounded-xl mt-auto">
                                <Clock size={14} className="text-gray-400" />
                                <Typography variant="caption" className="text-gray-500 text-xs">
                                  Berlaku hingga:{" "}
                                  <span className={`font-semibold ${
                                    isExpired(coupon.expired_at) ? "text-red-500" : "text-primary"
                                  }`}>
                                    {formatDate(coupon.expired_at)}
                                  </span>
                                </Typography>
                              </div>
                            )}
                          </CardContent>

                          {/* Decorative Circles */}
                          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-gray-100"></div>
                          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-gray-100"></div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mt-8 pt-6 border-t border-gray-200"
                  >
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(_, page) => setCurrentPage(page)}
                      color="primary"
                      size="large"
                      sx={{
                        '& .MuiPaginationItem-root': {
                          borderRadius: '12px',
                          margin: '0 4px',
                          fontSize: '0.95rem',
                          fontWeight: '500'
                        }
                      }}
                    />
                  </motion.div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Terms Dialog - Same as before */}
      <Dialog 
        open={termsOpen} 
        onClose={() => setTermsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            margin: "16px"
          }
        }}
      >
        <DialogTitle className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 text-primary">
            <FileText size={24} />
            <Typography variant="h6" className="font-bold">
              Syarat & Ketentuan
            </Typography>
          </div>
        </DialogTitle>
        
        <DialogContent className="px-6 py-4">
          <div className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-xl">
              <Typography variant="body2" className="font-semibold text-primary mb-3">
                Ketentuan Penggunaan Voucher:
              </Typography>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-xs">1</span>
                  </div>
                  <Typography variant="body2" className="text-gray-700 leading-relaxed">
                    Voucher hanya berlaku untuk pelanggan yang telah melakukan registrasi dan login akun resmi.
                  </Typography>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-xs">2</span>
                  </div>
                  <Typography variant="body2" className="text-gray-700 leading-relaxed">
                    Voucher dapat diakses melalui halaman login setelah pelanggan berhasil masuk.
                  </Typography>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-xs">3</span>
                  </div>
                  <Typography variant="body2" className="text-gray-700 leading-relaxed">
                    Untuk penggunaan voucher, pelanggan wajib menunjukkan nomor handphone terdaftar beserta voucher kepada kasir/merchant mitra.
                  </Typography>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-xs">4</span>
                  </div>
                  <Typography variant="body2" className="text-gray-700 leading-relaxed">
                    Voucher hanya berlaku selama masih tercantum pada halaman login akun dan tidak dapat digunakan setelah masa berlaku habis.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        
        <DialogActions className="px-6 pb-6 pt-2">
          <ShadcnButton 
            onClick={() => setTermsOpen(false)}
            className="w-full bg-primary hover:bg-primary/80"
          >
            Mengerti
          </ShadcnButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}