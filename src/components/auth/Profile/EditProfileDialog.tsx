// components/public/profile/EditProfileDialog.tsx

"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { X, User, Mail, Phone, Loader2, Edit3 } from "lucide-react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    phone_number: string;
  };
  onFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
  isSubmitting: boolean;
}

export default function EditProfileDialog({
  open,
  onClose,
  formData,
  onFormChange,
  onSubmit,
  isSubmitting,
}: EditProfileDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog 
          open={open} 
          onClose={onClose} 
          fullWidth 
          maxWidth="sm"
          PaperProps={{
            component: motion.div,
            initial: { opacity: 0, scale: 0.9, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.9, y: 20 },
            transition: { duration: 0.2, ease: "easeOut" },
            sx: {
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
            }
          }}
          sx={{
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(4px)",
            }
          }}
        >
          {/* Header */}
          <DialogTitle className="relative overflow-hidden">
            <Box className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
            <Box className="relative flex justify-between items-center px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Edit3 size={20} className="text-primary" />
                </div>
                <div>
                  <Typography variant="h6" className="font-bold text-primary">
                    Edit Profil
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    Perbarui informasi pribadi Anda
                  </Typography>
                </div>
              </div>
              <IconButton 
                onClick={onClose} 
                className="hover:bg-gray-100 transition-colors"
                sx={{ 
                  width: 40, 
                  height: 40,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  }
                }}
              >
                <X size={18} className="text-gray-600" />
              </IconButton>
            </Box>
          </DialogTitle>

          {/* Content */}
          <MuiDialogContent className="px-6 py-6">
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Nama Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Paper 
                  elevation={0} 
                  className="p-4 bg-gray-50/50 border border-gray-100 rounded-xl hover:border-primary/30 transition-all duration-200"
                >
                  <TextField
                    fullWidth
                    label="Nama Lengkap"
                    name="name"
                    value={formData.name}
                    onChange={onFormChange}
                    variant="standard"
                    required
                    InputProps={{
                      startAdornment: (
                        <User size={20} className="mr-3 text-primary" />
                      ),
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      className: "text-gray-600 font-medium",
                    }}
                    sx={{
                      "& .MuiInput-root": {
                        fontSize: "16px",
                        fontWeight: 500,
                      },
                      "& .MuiInputLabel-root": {
                        transform: "translate(44px, 16px) scale(1)",
                        "&.Mui-focused, &.MuiFormLabel-filled": {
                          transform: "translate(44px, -8px) scale(0.75)",
                          color: "var(--primary)",
                        }
                      },
                    }}
                  />
                </Paper>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Paper 
                  elevation={0} 
                  className="p-4 bg-gray-50/50 border border-gray-100 rounded-xl hover:border-primary/30 transition-all duration-200"
                >
                  <TextField
                    fullWidth
                    label="Alamat Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onFormChange}
                    variant="standard"
                    required
                    InputProps={{
                      startAdornment: (
                        <Mail size={20} className="mr-3 text-primary" />
                      ),
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      className: "text-gray-600 font-medium",
                    }}
                    sx={{
                      "& .MuiInput-root": {
                        fontSize: "16px",
                        fontWeight: 500,
                      },
                      "& .MuiInputLabel-root": {
                        transform: "translate(44px, 16px) scale(1)",
                        "&.Mui-focused, &.MuiFormLabel-filled": {
                          transform: "translate(44px, -8px) scale(0.75)",
                          color: "var(--primary)",
                        }
                      },
                    }}
                  />
                </Paper>
              </motion.div>

              {/* Phone Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Paper 
                  elevation={0} 
                  className="p-4 bg-gray-50/50 border border-gray-100 rounded-xl hover:border-primary/30 transition-all duration-200"
                >
                  <TextField
                    fullWidth
                    label="Nomor Telepon"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={onFormChange}
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <Phone size={20} className="mr-3 text-primary" />
                      ),
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      className: "text-gray-600 font-medium",
                    }}
                    sx={{
                      "& .MuiInput-root": {
                        fontSize: "16px",
                        fontWeight: 500,
                      },
                      "& .MuiInputLabel-root": {
                        transform: "translate(44px, 16px) scale(1)",
                        "&.Mui-focused, &.MuiFormLabel-filled": {
                          transform: "translate(44px, -8px) scale(0.75)",
                          color: "var(--primary)",
                        }
                      },
                    }}
                  />
                </Paper>
              </motion.div>
            </form>
          </MuiDialogContent>

          {/* Actions */}
          <DialogActions className="p-6 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="w-full"
            >
              <Box className="flex flex-col sm:flex-row gap-3 w-full">
                <ShadcnButton
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 py-3 sm:py-3.5 text-base font-medium border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  Batal
                </ShadcnButton>
                <ShadcnButton
                  type="submit"
                  onClick={onSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-3 sm:py-3.5 text-base font-medium bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:transform-none disabled:shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </ShadcnButton>
              </Box>
            </motion.div>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
}