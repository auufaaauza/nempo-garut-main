import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/Toaster";
import Navbar from "@/components/public/layouts/Navbar";
import Music from "@/components/public/common/MusicPlayer";
import BottomBar from "@/components/public/layouts/Bottombar";

// 👉 Client wrapper
import RootClient from "@/components/ui/RootClient";

const inter = Inter({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nempo Garut",
  description: "Jelajahi pesona Garut, Temukan Ceritamu!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <RootClient>
            <Navbar />
            <main className="pb-20 md:pb-0">{children}</main>
            <BottomBar />
            <Toaster />
            <Music />
          </RootClient>
        </AuthProvider>
      </body>
    </html>
  );
}
