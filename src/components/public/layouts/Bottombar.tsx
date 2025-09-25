"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Ticket, ShoppingCart, Utensils, LogIn, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

type BottomLink = {
  name: string;
  path: string;
  icon: React.ElementType;
};

const BottomBar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { cartCount } = { cartCount: 0 }; // contoh dummy

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

  const primaryColor = '#0ba3da';
  const inactiveColor = '#4b5563'; // warna teks gelap tapi tidak terlalu kontras

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white/70 backdrop-blur-md border-t border-gray-200 z-50">
      <nav className="flex justify-around items-center h-14 md:h-16">
        {navLinks.map((link) => {
          const Icon = link.icon;

          const isActive =
            pathname === link.path ||
            (link.path !== '/' && pathname.startsWith(link.path)) ||
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
                  className="relative rounded-full p-1 drop-shadow-md"
                  initial={false}
                  animate={{ color: isActive ? primaryColor : inactiveColor }}
                >
                  <Icon className="h-6 w-6" />
                  {link.name === 'Keranjang' && cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 text-[10px] bg-red-500 text-white rounded-full px-[4px]">
                      {cartCount}
                    </span>
                  )}
                </motion.div>
                <motion.span
                  className="mt-1 text-[10px]"
                  initial={false}
                  animate={{ color: isActive ? primaryColor : inactiveColor }}
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
