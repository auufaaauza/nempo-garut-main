"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'; 

// Komponen UI Kustom
import { Button } from '@/components/ui/button';
import SketchBackground from '@/components/public/common/SketchBackground';
import PaymentMethodsInfo from '@/components/public/common/PaymentMethodsInfo';

// Ikon dari Lucide React
// 👈 Tambah semua ikon yang dibutuhkan di sini
import { LogIn, UserPlus, Loader2, Eye, EyeOff, Gift, Award, Phone, Mail, User, Lock } from 'lucide-react'; 

// Komponen dari Material-UI (MUI)
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const LoginClient = () => {
  const { user, login, register, isLoading: authLoading } = useAuth();
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [tab, setTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  const handleLoginSuccess = () => {
    setLoginDialogOpen(false);
    setEmail('');
    setPassword('');
    setName('');
    setPhoneNumber('');
    router.push('/'); 
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast({ title: 'Login Berhasil!', description: 'Selamat datang kembali.' });
      handleLoginSuccess();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Email atau password salah.";

      if (msg.toLowerCase().includes("verifikasi")) {
        router.push(`/verify?from=login&email=${encodeURIComponent(email)}`);
        toast({ variant: "destructive", title: "Verifikasi Dibutuhkan", description: msg });
      } else {
        toast({ variant: "destructive", title: "Login Gagal", description: msg });
      }
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ 
        name, 
        email, 
        phone_number: phoneNumber,
        password, 
        password_confirmation: password 
      });
      
      toast({ 
        title: 'Pendaftaran Berhasil!', 
        description: 'Satu langkah lagi, silakan cek email Anda untuk verifikasi.' 
      });

      setLoginDialogOpen(false);
      router.push('/verify'); 

    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join('\n');
        toast({ 
          variant: "destructive", 
          title: 'Pendaftaran Gagal', 
          description: errorMessages
        });
      } else {
         toast({ 
          variant: "destructive", 
          title: 'Pendaftaran Gagal', 
          description: error.response?.data?.message || 'Terjadi kesalahan.' 
        });
      }
    }
    setLoading(false);
  };
  
  if (authLoading || user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative bg-gradient-to-br from-primary to-sky-400 text-white pt-16 pb-24 md:pb-32">
          <SketchBackground />
          <div className="container relative z-10">
              <div className="flex justify-between items-center">
                  <h1 className="text-4xl font-bold">Hi, Sobat Nempo!</h1>
              </div>
          </div>
      </div>
      <div className="container relative z-10 -mt-16 md:-mt-24">
          <div className="flex flex-col gap-6 max-w-2xl mx-auto">
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-6 rounded-2xl shadow-lg"
              >
                  <div className="flex items-center gap-4">
                      <div className="bg-yellow-100 p-3 rounded-full">
                          <Gift className="w-8 h-8 text-yellow-500" />
                      </div>
                      <div>
                          <h2 className="font-bold text-gray-800 text-lg">Diskon Khusus Member!</h2>
                          <p className="text-sm text-gray-600">Daftar sekarang untuk mendapatkan diskon tiket dan promo eksklusif.</p>
                      </div>
                  </div>
                  <Button className="w-full rounded-xl mt-4" size="lg" onClick={() => setLoginDialogOpen(true)}>
                      Masuk atau Daftar
                  </Button>
              </motion.div>
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gradient-to-r from-emerald-400 to-cyan-400 p-5 rounded-2xl shadow-lg text-white flex justify-between items-center"
              >
                  <div>
                      <h3 className="font-bold">Keuntungan Menjadi Member</h3>
                      <p className="text-sm opacity-90">Simpan wishlist, lihat riwayat pesanan, dan banyak lagi.</p>
                  </div>
                  <div className="bg-white/30 p-3 rounded-full">
                      <Award className="w-6 h-6 text-white" />
                  </div>
              </motion.div>
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
              >
                  <PaymentMethodsInfo />
              </motion.div>
          </div>
      </div>

      <Dialog 
        open={isLoginDialogOpen} 
        onClose={() => setLoginDialogOpen(false)} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{ style: { borderRadius: '1.5rem' } }}
      >
        <DialogTitle className="text-center text-2xl font-bold text-gray-800 pt-8 pb-2">
          <span className='font-bold text-accent-foreground'>Selamat Datang! </span>
        </DialogTitle>
        <DialogContent className="p-8">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              variant={tab === 'signin' ? 'default' : 'outline'}
              onClick={() => setTab('signin')}
              className="h-11"
            >
              <LogIn className="mr-2 h-4 w-4" /> Masuk
            </Button>
            <Button
              variant={tab === 'signup' ? 'default' : 'outline'}
              onClick={() => setTab('signup')}
              className="h-11"
            >
              <UserPlus className="mr-2 h-4 w-4" /> Daftar
            </Button>
          </div>
          
          <AnimatePresence mode="wait"> 
            {tab === 'signin' && (
              <motion.form 
                key="signin-form"
                onSubmit={handleSignIn} 
                className="space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <div className="space-y-2">
                  <label htmlFor="signin-email" className="text-sm font-medium text-accent-foreground">Email</label>
                  <TextField 
                    id="signin-email" 
                    type="email" 
                    variant="outlined" 
                    placeholder="email@contoh.com" 
                    fullWidth 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.75rem' } }}
                    InputProps={{ // 👈 Tambah InputProps untuk ikon
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={16} className="text-gray-500" />
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signin-password"className="text-sm font-medium text-accent-foreground">Password</label>
                  <TextField
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    placeholder="••••••••"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.75rem' } }}
                    InputProps={{
                      startAdornment: ( // 👈 Tambah InputProps untuk ikon
                        <InputAdornment position="start">
                          <Lock size={16} className="text-gray-500" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full h-12 text-md" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
                    {loading ? 'Memproses...' : 'Masuk'}
                </Button>
              </motion.form>
            )}

            {tab === 'signup' && (
              <motion.form 
                key="signup-form"
                onSubmit={handleSignUp} 
                className="space-y-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <div className="space-y-2">
                  <label htmlFor="signup-name" className="text-sm font-medium text-accent-foreground">Nama Lengkap</label>
                  <TextField 
                    id="signup-name" 
                    type="text" 
                    variant="outlined" 
                    placeholder="Nama Anda" 
                    fullWidth 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.75rem' } }}
                    InputProps={{ // 👈 Tambah InputProps untuk ikon
                      startAdornment: (
                        <InputAdornment position="start">
                          <User size={16} className="text-gray-500" />
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="text-sm font-medium text-accent-foreground">Email</label>
                  <TextField 
                    id="signup-email" 
                    type="email" 
                    variant="outlined" 
                    placeholder="email@contoh.com" 
                    fullWidth 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.75rem' } }}
                    InputProps={{ // 👈 Tambah InputProps untuk ikon
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={16} className="text-gray-500" />
                        </InputAdornment>
                      )
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="signup-phone" className="text-sm font-medium text-accent-foreground">Nomor Telepon</label>
                  <TextField 
                    id="signup-phone" 
                    type="tel"
                    variant="outlined" 
                    placeholder="08xxxxxxxxxx" 
                    fullWidth 
                    required 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.75rem' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone size={16} className="text-gray-500" />
                        </InputAdornment>
                      )
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="signup-password"className="text-sm font-medium text-accent-foreground">Password</label>
                  <TextField
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    placeholder="Minimal 8 karakter"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.75rem' } }}
                    InputProps={{
                      startAdornment: ( // 👈 Tambah InputProps untuk ikon
                        <InputAdornment position="start">
                          <Lock size={16} className="text-gray-500" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full h-12 text-md" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                    {loading ? 'Memproses...' : 'Daftar Akun'}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginClient;