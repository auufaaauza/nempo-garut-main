"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext"; 
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import api from "@/services/api";

// Komponen
import { Button as ShadcnButton } from "@/components/ui/button";
import { 
  Typography, 
  Avatar, 
  Box, 
  Card, 
  CardContent, 
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions,
  TextField,
  IconButton
} from "@mui/material";
import MyOrdersCard from "./MyOrderCard";
import MyCouponsCard from "./Coupons/MyCouponsCard";
import ProfileBackground from "./ProfileBackground"; 
import EditProfileDialog from "@/components/auth/Profile/EditProfileDialog";
import { useMyCoupons } from "@/hooks/useCoupons";

// Ikon
import { LogOut, BadgeCheck, Pencil, X, User, Mail, Phone, Loader2 } from "lucide-react";

// Tipe data yang lebih spesifik
interface User {
  id: string;
  name?: string;
  full_name?: string;
  email: string;
  phone_number?: string | null;
  avatar_url?: string;
  email_verified_at?: string | null;
}

interface AuthContextValue {
  user: User | null;
  logout: () => Promise<void>;
  isLoading: boolean;
  updateUser: (newUser: User) => void;
}

const ProfilePage = () => {
  const { user, logout, isLoading, updateUser } = useAuth() as AuthContextValue; 
  const { toast } = useToast();
  const router = useRouter();
  
  const { coupons, isLoading: isCouponsLoading } = useMyCoupons();

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: ''
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
    if (user) {
      setFormData({
        name: user.name || user.full_name || '',
        email: user.email || '',
        phone_number: user.phone_number || ''
      });
    }
  }, [isLoading, user, router]);

  const handleSignOut = async () => {
    try {
      await logout();
      toast({
        title: "Berhasil Keluar",
        description: "Anda telah berhasil keluar dari akun Anda.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal Keluar",
        description: "Terjadi kesalahan saat logout.",
      });
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.post('/api/user/profile', formData);
      updateUser(response.data.user);
      toast({ title: "Berhasil!", description: "Profil Anda telah berhasil diperbarui." });
      setEditDialogOpen(false);
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      const errorMessage = errors ? Object.values(errors).flat().join('\n') : "Terjadi kesalahan saat memperbarui profil.";
      toast({ variant: "destructive", title: "Update Gagal", description: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isCouponsLoading || !user) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Box className="container mx-auto py-10 px-4">
          {/* Skeleton Profile Card */}
          <Card
            className="max-w-md mx-auto shadow-lg rounded-2xl overflow-hidden"
            sx={{ borderRadius: "16px" }}
          >
            <Box className="bg-primary py-10 text-center text-white relative">
              <Skeleton
                variant="circular"
                width={90}
                height={90}
                sx={{ margin: "0 auto" }}
              />
              <Skeleton
                variant="text"
                width="60%"
                sx={{
                  margin: "16px auto 0",
                  bgcolor: "rgba(255,255,255,0.3)",
                }}
              />
              <Skeleton
                variant="text"
                width="40%"
                sx={{
                  margin: "8px auto 0",
                  bgcolor: "rgba(255,255,255,0.3)",
                }}
              />
            </Box>
            <CardContent className="text-center px-6 py-8">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={50}
                sx={{ borderRadius: "12px", mb: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={50}
                sx={{ borderRadius: "12px" }}
              />
            </CardContent>
          </Card>

          {/* Skeleton MyOrdersCard */}
          <div className="mt-8">
            <Card className="max-w-md mx-auto rounded-2xl p-6">
              <Skeleton variant="text" width={120} height={28} />
              <Skeleton variant="text" width={180} height={20} className="mb-6" />
              <div className="grid grid-cols-4 gap-3 mt-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Box key={idx} className="flex flex-col items-center">
                    <Skeleton variant="circular" width={56} height={56} />
                    <Skeleton variant="text" width={60} height={16} />
                  </Box>
                ))}
              </div>
            </Card>
          </div>

          {/* Skeleton MyCouponsCard */}
          <div className="mt-8">
            <Card className="max-w-md mx-auto rounded-2xl p-6">
              <Skeleton variant="text" width={140} height={28} />
              <div className="mt-4 space-y-4">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    variant="rectangular"
                    width="100%"
                    height={80}
                    sx={{ borderRadius: "12px" }}
                  />
                ))}
              </div>
            </Card>
          </div>
        </Box>
      </div>
    );
  }

  const displayName = user.name || user.full_name || user.email?.split("@")[0] || "User";
  const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="relative bg-gray-50 min-h-screen">
      <ProfileBackground />
      
      <Box className="container mx-auto pt-5 px-4 mb-20 relative z-10">
        <Card className="max-w-md mx-auto shadow-lg rounded-2xl overflow-hidden" sx={{ borderRadius: "20px" }}>
          <Box className="bg-primary py-10 text-center text-white relative">
            <Avatar
              src={user.avatar_url || ""}
              sx={{ width: 90, height: 90, margin: "0 auto", bgcolor: "primary.dark", fontSize: 32, fontWeight: "bold" }}
            >
              {!user.avatar_url && initials}
            </Avatar>
            <Typography variant="h5" className="font-bold mt-4">
              Halo, {displayName}
            </Typography>
            <Box className="flex items-center justify-center gap-2 mt-2">
              <Typography variant="body2" className="opacity-80">
                {user.email}
              </Typography>
              {user.email_verified_at && (
                <Box className="flex items-center gap-1 bg-white/20 text-white px-2 py-0.5 rounded-full">
                  <BadgeCheck size={14} />
                  <Typography variant="caption" className="font-semibold">Terverifikasi</Typography>
                </Box>
              )}
            </Box>
          </Box>
          <CardContent className="text-center px-6 py-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <ShadcnButton
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => setEditDialogOpen(true)}
              >
                <Pencil className="mr-2 h-5 w-5" />
                Edit Profil
              </ShadcnButton>
              <ShadcnButton
                size="lg"
                className="w-full"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </ShadcnButton>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <MyOrdersCard/>
        </div>
        <div className="mt-8">
          <MyCouponsCard coupons={coupons}/>
        </div>
      </Box>

      <EditProfileDialog
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleProfileUpdate}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ProfilePage;