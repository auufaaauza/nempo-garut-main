"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  phone_number?: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (newUser: User) => void; // 👈 1. Tipe fungsi baru ditambahkan
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const storedToken = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
      if (storedToken) {
        setToken(storedToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        try {
          const response = await api.get("/api/user");
          const normalizedUser = response.data.user ?? response.data;
          setUser(normalizedUser);
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("auth_token");
          setToken(null);
          setUser(null);
          delete api.defaults.headers.common["Authorization"];
        }
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const login = async (credentials: any) => {
    const response = await api.post("/api/login", credentials);
    const { access_token: token, user } = response.data;
    if (!user.email_verified_at) {
      throw { response: { data: { message: "Email belum diverifikasi." } } };
    }
    localStorage.setItem("auth_token", token);
    setToken(token);
    setUser(user);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    router.push("/");
  };

  const register = async (data: any) => {
    const response = await api.post("/api/register", data);
    // Asumsi API register tidak langsung me-return token & user,
    // tapi hanya pesan sukses untuk verifikasi email.
    // Jika API Anda langsung me-return token setelah register, sesuaikan bagian ini.
  };
  
  const logout = async () => {
    try {
      await api.post("/api/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("auth_token");
      setToken(null);
      setUser(null);
      delete api.defaults.headers.common["Authorization"];
      router.push("/login");
    }
  };

  // 👈 2. Fungsi untuk mengupdate state user secara manual
  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser, // 👈 3. Sertakan fungsi baru di dalam value provider
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};