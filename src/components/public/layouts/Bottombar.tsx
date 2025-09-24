"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Ticket, ShoppingCart, Utensils, LogIn, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Kalau lu punya AuthContext:
import { useAuth } from '@/contexts/AuthContext';
// import { useCart } from '@/context/CartContext';

type BottomLink = {
  name: string;
  path: string;
  icon: React.ElementType;
};

const BottomBar: React.FC = () => {
  const pathname = usePathname();
  // Ambil data asli dari context
  const { user } = useAuth();
  const { cartCount } = { cartCount: 3 }; // contoh dummy

  const profileLink: BottomLink = user
    ? { name: 'Profil', path: '/profile', icon: UserCircle }
    : { name: 'Login', path: '/login', icon: LogIn };

  const navLinks: BottomLink[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Kuliner', path: '/kuliner', icon: Utensils },
    { name: 'Tiket Wisata', path: '/tiket', icon: Ticket },
    { name: 'Keranjang', path: '/keranjang', icon: ShoppingCart },
    profileLink,
  ];

  const inactiveColor = '#845f52';
  const activeColor = '#0ba3da';

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 shadow-lg">
      <nav className="flex justify-around items-center h-16">
        {navLinks.map((link) => {
          const Icon = link.icon;
          
          // --- PERUBAHAN LOGIKA ADA DI SINI ---
          const isActive = (pathname === link.path || 
                 (link.path !== '/' && pathname.startsWith(link.path))) ||
                 // Tambahkan kondisi khusus: jika link adalah '/profile', anggap aktif juga jika path adalah '/pesanan-saya'
                 (link.path === '/profile' && pathname.startsWith('/pesanan-saya'));

          return (
            <Link
              key={link.name}
              href={link.path}
              className="flex flex-col items-center justify-center p-2 text-xs font-semibold relative"
            >
              <motion.div
                className="flex flex-col items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="relative"
                  initial={false}
                  animate={{ color: isActive ? activeColor : inactiveColor }}
                >
                  <Icon className="h-6 w-6" />
                  
                </motion.div>
                <motion.span
                  className="mt-1"
                  initial={false}
                  animate={{ color: isActive ? activeColor : inactiveColor }}
                >
                  {link.name}
                </motion.span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default BottomBar;